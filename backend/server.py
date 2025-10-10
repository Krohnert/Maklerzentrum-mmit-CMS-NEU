from fastapi import FastAPI, APIRouter, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create rate limiter
limiter = Limiter(key_func=get_remote_address)

# Create the main app without a prefix
app = FastAPI()
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Booking/Contact Form Models
class BookingFormData(BaseModel):
    firstName: str
    lastName: str
    email: EmailStr  # Enhanced email validation
    phone: Optional[str] = None
    module: Optional[str] = None
    message: Optional[str] = None
    agreeTerms: bool
    # Honeypot field
    website_url: Optional[str] = None

class CourseBookingData(BaseModel):
    firstName: str
    lastName: str
    email: EmailStr  # Enhanced email validation
    phone: Optional[str] = None
    # Course-specific data
    courseTitle: str
    courseStartDate: str
    courseEndDate: Optional[str] = None
    courseLocation: str
    courseCohort: str
    courseModule: str
    message: Optional[str] = None
    agreeTerms: bool
    # Honeypot field
    website_url: Optional[str] = None

class ContactFormData(BaseModel):
    firstName: str
    lastName: str
    email: EmailStr  # Enhanced email validation
    phone: Optional[str] = None
    company: Optional[str] = None
    subject: Optional[str] = None
    message: str
    agreeTerms: bool
    # Honeypot field
    website_url: Optional[str] = None

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# Email utility function
async def send_email(to_email: str, subject: str, body: str, form_type: str = "booking"):
    """
    Send email using SMTP (simulated for now)
    In production, configure with actual SMTP settings
    """
    try:
        # For now, just log the email content
        logger.info(f"📧 EMAIL WOULD BE SENT:")
        logger.info(f"To: {to_email}")
        logger.info(f"Subject: {subject}")
        logger.info(f"Type: {form_type}")
        logger.info(f"Body:\n{body}")
        logger.info("=" * 50)
        
        # In production, implement actual SMTP sending here:
        # smtp_server = os.environ.get('SMTP_SERVER', 'localhost')
        # smtp_port = int(os.environ.get('SMTP_PORT', '587'))
        # smtp_username = os.environ.get('SMTP_USERNAME')
        # smtp_password = os.environ.get('SMTP_PASSWORD')
        
        return True
    except Exception as e:
        logger.error(f"Failed to send email: {e}")
        return False

# Honeypot validation
def check_honeypot(form_data):
    """Check if honeypot field is filled (indicates bot)"""
    honeypot_field = getattr(form_data, 'website_url', None)
    if honeypot_field and honeypot_field.strip():
        logger.warning(f"Honeypot field filled: {honeypot_field}")
        return False
    return True

# Booking Form Endpoint
@api_router.post("/booking")
@limiter.limit("5/minute")
async def submit_booking_form(request: Request, form_data: BookingFormData):
    """Handle main booking form submissions from index.html"""
    
    # Check honeypot
    if not check_honeypot(form_data):
        return {"success": False, "error": "Invalid submission"}
    
    try:
        # Save to database
        booking_doc = {
            "id": str(uuid.uuid4()),
            "type": "booking",
            "firstName": form_data.firstName,
            "lastName": form_data.lastName,
            "email": form_data.email,
            "phone": form_data.phone,
            "module": form_data.module,
            "message": form_data.message,
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "processed": False
        }
        
        await db.bookings.insert_one(booking_doc)
        
        # Prepare email content
        email_subject = f"Neue Platzreservierung: {form_data.firstName} {form_data.lastName}"
        email_body = f"""
Neue Platzreservierung eingegangen:

**Teilnehmer-Details:**
- Name: {form_data.firstName} {form_data.lastName}
- E-Mail: {form_data.email}
- Telefon: {form_data.phone or 'Nicht angegeben'}

**Kurs-Details:**
- Gewünschtes Modul: {form_data.module or 'Nicht spezifiziert'}

**Nachricht:**
{form_data.message or 'Keine zusätzliche Nachricht'}

---
Gesendet über maklerzentrum.ch Hauptformular
Buchungs-ID: {booking_doc['id']}
        """.strip()
        
        # Send email to Sascha
        email_sent = await send_email(
            to_email="Sascha.Voegeli@maklerzentrum.ch",
            subject=email_subject,
            body=email_body,
            form_type="booking"
        )
        
        logger.info(f"Booking form submitted: {form_data.email}, Module: {form_data.module}")
        
        return {
            "success": True, 
            "message": "Ihre Reservierung wurde erfolgreich eingereicht!",
            "bookingId": booking_doc['id']
        }
        
    except Exception as e:
        logger.error(f"Error processing booking form: {e}")
        return {"success": False, "error": "Fehler beim Verarbeiten der Anfrage"}

# Course Booking Endpoint (for schulung.html)
@api_router.post("/course-booking")
@limiter.limit("5/minute")
async def submit_course_booking(request: Request, form_data: CourseBookingData):
    """Handle course-specific booking forms from schulung.html"""
    
    # Check honeypot
    if not check_honeypot(form_data):
        return {"success": False, "error": "Invalid submission"}
    
    try:
        # Save to database
        course_booking_doc = {
            "id": str(uuid.uuid4()),
            "type": "course_booking",
            "firstName": form_data.firstName,
            "lastName": form_data.lastName,
            "email": form_data.email,
            "phone": form_data.phone,
            "courseTitle": form_data.courseTitle,
            "courseStartDate": form_data.courseStartDate,
            "courseEndDate": form_data.courseEndDate,
            "courseLocation": form_data.courseLocation,
            "courseCohort": form_data.courseCohort,
            "courseModule": form_data.courseModule,
            "message": form_data.message,
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "processed": False
        }
        
        await db.course_bookings.insert_one(course_booking_doc)
        
        # Prepare email content for Sascha
        email_subject = f"Kursanfrage: {form_data.courseTitle} - {form_data.firstName} {form_data.lastName}"
        email_body = f"""
Neue Kursanfrage eingegangen:

**Kurs-Details:**
- Kurs: {form_data.courseTitle}
- Datum: {form_data.courseStartDate}{' – ' + form_data.courseEndDate if form_data.courseEndDate else ''}
- Ort: {form_data.courseLocation}
- Kohorte: {form_data.courseCohort}
- Modul: {form_data.courseModule}

**Teilnehmer-Details:**
- Name: {form_data.firstName} {form_data.lastName}
- E-Mail: {form_data.email}
- Telefon: {form_data.phone or 'Nicht angegeben'}

**Nachricht:**
{form_data.message or 'Keine zusätzliche Nachricht'}

---
Gesendet über maklerzentrum.ch Schulungsseite
Buchungs-ID: {course_booking_doc['id']}
        """.strip()
        
        # Send email to Sascha
        email_sent = await send_email(
            to_email="Sascha.Voegeli@maklerzentrum.ch",
            subject=email_subject,
            body=email_body,
            form_type="course_booking"
        )
        
        logger.info(f"Course booking submitted: {form_data.email}, Course: {form_data.courseTitle}")
        
        return {
            "success": True,
            "message": "Deine Kursanfrage wurde erfolgreich eingereicht! Wir melden uns bald bei dir.",
            "bookingId": course_booking_doc['id']
        }
        
    except Exception as e:
        logger.error(f"Error processing course booking: {e}")
        return {"success": False, "error": "Fehler beim Verarbeiten der Kursanfrage"}

# Contact Form Endpoint
@api_router.post("/contact")
@limiter.limit("5/minute")
async def submit_contact_form(request: Request, form_data: ContactFormData):
    """Handle general contact forms and company class inquiries"""
    
    # Check honeypot
    if not check_honeypot(form_data):
        return {"success": False, "error": "Invalid submission"}
    
    try:
        # Save to database
        contact_doc = {
            "id": str(uuid.uuid4()),
            "type": "contact",
            "firstName": form_data.firstName,
            "lastName": form_data.lastName,
            "email": form_data.email,
            "phone": form_data.phone,
            "company": form_data.company,
            "subject": form_data.subject,
            "message": form_data.message,
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "processed": False
        }
        
        await db.contacts.insert_one(contact_doc)
        
        # Prepare email content
        email_subject = f"Kontaktanfrage: {form_data.subject or 'Allgemeine Anfrage'}"
        if form_data.company:
            email_subject = f"Firmenanfrage: {form_data.company} - {form_data.firstName} {form_data.lastName}"
        
        email_body = f"""
Neue Kontaktanfrage eingegangen:

**Kontakt-Details:**
- Name: {form_data.firstName} {form_data.lastName}
- E-Mail: {form_data.email}
- Telefon: {form_data.phone or 'Nicht angegeben'}
- Firma: {form_data.company or 'Nicht angegeben'}
- Betreff: {form_data.subject or 'Nicht angegeben'}

**Nachricht:**
{form_data.message}

---
Gesendet über maklerzentrum.ch Kontaktformular
Anfrage-ID: {contact_doc['id']}
        """.strip()
        
        # Send email to Sascha
        email_sent = await send_email(
            to_email="Sascha.Voegeli@maklerzentrum.ch",
            subject=email_subject,
            body=email_body,
            form_type="contact"
        )
        
        logger.info(f"Contact form submitted: {form_data.email}, Subject: {form_data.subject}")
        
        return {
            "success": True,
            "message": "Ihre Nachricht wurde erfolgreich gesendet! Wir melden uns bald bei Ihnen.",
            "contactId": contact_doc['id']
        }
        
    except Exception as e:
        logger.error(f"Error processing contact form: {e}")
        return {"success": False, "error": "Fehler beim Senden der Nachricht"}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"],
    expose_headers=["X-RateLimit-Limit", "X-RateLimit-Remaining", "X-RateLimit-Reset"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
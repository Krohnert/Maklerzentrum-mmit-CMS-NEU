from fastapi import FastAPI, APIRouter, Request, UploadFile, File, Form, Cookie, Response
from fastapi.responses import StreamingResponse
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
from io import BytesIO

# CMS Modules
from cms_storage import CMSStorage
from cms_auth import CMSAuth
from cms_content import CMSContent


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# CMS Services
cms_storage = CMSStorage(db)
cms_auth = CMSAuth(db)
cms_content = CMSContent(db)

# Custom key function for rate limiting behind proxy/ingress
def get_remote_address_from_headers(request: Request) -> str:
    """Extract real client IP from proxy headers"""
    x_forwarded_for = request.headers.get('X-Forwarded-For')
    if x_forwarded_for:
        # The X-Forwarded-For may contain multiple IPs, take first one
        ip = x_forwarded_for.split(',')[0].strip()
        return ip
    x_real_ip = request.headers.get('X-Real-IP')
    if x_real_ip:
        return x_real_ip
    # Fallback to direct client IP
    return request.client.host if request.client else "unknown"

# Create rate limiter
limiter = Limiter(key_func=get_remote_address_from_headers)

# Create the main app without a prefix
app = FastAPI()
app.state.limiter = limiter
app.add_middleware(SlowAPIMiddleware)
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

# ============================================
# CMS ADMIN API ENDPOINTS
# ============================================

# Models for CMS
class LoginRequest(BaseModel):
    email: EmailStr
    password: str
    remember_me: bool = False

class PasswordResetRequest(BaseModel):
    old_password: str
    new_password: str

# Admin Auth Endpoints
@api_router.post("/admin/login")
@limiter.limit("10/minute")
async def admin_login(request: Request, response: Response, login: LoginRequest):
    """Admin login - returns session cookie"""
    try:
        # Authenticate
        user = await cms_auth.authenticate_user(login.email, login.password)
        if not user:
            return {"success": False, "error": "Ungültige Anmeldedaten"}
        
        # Create session
        session_id = await cms_auth.create_session(
            user["_id"],
            user["email"],
            ip_address=request.client.host if request.client else "",
            user_agent=request.headers.get("user-agent", ""),
            remember_me=login.remember_me
        )
        
        # Set cookie
        max_age = (12 * 60 * 60) if login.remember_me else (30 * 60)  # 12h or 30min
        
        # Secure only for HTTPS (production)
        is_secure = request.url.scheme == "https"
        
        response.set_cookie(
            key="cms_session",
            value=session_id,
            max_age=max_age,
            httponly=True,
            secure=is_secure,  # True only for HTTPS
            samesite="lax"
        )
        
        logger.info(f"✅ Cookie set (secure={is_secure}) for: {user['email']}")
        
        return {
            "success": True,
            "user": {
                "id": user["_id"],
                "email": user["email"],
                "role": user["role"],
                "mustResetPassword": user.get("mustResetPassword", False)
            }
        }
        
    except Exception as e:
        logger.error(f"Login error: {e}")
        return {"success": False, "error": "Serverfehler"}

@api_router.post("/admin/logout")
async def admin_logout(response: Response, cms_session: Optional[str] = Cookie(None)):
    """Admin logout - clear session"""
    if cms_session:
        await cms_auth.delete_session(cms_session)
    
    response.delete_cookie(key="cms_session")
    return {"success": True}

@api_router.get("/admin/me")
async def admin_me(cms_session: Optional[str] = Cookie(None)):
    """Get current admin user"""
    if not cms_session:
        return {"success": False, "error": "Nicht angemeldet"}
    
    session = await cms_auth.get_session(cms_session)
    if not session:
        return {"success": False, "error": "Session abgelaufen"}
    
    user = await cms_auth.get_user(session["userId"])
    if not user:
        return {"success": False, "error": "Benutzer nicht gefunden"}
    
    return {
        "success": True,
        "user": {
            "id": user["_id"],
            "email": user["email"],
            "role": user["role"],
            "mustResetPassword": user.get("mustResetPassword", False),
            "lastLogin": user.get("lastLogin")
        }
    }

@api_router.post("/admin/reset-password")
async def admin_reset_password(
    reset: PasswordResetRequest,
    cms_session: Optional[str] = Cookie(None)
):
    """Reset admin password"""
    if not cms_session:
        return {"success": False, "error": "Nicht angemeldet"}
    
    session = await cms_auth.get_session(cms_session)
    if not session:
        return {"success": False, "error": "Session abgelaufen"}
    
    success = await cms_auth.reset_password(
        session["userId"],
        reset.old_password,
        reset.new_password
    )
    
    if success:
        return {"success": True, "message": "Passwort erfolgreich geändert"}
    else:
        return {"success": False, "error": "Altes Passwort ungültig"}

# Media Endpoints
@api_router.post("/admin/media/upload")
@limiter.limit("20/minute")
async def admin_media_upload(
    request: Request,
    file: UploadFile = File(...),
    alt_text: str = Form(""),
    cms_session: Optional[str] = Cookie(None)
):
    """Upload image to CMS"""
    # Check auth
    if not cms_session:
        return {"success": False, "error": "Nicht angemeldet"}
    
    session = await cms_auth.get_session(cms_session)
    if not session:
        return {"success": False, "error": "Session abgelaufen"}
    
    try:
        # Read file
        file_data = await file.read()
        
        # Upload
        result = await cms_storage.upload_image(
            file_data,
            file.filename,
            file.content_type,
            alt_text
        )
        
        return {"success": True, "image": result}
        
    except ValueError as e:
        return {"success": False, "error": str(e)}
    except Exception as e:
        logger.error(f"Upload error: {e}")
        return {"success": False, "error": "Upload fehlgeschlagen"}

@api_router.get("/media/serve/{key}")
async def serve_media(key: str):
    """Serve image from GridFS"""
    result = await cms_storage.get_file(key)
    if not result:
        return {"error": "File not found"}
    
    data, content_type = result
    return StreamingResponse(BytesIO(data), media_type=content_type)

@api_router.get("/admin/media")
async def admin_media_list(
    skip: int = 0,
    limit: int = 50,
    cms_session: Optional[str] = Cookie(None)
):
    """List all media"""
    # Check auth
    if not cms_session:
        return {"success": False, "error": "Nicht angemeldet"}
    
    session = await cms_auth.get_session(cms_session)
    if not session:
        return {"success": False, "error": "Session abgelaufen"}
    
    media = await cms_storage.list_media(skip, limit)
    return {"success": True, "media": media}

@api_router.delete("/admin/media/{image_id}")
async def admin_media_delete(
    image_id: str,
    cms_session: Optional[str] = Cookie(None)
):
    """Delete image"""
    # Check auth
    if not cms_session:
        return {"success": False, "error": "Nicht angemeldet"}
    
    session = await cms_auth.get_session(cms_session)
    if not session:
        return {"success": False, "error": "Session abgelaufen"}
    
    success = await cms_storage.delete_image(image_id)
    if success:
        return {"success": True}
    else:
        return {"success": False, "error": "Löschen fehlgeschlagen"}

# Content Management Endpoints
@api_router.get("/admin/content/site-global")
async def get_site_global(cms_session: Optional[str] = Cookie(None)):
    """Get global site settings"""
    if not cms_session or not await cms_auth.get_session(cms_session):
        return {"success": False, "error": "Nicht angemeldet"}
    
    data = await cms_content.get_site_global()
    return {"success": True, "data": data}

@api_router.put("/admin/content/site-global")
async def update_site_global(data: dict, cms_session: Optional[str] = Cookie(None)):
    """Update global site settings"""
    session = await cms_auth.get_session(cms_session) if cms_session else None
    if not session:
        return {"success": False, "error": "Nicht angemeldet"}
    
    success = await cms_content.update_site_global(data)
    return {"success": success}

@api_router.get("/admin/content/{locale}/modules")
async def list_modules(locale: str, cms_session: Optional[str] = Cookie(None)):
    """List modules for locale"""
    if not cms_session or not await cms_auth.get_session(cms_session):
        return {"success": False, "error": "Nicht angemeldet"}
    
    modules = await cms_content.list_modules(locale)
    return {"success": True, "modules": modules}

@api_router.post("/admin/content/{locale}/modules")
async def create_module(locale: str, data: dict, cms_session: Optional[str] = Cookie(None)):
    """Create new module"""
    session = await cms_auth.get_session(cms_session) if cms_session else None
    if not session:
        return {"success": False, "error": "Nicht angemeldet"}
    
    module_id = await cms_content.create_module(locale, data, session["email"])
    return {"success": bool(module_id), "id": module_id}

@api_router.put("/admin/content/modules/{module_id}")
async def update_module(module_id: str, data: dict, cms_session: Optional[str] = Cookie(None)):
    """Update module"""
    session = await cms_auth.get_session(cms_session) if cms_session else None
    if not session:
        return {"success": False, "error": "Nicht angemeldet"}
    
    success = await cms_content.update_module(module_id, data, session["email"])
    return {"success": success}

@api_router.delete("/admin/content/modules/{module_id}")
async def delete_module(module_id: str, cms_session: Optional[str] = Cookie(None)):
    """Delete module"""
    if not cms_session or not await cms_auth.get_session(cms_session):
        return {"success": False, "error": "Nicht angemeldet"}
    
    success = await cms_content.delete_module(module_id)
    return {"success": success}

@api_router.put("/admin/content/{locale}/modules/reorder")
async def reorder_modules(locale: str, ids: dict, cms_session: Optional[str] = Cookie(None)):
    """Reorder modules"""
    if not cms_session or not await cms_auth.get_session(cms_session):
        return {"success": False, "error": "Nicht angemeldet"}
    
    success = await cms_content.reorder_modules(ids.get("module_ids", []))
    return {"success": success}

# FAQ Endpoints (similar pattern)
@api_router.get("/admin/content/{locale}/faq")
async def list_faq(locale: str, cms_session: Optional[str] = Cookie(None)):
    """List FAQ for locale"""
    if not cms_session or not await cms_auth.get_session(cms_session):
        return {"success": False, "error": "Nicht angemeldet"}
    
    faq = await cms_content.list_faq(locale)
    return {"success": True, "faq": faq}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["http://localhost:3000", "http://localhost:8001", "https://react2html-makler.preview.emergentagent.com"],
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

@app.on_event("startup")
async def startup_event():
    """Initialize CMS on startup"""
    logger.info("🚀 Starting CMS initialization...")
    
    # Seed admin users
    await cms_auth.seed_admin_users()
    
    logger.info("✅ CMS initialized successfully")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
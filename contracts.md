# API Contracts & Backend Integration Plan
## Maklerzentrum Schweiz AG Website

### Current Status
✅ **Frontend Complete** - All 5 main pages + 2 thank-you pages built with mock data
✅ **Design** - Mobile-first, conversion-optimized, professional branding
✅ **Navigation** - Sticky header, mobile burger menu, footer

### Mock Data Location
File: `/app/frontend/src/mockData.js`

**Mocked Data:**
- `scheduleData` - Course schedule matrix (24 entries for 2026)
- `modules` - 4 VBV modules with descriptions
- `testimonials` - 2 customer testimonials  
- `faqData` - 5 FAQ items
- `services` - 10 service offerings
- `team` - 5 team members
- `locations` - 5 training locations
- `cohorts` - 12 monthly cohorts
- `modulesList` - 4 module names

### Forms Requiring Backend

#### 1. Booking/Reservation Form (`BookingForm.jsx`)
**Location:** Home page (`/#booking`) + Prefillable via URL params

**Frontend Behavior:**
- Form submission logs to console
- Redirects to `/danke?cohort={cohort}&module={module}`

**API Contract:**
```
POST /api/booking
Content-Type: application/json

Request Body:
{
  "cohort": "Jan-2026",              // Required
  "module": "Leben (Vorsorge/Risiko)", // Required
  "locationPreference": "Zürich",    // Optional
  "participants": 1,                 // Default: 1
  "firstName": "Max",                // Required
  "lastName": "Mustermann",          // Required
  "email": "max@example.com",        // Required (validated)
  "phone": "+41 79 123 45 67",       // Optional
  "message": "...",                  // Optional
  "agreeTerms": true,                // Required
  "referrer": "direct",              // Auto-captured
  "utm_source": "google"             // Auto-captured if present
}

Response 200:
{
  "success": true,
  "bookingId": "uuid",
  "message": "Reservation erfolgreich"
}

Response 400:
{
  "success": false,
  "errors": {
    "email": "Diese E-Mail sieht nicht korrekt aus."
  }
}
```

**Backend Tasks:**
1. Create `/api/booking` endpoint
2. Validate all required fields
3. Send email to `Sascha.Voegeli@maklerzentrum.ch` with:
   - Subject: `VBV-Reservierung – {cohort} · {module}`
   - Body: All form fields + referrer/UTM data
4. Send autoresponder to customer email:
   - Subject: `Deine VBV-Reservierung – {cohort} · {module}`
   - Body: Confirmation + Links to test access & payment (placeholders: `{{LINK_TESTZUGANG}}`, `{{LINK_BEZAHLEN}}`)
5. Store booking in MongoDB `bookings` collection
6. Return success response

#### 2. Company/Firmenklasse Form (`CompanyForm.jsx`)
**Location:** Kontakt page

**Frontend Behavior:**
- Form submission logs to console
- Redirects to `/danke-firmenklasse`

**API Contract:**
```
POST /api/company-inquiry
Content-Type: application/json

Request Body:
{
  "timeframe": "März 2026",          // Required
  "teamSize": 15,                    // Required (number)
  "modules": "Alle 4 Module",        // Optional
  "location": "Zürich",              // Optional
  "contactPerson": "Anna Meier",     // Optional
  "email": "anna@firma.ch",          // Required (validated)
  "phone": "+41 79 123 45 67",       // Optional
  "company": "Firma AG, Hauptstr. 1, 8000 Zürich", // Optional
  "message": "...",                  // Optional
  "agreeTerms": true                 // Required
}

Response 200:
{
  "success": true,
  "inquiryId": "uuid",
  "message": "Anfrage erfolgreich gesendet"
}
```

**Backend Tasks:**
1. Create `/api/company-inquiry` endpoint
2. Validate required fields
3. Send email to `Sascha.Voegeli@maklerzentrum.ch` with all form data
4. Send autoresponder to customer
5. Store inquiry in MongoDB `company_inquiries` collection

### Email Configuration Required

**SMTP Settings Needed:**
- SMTP Host
- SMTP Port
- SMTP Username
- SMTP Password
- From Email (e.g., `noreply@maklerzentrum.ch`)

**Email Templates:**
1. **Booking Confirmation (to Sascha)**
2. **Booking Autoresponder (to customer)**
3. **Company Inquiry (to Sascha)**
4. **Company Autoresponder (to customer)**

### Database Schema

#### Bookings Collection
```javascript
{
  _id: ObjectId,
  bookingId: String (UUID),
  cohort: String,
  module: String,
  locationPreference: String,
  participants: Number,
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  message: String,
  agreeTerms: Boolean,
  referrer: String,
  utmSource: String,
  utmMedium: String,
  utmCampaign: String,
  createdAt: Date,
  status: String, // 'pending', 'confirmed', 'cancelled'
}
```

#### Company Inquiries Collection
```javascript
{
  _id: ObjectId,
  inquiryId: String (UUID),
  timeframe: String,
  teamSize: Number,
  modules: String,
  location: String,
  contactPerson: String,
  email: String,
  phone: String,
  company: String,
  message: String,
  agreeTerms: Boolean,
  createdAt: Date,
  status: String, // 'pending', 'contacted', 'closed'
}
```

### Frontend Integration Steps

1. **Update BookingForm.jsx:**
   - Change mock `setTimeout` to actual API call using axios
   - Handle loading states
   - Handle error responses
   - Capture referrer and UTM params from window.location

2. **Update CompanyForm.jsx:**
   - Change mock `setTimeout` to actual API call
   - Similar error handling

3. **No changes needed for:**
   - Static data (scheduleData, modules, testimonials, etc.) - can remain in mockData.js
   - Navigation, Footer, other components
   - All page layouts

### Testing Checklist

**Backend Testing:**
- [ ] POST /api/booking with valid data → 200 response
- [ ] POST /api/booking with missing required field → 400 error
- [ ] POST /api/booking with invalid email → 400 error
- [ ] Verify email sent to Sascha
- [ ] Verify autoresponder sent to customer
- [ ] Verify booking stored in database
- [ ] Same tests for /api/company-inquiry

**Frontend Integration Testing:**
- [ ] Submit booking form → redirects to /danke with params
- [ ] Submit with validation errors → displays error messages
- [ ] URL prefill works (cohort/module/loc params)
- [ ] Submit company form → redirects to /danke-firmenklasse
- [ ] Network tab shows API calls

### Notes

- **No authentication needed** - Forms are public
- **Rate limiting recommended** - Prevent spam (e.g., 5 submissions per IP per hour)
- **Email placeholders** - `{{LINK_TESTZUGANG}}` and `{{LINK_BEZAHLEN}}` should be replaced with actual URLs when available
- **SMTP Provider** - Consider using SendGrid, AWS SES, or similar for reliable email delivery
- **CORS** - Ensure backend allows requests from frontend URL

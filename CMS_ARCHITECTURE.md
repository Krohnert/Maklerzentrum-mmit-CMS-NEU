# 🏗️ CMS-Architektur - Maklerzentrum Schweiz AG
**Finalisiert:** 10. Oktober 2025, 14:45 UTC  
**Status:** APPROVED - Ready for Implementation

---

## 🎯 ARCHITEKTUR-ENTSCHEIDUNGEN

### **Frontend-Stack:**
```
✅ HTML5 + Vanilla JavaScript (KEIN React!)
✅ Tailwind CSS (via CDN)
✅ Kleine Libraries erlaubt:
   - DOMPurify (XSS-Schutz)
   - SortableJS (Drag & Drop)
   - flatpickr (Datepicker)
```

### **Backend-Stack:**
```
✅ FastAPI (Python 3.11) - bereits vorhanden
✅ MongoDB (Content + Sessions + Users)
✅ AWS S3 (Bild-Uploads + Derivate)
✅ Redis (Sessions, Fallback: MongoDB)
```

### **Storage-Layer:**
```
┌─────────────────────────────────────────┐
│  Content (MongoDB)                      │
│  ├── collections.content_de_ch          │
│  ├── collections.content_fr_ch          │
│  ├── collections.content_it_ch          │
│  ├── collections.events (sprachneutral) │
│  ├── collections.users                  │
│  └── collections.sessions               │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  Images (AWS S3)                        │
│  ├── bucket: maklerzentrum-assets      │
│  ├── /uploads/originals/               │
│  ├── /uploads/320/                     │
│  ├── /uploads/960/                     │
│  └── /uploads/1920/                    │
│  → CloudFront CDN davor                │
└─────────────────────────────────────────┘
```

---

## 📦 DATENMODELL (MongoDB)

### **Collections:**

#### 1. **content_de_ch** (Lokalisierte Inhalte)
```json
{
  "_id": "home",
  "locale": "de-CH",
  "type": "page",
  "hero": {
    "title": "Zum VBV – planbar. praxisnah. produktiv.",
    "subtitle": "...",
    "image": "s3://...hero.jpg",
    "primaryCta": { "label": "...", "url": "..." }
  },
  "sections": [...],
  "seo": {
    "title": "...",
    "description": "...",
    "ogImage": "s3://..."
  },
  "updatedAt": "2025-10-10T14:45:00Z",
  "updatedBy": "fk@comrocket.de"
}
```

#### 2. **modules** (je Sprache)
```json
{
  "_id": "afk-de-ch",
  "locale": "de-CH",
  "slug": "afk",
  "title": "Generelle Fähigkeiten",
  "format": "online",
  "durationDays": 4,
  "bullets": ["...", "..."],
  "order": 1,
  "visible": true
}
```

#### 3. **events** (sprachneutral)
```json
{
  "_id": "jan2026",
  "monthGroup": {
    "label": "Januar 2026",
    "order": 1
  },
  "items": [
    {
      "id": "afk-jan-01",
      "moduleSlug": "afk",
      "type": "online",
      "dates": ["2026-01-07", "2026-01-08", "2026-13", "2026-14"],
      "order": 1
    }
  ]
}
```

#### 4. **faq** (je Sprache)
```json
{
  "_id": "faq-001-de",
  "locale": "de-CH",
  "question": "Für wen ist die VBV-Ausbildung?",
  "answer": "<p>Für Einsteiger...</p>",
  "topic": "allgemein",
  "featured": true,
  "order": 1,
  "visible": true
}
```

#### 5. **team** (je Sprache)
```json
{
  "_id": "team-sascha-de",
  "locale": "de-CH",
  "name": "Sascha Vögeli",
  "role": "Geschäftsführer",
  "bio": "<p>...</p>",
  "image": "s3://...sascha.jpg",
  "buttons": [
    { "label": "LinkedIn", "url": "..." }
  ],
  "order": 1,
  "visible": true
}
```

#### 6. **users** (Admin-Accounts)
```json
{
  "_id": "user-001",
  "email": "fk@comrocket.de",
  "passwordHash": "$argon2id$...",
  "role": "admin",
  "mustResetPassword": true,
  "lastLogin": "2025-10-10T14:00:00Z",
  "createdAt": "2025-10-10T12:00:00Z"
}
```

#### 7. **sessions**
```json
{
  "_id": "sess_abc123",
  "userId": "user-001",
  "email": "fk@comrocket.de",
  "expiresAt": "2025-10-10T15:00:00Z",
  "ipAddress": "192.168.1.1",
  "userAgent": "Mozilla..."
}
```

#### 8. **backups** (Meta-Daten)
```json
{
  "_id": "backup-20251010-1445",
  "timestamp": "2025-10-10T14:45:00Z",
  "s3Key": "backups/backup-20251010-1445.zip",
  "size": 2456789,
  "createdBy": "fk@comrocket.de",
  "collections": ["content_de_ch", "events", "faq", ...]
}
```

---

## 🔐 AWS S3 SETUP

### **Bucket-Struktur:**
```
maklerzentrum-assets/
├── uploads/
│   ├── originals/
│   │   └── 2025/10/uuid-filename.jpg (Original, max 10MB)
│   ├── 320/
│   │   └── 2025/10/uuid-filename.webp (Thumbnail)
│   ├── 960/
│   │   └── 2025/10/uuid-filename.webp (Medium)
│   └── 1920/
│       └── 2025/10/uuid-filename.webp (Large)
└── backups/
    └── backup-20251010-1445.zip
```

### **S3 Permissions:**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:GetObject", "s3:DeleteObject"],
      "Resource": "arn:aws:s3:::maklerzentrum-assets/uploads/*"
    }
  ]
}
```

### **CloudFront CDN:**
```
Origin: maklerzentrum-assets.s3.eu-central-1.amazonaws.com
Distribution: https://d123456.cloudfront.net/
Cache Policy: CacheOptimized
```

---

## 🎨 ADMIN-UI (Vanilla JS Architektur)

### **Verzeichnis-Struktur:**
```
/admin/
├── index.html                  # Entry Point (noindex)
├── css/
│   └── admin.css              # Tailwind + Custom
├── js/
│   ├── app.js                 # Main Controller
│   ├── auth.js                # Login/Session
│   ├── api.js                 # Fetch-Wrapper
│   ├── router.js              # SPA Routing (Hash-based)
│   ├── components/
│   │   ├── navbar.js          # Admin Header
│   │   ├── sidebar.js         # Navigation
│   │   ├── locale-switcher.js # DE/FR/IT
│   │   ├── form-builder.js    # Dynamic Forms
│   │   ├── rich-editor.js     # Tiptap wrapper
│   │   ├── image-uploader.js  # S3 Upload
│   │   ├── drag-list.js       # SortableJS wrapper
│   │   └── preview-modal.js   # Preview Window
│   └── views/
│       ├── login.js           # Login Screen
│       ├── dashboard.js       # Overview
│       ├── site-global.js     # Global Settings
│       ├── site-local.js      # Localized Site
│       ├── navigation.js      # Nav-Editor
│       ├── pages.js           # Page-Editor (Home, Schulung, ...)
│       ├── modules.js         # Module CRUD
│       ├── events.js          # Termine-Editor
│       ├── faq.js             # FAQ CRUD
│       ├── team.js            # Team CRUD
│       ├── media.js           # Media-Library
│       └── backups.js         # Export/Restore
└── libs/
    ├── dompurify.min.js       # XSS-Schutz
    ├── sortable.min.js        # Drag & Drop
    └── flatpickr.min.js       # Datepicker
```

### **Routing (Hash-based):**
```javascript
// Keine SPA-Framework, einfaches Hash-Routing:
#/dashboard
#/pages/home
#/pages/schulung
#/modules
#/events
#/faq
#/team
#/media
#/backups
```

---

## 🔌 BACKEND API (FastAPI Endpoints)

### **Auth:**
```
POST   /api/admin/login         { email, password } → session cookie
POST   /api/admin/logout        → clear cookie
GET    /api/admin/me            → { user, mustResetPassword }
POST   /api/admin/reset-password { oldPassword, newPassword }
```

### **Content (i18n):**
```
GET    /api/content/{locale}/pages/{page}        → page JSON
PUT    /api/content/{locale}/pages/{page}        → update
GET    /api/content/{locale}/modules             → modules[]
POST   /api/content/{locale}/modules             → create
PUT    /api/content/{locale}/modules/{id}        → update
DELETE /api/content/{locale}/modules/{id}        → delete
PUT    /api/content/{locale}/modules/reorder     → { ids: [] }
```

### **Events (sprachneutral):**
```
GET    /api/events                               → events[]
POST   /api/events                               → create group
PUT    /api/events/{id}                          → update group
DELETE /api/events/{id}                          → delete group
PUT    /api/events/reorder                       → { ids: [] }
```

### **Media (S3):**
```
POST   /api/media/upload           → multipart, returns { original, derivates }
GET    /api/media                  → list all media
DELETE /api/media/{key}            → delete from S3
```

### **Backups:**
```
GET    /api/backups                → list backups
POST   /api/backups                → create new backup (ZIP → S3)
POST   /api/backups/{id}/restore   → restore from backup
GET    /api/backups/{id}/download  → download ZIP
```

---

## 🔒 SICHERHEIT

### **Password-Hashing:**
```python
from passlib.context import CryptContext
pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")
```

### **Session-Management:**
```python
from fastapi import Cookie, Depends
# HttpOnly, Secure, SameSite=Lax, 30min Timeout
```

### **Input-Sanitization:**
```javascript
// Admin-Side (vor Save)
import DOMPurify from 'dompurify';
const clean = DOMPurify.sanitize(userInput);
```

### **S3 Upload-Validation:**
```python
# Max 10MB, nur JPEG/PNG/WebP, SVG sanitizen
# Pillow für Derivate (320/960/1920)
```

---

## 📐 i18n-SYSTEM

### **Locale-Handling:**
```javascript
// Admin: Locale-Switcher im Header
currentLocale = 'de-CH'; // Default
supportedLocales = ['de-CH', 'fr-CH', 'it-CH'];

// API-Calls mit Locale:
fetch(`/api/content/${currentLocale}/pages/home`);
```

### **Fallback-Logik:**
```
FR/IT Key fehlt? → Aus DE-CH kopieren (Button)
DE-CH Key fehlt? → Error (ist Required)
```

---

## 🎯 IMPLEMENTIERUNGS-PHASEN

### **Phase 1: Foundation (Woche 1)**
- [x] Rollback-Punkt gesetzt
- [ ] AWS S3 Bucket + IAM-User erstellen
- [ ] MongoDB Schema definieren
- [ ] Admin-Login (Vanilla JS)
- [ ] Session-Management
- [ ] 3 User-Accounts seeden (Com_2024!)

### **Phase 2: Content-Management (Woche 2)**
- [ ] Site Global Editor
- [ ] Site Localized Editor
- [ ] Page-Editor (Home, Schulung, Services, About, Kontakt)
- [ ] Rich-Text-Editor (Tiptap wrapper)
- [ ] Image-Upload zu S3
- [ ] Locale-Switcher

### **Phase 3: Listen & Sortierung (Woche 2-3)**
- [ ] Module CRUD + Drag&Drop
- [ ] FAQ CRUD + Drag&Drop
- [ ] Team CRUD + Drag&Drop
- [ ] Events-Editor (Monatsgruppen + Items)

### **Phase 4: Medien & Backups (Woche 3)**
- [ ] Media-Library (S3-Browser)
- [ ] Auto-Backup bei Save
- [ ] Export/Restore (ZIP → S3)
- [ ] Preview-Funktion

### **Phase 5: Frontend-Integration (Woche 3-4)**
- [ ] Frontend lädt Content aus MongoDB
- [ ] Data-Bindings (data-key, data-img, data-repeat)
- [ ] i18n Routing (/fr/, /it/)
- [ ] hreflang Links
- [ ] SEO Schema dynamisch

### **Phase 6: Polish & Testing (Woche 4)**
- [ ] Security-Review
- [ ] Performance-Tests
- [ ] Cross-Browser Tests
- [ ] Mobile-Tests
- [ ] Dokumentation

---

## 📊 ERFOLGSKRITERIEN

- [ ] 3 Admins können sich einloggen
- [ ] Jeder Text in DE/FR/IT editierbar
- [ ] Bilder hochladen (S3) + Derivate
- [ ] Drag & Drop für Team/Module/FAQ/Events
- [ ] Backup/Restore funktioniert
- [ ] Frontend lädt Content aus DB
- [ ] i18n-Routing (/, /fr/, /it/)
- [ ] Preview funktioniert
- [ ] Security-Headers aktiv
- [ ] Performance < 2s Page Load

---

**🚀 READY TO BUILD!**  
**Geschätzter Aufwand:** 3-4 Wochen  
**Start:** JETZT

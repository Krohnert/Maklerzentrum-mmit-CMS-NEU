# 🔒 Sicherheitsanalyse - Maklerzentrum Schweiz AG
**Stand:** 10. Oktober 2025

## 📊 Gesamtbewertung: 6.5/10 (Mittel bis Gut)

### ✅ Bereits Implementiert (Gut)

#### 1. **Backend-Sicherheit**
- ✅ Rate-Limiting (5 req/min) für Formular-Endpoints
- ✅ EmailStr-Validierung (verhindert ungültige E-Mails)
- ✅ Honeypot-Protection gegen Bots
- ✅ CORS-Middleware konfiguriert
- ✅ Request-Validierung via Pydantic (verhindert Type-Confusion)
- ✅ Environment Variables für sensible Daten (.env)

#### 2. **Frontend-Sicherheit**
- ✅ Security Headers (teilweise):
  - CSP (Content Security Policy)
  - HSTS (Strict-Transport-Security)
  - X-Frame-Options: DENY
  - X-Content-Type-Options: nosniff
- ✅ Honeypot-Felder in Formularen

#### 3. **Datenschutz (Basic)**
- ✅ Consent-Banner implementiert (consent.js)
- ✅ Datenschutz-Seite vorhanden
- ✅ Impressum vorhanden

---

## ⚠️ KRITISCHE Sicherheitslücken (Hohe Priorität)

### 1. 🔴 **CORS zu permissiv** (KRITISCH)
```python
# AKTUELL (UNSICHER):
CORS_ORIGINS="*"  # Erlaubt ALLE Domains!
```
**Risiko:** Cross-Site Request Forgery (CSRF), Datenlecks
**Lösung:**
```python
# .env
CORS_ORIGINS="https://maklerzentrum.ch,https://www.maklerzentrum.ch"
```

### 2. 🔴 **Keine Input-Sanitization** (KRITISCH)
**Problem:** User-Input wird nicht bereinigt vor Speicherung
**Risiko:** 
- XSS (Cross-Site Scripting) via gespeicherte Daten
- NoSQL Injection
- HTML Injection in E-Mails

**Beispiel Angriff:**
```javascript
// Angreifer füllt Formular aus:
message: "<script>alert('XSS')</script>"
// Wird ungesäubert in DB gespeichert und in E-Mails verschickt
```

### 3. 🔴 **Keine Datenbank-Verschlüsselung** (KRITISCH)
**Problem:** Sensible Daten (E-Mail, Telefon, Namen) werden im Klartext gespeichert
**Risiko:** Bei DB-Leak sind alle Kundendaten lesbar

### 4. 🔴 **Logging enthält PII** (DSGVO-Verstoß!)
```python
logger.info(f"Booking form submitted: {form_data.email}, Module: {form_data.module}")
```
**Problem:** Personenbezogene Daten (PII) in Logs = DSGVO-Verstoß
**Risiko:** Bußgeld bis 20 Mio. EUR oder 4% Jahresumsatz

### 5. 🟡 **Keine Request-ID für Tracing**
**Problem:** Bei Angriffen keine Nachverfolgbarkeit
**Lösung:** Unique Request-IDs für jeden Request

### 6. 🟡 **Kein HTTPS-Erzwingung im Code**
**Problem:** HTTP-Requests werden nicht automatisch zu HTTPS umgeleitet

---

## 🟠 MITTLERE Sicherheitsrisiken

### 7. **Keine Passwort-Hashing** (falls geplant)
- Aktuell keine User-Accounts → OK
- Falls später geplant: bcrypt/argon2 verwenden

### 8. **Keine API-Authentifizierung**
- Formular-Endpoints sind öffentlich (gewollt)
- Aber: Kein Admin-Bereich geschützt

### 9. **Error Messages zu detailliert**
```python
return {"success": False, "error": str(e)}
```
**Risiko:** Stack-Traces könnten interne Struktur verraten

### 10. **Keine MongoDB Connection-Limits**
**Problem:** Bei vielen Requests können DB-Connections ausgehen

### 11. **Keine Backup-Strategie erkennbar**
**Risiko:** Bei DB-Crash sind alle Buchungen verloren

---

## 🟢 NIEDRIGE Risiken (Best Practices)

### 12. **Session-Management fehlt**
- Aktuell nicht benötigt (stateless)
- Falls später Login: Secure Sessions nötig

### 13. **Keine 2FA**
- Nicht relevant für öffentliche Formulare

### 14. **Keine Web Application Firewall (WAF)**
- Empfohlen für Production (z.B. Cloudflare)

---

## 🇨🇭 DSGVO / Schweizer DSG Compliance

### ✅ Erfüllt:
- Datenschutzerklärung vorhanden
- Consent-Banner implementiert
- Impressum vorhanden
- Datenminimierung (nur notwendige Felder)

### ❌ NICHT erfüllt:
1. **PII in Logs** (KRITISCH!)
2. **Keine Datenlösch-Funktion** (Recht auf Vergessenwerden)
3. **Keine Daten-Export-Funktion** (Recht auf Datenportabilität)
4. **Keine Verschlüsselung at-rest**
5. **Kein Verarbeitungsverzeichnis erkennbar**
6. **Keine Auftragsverarbeitungsverträge (falls Cloud-Dienste)**

---

## 🛠️ Konkrete Lösungen (Priorität)

### 🔥 SOFORT (Kritisch):

#### 1. CORS einschränken
```bash
# /app/backend/.env
CORS_ORIGINS="https://maklerzentrum.ch,https://www.maklerzentrum.ch"
```

#### 2. Input-Sanitization hinzufügen
```python
import bleach
from html import escape

def sanitize_text(text: str, allow_html: bool = False) -> str:
    """Sanitize user input"""
    if not allow_html:
        return escape(text)
    # For rich text, use bleach
    return bleach.clean(text, tags=['b', 'i', 'u', 'p', 'br'], strip=True)
```

#### 3. PII-freies Logging
```python
import hashlib

def anonymize_email(email: str) -> str:
    """Hash email for logging"""
    return hashlib.sha256(email.encode()).hexdigest()[:8]

# Statt:
logger.info(f"Booking: {form_data.email}")
# Nutze:
logger.info(f"Booking: user_{anonymize_email(form_data.email)}")
```

#### 4. Datenbank-Verschlüsselung (Field-Level)
```python
from cryptography.fernet import Fernet

# In .env:
ENCRYPTION_KEY="<generierter-key>"

def encrypt_field(data: str) -> str:
    f = Fernet(os.environ['ENCRYPTION_KEY'])
    return f.encrypt(data.encode()).decode()

def decrypt_field(encrypted: str) -> str:
    f = Fernet(os.environ['ENCRYPTION_KEY'])
    return f.decrypt(encrypted.encode()).decode()
```

### 📅 KURZFRISTIG (Diese Woche):

#### 5. Error-Handler verbessern
```python
from fastapi import HTTPException

@app.exception_handler(Exception)
async def generic_exception_handler(request, exc):
    # Log intern
    logger.error(f"Error: {exc}", exc_info=True)
    # User sieht nur:
    return JSONResponse(
        status_code=500,
        content={"success": False, "error": "Ein Fehler ist aufgetreten"}
    )
```

#### 6. Request-ID Middleware
```python
import uuid

@app.middleware("http")
async def add_request_id(request: Request, call_next):
    request_id = str(uuid.uuid4())
    request.state.request_id = request_id
    response = await call_next(request)
    response.headers["X-Request-ID"] = request_id
    return response
```

#### 7. MongoDB Connection Pooling
```python
client = AsyncIOMotorClient(
    mongo_url,
    maxPoolSize=50,
    minPoolSize=10,
    maxIdleTimeMS=30000
)
```

### 📆 MITTELFRISTIG (Nächste 2 Wochen):

#### 8. DSGVO-Features implementieren
```python
# Daten-Export
@api_router.get("/data-export")
async def export_user_data(email: EmailStr):
    bookings = await db.bookings.find({"email": email}).to_list(100)
    return {"data": bookings, "format": "json"}

# Daten-Löschung
@api_router.delete("/data-deletion")
async def delete_user_data(email: EmailStr, confirm: bool):
    if confirm:
        await db.bookings.delete_many({"email": email})
        await db.contacts.delete_many({"email": email})
        return {"success": True, "message": "Daten gelöscht"}
```

#### 9. Automatische Backups
```bash
# MongoDB Backup Script (cron job)
#!/bin/bash
mongodump --uri="$MONGO_URL" --out="/backups/$(date +%Y%m%d)"
# Alte Backups nach 30 Tagen löschen
find /backups/* -mtime +30 -delete
```

#### 10. Security Headers erweitern
```python
@app.middleware("http")
async def add_security_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["Permissions-Policy"] = "geolocation=(), camera=(), microphone=()"
    return response
```

---

## 🎯 Empfohlene Prioritäten

| Maßnahme | Priorität | Aufwand | Impact |
|----------|-----------|---------|--------|
| CORS einschränken | 🔥 SOFORT | 5 Min | Hoch |
| PII-freies Logging | 🔥 SOFORT | 30 Min | DSGVO-kritisch |
| Input-Sanitization | 🔥 SOFORT | 1-2h | Hoch |
| Error-Handler | 📅 Diese Woche | 30 Min | Mittel |
| Request-ID | 📅 Diese Woche | 20 Min | Mittel |
| Verschlüsselung | 📅 Diese Woche | 2-3h | Hoch |
| DSGVO-Features | 📆 2 Wochen | 4-6h | DSGVO-kritisch |
| Backups | 📆 2 Wochen | 2h | Kritisch |

---

## 🌟 Zusätzliche Empfehlungen

### Monitoring & Alerting:
1. **Sentry** für Error-Tracking
2. **Prometheus + Grafana** für Metrics
3. **Uptime-Monitoring** (UptimeRobot, Pingdom)

### Infrastructure:
1. **Cloudflare WAF** (DDoS-Schutz, Bot-Protection)
2. **Database Replicas** für Ausfallsicherheit
3. **Kubernetes Health Checks** konfigurieren

### Penetration Testing:
1. **OWASP ZAP** für automatisierte Scans
2. **Burp Suite** für manuelle Tests
3. **Externe Security-Audit** (alle 6 Monate)

---

## 📋 Checkliste für Production

- [ ] CORS auf spezifische Domain einschränken
- [ ] PII-freies Logging implementiert
- [ ] Input-Sanitization aktiv
- [ ] Datenbank-Verschlüsselung (Field-Level)
- [ ] HTTPS erzwungen (Redirect 301)
- [ ] Security Headers komplett
- [ ] Error-Handler nicht zu detailliert
- [ ] Request-IDs für Tracing
- [ ] DSGVO Daten-Export/Löschung
- [ ] Automatische Backups (täglich)
- [ ] Monitoring aktiv
- [ ] Incident-Response-Plan dokumentiert
- [ ] Penetration-Test durchgeführt
- [ ] SSL/TLS Zertifikat gültig (A+ Rating)

---

## 💡 Zusammenfassung

**Aktuelle Stärken:**
- Rate-Limiting funktioniert
- Grundlegende Validierung vorhanden
- Security Headers (teilweise)

**Kritische Schwächen:**
1. CORS zu offen
2. Keine Input-Sanitization
3. PII in Logs (DSGVO-Verstoß!)
4. Keine Verschlüsselung

**Empfehlung:**
Die 4 kritischen Punkte **SOFORT** beheben (ca. 3-4h Aufwand).
Dann mittelfristige Maßnahmen umsetzen (DSGVO-Features, Backups).

**Geschätzter Gesamt-Aufwand:** 15-20 Stunden für vollständige Absicherung

---

**Bei Fragen oder Hilfe bei der Implementierung, bitte melden! 🚀**

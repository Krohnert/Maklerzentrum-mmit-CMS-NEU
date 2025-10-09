# SEO-Implementierung - Maklerzentrum Schweiz AG

## ✅ Abgeschlossen

### 1. Meta-Tags (Title, Description, Canonical)
- **Home** `/` - VBV Ausbildung – monatlicher Start
- **Schulung** `/schulung/` - VBV Schulung Schweiz – Start jeden Monat
- **Services** `/services/` - MZ-Infrastruktur für Vermittler
- **About** `/about/` - Über uns – Ausbildungspartnerin
- **Kontakt** `/kontakt/` - Kontakt – VBV Platz sichern
- **Danke** `/danke/` - noindex,follow ✅
- **Danke Firmenklasse** `/danke-firmenklasse/` - noindex,follow ✅

### 2. Open Graph & Twitter Cards
Alle Hauptseiten haben:
- og:title
- og:description  
- og:url
- og:type = website
- og:site_name = Maklerzentrum Schweiz AG
- twitter:card = summary_large_image

### 3. JSON-LD Strukturierte Daten
**Home:**
- Organization Schema (Adresse, Kontakt, Logo)
- Course Schema (VBV Ausbildung, Standorte, Preise)
- FAQPage Schema (4 häufige Fragen)

**Schulung:**
- BreadcrumbList (Home → Schulung)

### 4. robots.txt
Erstellt in `/public/robots.txt`:
```
User-agent: *
Disallow: /danke/
Disallow: /danke-firmenklasse/
Sitemap: https://maklerzentrum.ch/sitemap.xml
```

### 5. sitemap.xml
Erstellt in `/public/sitemap.xml`:
- Home (Priority 1.0)
- Schulung (Priority 0.9)
- Services (Priority 0.8)
- About (Priority 0.7)
- Kontakt (Priority 0.8)

### 6. react-helmet
Installiert und auf allen Seiten implementiert für dynamische Meta-Tags

### 7. Alt-Texte für Bilder
Alle Hero-Images haben beschreibende Alt-Texte:
- "VBV Ausbildung – Online und Präsenz in Basel, Bern, Zürich, Lausanne, Lugano"
- "Team Maklerzentrum – VBV Ausbildung Schweiz"
- Etc.

### 8. Favicon
- SVG Favicon: `/public/favicon.svg` ✅
- Fallback ICO vorhanden

### 9. noindex für Danke-Seiten
- `/danke/` - noindex,follow ✅
- `/danke-firmenklasse/` - noindex,follow ✅

## 📊 SEO-Keywords

### Primäre Keywords (CH-DE):
- vbv ausbildung
- versicherungsvermittler vbv
- vbv kurs schweiz
- vbv termine 2026
- vbv kosten

### Lokale Keywords:
- vbv basel
- vbv bern
- vbv zürich
- vbv lausanne
- vbv lugano

### Sekundäre Keywords:
- blended learning vbv
- cicero credits
- versicherungsweiterbildung schweiz

## 🔗 Interne Link-Strategie

### Implementiert:
- Header/CTAs → `/#booking` (Anchor)
- Navigation → Alle Hauptseiten
- Footer → Alle Hauptseiten + rechtliche Seiten
- Termin-Matrix → `/#booking?cohort=...&module=...&loc=...`

### Content-Links:
- Fließtext-Links auf /schulung/ und /kontakt/ in allen Seiten
- Module-Karten → /schulung/
- Preise → /kontakt/

## 📈 Nächste Schritte (Optional)

### Google Tools:
1. Google Search Console einrichten
   - Property verifizieren
   - Sitemap einreichen: https://maklerzentrum.ch/sitemap.xml
   - Standort: Schweiz setzen

2. Google Analytics 4
   - Events tracken:
     * form_submit booking
     * click_cta_booking
     * table_booking_click

3. Google Business Profile
   - Basel-Adresse eintragen
   - Kategorien: Ausbildung/Weiterbildung, Versicherungsdienstleistungen

### Content-Optimierung:
1. Blog/News-Section für fresh content
2. Kundenstimmen erweitern
3. FAQ erweitern (Long-tail Keywords)

### Technische Optimierung:
1. Core Web Vitals optimieren
   - Lazy Loading (bereits implementiert)
   - Image Optimization
   - Cache aktivieren

2. Structured Data Testing Tool prüfen
3. Mobile-First Index optimieren (bereits responsive)

## ✅ Checkliste

- [x] Title-Tags (alle Seiten unique)
- [x] Meta Descriptions (alle Seiten unique)
- [x] Canonical Tags (self-canonical)
- [x] Open Graph Tags
- [x] Twitter Cards
- [x] JSON-LD Schemas
- [x] robots.txt
- [x] sitemap.xml
- [x] Alt-Texte Bilder
- [x] noindex Danke-Seiten
- [x] Favicon SVG
- [x] react-helmet Installation
- [x] H1-Tags (eine pro Seite)
- [x] Interne Verlinkung
- [x] Mobile Responsive
- [x] Fast Loading (Hot Reload)

## 🎯 Performance

Alle Seiten:
- Mobile-First Design ✅
- Lazy Loading Images ✅
- Optimized CSS ✅
- Fast Navigation ✅
- Smooth Scrolling ✅

## 📝 Hinweise

1. **Domain**: Alle URLs verwenden `https://maklerzentrum.ch/` (Platzhalter - muss bei Live-Gang angepasst werden)

2. **URL-Parameter**: Die Termin-Matrix nutzt URL-Parameter zum Prefill des Formulars. Alle haben canonical auf die Hauptseite ohne Parameter → kein Duplicate Content Issue.

3. **Keyword-Dichte**: Natürlich geschrieben, Keywords im Title, H1, ersten Absatz und H2/H3.

4. **NAP-Konsistenz**: Name-Adresse-Phone identisch im Footer auf allen Seiten.

5. **Service Areas**: Basel, Bern, Zürich, Lausanne, Lugano werden durchgehend erwähnt.

// Mock data for Maklerzentrum Schweiz AG

export const scheduleData = [
  // Januar 2026
  { id: 1, cohort: 'Jan-2026', startDate: '06.01.2026', endDate: '08.01.2026', module: 'Generelle Fähigkeiten', format: 'Online', location: 'Microsoft Teams' },
  { id: 2, cohort: 'Jan-2026', startDate: '13.01.2026', endDate: '15.01.2026', module: 'Krankenzusatzversicherung', format: 'Online', location: 'Microsoft Teams' },
  { id: 3, cohort: 'Jan-2026', startDate: '20.01.2026', endDate: '22.01.2026', module: 'Nichtleben (Sach/Haft)', format: 'Präsenz', location: 'Zürich' },
  { id: 4, cohort: 'Jan-2026', startDate: '27.01.2026', endDate: '29.01.2026', module: 'Leben (Vorsorge/Risiko)', format: 'Präsenz', location: 'Basel' },
  
  // Februar 2026
  { id: 5, cohort: 'Feb-2026', startDate: '03.02.2026', endDate: '05.02.2026', module: 'Generelle Fähigkeiten', format: 'Online', location: 'Microsoft Teams' },
  { id: 6, cohort: 'Feb-2026', startDate: '10.02.2026', endDate: '12.02.2026', module: 'Krankenzusatzversicherung', format: 'Online', location: 'Microsoft Teams' },
  { id: 7, cohort: 'Feb-2026', startDate: '17.02.2026', endDate: '19.02.2026', module: 'Nichtleben (Sach/Haft)', format: 'Präsenz', location: 'Bern' },
  { id: 8, cohort: 'Feb-2026', startDate: '24.02.2026', endDate: '26.02.2026', module: 'Leben (Vorsorge/Risiko)', format: 'Präsenz', location: 'Lausanne' },
  
  // März 2026
  { id: 9, cohort: 'Mär-2026', startDate: '03.03.2026', endDate: '05.03.2026', module: 'Generelle Fähigkeiten', format: 'Online', location: 'Microsoft Teams' },
  { id: 10, cohort: 'Mär-2026', startDate: '10.03.2026', endDate: '12.03.2026', module: 'Krankenzusatzversicherung', format: 'Online', location: 'Microsoft Teams' },
  { id: 11, cohort: 'Mär-2026', startDate: '17.03.2026', endDate: '19.03.2026', module: 'Nichtleben (Sach/Haft)', format: 'Präsenz', location: 'Lugano' },
  { id: 12, cohort: 'Mär-2026', startDate: '24.03.2026', endDate: '26.03.2026', module: 'Leben (Vorsorge/Risiko)', format: 'Präsenz', location: 'Zürich' },
  
  // April 2026
  { id: 13, cohort: 'Apr-2026', startDate: '07.04.2026', endDate: '09.04.2026', module: 'Generelle Fähigkeiten', format: 'Online', location: 'Microsoft Teams' },
  { id: 14, cohort: 'Apr-2026', startDate: '14.04.2026', endDate: '16.04.2026', module: 'Krankenzusatzversicherung', format: 'Online', location: 'Microsoft Teams' },
  { id: 15, cohort: 'Apr-2026', startDate: '21.04.2026', endDate: '23.04.2026', module: 'Nichtleben (Sach/Haft)', format: 'Präsenz', location: 'Basel' },
  { id: 16, cohort: 'Apr-2026', startDate: '28.04.2026', endDate: '30.04.2026', module: 'Leben (Vorsorge/Risiko)', format: 'Präsenz', location: 'Bern' },
  
  // Mai 2026
  { id: 17, cohort: 'Mai-2026', startDate: '05.05.2026', endDate: '07.05.2026', module: 'Generelle Fähigkeiten', format: 'Online', location: 'Microsoft Teams' },
  { id: 18, cohort: 'Mai-2026', startDate: '12.05.2026', endDate: '14.05.2026', module: 'Krankenzusatzversicherung', format: 'Online', location: 'Microsoft Teams' },
  { id: 19, cohort: 'Mai-2026', startDate: '19.05.2026', endDate: '21.05.2026', module: 'Nichtleben (Sach/Haft)', format: 'Präsenz', location: 'Lausanne' },
  { id: 20, cohort: 'Mai-2026', startDate: '26.05.2026', endDate: '28.05.2026', module: 'Leben (Vorsorge/Risiko)', format: 'Präsenz', location: 'Zürich' },
  
  // Juni 2026
  { id: 21, cohort: 'Jun-2026', startDate: '02.06.2026', endDate: '04.06.2026', module: 'Generelle Fähigkeiten', format: 'Online', location: 'Microsoft Teams' },
  { id: 22, cohort: 'Jun-2026', startDate: '09.06.2026', endDate: '11.06.2026', module: 'Krankenzusatzversicherung', format: 'Online', location: 'Microsoft Teams' },
  { id: 23, cohort: 'Jun-2026', startDate: '16.06.2026', endDate: '18.06.2026', module: 'Nichtleben (Sach/Haft)', format: 'Präsenz', location: 'Lugano' },
  { id: 24, cohort: 'Jun-2026', startDate: '23.06.2026', endDate: '25.06.2026', module: 'Leben (Vorsorge/Risiko)', format: 'Präsenz', location: 'Basel' },
];

export const modules = [
  {
    title: 'Generelle Fähigkeiten',
    format: 'Online',
    description: 'Grundlagen, Recht, Beratung – das Fundament für deine VBV-Tätigkeit. Online auf Microsoft Teams.',
    icon: 'BookOpen'
  },
  {
    title: 'Krankenzusatzversicherung',
    format: 'Online',
    description: 'Produkte, Leistungen, Fälle – alles zur Krankenversicherung. Online auf Microsoft Teams.',
    icon: 'Heart'
  },
  {
    title: 'Nichtleben (Sach/Haft)',
    format: 'Präsenz',
    description: 'Hausrat, Haftpflicht, KMU, Schadenfälle – praxisnah vor Ort in Basel, Bern, Zürich, Lausanne, Lugano.',
    icon: 'Home'
  },
  {
    title: 'Leben (Vorsorge/Risiko)',
    format: 'Präsenz',
    description: 'Säule 3a/3b, Risiko, Rente, Kundengespräch – der wichtigste Teil. Praxisnah vor Ort in Basel, Bern, Zürich, Lausanne, Lugano.',
    icon: 'Users'
  }
];

export const testimonials = [
  {
    quote: 'VBV in der Probezeit geschafft – dank Monatsstart und klarer Struktur.',
    author: 'Leitung Vertrieb',
    location: 'Bern'
  },
  {
    quote: 'Preis/Leistung top. Die Podcasts sparen Zeit.',
    author: 'HR-Leiterin',
    location: 'Zürich'
  }
];

export const faqData = [
  {
    category: 'Allgemein',
    questions: [
      {
        question: 'Was ist die VBV-Ausbildung?',
        answer: 'Die anerkannte Vorbereitung auf die Zertifizierung als Versicherungsvermittler:in VBV – mit Praxisfokus.'
      },
      {
        question: 'Brauche ich das wirklich?',
        answer: 'Ja. Seit 2024 gilt das revidierte VAG; Vermittler:innen müssen Qualifikation und Standards nachweisen (FINMA-Kontext).'
      },
      {
        question: 'Für wen ist das geeignet?',
        answer: 'Einsteiger, Quereinsteiger, Mitarbeitende im Vertrieb/Innendienst, Broker – und Teams in der Probezeit.'
      },
      {
        question: 'Gibt es Voraussetzungen?',
        answer: 'Nein. Grundkenntnisse sind hilfreich, aber nicht Pflicht.'
      },
      {
        question: 'In welcher Sprache?',
        answer: 'Deutsch. Französische/italienische Durchgänge sind in Planung bzw. folgen standortbezogen.'
      }
    ]
  },
  {
    category: 'Aufbau & Ablauf',
    questions: [
      {
        question: 'Wie lange dauert die Ausbildung?',
        answer: 'Rund 3 Monate – mit Start jeden Monat.'
      },
      {
        question: 'Wie ist der Ablauf?',
        answer: 'Online-Module zuerst, danach die Präsenz-Module. Alles ist im Terminplan ersichtlich.'
      },
      {
        question: 'Welche Module gibt es?',
        answer: '1) Generelle Fähigkeiten (online) · 2) Krankenzusatzversicherung (online) · 3) Nichtleben (vor Ort) · 4) Leben (vor Ort).'
      },
      {
        question: 'Wo finden Präsenz-Teile statt?',
        answer: 'In Basel, Bern, Zürich, Lausanne, Lugano – standortnah je nach Teilnehmenden.'
      },
      {
        question: 'Wann starten die Seminare?',
        answer: 'Start jeweils in der 2. Kalenderwoche des Monats (DE-Durchgänge).'
      },
      {
        question: 'Kann ich nur einzelne Module buchen?',
        answer: 'Ja, gesamt oder modular – je nach Bedarf.'
      },
      {
        question: 'Gibt es Aufzeichnungen?',
        answer: 'Online-Teile werden begleitet; Unterlagen/Podcasts stehen über die Lernplattform bereit.'
      },
      {
        question: 'Wie gross sind die Klassen?',
        answer: 'Kompakte Gruppen (ca. 15–20 Teilnehmende) für Austausch und Praxis.'
      }
    ]
  },
  {
    category: 'Reservierung & Anmeldung',
    questions: [
      {
        question: 'Wie reserviere ich einen Platz?',
        answer: 'Auf der Seite "Platz sichern": Starttermin/Modul wählen, Daten senden – fertig.'
      },
      {
        question: 'Ist die Reservation verbindlich?',
        answer: 'Unverbindlich. Du erhältst danach Testzugang und den Bezahlen-Link.'
      },
      {
        question: 'Ab wann ist mein Platz fix?',
        answer: 'Nach Zahlungseingang bzw. schriftlicher Bestätigung.'
      },
      {
        question: 'Worin unterscheidet sich „Anmelden" im Header?',
        answer: '„Anmelden" ist nur für bereits zahlende Teilnehmende (Login zur Lernumgebung). Für neue Interessierte: „Platz sichern".'
      },
      {
        question: 'Kann ich umbuchen oder stornieren?',
        answer: 'Ja – gemäss AGB. Melde dich frühzeitig, wir finden eine Lösung.'
      }
    ]
  },
  {
    category: 'Inhalte & Prüfung',
    questions: [
      {
        question: 'Deckt die Ausbildung die VBV-Prüfung ab?',
        answer: 'Ja. Inhalte orientieren sich an den offiziellen VBV-Anforderungen.'
      },
      {
        question: 'Nehmt ihr die Prüfung ab?',
        answer: 'Wir bereiten vor. Die Prüfung wird gemäss VBV-Vorgaben abgenommen; Infos/Anmeldung erhältst du im Kurs.'
      },
      {
        question: 'Gibt es Lernmaterial?',
        answer: 'Ja: Skripte, Präsentationen, Checklisten, Podcasts – via Lernplattform.'
      },
      {
        question: 'Bekomme ich CICERO-Credits?',
        answer: 'Ja, Weiterbildungen zum Erwerb von CICERO-Credits sind vorgesehen (je nach Modul/Format).'
      }
    ]
  },
  {
    category: 'Technik & Teilnahme',
    questions: [
      {
        question: 'Welche Technik brauche ich online?',
        answer: 'PC/Laptop, stabile Internetverbindung, Microsoft Teams, Headset. Kamera empfohlen.'
      },
      {
        question: 'Wie erhalte ich Zugänge/Links?',
        answer: 'Per E-Mail nach Reservation. Inklusive .ics-Kalendereinladungen.'
      },
      {
        question: 'Was, wenn ich einen Termin verpasse?',
        answer: 'Melde dich kurz – wir prüfen Ersatztermine oder Inhalte zum Nacharbeiten.'
      }
    ]
  },
  {
    category: 'Preise & Zahlung',
    questions: [
      {
        question: 'Was kostet es?',
        answer: 'CHF 150.– pro Schulungstag und Person. Exklusivschulungen: CHF 2\'200.– pro Tag (pauschal).'
      },
      {
        question: 'Sind Lehrmittel/Prüfungsgebühren inklusive?',
        answer: 'Offizielle VBV-Lehrmittel/Prüfungsgebühren sind separat.'
      },
      {
        question: 'Wie kann ich bezahlen?',
        answer: 'Per Bezahlen-Link (z. B. Karte) oder Rechnung – Details in der Bestätigungsmail.'
      },
      {
        question: 'Gibt es Rabatte für Gruppen?',
        answer: 'Bei Firmenklassen ergeben sich Skalenvorteile; sprich uns an.'
      }
    ]
  },
  {
    category: 'Firmen & HR',
    questions: [
      {
        question: 'Bietet ihr Exklusivschulungen für Unternehmen?',
        answer: 'Ja, Firmenklasse (pauschal CHF 2\'200/Tag), standortnah oder in-house.'
      },
      {
        question: 'Ab wie vielen Personen lohnt sich das?',
        answer: 'Erfahrungsgemäss ab 10+ Personen – wir rechnen das gerne vor.'
      },
      {
        question: 'Unterstützt ihr bei Planung/Reporting?',
        answer: 'Ja: Terminplanung, Teilnehmerlisten, Teilnahmebestätigungen – auf Wunsch mit HR-Reporting.'
      }
    ]
  },
  {
    category: 'Qualität & Support',
    questions: [
      {
        question: 'Wer unterrichtet?',
        answer: 'Dozierende aus der Praxis – mit viel Felderfahrung.'
      },
      {
        question: 'Gibt es Support bei Fragen?',
        answer: 'Ja. Kundendienst (DE/FR/IT, insgesamt bis zu 8 Sprachen) per Mail/Telefon.'
      },
      {
        question: 'Wie stellt ihr Qualität sicher?',
        answer: 'Standardisierte Inhalte, Feedback-Schleifen, QS-Checks – und konsequente Ausrichtung an VBV/Regulatorik.'
      }
    ]
  },
  {
    category: 'Nach der Schulung',
    questions: [
      {
        question: 'Bekomme ich eine Teilnahmebestätigung?',
        answer: 'Ja, für absolvierte Module.'
      },
      {
        question: 'Wie geht es nach dem VBV weiter?',
        answer: 'Weiterbildungen: IAF (dipl. Finanz-/Vorsorgeberater), Versicherungsfachmann/-frau mit eidg. FA, Finanzplaner u. a. – inkl. CICERO-Credits.'
      }
    ]
  },
  {
    category: 'Recht & Datenschutz',
    questions: [
      {
        question: 'Seid ihr unabhängig?',
        answer: 'Ja – unabhängige Marktführerin und Bindeglied zu wichtigen Versicherern.'
      },
      {
        question: 'Wie geht ihr mit Daten um?',
        answer: 'Gemäss Datenschutz/AGB. Wir verwenden deine Daten nur zur Abwicklung und Betreuung.'
      }
    ]
  }
];

export const services = [
  {
    title: 'Administration',
    description: 'Antragskontrolle; Statusupdate der Versicherungsdossiers; Kündigungsversand; Verschiebungen des Versicherungsbeginns; Kundendienst.'
  },
  {
    title: 'Buchhaltung',
    description: 'Erstellung der Lohnabrechnungen; Führung der Buchhaltung; Geschäftsberichte; Jahresrechnung und Revision.'
  },
  {
    title: 'Bestandespflege',
    description: 'Extranet; Führung und Segmentierung des Kundenbestandes; Telefonie-Kampagnen für Cross- und Up-Selling.'
  },
  {
    title: 'CRM',
    description: 'Antragsverarbeitung; Bestandespflege; Extranet; Personalverwaltung; Provisionsabrechnungen.'
  },
  {
    title: 'Helpdesk',
    description: 'Offertstellung; Verkaufssupport; Vermittlerhotline.'
  },
  {
    title: 'Infrastruktur',
    description: 'Büroräume; Mietbeteiligungen; IT-Zugänge.'
  },
  {
    title: 'Qualitätsmanagement',
    description: 'Reklamationsbehandlung; Qualitätsanrufe.'
  },
  {
    title: 'Rechtspflege',
    description: 'Erstellung von Verträgen; Firmengründungen; Unterstützung bei Rechtsfällen.'
  },
  {
    title: 'Kundendienst',
    description: 'Kostenlose Kundenhotline; Kundenbetreuung in 8 Sprachen; Spezialisten mit Beratungserfahrung.'
  },
  {
    title: 'Aus- und Weiterbildung',
    description: 'Zert. Versicherungsvermittler VBV; dipl. Finanzberater IAF; dipl. Vorsorgeberater IAF; Versicherungsfachmann mit eidg. FA; Finanzplaner mit eidg. FA; CICERO-Credits.'
  }
];

export const team = [
  {
    name: 'Olivier Parenteau',
    role: 'Geschäftsleitung',
    description: 'Maklerzentrum Schweiz AG',
    image: 'https://customer-assets.emergentagent.com/job_68ead48d-3657-47bf-8173-f1b42021a181/artifacts/1i8tpotp_Olivier%20%282%29.jpeg'
  },
  {
    name: 'Stefan Olivier',
    role: 'Geschäftsleitung',
    description: 'Maklerzentrum Schweiz AG',
    image: 'https://customer-assets.emergentagent.com/job_68ead48d-3657-47bf-8173-f1b42021a181/artifacts/3upmlpy0_Stefan.jpeg'
  },
  {
    name: 'Sascha Voegeli',
    role: 'Leiter Ausbildung',
    description: 'B.Sc. ZFH in Business Communications, Versicherungsvermittler VBV. Seit 2016 in der Versicherungsbranche tätig.',
    image: 'https://customer-assets.emergentagent.com/job_68ead48d-3657-47bf-8173-f1b42021a181/artifacts/wv03xn5t_Sascha%20%282%29.jpeg'
  }
];

export const locations = [
  'Basel',
  'Bern',
  'Zürich',
  'Lausanne',
  'Lugano'
];

export const cohorts = [
  'Jan-2026',
  'Feb-2026',
  'Mär-2026',
  'Apr-2026',
  'Mai-2026',
  'Jun-2026',
  'Jul-2026',
  'Aug-2026',
  'Sep-2026',
  'Okt-2026',
  'Nov-2026',
  'Dez-2026'
];

export const modulesList = [
  'Generelle Fähigkeiten',
  'Krankenzusatzversicherung',
  'Nichtleben (Sach/Haft)',
  'Leben (Vorsorge/Risiko)'
];
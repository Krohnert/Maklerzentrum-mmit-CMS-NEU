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
    description: 'Säule 3a/3b, Risiko, Rente, Kundengespräch – der wichtigste Teil. Praxisnah vor Ort.',
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
    question: 'Wie lange dauert die Ausbildung?',
    answer: 'Ca. 3 Monate – je nach deinem Tempo und Modul-Auswahl.'
  },
  {
    question: 'Was ist online, was ist vor Ort?',
    answer: 'Generelle Fähigkeiten & Krankenzusatz sind online (Microsoft Teams). Nichtleben & Leben finden vor Ort statt.'
  },
  {
    question: 'Wo finden die Präsenzteile statt?',
    answer: 'In Basel, Bern, Zürich, Lausanne und Lugano – wir planen den nächstgelegenen Standort zu deiner PLZ.'
  },
  {
    question: 'Kann ich Module einzeln buchen?',
    answer: 'Ja, du kannst die Ausbildung modular aufbauen und einzelne Module buchen.'
  },
  {
    question: 'Gibt es auch Firmenklassen?',
    answer: 'Ja, Exklusivklassen für Firmen ab CHF 2\'200/Tag pauschal. Individuell planbar nach eurem Zeitplan.'
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
    name: 'Sascha Vögeli',
    role: 'Leitung Ausbildung',
    description: 'Über 15 Jahre Erfahrung in der Versicherungsbranche'
  },
  {
    name: 'Dr. Marcus Weber',
    role: 'Dozent Leben',
    description: 'Spezialist für Vorsorge und Risikomanagement'
  },
  {
    name: 'Andrea Schneider',
    role: 'Dozentin Nichtleben',
    description: 'Expertin für Sach- und Haftpflichtversicherungen'
  },
  {
    name: 'Thomas Müller',
    role: 'Dozent Krankenzusatz',
    description: 'Langjährige Praxis in der Krankenversicherung'
  },
  {
    name: 'Laura Bianchi',
    role: 'Programmkoordination',
    description: 'Organisiert reibungslose Abläufe und Standorte'
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
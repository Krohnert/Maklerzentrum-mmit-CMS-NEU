import React from 'react';

const AGB = () => {
  return (
    <div className="pb-20 lg:pb-0">
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h1 className="mb-8">Allgemeine Geschäftsbedingungen (AGB)</h1>
            
            <div className="prose prose-lg max-w-none">
              <h2 className="mt-8 mb-4">1. Geltungsbereich</h2>
              <p className="text-gray-600 mb-4">
                Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge zwischen der Maklerzentrum Schweiz AG und den Teilnehmern der VBV-Ausbildung.
              </p>

              <h2 className="mt-8 mb-4">2. Vertragsschluss</h2>
              <p className="text-gray-600 mb-4">
                Der Vertrag kommt durch die Anmeldung des Teilnehmers und die Bestätigung durch Maklerzentrum Schweiz AG zustande. Die Reservation ist unverbindlich bis zur Zahlung.
              </p>

              <h2 className="mt-8 mb-4">3. Leistungsumfang</h2>
              <p className="text-gray-600 mb-4">
                Die Ausbildung umfasst die im Kursprogramm beschriebenen Module. Online-Module finden über Microsoft Teams statt. Präsenzmodule werden an den angegebenen Standorten (Basel, Bern, Zürich, Lausanne, Lugano) durchgeführt.
              </p>
              <p className="text-gray-600 mb-4">
                Im Kurspreis nicht enthalten sind:
              </p>
              <ul className="list-disc ml-6 text-gray-600 mb-4">
                <li>Prüfungsgebühren gemäss VBV</li>
                <li>Lehrmittel gemäss VBV</li>
                <li>Reise- und Übernachtungskosten</li>
              </ul>

              <h2 className="mt-8 mb-4">4. Preise und Zahlung</h2>
              <p className="text-gray-600 mb-4">
                <strong>Offene Klassen:</strong> CHF 150 pro Tag und Person<br />
                <strong>Exklusivklassen (Firmen):</strong> CHF 2'200 pro Tag pauschal
              </p>
              <p className="text-gray-600 mb-4">
                Die Zahlung erfolgt vor Kursbeginn nach Erhalt der Rechnung. Bei Nichtzahlung kann die Teilnahme verweigert werden.
              </p>

              <h2 className="mt-8 mb-4">5. Rücktritt und Stornierung</h2>
              <p className="text-gray-600 mb-4">
                <strong>Rücktritt durch den Teilnehmer:</strong>
              </p>
              <ul className="list-disc ml-6 text-gray-600 mb-4">
                <li>Bis 30 Tage vor Kursbeginn: kostenlos</li>
                <li>29-15 Tage vor Kursbeginn: 50% der Kurskosten</li>
                <li>Weniger als 15 Tage vor Kursbeginn: 100% der Kurskosten</li>
              </ul>
              <p className="text-gray-600 mb-4">
                <strong>Rücktritt durch Maklerzentrum Schweiz AG:</strong><br />
                Wir behalten uns das Recht vor, Kurse bei zu geringer Teilnehmerzahl abzusagen. In diesem Fall werden bereits gezahlte Beträge vollständig zurückerstattet.
              </p>

              <h2 className="mt-8 mb-4">6. Teilnahmebedingungen</h2>
              <p className="text-gray-600 mb-4">
                Die Teilnehmer verpflichten sich, die Kurszeiten einzuhalten und aktiv am Unterricht teilzunehmen. Bei wiederholtem Fernbleiben ohne Entschuldigung kann der Ausschluss vom Kurs erfolgen.
              </p>

              <h2 className="mt-8 mb-4">7. Haftung</h2>
              <p className="text-gray-600 mb-4">
                Maklerzentrum Schweiz AG haftet nicht für das Bestehen der VBV-Prüfung. Die Haftung beschränkt sich auf die ordnungsgemässe Durchführung der Ausbildung.
              </p>

              <h2 className="mt-8 mb-4">8. Geistiges Eigentum</h2>
              <p className="text-gray-600 mb-4">
                Alle Kursmaterialien sind urheberrechtlich geschützt. Eine Weitergabe an Dritte ist nicht gestattet.
              </p>

              <h2 className="mt-8 mb-4">9. Datenschutz</h2>
              <p className="text-gray-600 mb-4">
                Es gilt unsere Datenschutzerklärung.
              </p>

              <h2 className="mt-8 mb-4">10. Schlussbestimmungen</h2>
              <p className="text-gray-600 mb-4">
                Es gilt Schweizer Recht. Gerichtsstand ist Basel.
              </p>

              <div className="mt-12 pt-6 border-t border-gray-200">
                <p className="text-gray-600">
                  Stand: Januar 2026<br />
                  Maklerzentrum Schweiz AG
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AGB;
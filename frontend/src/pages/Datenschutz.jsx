import React from 'react';

const Datenschutz = () => {
  return (
    <div className="pb-20 lg:pb-0">
      {/* Hero Section */}
      <section className="relative h-[350px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&h=500&fit=crop" 
            alt="Datenschutz" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
        </div>
        <div className="relative h-full flex items-center">
          <div className="container-custom">
            <div className="max-w-3xl text-white">
              <h1 className="mb-6 text-white">Datenschutzerklärung</h1>
              <p className="text-xl text-white/90">
                Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h1 className="mb-8">Datenschutzerklärung</h1>
            
            <div className="prose prose-lg max-w-none">
              <h2 className="mt-8 mb-4">1. Datenschutz auf einen Blick</h2>
              <h3 className="mt-6 mb-3">Allgemeine Hinweise</h3>
              <p className="text-gray-600 mb-4">
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
              </p>

              <h3 className="mt-6 mb-3">Datenerfassung auf dieser Website</h3>
              <h4 className="mt-4 mb-2">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h4>
              <p className="text-gray-600 mb-4">
                Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
              </p>

              <h4 className="mt-4 mb-2">Wie erfassen wir Ihre Daten?</h4>
              <p className="text-gray-600 mb-4">
                Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
              </p>
              <p className="text-gray-600 mb-4">
                Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
              </p>

              <h2 className="mt-8 mb-4">2. Hosting</h2>
              <p className="text-gray-600 mb-4">
                Wir hosten die Inhalte unserer Website bei externen Dienstleistern. Die dabei erfassten Daten werden auf deren Servern gespeichert.
              </p>

              <h2 className="mt-8 mb-4">3. Allgemeine Hinweise und Pflichtinformationen</h2>
              <h3 className="mt-6 mb-3">Datenschutz</h3>
              <p className="text-gray-600 mb-4">
                Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
              </p>

              <h3 className="mt-6 mb-3">Hinweis zur verantwortlichen Stelle</h3>
              <p className="text-gray-600 mb-4">
                Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
              </p>
              <p className="text-gray-700 font-medium mb-2">
                Maklerzentrum Schweiz AG<br />
                Elisabethenanlage 11<br />
                4051 Basel<br />
                Schweiz
              </p>
              <p className="text-gray-600 mb-4">
                E-Mail: academy@maklerzentrum.ch<br />
                Telefon: 079 948 69 86
              </p>

              <h2 className="mt-8 mb-4">4. Datenerfassung auf dieser Website</h2>
              <h3 className="mt-6 mb-3">Kontaktformular</h3>
              <p className="text-gray-600 mb-4">
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
              </p>

              <h3 className="mt-6 mb-3">Anfrage per E-Mail oder Telefon</h3>
              <p className="text-gray-600 mb-4">
                Wenn Sie uns per E-Mail oder Telefon kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten zum Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet.
              </p>

              <h2 className="mt-8 mb-4">5. Ihre Rechte</h2>
              <p className="text-gray-600 mb-4">
                Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung oder Löschung dieser Daten.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Datenschutz;
import React from 'react';
import { Helmet } from 'react-helmet-async';

const Datenschutz = () => {
  return (
    <div className="pb-20 lg:pb-0">
      <Helmet>
        <title>Datenschutz | Maklerzentrum Schweiz AG</title>
        <meta name="description" content="Datenschutzerklärung der Maklerzentrum Schweiz AG." />
        <link rel="canonical" href="https://maklerzentrum.ch/datenschutz/" />
      </Helmet>
      {/* Hero Section - 350px desktop, 250px mobile */}
      <section className="relative h-[250px] md:h-[350px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#D81C1C] to-[#a01515]"></div>
        <div className="relative h-full flex items-center">
          <div className="container-custom">
            <h1 className="text-white">Datenschutz</h1>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <h2>Datenschutzerklärung</h2>
            <p className="text-gray-700">
              Die Maklerzentrum Schweiz AG nimmt den Schutz Ihrer persönlichen Daten sehr ernst. 
              Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen 
              Datenschutzvorschriften sowie dieser Datenschutzerklärung.
            </p>
            
            <h3 className="mt-8 mb-4">Erhebung und Verarbeitung personenbezogener Daten</h3>
            <p className="text-gray-700">
              Personenbezogene Daten werden nur erhoben, wenn Sie uns diese im Rahmen einer 
              Anfrage oder Buchung zur Verfügung stellen.
            </p>

            <h3 className="mt-8 mb-4">Verwendungszweck</h3>
            <p className="text-gray-700">
              Ihre Daten verwenden wir ausschließlich zur Bearbeitung Ihrer Anfragen und zur 
              Abwicklung der von Ihnen gebuchten Leistungen.
            </p>

            <h3 className="mt-8 mb-4">Datenweitergabe</h3>
            <p className="text-gray-700">
              Eine Weitergabe Ihrer Daten an Dritte erfolgt nur, wenn dies zur Erfüllung 
              unserer Dienstleistungen notwendig ist.
            </p>

            <h3 className="mt-8 mb-4">Ihre Rechte</h3>
            <p className="text-gray-700">
              Sie haben jederzeit das Recht auf Auskunft, Berichtigung oder Löschung Ihrer 
              gespeicherten Daten. Kontaktieren Sie uns unter academy@maklerzentrum.ch.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Datenschutz;
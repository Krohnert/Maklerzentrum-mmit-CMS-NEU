import React from 'react';
import { Helmet } from 'react-helmet-async';

const Impressum = () => {
  return (
    <div className="pb-20 lg:pb-0">
      <Helmet>
        <title>Impressum | Maklerzentrum Schweiz AG</title>
        <meta name="description" content="Impressum der Maklerzentrum Schweiz AG." />
        <link rel="canonical" href="https://maklerzentrum.ch/impressum/" />
      </Helmet>
      {/* Hero Section - 350px desktop, 250px mobile */}
      <section className="relative h-[250px] md:h-[350px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#D81C1C] to-[#a01515]"></div>
        <div className="relative h-full flex items-center">
          <div className="container-custom">
            <h1 className="text-white">Impressum</h1>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              <div>
                <h2 className="mb-4">Kontaktadresse</h2>
                <p className="text-gray-700">
                  <strong>Maklerzentrum Schweiz AG</strong><br />
                  Elisabethenanlage 11<br />
                  4051 Basel<br />
                  Schweiz
                </p>
                <p className="text-gray-700 mt-4">
                  <strong>E-Mail:</strong> academy@maklerzentrum.ch<br />
                  <strong>Telefon:</strong> 079 948 69 86
                </p>
              </div>

              <div>
                <h2 className="mb-4">Vertretungsberechtigte Personen</h2>
                <p className="text-gray-700">Sascha Vögeli, CEO</p>
              </div>

              <div>
                <h2 className="mb-4">Handelsregistereintrag</h2>
                <p className="text-gray-700">
                  <strong>Eingetragener Firmenname:</strong> Maklerzentrum Schweiz AG<br />
                  <strong>Handelsregister:</strong> Basel<br />
                  <strong>UID:</strong> CHE-XXX.XXX.XXX (Platzhalter)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Impressum;
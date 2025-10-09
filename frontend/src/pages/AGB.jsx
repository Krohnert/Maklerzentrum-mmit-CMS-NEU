import React from 'react';
import { Helmet } from 'react-helmet-async';

const AGB = () => {
  return (
    <div className="pb-20 lg:pb-0">
      <Helmet>
        <title>AGB – Allgemeine Geschäftsbedingungen | Maklerzentrum Schweiz AG</title>
        <meta name="description" content="Allgemeine Geschäftsbedingungen der Maklerzentrum Schweiz AG." />
        <link rel="canonical" href="https://maklerzentrum.ch/agb/" />
      </Helmet>
      {/* Hero Section - 350px desktop, 250px mobile */}
      <section className="relative h-[250px] md:h-[350px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#D81C1C] to-[#a01515]"></div>
        <div className="relative h-full flex items-center">
          <div className="container-custom">
            <h1 className="text-white">AGB</h1>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <p className="text-gray-600">Inhalt folgt…</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AGB;
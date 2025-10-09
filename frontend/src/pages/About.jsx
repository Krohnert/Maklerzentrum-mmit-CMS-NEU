import React from 'react';
import { team } from '../mockData';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const About = () => {
  return (
    <div className="pb-20 lg:pb-0">
      <Helmet>
        <title>Über uns – Ausbildungspartnerin & Bindeglied zu Versicherern | Maklerzentrum</title>
        <meta name="description" content="25+ Jahre Erfahrung. Marktführerin für VBV-Ausbildung & Vermittlernetz. Standorte: Basel, Bern, Zürich, Lausanne, Lugano." />
        <link rel="canonical" href="https://maklerzentrum.ch/about/" />
        <meta property="og:title" content="Über uns – Ausbildungspartnerin & Bindeglied zu Versicherern | Maklerzentrum" />
        <meta property="og:description" content="25+ Jahre Erfahrung. Marktführerin für VBV-Ausbildung & Vermittlernetz. Standorte: Basel, Bern, Zürich, Lausanne, Lugano." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://maklerzentrum.ch/about/" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-[350px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&h=350&fit=crop" 
            alt="Team Maklerzentrum – VBV Ausbildung Schweiz" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
        </div>
        <div className="relative h-full flex items-center">
          <div className="container-custom">
            <div className="max-w-3xl text-white">
              <h1 className="mb-6 text-white">Wir machen keine halben Sachen.</h1>
              <p className="text-xl text-white/90">
                Seit über 25 Jahren bilden wir in der Schweiz Versicherungsvermittler aus.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Haupttext */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center mb-8">Ausbildungspartnerin & Bindeglied</h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Wir sind die <strong>führende Ausbildungspartnerin der unabhängigen Versicherungsvermittler</strong> und das Bindeglied zu allen wichtigen Versicherern.
              </p>
              <p>
                Mit langjähriger Erfahrung und einem umfassenden Service entlasten wir Vermittler und Vertriebsorganisationen, damit sie sich auf die Beratung ihrer Kunden konzentrieren können.
              </p>
              <p>
                Für Versicherer öffnen wir den Zugang zu unserem externen Vermittlernetz, sichern Ausbildung & Betreuung und sorgen für hohe Qualitätsstandards.
              </p>
              <p>
                Über <strong>200'000 Kunden</strong> vertrauen unserem Kundendienst; unsere Mitarbeitenden sind gleichwertig ausgebildet wie Aussendienstberater – kompetent, freundlich, schnell.
              </p>
              <p className="text-xl font-semibold text-[#D81C1C]">
                Mehr Zeit fürs Wesentliche: Wir übernehmen Anrufe in 8 Sprachen und entlasten Sie administrativ, damit Ihr Vertrieb läuft.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bild nach Text */}
      <section className="h-[400px] overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920&h=400&fit=crop" 
          alt="Maklerzentrum Schweiz AG – Ausbildung und Service für Versicherungsvermittler" 
          className="w-full h-full object-cover"
        />
      </section>

      {/* Team */}
      <section className="section-padding bg-[#F9F9F9]">
        <div className="container-custom">
          <h2 className="text-center mb-12">Unser Team</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-40 h-40 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                  {member.image ? (
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#D81C1C]/10 text-[#D81C1C] font-bold text-2xl">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                <p className="text-sm font-medium text-[#D81C1C] mb-2">{member.role}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
          
          {/* Standorte - kompakt unter Team */}
          <div className="mt-16 max-w-4xl mx-auto">
            <h2 className="text-center mb-6">Unsere Standorte</h2>
            <p className="text-center text-gray-600 mb-6">
              Präsenz in <strong>Basel, Bern, Zürich, Lausanne, Lugano</strong>. Online auf <strong>Microsoft Teams</strong>.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {['Basel', 'Bern', 'Zürich', 'Lausanne', 'Lugano'].map(city => (
                <div key={city} className="px-6 py-3 bg-white border border-gray-200 rounded-full">
                  <p className="font-semibold text-gray-800">{city}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-6">Bereit für deinen VBV?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Starte nächsten Monat. Reserviere jetzt deinen Platz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/#booking" className="btn-primary">
                Reservieren
              </a>
              <Link to="/kontakt" className="btn-primary" style={{ backgroundColor: 'white', color: '#D81C1C', border: '2px solid #D81C1C' }}>
                Kontakt aufnehmen
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
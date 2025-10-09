import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Globe } from 'lucide-react';
import CompanyForm from '../components/CompanyForm';

const Kontakt = () => {
  const [showCompanyForm, setShowCompanyForm] = useState(false);

  return (
    <div className="pb-20 lg:pb-0">
      {/* Hero Section */}
      <section className="relative h-[350px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1920&h=500&fit=crop" 
            alt="Kontakt" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
        </div>
        <div className="relative h-full flex items-center">
          <div className="container-custom">
            <div className="max-w-3xl text-white">
              <h1 className="mb-6 text-white">Wir sind für dich da.</h1>
              <p className="text-xl text-white/90 mb-6">
                Schreib uns kurz – oder ruf an. Wir melden uns schnell.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="mailto:academy@maklerzentrum.ch" className="btn-primary">
                  E-Mail schreiben
                </a>
                <a href="tel:+41799486986" className="btn-primary" style={{ backgroundColor: 'white', color: '#D81C1C' }}>
                  079 948 69 86
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="section-padding bg-[#F9F9F9]">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Sofortkontakt */}
            <div className="card-custom">
              <h2 className="mb-6">Sofortkontakt</h2>
              <div className="space-y-4">
                <a href="mailto:academy@maklerzentrum.ch" className="flex items-start space-x-4 text-gray-700 hover:text-[#D81C1C] transition-colors group">
                  <div className="w-12 h-12 bg-[#D81C1C]/10 group-hover:bg-[#D81C1C]/20 text-[#D81C1C] rounded-xl flex items-center justify-center flex-shrink-0 transition-colors">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="font-semibold">E-Mail</p>
                    <p className="text-sm">academy@maklerzentrum.ch</p>
                  </div>
                </a>
                <a href="tel:+41799486986" className="flex items-start space-x-4 text-gray-700 hover:text-[#D81C1C] transition-colors group">
                  <div className="w-12 h-12 bg-[#D81C1C]/10 group-hover:bg-[#D81C1C]/20 text-[#D81C1C] rounded-xl flex items-center justify-center flex-shrink-0 transition-colors">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="font-semibold">Telefon</p>
                    <p className="text-sm">079 948 69 86</p>
                    <p className="text-xs text-gray-500">(am besten zu Randzeiten)</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Adresse */}
            <div className="card-custom">
              <h2 className="mb-6">Adresse</h2>
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-[#D81C1C]/10 text-[#D81C1C] rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="font-semibold mb-1">Maklerzentrum Schweiz AG</p>
                  <p className="text-gray-600">Elisabethenanlage 11</p>
                  <p className="text-gray-600">4051 Basel</p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6 space-y-4">
                <div className="flex items-start space-x-4">
                  <Clock size={20} className="text-[#D81C1C] mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">Öffnungszeiten</p>
                    <p className="text-sm text-gray-600">Mo–Fr 08:00–12:00 / 13:00–17:00</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Globe size={20} className="text-[#D81C1C] mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">Sprachen</p>
                    <p className="text-sm text-gray-600">DE, FR, IT</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Präsenzstandorte */}
      <section className="section-padding bg-[#F6F6F6]">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center mb-6">Präsenzstandorte (Schulung)</h2>
            <p className="text-center text-gray-600 mb-8">
              <strong>Basel, Bern, Zürich, Lausanne, Lugano</strong> (weitere Räume nach Bedarf).<br />
              Wir planen den <strong>nächstgelegenen Standort</strong> zu deiner Postleitzahl ein.
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

      {/* Forms Toggle */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex bg-gray-100 rounded-full p-1">
                <button
                  onClick={() => setShowCompanyForm(false)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all ${
                    !showCompanyForm ? 'bg-gradient-to-br from-[#D81C1C] to-[#c01818] text-white shadow-md hover:shadow-lg' : 'text-gray-600 hover:text-gray-800'
                  }`}
                  style={!showCompanyForm ? {
                    boxShadow: '0 4px 12px rgba(216, 28, 28, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                  } : {}}
                >
                  Reservieren
                </button>
                <button
                  onClick={() => setShowCompanyForm(true)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all ${
                    showCompanyForm ? 'bg-gradient-to-br from-[#D81C1C] to-[#c01818] text-white shadow-md hover:shadow-lg' : 'text-gray-600 hover:text-gray-800'
                  }`}
                  style={showCompanyForm ? {
                    boxShadow: '0 4px 12px rgba(216, 28, 28, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                  } : {}}
                >
                  Firmenklasse anfragen
                </button>
              </div>
            </div>

            {!showCompanyForm ? (
              <div>
                <h2 className="text-center mb-4">Reservieren</h2>
                <p className="text-center text-gray-600 mb-8">
                  Wähle <strong>Monat/Kohorte</strong> und Modul. Nach Absenden kommt <strong>eine E-Mail</strong> mit <strong>Testzugang</strong> und <strong>Bezahlen-Link</strong>.
                </p>
                <div className="card-custom bg-[#F6F6F6] text-center mb-8">
                  <p className="text-gray-600">
                    Für Einzelbuchungen nutze bitte das <a href="/#booking" className="text-[#D81C1C] font-semibold hover:underline">Reservierungsformular auf der Startseite</a>.
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-center mb-4">Firmenklasse anfragen</h2>
                <p className="text-center text-gray-600 mb-8">
                  Exklusivklasse ab <strong>CHF 2'200/Tag</strong> pauschal. Individuell planbar nach eurem Zeitplan.
                </p>
                <CompanyForm />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Additional CTAs */}
      <section className="section-padding bg-[#F6F6F6]">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-6">Noch Fragen?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Ruf uns an oder schreib uns – wir helfen gerne weiter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+41799486986" className="btn-primary">
                079 948 69 86 anrufen
              </a>
              <a href="mailto:academy@maklerzentrum.ch" className="btn-primary" style={{ backgroundColor: 'white', color: '#D81C1C', border: '2px solid #D81C1C' }}>
                E-Mail schreiben
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Kontakt;
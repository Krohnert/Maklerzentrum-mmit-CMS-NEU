import React from 'react';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const DankeFirmenklasse = () => {
  return (
    <div className="pb-20 lg:pb-0">
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white min-h-[70vh] flex items-center">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={48} strokeWidth={3} />
            </div>
            <h1 className="mb-6">Vielen Dank für deine Anfrage!</h1>
            
            <div className="card-custom mb-8">
              <p className="text-xl text-gray-700 mb-4">
                Wir haben deine Anfrage für eine <strong>Firmenklasse</strong> erhalten.
              </p>
              <p className="text-gray-600">
                Wir melden uns kurzfristig mit Terminvorschlägen und besprechen alle Details mit dir.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
              <p className="text-blue-800">
                Eine Bestätigungsmail ist bereits unterwegs zu dir.
              </p>
            </div>

            <div className="text-gray-600 mb-8">
              <p className="mb-4">Fragen? Wir sind für dich da:</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="mailto:academy@maklerzentrum.ch" className="text-[#D81C1C] hover:underline font-medium">
                  academy@maklerzentrum.ch
                </a>
                <span className="hidden sm:inline">|</span>
                <a href="tel:+41799486986" className="text-[#D81C1C] hover:underline font-medium">
                  079 948 69 86
                </a>
              </div>
            </div>

            <Link to="/" className="btn-primary">
              Zurück zur Startseite
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DankeFirmenklasse;
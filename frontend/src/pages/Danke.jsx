import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Check, ExternalLink } from 'lucide-react';

const Danke = () => {
  const location = useLocation();
  const [reservationDetails, setReservationDetails] = useState({});

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setReservationDetails({
      cohort: params.get('cohort') || '',
      module: params.get('module') || ''
    });
  }, [location]);

  return (
    <div className="pb-20 lg:pb-0">
      {/* Hero Section */}
      <section className="relative h-[350px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?w=1920&h=500&fit=crop" 
            alt="Danke" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
        </div>
        <div className="relative h-full flex items-center">
          <div className="container-custom">
            <div className="max-w-3xl text-white">
              <h1 className="mb-6 text-white">Danke – wir haben deine Reservation.</h1>
              <p className="text-xl text-white/90">
                Deine Buchung ist eingegangen. Wir melden uns in Kürze bei dir.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white min-h-[50vh] flex items-center">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={48} strokeWidth={3} />
            </div>
            <h1 className="mb-6">Danke – wir haben deine Reservation.</h1>
            
            {reservationDetails.cohort && (
              <div className="card-custom mb-8 text-left">
                <h3 className="mb-4">Deine Auswahl:</h3>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Kohorte:</strong> {reservationDetails.cohort}</p>
                  <p><strong>Modul:</strong> {reservationDetails.module}</p>
                </div>
              </div>
            )}

            <div className="card-custom mb-8">
              <h2 className="mb-6">So geht's weiter:</h2>
              <div className="space-y-6 text-left">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-[#D81C1C] text-white rounded-full flex items-center justify-center text-lg font-bold mr-4 flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="mb-2">Testzugang starten</h3>
                    <p className="text-gray-600 mb-3">Schaue dir die Lernplattform an und starte mit den ersten Inhalten.</p>
                    <button className="btn-primary flex items-center justify-center w-full sm:w-auto">
                      Testzugang starten <ExternalLink size={18} className="ml-2" />
                    </button>
                  </div>
                </div>

                <div className="h-px bg-gray-200"></div>

                <div className="flex items-start">
                  <div className="w-10 h-10 bg-[#D81C1C] text-white rounded-full flex items-center justify-center text-lg font-bold mr-4 flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="mb-2">Buchung abschliessen & bezahlen</h3>
                    <p className="text-gray-600 mb-3">Sichere deinen Platz mit der Zahlung.</p>
                    <button className="btn-primary flex items-center justify-center w-full sm:w-auto">
                      Jetzt bezahlen <ExternalLink size={18} className="ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
              <p className="text-blue-800 font-medium">
                Du hast die Links auch per E-Mail erhalten.
              </p>
            </div>

            <div className="text-gray-600">
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default Danke;
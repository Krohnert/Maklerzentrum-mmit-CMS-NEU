import React from 'react';

const Impressum = () => {
  return (
    <div className="pb-20 lg:pb-0">
      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&h=500&fit=crop" 
            alt="Impressum" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
        </div>
        <div className="relative h-full flex items-center">
          <div className="container-custom">
            <div className="max-w-3xl text-white">
              <h1 className="mb-6 text-white">Impressum</h1>
              <p className="text-xl text-white/90">
                Angaben gemäss Schweizerischem Recht.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h1 className="mb-8">Impressum</h1>
            
            <div className="card-custom">
              <h2 className="mb-6">Angaben gemäss Schweizerischem Recht</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="mb-2">Firma</h3>
                  <p className="text-gray-700">Maklerzentrum Schweiz AG</p>
                </div>

                <div>
                  <h3 className="mb-2">Adresse</h3>
                  <p className="text-gray-700">
                    Elisabethenanlage 11<br />
                    4051 Basel<br />
                    Schweiz
                  </p>
                </div>

                <div>
                  <h3 className="mb-2">Kontakt</h3>
                  <p className="text-gray-700">
                    E-Mail: <a href="mailto:academy@maklerzentrum.ch" className="text-[#D81C1C] hover:underline">academy@maklerzentrum.ch</a><br />
                    Telefon: <a href="tel:+41799486986" className="text-[#D81C1C] hover:underline">079 948 69 86</a>
                  </p>
                </div>

                <div>
                  <h3 className="mb-2">Handelsregister</h3>
                  <p className="text-gray-700">
                    Eingetragen im Handelsregister des Kantons Basel-Stadt
                  </p>
                </div>

                <div>
                  <h3 className="mb-2">Vertretungsberechtigte Personen</h3>
                  <p className="text-gray-700">
                    Sascha Vögeli, Geschäftsführung
                  </p>
                </div>

                <div>
                  <h3 className="mb-2">Mehrwertsteuernummer</h3>
                  <p className="text-gray-700">
                    CHE-XXX.XXX.XXX MWST
                  </p>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <h3 className="mb-3">Haftungsausschluss</h3>
                  <p className="text-gray-600 mb-4">
                    Der Autor übernimmt keinerlei Gewähr hinsichtlich der inhaltlichen Richtigkeit, Genauigkeit, Aktualität, Zuverlässigkeit und Vollständigkeit der Informationen.
                  </p>
                  <p className="text-gray-600 mb-4">
                    Haftungsansprüche gegen den Autor wegen Schäden materieller oder immaterieller Art, welche aus dem Zugriff oder der Nutzung bzw. Nichtnutzung der veröffentlichten Informationen entstehen, sind grundsätzlich ausgeschlossen.
                  </p>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <h3 className="mb-3">Urheberrechte</h3>
                  <p className="text-gray-600">
                    Die Urheber- und alle anderen Rechte an Inhalten, Bildern, Fotos oder anderen Dateien auf dieser Website gehören ausschliesslich der Maklerzentrum Schweiz AG. Für die Reproduktion jeglicher Elemente ist die schriftliche Zustimmung der Urheberrechtsträger im Voraus einzuholen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Impressum;
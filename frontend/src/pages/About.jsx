import React from 'react';
import { team } from '../mockData';
import { Calendar, Laptop, Briefcase, DollarSign, Sparkles, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="pb-20 lg:pb-0">
      {/* Hero Section */}
      <section className="relative h-[350px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&h=500&fit=crop" 
            alt="Team Maklerzentrum" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
        </div>
        <div className="relative h-full flex items-center">
          <div className="container-custom">
            <div className="max-w-3xl text-white">
              <h1 className="mb-6 text-white">Wir machen keine halben Sachen.</h1>
              <p className="text-xl text-white/90">
                Seit über 25 Jahren bilden wir in der Schweiz Versicherungsvermittler aus. Unabhängig, praxisnah und planbar – mit monatlichen Starts, klaren Terminen und fairem Preis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Wofür wir stehen */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-center mb-12">Wofür wir stehen</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#D81C1C]/10 text-[#D81C1C] rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar size={32} />
              </div>
              <h3 className="mb-3">Monatlicher Start</h3>
              <p className="text-gray-600">Keine Wartezeit. Du startest, wann es für dich passt.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#D81C1C]/10 text-[#D81C1C] rounded-full flex items-center justify-center mx-auto mb-4">
                <Laptop size={32} />
              </div>
              <h3 className="mb-3">Blended Learning</h3>
              <p className="text-gray-600">Online dort, wo es Sinn macht; Präsenz, wo Praxis zählt.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#D81C1C]/10 text-[#D81C1C] rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase size={32} />
              </div>
              <h3 className="mb-3">Praxis</h3>
              <p className="text-gray-600">Dozenten aus dem Feld, echte Fälle, Prüfungsvorbereitung.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#D81C1C]/10 text-[#D81C1C] rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign size={32} />
              </div>
              <h3 className="mb-3">Fair</h3>
              <p className="text-gray-600"><strong>CHF 150/Tag</strong>; Exklusivklasse ab <strong>CHF 2'200/Tag</strong>.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#D81C1C]/10 text-[#D81C1C] rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles size={32} />
              </div>
              <h3 className="mb-3">Mehr als VBV</h3>
              <p className="text-gray-600">Lernplattform, Podcasts, Sparring & Netzwerk.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#D81C1C]/10 text-[#D81C1C] rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin size={32} />
              </div>
              <h3 className="mb-3">5 Standorte</h3>
              <p className="text-gray-600">Basel, Bern, Zürich, Lausanne, Lugano.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-[#F6F6F6]">
        <div className="container-custom">
          <h2 className="text-center mb-12">Unser Team</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center bg-[#D81C1C]/10 text-[#D81C1C] font-bold text-2xl">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <h3 className="text-lg mb-1">{member.name}</h3>
                <p className="text-sm font-medium text-[#D81C1C] mb-2">{member.role}</p>
                <p className="text-sm text-gray-600">{member.description}</p>
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
                Platz sichern
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
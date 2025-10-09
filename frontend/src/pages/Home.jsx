import React from 'react';
import { BookOpen, Heart, Home as HomeIcon, Users, Play, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { modules, testimonials, faqData } from '../mockData';
import BookingForm from '../components/BookingForm';

const iconMap = {
  BookOpen: BookOpen,
  Heart: Heart,
  Home: HomeIcon,
  Users: Users
};

const Home = () => {
  return (
    <div className="pb-20 lg:pb-0">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white section-padding">
        <div className="container-custom">
          <div className="max-w-3xl">
            <div className="inline-block bg-[#D81C1C] text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Keine halben Sachen.
            </div>
            <h1 className="mb-6">
              Zum VBV – planbar. praxisnah. produktiv.
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Start jeden Monat. Online (Microsoft Teams) + Präsenz in <strong>Basel, Bern, Zürich, Lausanne, Lugano</strong>. <strong>CHF 150/Tag</strong>.
            </p>
            <div className="space-y-4 mb-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                <strong>Kurz erklärt:</strong><br />
                Wir bringen dich in rund <strong>3 Monaten</strong> zum VBV.<br />
                Die <strong>Online-Teile</strong> sparen Zeit und Wege.<br />
                Die <strong>Präsenz-Teile</strong> machen dich fit für Praxis und Prüfung.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#booking" className="btn-primary">
                Platz sichern
              </a>
              <Link to="/kontakt" className="btn-primary" style={{ backgroundColor: 'white', color: '#D81C1C', border: '2px solid #D81C1C' }}>
                Firmenklasse anfragen
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video bg-gray-200 rounded-2xl overflow-hidden shadow-lg relative group">
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                <div className="w-20 h-20 bg-[#D81C1C] rounded-full flex items-center justify-center cursor-pointer transform group-hover:scale-110 transition-transform">
                  <Play size={32} fill="white" color="white" />
                </div>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=675&fit=crop" 
                alt="VBV Ausbildung Video" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3 Schritte Reservation */}
      <section className="section-padding bg-[#F6F6F6]">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="card-custom">
              <h2 className="text-center mb-8">So einfach reservierst du deinen Platz – in 3 Schritten.</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#D81C1C] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    1
                  </div>
                  <h3 className="mb-3">Kurs & Monat wählen</h3>
                  <p className="text-gray-600">
                    Wähle den richtigen Kurs (Gesamt oder Modul) und deinen Monat/Kohorte.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#D81C1C] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    2
                  </div>
                  <h3 className="mb-3">Deine Daten eingeben</h3>
                  <p className="text-gray-600">
                    Fülle das Formular mit deinen Kontaktangaben aus.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#D81C1C] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    3
                  </div>
                  <h3 className="mb-3">Unverbindlich reservieren</h3>
                  <p className="text-gray-600">
                    Reservation absenden. <strong>Wir melden uns telefonisch oder per E-Mail</strong> – mit Testzugang und dem Link zum Bezahlen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Module */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-center mb-12">Die 4 Module – Dein Weg zum VBV</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {modules.map((module, index) => {
              const Icon = iconMap[module.icon];
              return (
                <div key={index} className="card-custom">
                  <div className="w-14 h-14 bg-[#D81C1C]/10 text-[#D81C1C] rounded-xl flex items-center justify-center mb-4">
                    <Icon size={28} />
                  </div>
                  <h3 className="mb-3">{module.title}</h3>
                  <div className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium mb-3">
                    {module.format}
                  </div>
                  <p className="text-gray-600 text-sm">{module.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Preise */}
      <section className="section-padding bg-[#F6F6F6]">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center mb-8">Preise</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card-custom text-center">
                <div className="mb-4">
                  <div className="text-5xl font-bold text-[#D81C1C] mb-2">CHF 150</div>
                  <div className="text-gray-600">pro Tag / Person</div>
                </div>
                <h3 className="mb-3">Offene Klassen</h3>
                <p className="text-gray-600 mb-6">Für Einzelpersonen und kleine Gruppen</p>
                <a href="#booking" className="btn-primary w-full">
                  Jetzt buchen
                </a>
              </div>
              <div className="card-custom text-center">
                <div className="mb-4">
                  <div className="text-5xl font-bold text-[#D81C1C] mb-2">CHF 2'200</div>
                  <div className="text-gray-600">pro Tag pauschal</div>
                </div>
                <h3 className="mb-3">Exklusivklasse (Firmen)</h3>
                <p className="text-gray-600 mb-6">Individuell planbar nach eurem Zeitplan</p>
                <Link to="/kontakt" className="btn-primary w-full">
                  Anfragen
                </Link>
              </div>
            </div>
            <p className="text-sm text-gray-500 text-center mt-6">
              *Prüfungs- und Lehrmittel gemäss VBV separat.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-center mb-12">Das sagen unsere Teilnehmer</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card-custom">
                <div className="text-[#D81C1C] text-6xl mb-4">"</div>
                <p className="text-lg text-gray-700 mb-6 italic">
                  {testimonial.quote}
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                  <div>
                    <p className="font-semibold text-gray-800">{testimonial.author}</p>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-[#F6F6F6]">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-center mb-12">Häufige Fragen</h2>
            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <div key={index} className="card-custom">
                  <h3 className="mb-3 flex items-start">
                    <Check size={24} className="text-[#D81C1C] mr-3 flex-shrink-0 mt-1" />
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 ml-9">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section id="booking" className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-center mb-4">Platz sichern – unverbindlich reservieren</h2>
            <p className="text-center text-gray-600 mb-8">
              Fülle das Formular aus und wir senden dir den Testzugang sowie den Link zum Bezahlen.
            </p>
            <BookingForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
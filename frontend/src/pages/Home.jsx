import React from 'react';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { modules, testimonials, faqData } from '../mockData';
import BookingForm from '../components/BookingForm';

const Home = () => {
  const jsonLdOrganization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Maklerzentrum Schweiz AG",
    "url": "https://maklerzentrum.ch/",
    "logo": "https://customer-assets.emergentagent.com/job_68ead48d-3657-47bf-8173-f1b42021a181/artifacts/65e6rt5r_Logo_def_normal.jpg",
    "telephone": "+41 79 948 69 86",
    "email": "academy@maklerzentrum.ch",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Elisabethenanlage 11",
      "postalCode": "4051",
      "addressLocality": "Basel",
      "addressCountry": "CH"
    },
    "areaServed": ["CH"]
  };

  const jsonLdCourse = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Ausbildung zum Versicherungsvermittler (VBV)",
    "description": "Monatlicher Start. Blended Learning: Online (Teams) & Präsenz in Basel, Bern, Zürich, Lausanne, Lugano. Preis: CHF 150/Tag.",
    "provider": {
      "@type": "Organization",
      "name": "Maklerzentrum Schweiz AG",
      "url": "https://maklerzentrum.ch/"
    },
    "hasCourseInstance": [{
      "@type": "CourseInstance",
      "courseMode": ["online", "inPerson"],
      "location": [
        {"@type": "Place", "name": "Basel"},
        {"@type": "Place", "name": "Bern"},
        {"@type": "Place", "name": "Zürich"},
        {"@type": "Place", "name": "Lausanne"},
        {"@type": "Place", "name": "Lugano"}
      ],
      "offers": {
        "@type": "Offer",
        "price": "150",
        "priceCurrency": "CHF",
        "category": "perDay"
      }
    }]
  };

  const jsonLdFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {"@type": "Question", "name": "Wie lange dauert die VBV-Ausbildung?", "acceptedAnswer": {"@type": "Answer", "text": "In der Regel rund 3 Monate mit Starttermin jeden Monat."}},
      {"@type": "Question", "name": "Welche Module sind online, welche vor Ort?", "acceptedAnswer": {"@type": "Answer", "text": "Generelle Fähigkeiten & Krankenzusatz online; Nichtleben & Leben vor Ort."}},
      {"@type": "Question", "name": "Wo finden die Präsenztermine statt?", "acceptedAnswer": {"@type": "Answer", "text": "Basel, Bern, Zürich, Lausanne, Lugano."}},
      {"@type": "Question", "name": "Was kostet die Ausbildung?", "acceptedAnswer": {"@type": "Answer", "text": "Offene Klassen: CHF 150 pro Tag und Person; Exklusivklasse: CHF 2'200 pro Tag pauschal."}}
    ]
  };

  return (
    <div className="pb-20 lg:pb-0">
      <Helmet>
        <title>VBV Ausbildung – monatlicher Start | Maklerzentrum Schweiz AG</title>
        <meta name="description" content="Zum VBV in ~3 Monaten. Online (Teams) + Präsenz in Basel, Bern, Zürich, Lausanne, Lugano. CHF 150/Tag. Plätze begrenzt – jetzt reservieren." />
        <link rel="canonical" href="https://maklerzentrum.ch/" />
        <meta property="og:title" content="VBV Ausbildung – monatlicher Start | Maklerzentrum Schweiz AG" />
        <meta property="og:description" content="Zum VBV in ~3 Monaten. Online (Teams) + Präsenz in Basel, Bern, Zürich, Lausanne, Lugano. CHF 150/Tag." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://maklerzentrum.ch/" />
        <meta property="og:site_name" content="Maklerzentrum Schweiz AG" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(jsonLdOrganization)}</script>
        <script type="application/ld+json">{JSON.stringify(jsonLdCourse)}</script>
        <script type="application/ld+json">{JSON.stringify(jsonLdFAQ)}</script>
      </Helmet>
      {/* Hero Section with Image - 350px desktop, 360px mobile */}
      <section className="relative h-[360px] md:h-[350px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920&h=350&fit=crop" 
            alt="VBV Ausbildung – Online und Präsenz in Basel, Bern, Zürich, Lausanne, Lugano" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
        </div>
        <div className="relative h-full flex items-center py-6">
          <div className="container-custom">
            <div className="max-w-3xl text-white">
              <p className="text-3xl md:text-5xl font-extrabold text-white mb-2 md:mb-4 leading-tight">
                Keine halben Sachen.
              </p>
              <h1 className="mb-2 md:mb-4 text-white text-xl md:text-[40px] font-bold leading-tight">
                Zum VBV – planbar. praxisnah. produktiv.
              </h1>
              <p className="text-sm md:text-xl mb-4 md:mb-6 text-white/90 leading-snug">
                Start jeden Monat. Online (Microsoft Teams) + Präsenz in <strong>Basel, Bern, Zürich, Lausanne, Lugano</strong>. <strong>CHF 150/Tag</strong>.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 md:gap-4">
                <a href="#booking" className="btn-primary text-sm md:text-base py-3 md:py-3.5">
                  Reservieren
                </a>
                <Link to="/kontakt" className="btn-primary text-sm md:text-base py-3 md:py-3.5" style={{ background: 'white', color: '#D81C1C', border: '2px solid white' }}>
                  Firmenklasse anfragen
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kurz erklärt - Weiße Schrift auf Dunkelgrau */}
      <section className="section-padding bg-[#2c2c2c]">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-6 text-white">Kurz erklärt</h2>
            <div className="space-y-3 text-lg text-white">
              <p>Wir bringen dich in rund <strong>3 Monaten</strong> zum VBV.</p>
              <p>Die <strong>Online-Teile</strong> sparen Zeit und Wege.</p>
              <p>Die <strong>Präsenz-Teile</strong> machen dich fit für Praxis und Prüfung.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Schritte-Reservation */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="card-custom bg-[#F6F6F6]">
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

      {/* Video Platzhalter */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-xl group cursor-pointer">
              {/* Video Platzhalter Bild */}
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=675&fit=crop" 
                alt="VBV Ausbildung Erklärvideo" 
                className="w-full h-full object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                {/* Play Button */}
                <div className="w-20 h-20 bg-[#D81C1C] rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-2xl">
                  <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
              {/* Video Titel Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-white text-xl font-semibold mb-1">VBV Ausbildung erklärt</h3>
                <p className="text-white/80 text-sm">Erfahre in 2 Minuten, wie die Ausbildung abläuft</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Module - Kompakt in 4 Zeilen */}
      <section className="section-padding bg-[#F9F9F9]">
        <div className="container-custom">
          <h2 className="text-center mb-8">Die 4 Module – Dein Weg zum VBV</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {modules.map((module, index) => (
              <div key={index} className="flex items-center p-4 bg-white rounded-lg hover:shadow-md transition-shadow border border-[#CCCCCC]">
                <div className="w-10 h-10 bg-[#D81C1C] text-white rounded-full flex items-center justify-center text-lg font-bold mr-4 flex-shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">{module.title}</h3>
                  <p className="text-sm text-gray-600">{module.description}</p>
                </div>
                <div className="ml-4">
                  <span className="inline-block bg-[#F6F6F6] px-3 py-1 rounded-full text-xs font-medium text-gray-700 border border-[#CCCCCC]">
                    {module.format}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preise - Weiße Schrift auf Grau */}
      <section className="section-padding bg-[#2c2c2c]">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center mb-8 text-white">Preise</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center">
                <div className="mb-4">
                  <div className="text-5xl font-bold text-white mb-2">CHF 150</div>
                  <div className="text-white/80">pro Tag / Person</div>
                </div>
                <h3 className="mb-3 text-white">Offene Klassen</h3>
                <p className="text-white/70 mb-6">Für Einzelpersonen und kleine Gruppen</p>
                <a href="#booking" className="btn-primary w-full">
                  Reservieren
                </a>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center">
                <div className="mb-4">
                  <div className="text-5xl font-bold text-white mb-2">CHF 2'200</div>
                  <div className="text-white/80">pro Tag pauschal</div>
                </div>
                <h3 className="mb-3 text-white">Exklusivklasse (Firmen)</h3>
                <p className="text-white/70 mb-6">Individuell planbar nach eurem Zeitplan</p>
                <Link to="/kontakt" className="btn-primary w-full">
                  Anfragen
                </Link>
              </div>
            </div>
            <p className="text-sm text-white/60 text-center mt-6">
              *Prüfungs- und Lehrmittel gemäss VBV separat.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials - Dunkler Hintergrund */}
      <section className="section-padding bg-[#3a3a3a]">
        <div className="container-custom">
          <h2 className="text-center mb-12 text-white">Das sagen unsere Teilnehmer</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
                <div className="text-[#D81C1C] text-6xl mb-4">"</div>
                <p className="text-lg text-white mb-6 italic">
                  {testimonial.quote}
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full mr-4"></div>
                  <div>
                    <p className="font-semibold text-white">{testimonial.author}</p>
                    <p className="text-sm text-white/70">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ - Heller Hintergrund */}
      <section className="section-padding bg-[#F6F6F6]">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-center mb-12">Häufige Fragen</h2>
            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <div key={index} className="card-custom bg-white border border-[#CCCCCC]">
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
            <h2 className="text-center mb-4">Jetzt reservieren</h2>
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
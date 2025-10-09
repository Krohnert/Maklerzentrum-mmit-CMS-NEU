import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { scheduleData, modules, modulesList, locations, cohorts } from '../mockData';
import { Search } from 'lucide-react';

const Schulung = () => {
  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://maklerzentrum.ch/"},
      {"@type": "ListItem", "position": 2, "name": "Schulung", "item": "https://maklerzentrum.ch/schulung/"}
    ]
  };

  const jsonLdEvents = [
    {
      "@context": "https://schema.org",
      "@type": "EducationEvent",
      "name": "VBV Ausbildung – Starttermin Januar 2026 (DE)",
      "eventAttendanceMode": "https://schema.org/MixedEventAttendanceMode",
      "eventStatus": "https://schema.org/EventScheduled",
      "startDate": "2026-01-12",
      "endDate": "2026-02-27",
      "description": "Ablauf Jan-Start: Generelle Fähigkeiten (online): 12.01., 13.01., 19.01., 20.01. · Krankenzusatz (online): 26.01., 27.01. · Nichtleben (vor Ort): 05.02., 06.02., 12.02. · Leben (vor Ort): 19.02., 20.02., 26.02., 27.02.",
      "location": [
        {"@type": "VirtualLocation", "url": "https://maklerzentrum.ch/schulung/"},
        {"@type": "Place", "name": "Basel", "address": {"@type": "PostalAddress", "addressLocality": "Basel", "addressCountry": "CH"}},
        {"@type": "Place", "name": "Bern", "address": {"@type": "PostalAddress", "addressLocality": "Bern", "addressCountry": "CH"}},
        {"@type": "Place", "name": "Zürich", "address": {"@type": "PostalAddress", "addressLocality": "Zürich", "addressCountry": "CH"}},
        {"@type": "Place", "name": "Lausanne", "address": {"@type": "PostalAddress", "addressLocality": "Lausanne", "addressCountry": "CH"}},
        {"@type": "Place", "name": "Lugano", "address": {"@type": "PostalAddress", "addressLocality": "Lugano", "addressCountry": "CH"}}
      ],
      "organizer": {"@type": "Organization", "name": "Maklerzentrum Schweiz AG", "url": "https://maklerzentrum.ch/"},
      "offers": {"@type": "Offer", "price": "150", "priceCurrency": "CHF", "url": "https://maklerzentrum.ch/#booking", "availability": "https://schema.org/InStock"}
    },
    {
      "@context": "https://schema.org",
      "@type": "EducationEvent",
      "name": "VBV Ausbildung – Starttermin Februar 2026 (DE)",
      "eventAttendanceMode": "https://schema.org/MixedEventAttendanceMode",
      "eventStatus": "https://schema.org/EventScheduled",
      "startDate": "2026-02-09",
      "endDate": "2026-03-27",
      "description": "Ablauf Feb-Start: Generelle Fähigkeiten (online): 09.02., 10.02., 11.02., 16.02. · Krankenzusatz (online): 23.02., 24.02. · Nichtleben (vor Ort): 05.03., 06.03., 12.03. · Leben (vor Ort): 19.03., 20.03., 26.03., 27.03.",
      "location": [
        {"@type": "VirtualLocation", "url": "https://maklerzentrum.ch/schulung/"},
        {"@type": "Place", "name": "Basel", "address": {"@type": "PostalAddress", "addressLocality": "Basel", "addressCountry": "CH"}},
        {"@type": "Place", "name": "Bern", "address": {"@type": "PostalAddress", "addressLocality": "Bern", "addressCountry": "CH"}},
        {"@type": "Place", "name": "Zürich", "address": {"@type": "PostalAddress", "addressLocality": "Zürich", "addressCountry": "CH"}},
        {"@type": "Place", "name": "Lausanne", "address": {"@type": "PostalAddress", "addressLocality": "Lausanne", "addressCountry": "CH"}},
        {"@type": "Place", "name": "Lugano", "address": {"@type": "PostalAddress", "addressLocality": "Lugano", "addressCountry": "CH"}}
      ],
      "organizer": {"@type": "Organization", "name": "Maklerzentrum Schweiz AG", "url": "https://maklerzentrum.ch/"},
      "offers": {"@type": "Offer", "price": "150", "priceCurrency": "CHF", "url": "https://maklerzentrum.ch/#booking", "availability": "https://schema.org/InStock"}
    },
    {
      "@context": "https://schema.org",
      "@type": "EducationEvent",
      "name": "VBV Ausbildung – Starttermin März 2026 (DE)",
      "eventAttendanceMode": "https://schema.org/MixedEventAttendanceMode",
      "eventStatus": "https://schema.org/EventScheduled",
      "startDate": "2026-03-09",
      "endDate": "2026-04-24",
      "description": "Ablauf März-Start: Generelle Fähigkeiten (online): 09.03., 10.03., 16.03., 17.03. · Krankenzusatz (online): 23.03., 24.03. · Nichtleben (vor Ort): 02.04., 03.04., 09.04. · Leben (vor Ort): 16.04., 17.04., 23.04., 24.04.",
      "location": [
        {"@type": "VirtualLocation", "url": "https://maklerzentrum.ch/schulung/"},
        {"@type": "Place", "name": "Basel", "address": {"@type": "PostalAddress", "addressLocality": "Basel", "addressCountry": "CH"}},
        {"@type": "Place", "name": "Bern", "address": {"@type": "PostalAddress", "addressLocality": "Bern", "addressCountry": "CH"}},
        {"@type": "Place", "name": "Zürich", "address": {"@type": "PostalAddress", "addressLocality": "Zürich", "addressCountry": "CH"}},
        {"@type": "Place", "name": "Lausanne", "address": {"@type": "PostalAddress", "addressLocality": "Lausanne", "addressCountry": "CH"}},
        {"@type": "Place", "name": "Lugano", "address": {"@type": "PostalAddress", "addressLocality": "Lugano", "addressCountry": "CH"}}
      ],
      "organizer": {"@type": "Organization", "name": "Maklerzentrum Schweiz AG", "url": "https://maklerzentrum.ch/"},
      "offers": {"@type": "Offer", "price": "150", "priceCurrency": "CHF", "url": "https://maklerzentrum.ch/#booking", "availability": "https://schema.org/InStock"}
    },
    {
      "@context": "https://schema.org",
      "@type": "EducationEvent",
      "name": "VBV Ausbildung – Starttermin April 2026 (DE)",
      "eventAttendanceMode": "https://schema.org/MixedEventAttendanceMode",
      "eventStatus": "https://schema.org/EventScheduled",
      "startDate": "2026-04-08",
      "endDate": "2026-05-28",
      "description": "Ablauf April-Start: Generelle Fähigkeiten (online): 08.04., 13.04., 15.04., 20.04. · Krankenzusatz (online): 22.04., 27.04. · Nichtleben (vor Ort): 01.05., 07.05., 08.05. · Leben (vor Ort): 15.05., 21.05., 22.05., 28.05.",
      "location": [
        {"@type": "VirtualLocation", "url": "https://maklerzentrum.ch/schulung/"},
        {"@type": "Place", "name": "Basel", "address": {"@type": "PostalAddress", "addressLocality": "Basel", "addressCountry": "CH"}},
        {"@type": "Place", "name": "Bern", "address": {"@type": "PostalAddress", "addressLocality": "Bern", "addressCountry": "CH"}},
        {"@type": "Place", "name": "Zürich", "address": {"@type": "PostalAddress", "addressLocality": "Zürich", "addressCountry": "CH"}},
        {"@type": "Place", "name": "Lausanne", "address": {"@type": "PostalAddress", "addressLocality": "Lausanne", "addressCountry": "CH"}},
        {"@type": "Place", "name": "Lugano", "address": {"@type": "PostalAddress", "addressLocality": "Lugano", "addressCountry": "CH"}}
      ],
      "organizer": {"@type": "Organization", "name": "Maklerzentrum Schweiz AG", "url": "https://maklerzentrum.ch/"},
      "offers": {"@type": "Offer", "price": "150", "priceCurrency": "CHF", "url": "https://maklerzentrum.ch/#booking", "availability": "https://schema.org/InStock"}
    },
    {
      "@context": "https://schema.org",
      "@type": "EducationEvent",
      "name": "VBV Ausbildung – Starttermin Mai 2026 (DE)",
      "eventAttendanceMode": "https://schema.org/MixedEventAttendanceMode",
      "eventStatus": "https://schema.org/EventScheduled",
      "startDate": "2026-05-11",
      "endDate": "2026-06-26",
      "description": "Ablauf Mai-Start: Generelle Fähigkeiten (online): 11.05., 12.05., 18.05., 19.05. · Krankenzusatz (online): 26.05., 27.05. · Nichtleben (vor Ort): 04.06., 05.06., 11.06. · Leben (vor Ort): 18.06., 19.06., 25.06., 26.06.",
      "location": [
        {"@type": "VirtualLocation", "url": "https://maklerzentrum.ch/schulung/"},
        {"@type": "Place", "name": "Basel", "address": {"@type": "PostalAddress", "addressLocality": "Basel", "addressCountry": "CH"}},
        {"@type": "Place", "name": "Bern", "address": {"@type": "PostalAddress", "addressLocality": "Bern", "addressCountry": "CH"}},
        {"@type": "Place", "name": "Zürich", "address": {"@type": "PostalAddress", "addressLocality": "Zürich", "addressCountry": "CH"}},
        {"@type": "Place", "name": "Lausanne", "address": {"@type": "PostalAddress", "addressLocality": "Lausanne", "addressCountry": "CH"}},
        {"@type": "Place", "name": "Lugano", "address": {"@type": "PostalAddress", "addressLocality": "Lugano", "addressCountry": "CH"}}
      ],
      "organizer": {"@type": "Organization", "name": "Maklerzentrum Schweiz AG", "url": "https://maklerzentrum.ch/"},
      "offers": {"@type": "Offer", "price": "150", "priceCurrency": "CHF", "url": "https://maklerzentrum.ch/#booking", "availability": "https://schema.org/InStock"}
    },
    {
      "@context": "https://schema.org",
      "@type": "EducationEvent",
      "name": "VBV Ausbildung – Starttermin Juni 2026 (DE)",
      "eventAttendanceMode": "https://schema.org/MixedEventAttendanceMode",
      "eventStatus": "https://schema.org/EventScheduled",
      "startDate": "2026-06-08",
      "endDate": "2026-07-24",
      "description": "Ablauf Juni-Start: Generelle Fähigkeiten (online): 08.06., 09.06., 10.06., 15.06. · Krankenzusatz (online): 22.06., 23.06. · Nichtleben (vor Ort): 02.07., 03.07., 09.07. · Leben (vor Ort): 16.07., 17.07., 23.07., 24.07.",
      "location": [
        {"@type": "VirtualLocation", "url": "https://maklerzentrum.ch/schulung/"},
        {"@type": "Place", "name": "Basel", "address": {"@type": "PostalAddress", "addressLocality": "Basel", "addressCountry": "CH"}},
        {"@type": "Place", "name": "Bern", "address": {"@type": "PostalAddress", "addressLocality": "Bern", "addressCountry": "CH"}},
        {"@type": "Place", "name": "Zürich", "address": {"@type": "PostalAddress", "addressLocality": "Zürich", "addressCountry": "CH"}},
        {"@type": "Place", "name": "Lausanne", "address": {"@type": "PostalAddress", "addressLocality": "Lausanne", "addressCountry": "CH"}},
        {"@type": "Place", "name": "Lugano", "address": {"@type": "PostalAddress", "addressLocality": "Lugano", "addressCountry": "CH"}}
      ],
      "organizer": {"@type": "Organization", "name": "Maklerzentrum Schweiz AG", "url": "https://maklerzentrum.ch/"},
      "offers": {"@type": "Offer", "price": "150", "priceCurrency": "CHF", "url": "https://maklerzentrum.ch/#booking", "availability": "https://schema.org/InStock"}
    }
  ];

  const [filterMonth, setFilterMonth] = useState('');
  const [filterModule, setFilterModule] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSchedule = scheduleData.filter(item => {
    const matchesMonth = !filterMonth || item.cohort === filterMonth;
    const matchesModule = !filterModule || item.module === filterModule;
    const matchesLocation = !filterLocation || item.location === filterLocation;
    const matchesSearch = !searchTerm || 
      item.cohort.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.module.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesMonth && matchesModule && matchesLocation && matchesSearch;
  });

  const handlePlatzSichern = (item) => {
    const params = new URLSearchParams({
      cohort: item.cohort,
      module: item.module,
      loc: item.location
    });
    window.location.href = `/#booking?${params.toString()}`;
  };

  return (
    <div className="pb-20 lg:pb-0">
      <Helmet>
        <title>VBV Schulung Schweiz – Start jeden Monat | Maklerzentrum</title>
        <meta name="description" content="4 Module (online & vor Ort), Termin-Matrix 2026, CHF 150/Tag. Reserve jetzt deinen Starttermin und sichere deinen Platz." />
        <link rel="canonical" href="https://maklerzentrum.ch/schulung/" />
        <meta property="og:title" content="VBV Schulung Schweiz – Start jeden Monat | Maklerzentrum" />
        <meta property="og:description" content="4 Module (online & vor Ort), Termin-Matrix 2026, CHF 150/Tag." />
        <meta property="og:url" content="https://maklerzentrum.ch/schulung/" />
        <script type="application/ld+json">{JSON.stringify(jsonLdBreadcrumb)}</script>
      </Helmet>
      {/* Hero Section - 350px desktop, 250px mobile */}
      <section className="relative h-[250px] md:h-[350px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&h=500&fit=crop" 
            alt="VBV Schulung" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
        </div>
        <div className="relative h-full flex items-center">
          <div className="container-custom">
            <div className="max-w-3xl text-white">
              <h1 className="mb-6 text-white">VBV-Ausbildung mit monatlichem Start</h1>
              <p className="text-xl mb-8 text-white/90">
                Online (Teams) für Grundlagen. Präsenz für Praxis. Standorte: <strong>Basel, Bern, Zürich, Lausanne, Lugano</strong>.<br />
                Ziel: <strong>sicher zum VBV</strong>, in etwa <strong>3 Monaten</strong>.
              </p>
              <a href="#schedule" className="btn-primary">
                Reservieren
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Schritte */}
      <section className="section-padding bg-[#F9F9F9]">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center mb-8">So reservierst du – in 3 Schritten</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-[#F6F6F6] rounded-xl">
                <div className="w-12 h-12 bg-[#D81C1C] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">1</div>
                <h3 className="text-lg mb-2">Kurs & Monat wählen</h3>
              </div>
              <div className="text-center p-6 bg-[#F6F6F6] rounded-xl">
                <div className="w-12 h-12 bg-[#D81C1C] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">2</div>
                <h3 className="text-lg mb-2">Daten eingeben</h3>
              </div>
              <div className="text-center p-6 bg-[#F6F6F6] rounded-xl">
                <div className="w-12 h-12 bg-[#D81C1C] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">3</div>
                <h3 className="text-lg mb-2">Unverbindlich reservieren</h3>
              </div>
            </div>
            <p className="text-center text-gray-600 mt-6">
              Wir senden Testzugang & Bezahlen-Link.
            </p>
          </div>
        </div>
      </section>

      {/* Ablauf - Heller Text auf dunklem Hintergrund mit weißen Trennern */}
      <section className="section-padding bg-[#2c2c2c]">
        <div className="container-custom">
          <h2 className="text-center mb-12 text-white">Ablauf in 5 Schritten</h2>
          <div className="max-w-4xl mx-auto">
            {[
              { num: 1, title: 'Buchung/Reservation', desc: 'Monat/Kohorte und Module wählen.' },
              { num: 2, title: 'Zugang', desc: 'Lernplattform, Skripte, Podcasts, .ics-Termine.' },
              { num: 3, title: 'Online', desc: 'Generelle Fähigkeiten & Krankenzusatz.' },
              { num: 4, title: 'Präsenz', desc: 'Nichtleben & Leben standortnah.' },
              { num: 5, title: 'Prüfung', desc: 'Wir bereiten dich gezielt vor.' }
            ].map((step, index) => (
              <div key={step.num}>
                <div className="flex items-start py-6">
                  <div className="w-14 h-14 bg-[#D81C1C] text-white rounded-full flex items-center justify-center text-2xl font-bold mr-6 flex-shrink-0">
                    {step.num}
                  </div>
                  <div>
                    <h3 className="mb-2 text-white">{step.title}</h3>
                    <p className="text-white/80">{step.desc}</p>
                  </div>
                </div>
                {index < 4 && <div className="h-px bg-white/20"></div>}
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Bild nach Ablauf */}
      <section className="h-[300px] overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=300&fit=crop" 
          alt="VBV Ausbildung" 
          className="w-full h-full object-cover"
        />
      </section>

      {/* Module - Wie Ablauf gestylt */}
      <section className="section-padding bg-[#2c2c2c]">
        <div className="container-custom">
          <h2 className="text-center mb-12 text-white">Die 4 Module im Detail</h2>
          <div className="max-w-4xl mx-auto">
            {modules.map((module, index) => (
              <div key={index}>
                <div className="flex items-start py-6">
                  <div className="w-14 h-14 bg-[#D81C1C] text-white rounded-full flex items-center justify-center text-2xl font-bold mr-6 flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 text-white">{module.title}</h3>
                    <p className="text-white/80">{module.description}</p>
                  </div>
                  <div className="ml-4">
                    <span className="inline-block bg-white/20 px-4 py-2 rounded-full text-sm font-medium text-white border border-white/30">
                      {module.format}
                    </span>
                  </div>
                </div>
                {index < 3 && <div className="h-px bg-white/20"></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Termin-Matrix */}
      <section id="schedule" className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-center mb-8">Termin-Matrix 2026</h2>
          
          {/* Filters */}
          <div className="max-w-5xl mx-auto mb-8">
            <div className="card-custom">
              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Monat</label>
                  <select
                    value={filterMonth}
                    onChange={(e) => setFilterMonth(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D81C1C] focus:border-transparent"
                  >
                    <option value="">Alle Monate</option>
                    {cohorts.map(cohort => (
                      <option key={cohort} value={cohort}>{cohort}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Modul</label>
                  <select
                    value={filterModule}
                    onChange={(e) => setFilterModule(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D81C1C] focus:border-transparent"
                  >
                    <option value="">Alle Module</option>
                    {modulesList.map(module => (
                      <option key={module} value={module}>{module}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Ort</label>
                  <select
                    value={filterLocation}
                    onChange={(e) => setFilterLocation(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D81C1C] focus:border-transparent"
                  >
                    <option value="">Alle Orte</option>
                    {['Microsoft Teams', ...locations].map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Suche</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Suchen..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D81C1C] focus:border-transparent"
                    />
                    <Search size={18} className="absolute left-3 top-3 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Schedule Table - Desktop */}
          <div className="hidden lg:block max-w-6xl mx-auto">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Kohorte</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Datum</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Modul</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Format</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Ort</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Aktion</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredSchedule.map(item => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-sm font-medium text-gray-800">{item.cohort}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{item.startDate} – {item.endDate}</td>
                      <td className="px-4 py-3 text-sm text-gray-800">{item.module}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          item.format === 'Online' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                        }`}>
                          {item.format}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{item.location}</td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => handlePlatzSichern(item)}
                          className="bg-gradient-to-br from-[#D81C1C] to-[#c01818] text-white px-4 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-all hover:-translate-y-0.5"
                          style={{
                            boxShadow: '0 4px 12px rgba(216, 28, 28, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                          }}
                        >
                          Reservieren
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Schedule Cards - Mobile */}
          <div className="lg:hidden space-y-4 max-w-2xl mx-auto">
            {filteredSchedule.map(item => (
              <div key={item.id} className="card-custom">
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-lg text-gray-800">{item.cohort}</span>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      item.format === 'Online' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {item.format}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{item.startDate} – {item.endDate}</p>
                </div>
                <h3 className="mb-2">{item.module}</h3>
                <p className="text-gray-600 mb-4">{item.location}</p>
                <button
                  onClick={() => handlePlatzSichern(item)}
                  className="btn-primary w-full"
                  style={{
                    boxShadow: '0 4px 12px rgba(216, 28, 28, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                  }}
                >
                  Reservieren
                </button>
              </div>
            ))}
          </div>

          {filteredSchedule.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Keine Termine gefunden. Bitte Filter anpassen.</p>
            </div>
          )}
        </div>
      </section>

      {/* Preise */}
      <section className="section-padding bg-[#F6F6F6]">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="mb-8">Preise</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card-custom">
                <div className="text-4xl font-bold text-[#D81C1C] mb-2">CHF 150/Tag</div>
                <p className="text-gray-600 mb-4">pro Person – Offene Klassen</p>
              </div>
              <div className="card-custom">
                <div className="text-4xl font-bold text-[#D81C1C] mb-2">CHF 2'200/Tag</div>
                <p className="text-gray-600 mb-4">pauschal – Exklusivklasse (Firmen)</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-6">*Prüfungs-/Lehrmittel gemäss VBV separat.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Schulung;
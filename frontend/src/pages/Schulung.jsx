import React, { useState } from 'react';
import { scheduleData, modules, modulesList, locations, cohorts } from '../mockData';
import { BookOpen, Heart, Home as HomeIcon, Users, Search } from 'lucide-react';

const iconMap = {
  BookOpen: BookOpen,
  Heart: Heart,
  Home: HomeIcon,
  Users: Users
};

const Schulung = () => {
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
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white section-padding">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="mb-6">VBV-Ausbildung mit monatlichem Start</h1>
            <p className="text-xl text-gray-600 mb-8">
              Online (Teams) für Grundlagen. Präsenz für Praxis. Standorte: <strong>Basel, Bern, Zürich, Lausanne, Lugano</strong>.<br />
              Ziel: <strong>sicher zum VBV</strong>, in etwa <strong>3 Monaten</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* 3 Schritte (kompakt) */}
      <section className="section-padding bg-white">
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

      {/* Ablauf */}
      <section className="section-padding bg-[#F6F6F6]">
        <div className="container-custom">
          <h2 className="text-center mb-12">Ablauf in 5 Schritten</h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {[
              { num: 1, title: 'Buchung/Reservation', desc: 'Monat/Kohorte und Module wählen.' },
              { num: 2, title: 'Zugang', desc: 'Lernplattform, Skripte, Podcasts, .ics-Termine.' },
              { num: 3, title: 'Online', desc: 'Generelle Fähigkeiten & Krankenzusatz.' },
              { num: 4, title: 'Präsenz', desc: 'Nichtleben & Leben standortnah.' },
              { num: 5, title: 'Prüfung', desc: 'Wir bereiten dich gezielt vor.' }
            ].map(step => (
              <div key={step.num} className="card-custom flex items-start">
                <div className="w-14 h-14 bg-[#D81C1C] text-white rounded-full flex items-center justify-center text-2xl font-bold mr-6 flex-shrink-0">
                  {step.num}
                </div>
                <div>
                  <h3 className="mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-center mb-12">Die 4 Module im Detail</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {modules.map((module, index) => {
              const Icon = iconMap[module.icon];
              return (
                <div key={index} className="card-custom">
                  <div className="flex items-start mb-4">
                    <div className="w-14 h-14 bg-[#D81C1C]/10 text-[#D81C1C] rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                      <Icon size={28} />
                    </div>
                    <div>
                      <h3 className="mb-2">{module.title}</h3>
                      <div className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                        {module.format}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600">{module.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Termin-Matrix */}
      <section className="section-padding bg-[#F6F6F6]">
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
                          className="bg-[#D81C1C] text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#b81717] transition-colors"
                        >
                          Platz sichern
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
                >
                  Platz sichern
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
      <section className="section-padding bg-white">
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
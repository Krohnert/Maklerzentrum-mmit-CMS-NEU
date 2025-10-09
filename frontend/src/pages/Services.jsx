import React from 'react';
import { services } from '../mockData';
import { Link } from 'react-router-dom';
import { 
  FileText, Calculator, Database, Settings, 
  Headphones, Building, Shield, Scale, 
  Phone, GraduationCap 
} from 'lucide-react';

const iconMap = {
  'Administration': FileText,
  'Buchhaltung': Calculator,
  'Bestandespflege': Database,
  'CRM': Settings,
  'Helpdesk': Headphones,
  'Infrastruktur': Building,
  'Qualitätsmanagement': Shield,
  'Rechtspflege': Scale,
  'Kundendienst': Phone,
  'Aus- und Weiterbildung': GraduationCap
};

const Services = () => {
  return (
    <div className="pb-20 lg:pb-0">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white section-padding">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="mb-6">Werde Teil der MZ-Infrastruktur.</h1>
            <p className="text-xl text-gray-600 mb-6">
              Für freie Versicherungsmakler macht die <strong>Power einer starken Infrastruktur</strong> den Unterschied.
            </p>
            <p className="text-lg text-gray-700">
              Du verkaufst – wir halten dir den Rücken frei: Administration, Buchhaltung, Bestand, CRM, Helpdesk, Infrastruktur, Qualität, Recht, Kundendienst und Weiterbildung.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-center mb-12">Unsere Leistungen für dich</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = iconMap[service.title];
              return (
                <div key={index} className="card-custom">
                  <div className="w-14 h-14 bg-[#D81C1C]/10 text-[#D81C1C] rounded-xl flex items-center justify-center mb-4">
                    {Icon && <Icon size={28} />}
                  </div>
                  <h3 className="mb-3">{service.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-[#F6F6F6]">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-6">Interessiert?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Lass uns über deine Bedürfnisse sprechen. Wir finden die richtige Lösung für dich.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/kontakt" className="btn-primary">
                Beratung anfragen
              </Link>
              <a href="tel:+41799486986" className="btn-primary" style={{ backgroundColor: 'white', color: '#D81C1C', border: '2px solid #D81C1C' }}>
                079 948 69 86
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
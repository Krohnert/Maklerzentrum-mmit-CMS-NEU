import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#F6F6F6] border-t border-[#CCCCCC] mt-16">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <img 
              src="https://customer-assets.emergentagent.com/job_68ead48d-3657-47bf-8173-f1b42021a181/artifacts/65e6rt5r_Logo_def_normal.jpg" 
              alt="Maklerzentrum Schweiz AG" 
              className="h-10 w-auto mb-4"
              style={{ objectFit: 'contain' }}
            />
            <div className="flex items-start space-x-2 text-gray-600 mb-3">
              <MapPin size={18} className="mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium">Maklerzentrum Schweiz AG</p>
                <p>Elisabethenanlage 11</p>
                <p>4051 Basel</p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Kontakt</h3>
            <div className="space-y-3">
              <a href="mailto:academy@maklerzentrum.ch" className="flex items-center space-x-2 text-gray-600 hover:text-[#D81C1C] transition-colors">
                <Mail size={18} />
                <span>academy@maklerzentrum.ch</span>
              </a>
              <a href="tel:+41799486986" className="flex items-center space-x-2 text-gray-600 hover:text-[#D81C1C] transition-colors">
                <Phone size={18} />
                <span>079 948 69 86</span>
              </a>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Mo–Fr 08:00–12:00 / 13:00–17:00<br />
              Sprachen: DE, FR, IT
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Rechtliches</h3>
            <div className="space-y-2">
              <Link to="/datenschutz" className="block text-gray-600 hover:text-[#D81C1C] transition-colors">
                Datenschutz
              </Link>
              <Link to="/agb" className="block text-gray-600 hover:text-[#D81C1C] transition-colors">
                AGB
              </Link>
              <Link to="/impressum" className="block text-gray-600 hover:text-[#D81C1C] transition-colors">
                Impressum
              </Link>
            </div>
          </div>
        </div>

        {/* Claim */}
        <div className="mt-12 pt-8 border-t border-[#CCCCCC] text-center">
          <p className="text-xl font-semibold text-gray-800">
            „Keine halben Sachen."
          </p>
          <p className="text-sm text-gray-500 mt-4">
            © {new Date().getFullYear()} Maklerzentrum Schweiz AG. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
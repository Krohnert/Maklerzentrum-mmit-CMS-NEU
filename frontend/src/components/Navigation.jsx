import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const scrollToBooking = (e) => {
    e.preventDefault();
    const bookingElement = document.getElementById('booking');
    if (bookingElement) {
      bookingElement.scrollIntoView({ behavior: 'smooth' });
    } else if (location.pathname !== '/') {
      window.location.href = '/#booking';
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#F6F6F6] shadow-md' : 'bg-[#F6F6F6]/95 backdrop-blur-sm'
      }`}>
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img 
                src="https://customer-assets.emergentagent.com/job_68ead48d-3657-47bf-8173-f1b42021a181/artifacts/65e6rt5r_Logo_def_normal.jpg" 
                alt="Maklerzentrum Schweiz AG" 
                className="h-12 w-auto"
                style={{ objectFit: 'contain' }}
              />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-[#D81C1C] font-medium transition-colors">
                Home
              </Link>
              <Link to="/schulung" className="text-gray-700 hover:text-[#D81C1C] font-medium transition-colors">
                Schulung
              </Link>
              <Link to="/services" className="text-gray-700 hover:text-[#D81C1C] font-medium transition-colors">
                Services
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-[#D81C1C] font-medium transition-colors">
                About us
              </Link>
              <Link to="/kontakt" className="text-gray-700 hover:text-[#D81C1C] font-medium transition-colors">
                Kontakt
              </Link>
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <button onClick={scrollToBooking} className="btn-primary">
                Platz sichern
              </button>
              <a 
                href="https://maklerzentrum-academy.reteach.io/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white text-[#D81C1C] border-2 border-[#D81C1C] rounded-full font-semibold hover:bg-[#D81C1C] hover:text-white transition-colors"
              >
                Anmelden
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-[#D81C1C] transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="container-custom py-6">
              <div className="flex flex-col space-y-4">
                {/* Anmelden Link (Top) */}
                <a 
                  href="https://maklerzentrum-academy.reteach.io/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#D81C1C] font-semibold py-2 text-center bg-[#D81C1C]/10 rounded-lg hover:bg-[#D81C1C]/20 transition-colors"
                >
                  Anmelden (Login)
                </a>
                
                <div className="h-px bg-gray-200"></div>
                
                {/* Menu Items */}
                <Link to="/" className="text-gray-700 hover:text-[#D81C1C] font-medium py-2 transition-colors">
                  Home
                </Link>
                <Link to="/schulung" className="text-gray-700 hover:text-[#D81C1C] font-medium py-2 transition-colors">
                  Schulung
                </Link>
                <Link to="/services" className="text-gray-700 hover:text-[#D81C1C] font-medium py-2 transition-colors">
                  Services
                </Link>
                <Link to="/about" className="text-gray-700 hover:text-[#D81C1C] font-medium py-2 transition-colors">
                  About us
                </Link>
                <Link to="/kontakt" className="text-gray-700 hover:text-[#D81C1C] font-medium py-2 transition-colors">
                  Kontakt
                </Link>
                
                <div className="h-px bg-gray-200 my-2"></div>
                
                {/* CTA Button (Bottom) */}
                <button onClick={scrollToBooking} className="btn-primary w-full">
                  Platz sichern
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
      
      {/* Spacer for fixed nav */}
      <div className="h-20"></div>
    </>
  );
};

export default Navigation;
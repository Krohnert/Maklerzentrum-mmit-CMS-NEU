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
              <a href="/schulung.html" className="text-gray-700 hover:text-[#D81C1C] font-medium transition-colors">
                Schulung
              </a>
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
            <div className="hidden lg:flex items-center space-x-3">
              <button 
                onClick={scrollToBooking} 
                className="bg-gradient-to-br from-[#D81C1C] to-[#c01818] text-white px-5 py-2 rounded-full font-semibold text-sm hover:shadow-lg transition-all shadow-md hover:-translate-y-0.5"
                style={{
                  boxShadow: '0 4px 12px rgba(216, 28, 28, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                }}
              >
                Reservieren
              </button>
              <a 
                href="https://maklerzentrum-academy.reteach.io/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-5 py-2 bg-white text-[#D81C1C] border-2 border-[#D81C1C] rounded-full font-semibold text-sm hover:bg-[#D81C1C] hover:text-white transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                style={{
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
                }}
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
                <a href="/schulung.html" className="text-gray-700 hover:text-[#D81C1C] font-medium py-2 transition-colors">
                  Schulung
                </a>
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
                <button 
                  onClick={scrollToBooking} 
                  className="bg-gradient-to-br from-[#D81C1C] to-[#c01818] text-white py-3 px-6 rounded-full font-semibold hover:shadow-lg transition-all w-full"
                  style={{
                    boxShadow: '0 4px 12px rgba(216, 28, 28, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                  }}
                >
                  Reservieren
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
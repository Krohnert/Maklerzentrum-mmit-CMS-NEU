import React from 'react';
import { Phone } from 'lucide-react';

const MobileStickyCTA = () => {
  const scrollToBooking = (e) => {
    e.preventDefault();
    const bookingElement = document.getElementById('booking');
    if (bookingElement) {
      bookingElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/#booking';
    }
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg">
      <div className="container-custom py-3">
        <div className="flex gap-3">
          <button 
            onClick={scrollToBooking}
            className="flex-1 bg-[#D81C1C] text-white py-3 rounded-full font-semibold text-center hover:bg-[#b81717] transition-colors"
          >
            Platz sichern
          </button>
          <a 
            href="tel:+41799486986"
            className="flex items-center justify-center bg-white border-2 border-[#D81C1C] text-[#D81C1C] py-3 px-6 rounded-full font-semibold hover:bg-[#D81C1C] hover:text-white transition-colors"
          >
            <Phone size={20} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default MobileStickyCTA;
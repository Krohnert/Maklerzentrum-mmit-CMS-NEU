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
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg safe-area-bottom">
      <div className="px-3 py-2.5 pb-safe">
        <div className="flex items-stretch gap-2 max-w-full">
          <button 
            onClick={scrollToBooking}
            className="flex-1 min-w-0 bg-gradient-to-br from-[#D81C1C] to-[#c01818] text-white py-3 rounded-full font-semibold text-sm text-center shadow-md active:shadow-sm transition-all"
            style={{
              boxShadow: '0 4px 12px rgba(216, 28, 28, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            }}
          >
            Reservieren
          </button>
          <a 
            href="tel:+41799486986"
            className="flex items-center justify-center flex-shrink-0 bg-white border-2 border-[#D81C1C] text-[#D81C1C] py-3 px-4 rounded-full font-semibold active:bg-[#D81C1C] active:text-white transition-all shadow-md"
            style={{
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              width: '52px'
            }}
          >
            <Phone size={18} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default MobileStickyCTA;
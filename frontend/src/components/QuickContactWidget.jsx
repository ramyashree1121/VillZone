import React from 'react';
import { Phone } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export default function QuickContactWidget() {
  return (
    <>
      {/* Call Button */}
      <a
        href="tel:+918220524146"
        className="fixed bottom-[152px] right-6 z-[9998] bg-blue-600 text-white p-3 rounded-full shadow-premium hover:scale-110 transition-all hover:shadow-premium-hover flex items-center justify-center group border-2 border-white"
        title="Call Admission Counselor"
      >
        <Phone size={24} className="fill-white" />
        <span className="absolute right-full mr-4 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Call Us
        </span>
      </a>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/918220524146?text=Hello%20VillZone%20International%20School%2C%20I%20am%20interested%20in%20admission."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-[88px] right-6 z-[9998] bg-[#25D366] text-white p-3 rounded-full shadow-premium hover:scale-110 transition-all hover:shadow-premium-hover flex items-center justify-center group border-2 border-white"
        title="WhatsApp Admissions"
      >
        <FaWhatsapp size={24} className="text-white" />
        <span className="absolute right-full mr-4 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          WhatsApp
        </span>
      </a>
    </>
  );
}

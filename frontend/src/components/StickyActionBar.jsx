import React from 'react';
import { Phone, MessageCircle, MapPin } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
export default function StickyActionBar() {
  const phone = '8220524146';
  const whatsappUrl = 'https://wa.me/918220524146?text=Hello%20VillZone%20School,%20I%20would%20like%20to%20know%20more%20about%20admissions%20for%20my%20child.';
  const mapUrl = 'https://www.google.com/maps/search/?api=1&query=VillZone+School+Opposite+Indian+Bank+Near+Annanya+Mahal+Kilpennathur+Tiruvannamalai+Tamil+Nadu';

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-slate-900/90 backdrop-blur-md border-t border-white/10 shadow-[0_-8px_30px_rgb(0,0,0,0.12)] px-4 py-3">
      <div className="grid grid-cols-3 gap-2.5">
        <a
          href={`tel:+91${phone}`}
          className="flex items-center justify-center py-3 rounded-xl bg-primary hover:bg-primary-light text-white transition-all active:scale-95"
          title="Call Now"
        >
          <Phone size={24} />
        </a>
        
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba56] text-white transition-all active:scale-95"
          title="WhatsApp"
        >
          <FaWhatsapp size={24} className="text-white" />
        </a>

        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center py-3 rounded-xl bg-accent hover:bg-accent-light text-primary-dark transition-all active:scale-95"
          title="Directions"
        >
          <MapPin size={24} />
        </a>
      </div>
    </div>
  );
}

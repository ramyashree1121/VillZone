import React, { useState } from 'react';
import Lightbox from '../components/Lightbox';
import AnimatedSection from '../components/AnimatedSection';

export default function Infrastructure() {
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const photos = [
    { type: 'Exterior', title: 'Drone-View of Main School Block', imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1000' },
    { type: 'Exterior', title: 'Grand Primary Playing Field', imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=1000' },
    { type: 'Interior', title: 'Premium Computer Laboratory', imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1000' },
    { type: 'Interior', title: 'Smartboard-Integrated Classroom', imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=1000' },
    { type: 'Interior', title: 'Equipped Biology Lab Station', imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1000' },
    { type: 'Exterior', title: 'Eco-Friendly Student Assembly Courtyard', imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000' }
  ];

  return (
    <div className="pt-0 bg-slate-50 min-h-screen">
      
      {/* Banner */}
      <section className="bg-primary text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1000')" }} />
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl font-extrabold mb-2">Campus Infrastructure</h1>
          <p className="text-slate-200 max-w-xl mx-auto font-light">Explore our academic campus, layouts, and drone views.</p>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {photos.map((photo, idx) => (
              <AnimatedSection
                key={idx}
                delay={(idx % 3) * 0.05}
                className="bg-white rounded-2xl overflow-hidden shadow-premium border border-slate-100 hover:shadow-premium-hover cursor-pointer group"
                onClick={() => setLightboxIndex(idx)}
              >
                <div className="relative h-60 overflow-hidden bg-slate-100">
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full shadow-sm">
                    {photo.type}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-primary text-base leading-tight group-hover:text-secondary transition-colors duration-300">
                    {photo.title}
                  </h3>
                </div>
              </AnimatedSection>
            ))}
          </div>

        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxIndex !== -1 && (
        <Lightbox
          images={photos}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(-1)}
          onPrev={() => setLightboxIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1))}
          onNext={() => setLightboxIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0))}
        />
      )}

    </div>
  );
}

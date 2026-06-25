import React from 'react';
import { Monitor, BookOpen, Microscope, ShieldCheck, Activity, Users, Truck, Heart, Film, Radio } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

export default function Facilities() {
  const facilityCards = [
    { icon: Monitor, title: 'Smart Classrooms', desc: 'Pre-equipped with premium interactive whiteboards, acoustic speakers, and digital textbooks to encourage visual discovery.', image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=600' },
    { icon: Microscope, title: 'Science Labs', desc: 'Fully functional laboratories for Physics, Chemistry, and Biology to support CBSE practical exams and scientific experiment cycles.', image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=600' },
    { icon: Radio, title: 'Computer Science Labs', desc: 'Dedicated desktops for every pupil supporting Python programming, web development, and foundational office software.', image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=600' },
    { icon: BookOpen, title: 'Modern Library', desc: 'Housing over 8,000 academic texts, reference guides, national newspapers, and digital e-book journals.', image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=600' },
    { icon: Activity, title: 'Athletic Playground', desc: 'Walled open ground supporting cricket, football, running tracks, and archery setups under specialist coach mentorship.', image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=600' },
    { icon: Truck, title: 'Safe Transport fleet', desc: 'Speed-governed, GPS-enabled buses with female helpers to fetch students from rural locations and local urban blocks.', image: 'https://images.unsplash.com/photo-1557223562-6c77ef16210f?auto=format&fit=crop&q=80&w=600' },
    { icon: Film, title: 'Auditorium Hall', desc: 'Air-conditioned multi-utility indoor auditorium to seat 600 students during annual exhibitions, debates, and board meetings.', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600' },
    { icon: ShieldCheck, title: '24/7 CCTV & Safety', desc: 'Guarded gate points and camera feeds across all main corridors, lobbies, and classrooms to assure absolute safety.', image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=600' },
    { icon: Heart, title: 'Medical Clinic Room', desc: 'Staffed by a resident nurse with emergency medicine supplies and direct links to city hospital ambulance services.', image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600' }
  ];

  return (
    <div className="pt-24 bg-slate-50 min-h-screen">
      
      {/* Banner */}
      <section className="bg-primary text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1000')" }} />
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl font-extrabold mb-2">Campus Facilities</h1>
          <p className="text-slate-200 max-w-xl mx-auto font-light">Supporting modern, comprehensive academic growth through high-standard resources.</p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {facilityCards.map((fac, idx) => {
              const Icon = fac.icon;
              return (
                <AnimatedSection key={idx} delay={(idx % 3) * 0.05} className="bg-white rounded-2xl overflow-hidden shadow-premium border border-slate-100 group flex flex-col justify-between hover:shadow-premium-hover hover:-translate-y-1 transition-all duration-300">
                  
                  {/* Zoom Image */}
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img
                      src={fac.image}
                      alt={fac.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute bottom-4 left-4 p-2.5 rounded-xl bg-primary text-white shadow-md">
                      <Icon size={20} />
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="font-extrabold text-primary text-xl mb-2">{fac.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed mb-4">{fac.desc}</p>
                    </div>
                    <div className="text-xs font-bold text-secondary flex items-center gap-1.5 mt-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary" /> Active & Fully Equipped
                    </div>
                  </div>

                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}

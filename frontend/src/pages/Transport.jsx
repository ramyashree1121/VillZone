import React from 'react';
import { Truck, MapPin, ShieldCheck, Compass } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

export default function Transport() {
  const routes = [
    { name: 'Route A (Urban Area)', stops: ['Siddha Enclave', 'Gandhi Circle', 'Bypass Ring Road', 'School Campus'] },
    { name: 'Route B (Semi-Urban Sector)', stops: ['Kovil Patty bypass', 'NH7 Junction', 'Patel Nagar Lobbies', 'School Campus'] },
    { name: 'Route C (Rural Sector East)', stops: ['Palaya Taluk', 'Sengal Patty junction', 'Muthu Colony', 'School Campus'] }
  ];

  return (
    <div className="pt-0 bg-slate-50 min-h-screen">
      
      {/* Banner */}
      <section className="bg-primary text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1557223562-6c77ef16210f?auto=format&fit=crop&q=80&w=1000')" }} />
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl font-extrabold mb-2">School Transport</h1>
          <p className="text-slate-200 max-w-xl mx-auto font-light">Safe, GPS-monitored student pick-up and drops across key local sectors.</p>
        </div>
      </section>

      {/* Info & Routes */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <AnimatedSection>
            <h2 className="text-3xl font-extrabold text-primary mb-6">GPS Tracking & Bus Safety</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              We operate a modern, certified fleet of yellow school buses. Each bus is speed-governed to a maximum of 40 km/h and features a fully active GPS tracking transponder. Parents can track exact coordinates in real-time through the school mobile app.
            </p>
            <div className="space-y-4 mb-6">
              {[
                { title: 'Attendants Onboard', desc: 'Every bus is staffed by an experienced driver and a female caretaker.' },
                { title: 'Emergency First-Aid', desc: 'Equipped with medical kits and immediate fire extinguisher access.' },
                { title: 'Safety Audits', desc: 'Routinely audited by regional transport officials.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-3">
                  <ShieldCheck size={20} className="text-secondary shrink-0" />
                  <div>
                    <h4 className="font-bold text-primary text-sm">{item.title}</h4>
                    <p className="text-slate-500 text-xs mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-premium">
            <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
              <Compass className="text-secondary" /> Active Bus Routes
            </h3>
            <div className="space-y-6">
              {routes.map((rt, index) => (
                <div key={index} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <h4 className="font-bold text-primary text-sm mb-3 flex items-center gap-1.5">
                    <Truck size={16} /> {rt.name}
                  </h4>
                  <div className="flex flex-wrap items-center gap-2">
                    {rt.stops.map((stop, sidx) => (
                      <React.Fragment key={sidx}>
                        <span className="text-xs bg-white border px-2.5 py-1 rounded-full font-medium text-slate-600 flex items-center gap-1 shadow-sm">
                          <MapPin size={10} className="text-slate-400" /> {stop}
                        </span>
                        {sidx < rt.stops.length - 1 && <span className="text-slate-400 text-xs font-bold">→</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

        </div>
      </section>

    </div>
  );
}

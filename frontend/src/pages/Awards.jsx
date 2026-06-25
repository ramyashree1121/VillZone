import React from 'react';
import { Award, Trophy, ShieldCheck, Star } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

export default function Awards() {
  const awards = [
    { type: 'Institutional', title: 'Best Regional School Award (2024)', desc: 'Conferred by the State Development Board for exceptional community educational services and digital penetration.', icon: Trophy, imageUrl: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&q=80&w=800' },
    { type: 'Academic', title: '100% CBSE Board Pass Merit', desc: 'Sustained record of centum results and top marks in local CBSE district inspections.', icon: Award, imageUrl: 'https://images.unsplash.com/photo-1604574762244-7c179777d4ab?auto=format&fit=crop&q=80&w=800' },
    { type: 'Sports', title: 'Inter-District Football Shield (2025)', desc: 'Champion trophies secured by our Senior boys team in the Under-19 category.', icon: Star, imageUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=800' },
    { type: 'Certification', title: 'ISO 9001:2015 Safety Standard', desc: 'Recognized for top structural safety, CCTV coverage standards, and hygienic water supply plants.', icon: ShieldCheck, imageUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=800' },
    { type: 'Cultural', title: 'State-Level Youth Festival Winner (2025)', desc: 'First prize in group dance and second in solo singing at the Tamil Nadu State Youth Festival.', icon: Trophy, imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800' },
    { type: 'Academic', title: 'National Science Olympiad Gold', desc: 'Three students secured Gold medals in the National Science Olympiad with all-India rankings.', icon: Award, imageUrl: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=800' },
    { type: 'Sports', title: 'District Athletics Championship', desc: 'Overall champions with 12 Gold, 8 Silver medals in U-14 and U-17 categories.', icon: Star, imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800' },
    { type: 'Institutional', title: 'Green School Certification (2025)', desc: 'Awarded by the Environmental Protection Board for sustainable campus practices and tree plantation drives.', icon: ShieldCheck, imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800' }
  ];

  return (
    <div className="pt-0 bg-slate-50 min-h-screen">

      {/* Banner */}
      <section className="bg-primary text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=1000')" }} />
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl font-extrabold mb-2">Awards & Recognition</h1>
          <p className="text-slate-200 max-w-xl mx-auto font-light">Accreditations, trophy honors, and educational ratings.</p>
        </div>
      </section>

      {/* Showcase Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {awards.map((aw, idx) => {
              const Icon = aw.icon;
              return (
                <AnimatedSection key={idx} delay={idx * 0.05} className="bg-white rounded-2xl border border-slate-100 shadow-premium overflow-hidden hover:shadow-premium-hover hover:-translate-y-1 transition-all duration-300">
                  <div className="relative h-52 overflow-hidden bg-slate-100">
                    {aw.imageUrl && (
                      <img
                        src={aw.imageUrl}
                        alt={aw.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                        <Icon size={20} className="text-white" />
                      </div>
                      <span className="text-[10px] font-extrabold uppercase text-white tracking-widest bg-white/20 backdrop-blur-md px-2 py-1 rounded-md">
                        {aw.type}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-extrabold text-primary text-lg mb-2">{aw.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{aw.desc}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Award Ceremony Photos & Videos */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-xs uppercase tracking-widest text-secondary font-bold mb-2">Media Coverage</h2>
            <h3 className="text-3xl font-bold text-primary">Award Ceremony Highlights</h3>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatedSection delay={0} className="bg-white rounded-2xl overflow-hidden shadow-premium border border-slate-100 hover:shadow-premium-hover transition-shadow duration-300 group">
              <div className="relative h-48 overflow-hidden bg-slate-50">
                <img src="https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=80&w=800" alt="Award Ceremony Stage" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4">
                <h4 className="font-bold text-primary text-sm">Best School Award 2024 - Ceremony</h4>
                <p className="text-xs text-slate-500 mt-1">Principal receiving the trophy at the State Development Board convention.</p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.05} className="bg-white rounded-2xl overflow-hidden shadow-premium border border-slate-100 hover:shadow-premium-hover transition-shadow duration-300 group">
              <div className="relative h-48 overflow-hidden bg-slate-50">
                <img src="https://images.unsplash.com/photo-1529543544282-ea9620f946f6?auto=format&fit=crop&q=80&w=800" alt="CBSE Merit Celebration" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4">
                <h4 className="font-bold text-primary text-sm">100% Board Pass Celebration</h4>
                <p className="text-xs text-slate-500 mt-1">Students and teachers celebrating the centum result achievement.</p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1} className="bg-white rounded-2xl overflow-hidden shadow-premium border border-slate-100 hover:shadow-premium-hover transition-shadow duration-300 group">
              <div className="relative h-48 overflow-hidden bg-slate-50">
                <img src="https://images.unsplash.com/photo-1461896836934-bd45ba8fcf9b?auto=format&fit=crop&q=80&w=800" alt="Football Shield Victory" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4">
                <h4 className="font-bold text-primary text-sm">Inter-District Football Shield 2025</h4>
                <p className="text-xs text-slate-500 mt-1">Victorious team with the championship trophy on the field.</p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15} className="bg-white rounded-2xl overflow-hidden shadow-premium border border-slate-100 hover:shadow-premium-hover transition-shadow duration-300 group">
              <div className="relative h-48 overflow-hidden bg-slate-50">
                <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Award Ceremony Video" className="w-full h-full" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              </div>
              <div className="p-4">
                <h4 className="font-bold text-primary text-sm">📹 Full Award Ceremony Video</h4>
                <p className="text-xs text-slate-500 mt-1">Watch the complete award ceremony highlights and speeches.</p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2} className="bg-white rounded-2xl overflow-hidden shadow-premium border border-slate-100 hover:shadow-premium-hover transition-shadow duration-300 group">
              <div className="relative h-48 overflow-hidden bg-slate-50">
                <img src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=800" alt="ISO Certification" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4">
                <h4 className="font-bold text-primary text-sm">ISO 9001:2015 Certification Event</h4>
                <p className="text-xs text-slate-500 mt-1">School management receiving the ISO safety standard certificate.</p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.25} className="bg-white rounded-2xl overflow-hidden shadow-premium border border-slate-100 hover:shadow-premium-hover transition-shadow duration-300 group">
              <div className="relative h-48 overflow-hidden bg-slate-50">
                <img src="https://images.unsplash.com/photo-1579829366248-204fe84e74f6?auto=format&fit=crop&q=80&w=800" alt="📹 Sports Highlights" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center">
                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h4 className="font-bold text-primary text-sm">📹 Sports Achievements Reel</h4>
                <p className="text-xs text-slate-500 mt-1">Compilation of our champion teams and athletic victories.</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

    </div>
  );
}

import React from 'react';
import { Calendar, Award, Star, BookOpen, Clock } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

export default function AboutSchool() {
  const timelineEvents = [
    { year: '2001', title: 'Foundation Laid', desc: 'VillZone Academy was founded with just 50 students in a single classroom block to serve rural families.' },
    { year: '2007', title: 'Middle School Extension', desc: 'Upgraded to a middle school, adding science labs and a primary sports playground.' },
    { year: '2012', title: 'High School & Board Affiliation', desc: 'Affiliated with the State Board and CBSE streams. Expanded computer laboratories and libraries.' },
    { year: '2018', title: 'Smart Campus Transformation', desc: 'Equipped classrooms with high-speed internet, smartboards, and introduced the GPS transport system.' },
    { year: '2025', title: 'Silver Jubilee & Tech Lab Launch', desc: 'Celebrating 25 years of excellence with a new drone tech center and premium sports complex.' }
  ];

  return (
    <div className="pt-0 bg-slate-50 min-h-screen">
      
      {/* Header Banner */}
      <section className="bg-primary text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1000')" }} />
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl font-extrabold mb-2">About Our School</h1>
          <p className="text-slate-200 max-w-xl mx-auto font-light">Rooted in community values, aligned with global standards.</p>
        </div>
      </section>

      {/* Main Info */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <AnimatedSection>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-primary mb-6">Welcome to VillZone International School</h2>
              <p className="text-slate-600 mb-4 leading-relaxed">
                Founded with a vision to provide state-of-the-art educational opportunities, VillZone International School has emerged as a beacon of academic rigor and character building. We serve a diverse community, offering students the best resources from both rural backgrounds and urban tech ecosystems.
              </p>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Our twin curriculum pathways (CBSE and State Board) allow children to excel based on their specific aspirations, whether aiming for national competitive exams or local industrial engineering careers.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 bg-white rounded-xl shadow-premium border border-slate-100">
                  <span className="block text-2xl font-bold text-secondary">25+ Yrs</span>
                  <span className="text-xs text-slate-500 font-semibold uppercase">Academic Excellence</span>
                </div>
                <div className="p-4 bg-white rounded-xl shadow-premium border border-slate-100">
                  <span className="block text-2xl font-bold text-accent">Grade A</span>
                  <span className="text-xs text-slate-500 font-semibold uppercase">CBSE Affiliated Rating</span>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="rounded-2xl overflow-hidden shadow-premium border-4 border-white">
                <img src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=800" alt="School assembly hall" className="w-full h-80 object-cover" />
              </div>
            </AnimatedSection>

          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection className="mb-12 max-w-2xl mx-auto">
            <h2 className="text-xs uppercase tracking-widest text-secondary font-bold mb-2">Our Pillars</h2>
            <h3 className="text-3xl font-bold text-primary">Core Values We Live By</h3>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: BookOpen, title: 'Academic Focus', desc: 'Instilling a deep drive for continuous knowledge, logical exploration, and excellence.' },
              { icon: Award, title: 'Growth Mindset', desc: 'Encouraging children to view setbacks as steps toward ultimate capability development.' },
              { icon: Star, title: 'Safety & Respect', desc: 'A strict zero-tolerance campus safety protocol to guarantee peace of mind for parents.' }
            ].map((value, i) => {
              const Icon = value.icon;
              return (
                <AnimatedSection key={i} delay={i * 0.1} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-premium hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4">
                    <Icon size={24} />
                  </div>
                  <h4 className="font-bold text-primary text-lg mb-2">{value.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{value.desc}</p>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Timeline */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-xs uppercase tracking-widest text-secondary font-bold mb-2">The Journey</h2>
            <h3 className="text-3xl font-bold text-primary">Timeline of Our Achievements</h3>
          </AnimatedSection>

          <div className="relative border-l-2 border-primary/20 ml-4 md:ml-32">
            {timelineEvents.map((ev, index) => (
              <AnimatedSection key={index} delay={index * 0.1} className="mb-12 relative pl-8 md:pl-12">
                {/* Year Label */}
                <div className="absolute -left-12 md:-left-36 top-1.5 hidden md:block w-24 text-right">
                  <span className="text-xl font-extrabold text-primary">{ev.year}</span>
                </div>

                {/* Timeline Dot */}
                <div className="absolute -left-2 top-2 w-4 h-4 rounded-full bg-secondary border-4 border-white ring-2 ring-secondary/35" />

                {/* Timeline Box */}
                <div className="bg-white p-6 rounded-2xl shadow-premium border border-slate-100 hover:border-secondary transition-colors duration-300">
                  <span className="text-sm font-bold text-secondary md:hidden block mb-1">{ev.year}</span>
                  <h4 className="text-lg font-bold text-primary mb-2 flex items-center gap-2">
                    <Clock size={16} className="text-slate-400" /> {ev.title}
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{ev.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

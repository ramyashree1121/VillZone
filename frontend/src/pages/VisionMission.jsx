import React from 'react';
import { Target, Compass, Award, Lightbulb } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

export default function VisionMission() {
  return (
    <div className="pt-0 bg-slate-50 min-h-screen">
      
      {/* Banner */}
      <section className="bg-primary text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1000')" }} />
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl font-extrabold mb-2">Vision & Mission</h1>
          <p className="text-slate-200 max-w-xl mx-auto font-light">Defining our priorities, strategies, and code of development.</p>
        </div>
      </section>

      {/* Cards */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Vision */}
            <AnimatedSection className="bg-white p-8 rounded-2xl border border-slate-100 shadow-premium flex flex-col justify-between hover:shadow-premium-hover transition-shadow duration-300">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                  <Lightbulb size={30} />
                </div>
                <h3 className="text-2xl font-extrabold text-primary mb-4">Our Vision</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  To become a global model for holistic educational delivery, enabling children from both rural and urban areas to unleash their maximum intellectual potential, drive socio-economic development, and stand as leaders of moral and technological progress.
                </p>
              </div>
              <div className="border-t border-slate-100 pt-4 text-xs font-bold text-secondary uppercase tracking-widest">
                Inspire • Elevate • Empower
              </div>
            </AnimatedSection>

            {/* Mission */}
            <AnimatedSection className="bg-white p-8 rounded-2xl border border-slate-100 shadow-premium flex flex-col justify-between hover:shadow-premium-hover transition-shadow duration-300">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center mb-6">
                  <Compass size={30} />
                </div>
                <h3 className="text-2xl font-extrabold text-primary mb-4">Our Mission</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  To offer a robust, dual-curriculum academic pipeline supported by digital smart classes and comprehensive laboratories. We aim to nurture ethical self-discipline, safety awareness, and active co-curricular engagement while offering customized career coaching sessions.
                </p>
              </div>
              <div className="border-t border-slate-100 pt-4 text-xs font-bold text-primary uppercase tracking-widest">
                Educate • Cultivate • Innovate
              </div>
            </AnimatedSection>

          </div>

          {/* Student Core Values Code */}
          <AnimatedSection className="bg-white p-8 rounded-2xl border border-slate-100 shadow-premium">
            <h3 className="text-2xl font-extrabold text-primary mb-8 text-center">Student Core Value Code</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { title: 'Honesty', desc: 'Acting with truth, integrity, and ethical responsibility in daily study.' },
                { title: 'Safety First', desc: 'Promoting a peaceful, supportive, and secure classroom community.' },
                { title: 'Innovation', desc: 'Exploring design-thinking, science fairs, and tech projects.' },
                { title: 'Empathy', desc: 'Respecting diverse backgrounds and supporting peers in need.' }
              ].map((val, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <h4 className="font-bold text-primary text-base mb-1">{val.title}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">{val.desc}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>

        </div>
      </section>

    </div>
  );
}

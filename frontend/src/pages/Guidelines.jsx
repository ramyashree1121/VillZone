import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

export default function Guidelines() {
  const dos = [
    'Arrive at school by 8:15 AM dressed in clean, ironed uniform.',
    'Regularly complete class homework and review portal announcements.',
    'Keep classrooms clean and deposit trash in designated bins.',
    'Address all teachers, caretakers, and peers with absolute respect.',
    'Use handrails on stairs and follow safety instructions in laboratories.'
  ];

  const donts = [
    'Do not bring smartwatches, cellular phones, or gadgets to classes.',
    'Do not engage in verbal abuse, physical fights, or cyber-bullying.',
    'Do not damage school property, scribble on tables, or pull lab equipment.',
    'Do not take leaves without written leave applications signed by parents.',
    'Do not litter corridors or enter restricted server/electrical panels.'
  ];

  return (
    <div className="pt-0 bg-slate-50 min-h-screen">
      
      {/* Banner */}
      <section className="bg-primary text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=1000')" }} />
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl font-extrabold mb-2">Student & Parent Guidelines</h1>
          <p className="text-slate-200 max-w-xl mx-auto font-light">Simple checklists of acceptable and unacceptable conduct on campus.</p>
        </div>
      </section>

      {/* Lists */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Do's */}
          <AnimatedSection className="bg-white p-8 rounded-2xl border border-slate-100 shadow-premium">
            <h3 className="text-xl font-bold text-secondary flex items-center gap-2 mb-6">
              <CheckCircle2 /> The DO's
            </h3>
            <ul className="space-y-4">
              {dos.map((item, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0 mt-2" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </AnimatedSection>

          {/* Don'ts */}
          <AnimatedSection className="bg-white p-8 rounded-2xl border border-slate-100 shadow-premium">
            <h3 className="text-xl font-bold text-red-500 flex items-center gap-2 mb-6">
              <XCircle /> The DONT's
            </h3>
            <ul className="space-y-4">
              {donts.map((item, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-2" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </AnimatedSection>

        </div>
      </section>

    </div>
  );
}

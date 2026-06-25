import React, { useState } from 'react';
import { ChevronDown, ShieldAlert, Award, FileText } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

export default function RulesRegulations() {
  const [openIdx, setOpenIdx] = useState(0);

  const rules = [
    {
      title: 'Attendance Policies',
      desc: 'Students must maintain a minimum of 75% attendance during the sessional year to be eligible to sit for CBSE/State Board final exams. Leave applications must be signed by parents and submitted ahead of time.'
    },
    {
      title: 'Discipline & Conduct',
      desc: 'Bullying, discrimination, or physical altercation will lead to immediate suspension. Smart devices, phones, or gaming gadgets are strictly banned inside classrooms.'
    },
    {
      title: 'Examination Rules',
      desc: 'Cheating, copying, or carrying chits into exam halls will lead to immediate disqualification and academic grade failure. Attendance during Term Finals is compulsory.'
    },
    {
      title: 'General Guidelines',
      desc: 'Students should report in complete uniform by 8:15 AM. Entry after 8:30 AM will not be allowed without principal authorization.'
    }
  ];

  return (
    <div className="pt-0 bg-slate-50 min-h-screen">
      
      {/* Banner */}
      <section className="bg-primary text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=1000')" }} />
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl font-extrabold mb-2">Rules & Regulations</h1>
          <p className="text-slate-200 max-w-xl mx-auto font-light">Academic codes of conduct, discipline guidelines, and exam criteria.</p>
        </div>
      </section>

      {/* Accordion list */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="space-y-4">
            {rules.map((rule, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.05} className="bg-white rounded-2xl border border-slate-100 shadow-premium overflow-hidden">
                <button
                  onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-primary text-base hover:bg-slate-50 transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    {idx === 0 ? <FileText size={18} className="text-secondary" /> : <ShieldAlert size={18} className="text-secondary" />}
                    {rule.title}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`text-slate-400 transition-transform duration-300 ${openIdx === idx ? 'rotate-180' : ''}`}
                  />
                </button>
                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    openIdx === idx ? 'max-h-48 border-t border-slate-50' : 'max-h-0'
                  }`}
                >
                  <p className="p-6 text-slate-600 text-sm leading-relaxed bg-slate-50">
                    {rule.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

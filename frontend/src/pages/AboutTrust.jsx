import React from 'react';
import { Shield, Sparkles, Target, Award } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

export default function AboutTrust() {
  return (
    <div className="pt-0 bg-slate-50 min-h-screen">
      
      {/* Banner */}
      <section className="bg-primary text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1000')" }} />
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl font-extrabold mb-2">About The Trust</h1>
          <p className="text-slate-200 max-w-xl mx-auto font-light">VillZone Educational Trust: Empowering communities through affordable, premium education.</p>
        </div>
      </section>

      {/* Trust Vision */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <AnimatedSection>
              <h2 className="text-3xl font-extrabold text-primary mb-6">VillZone Educational Trust</h2>
              <p className="text-slate-600 mb-4 leading-relaxed">
                Established in 1998, the VillZone Educational Trust was formed by a group of philanthropic visionaries, industry leaders, and academic veterans. The trust's core mission is to construct state-of-the-art educational campuses in semi-urban and developing regions to prevent capital flight and educational inequality.
              </p>
              <p className="text-slate-600 mb-6 leading-relaxed">
                By maintaining a highly subsidized fee structure while offering matching international school facilities, the trust has supported over 10,000 scholarship students to pursue engineering, research, and medical careers globally.
              </p>
              
              <div className="space-y-4">
                {[
                  { title: 'Visionary Founders', desc: 'Managed by former education officers and tech entrepreneurs.' },
                  { title: 'Financial Assistance', desc: 'Over ₹50 Lakhs distributed yearly in academic scholarships.' },
                  { title: 'Social Integration', desc: 'Regular digital skill programs for villagers around the campus.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-5 h-5 rounded-full bg-secondary text-white flex items-center justify-center shrink-0 mt-1">
                      <span className="text-[10px]">✔</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-primary text-sm">{item.title}</h4>
                      <p className="text-slate-500 text-xs mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-premium">
                <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                  <Target className="text-secondary" /> Trust Commitments
                </h3>
                <div className="space-y-6">
                  {[
                    { label: 'Quality Infrastructure', desc: 'Building fully digital science laboratories and smart classrooms in rural districts.' },
                    { label: 'Holistic Development', desc: 'Promoting sports complexes, activity labs, and personality mentorship programs.' },
                    { label: 'Ethical Upbringing', desc: 'Integrating traditional Indian values and digital citizenship skills.' }
                  ].map((com, index) => (
                    <div key={index} className="border-l-4 border-secondary pl-4 py-1">
                      <h4 className="font-bold text-slate-800 text-sm">{com.label}</h4>
                      <p className="text-slate-500 text-xs mt-1 leading-relaxed">{com.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

          </div>
        </div>
      </section>

    </div>
  );
}

import React from 'react';
import { Mail, ShieldCheck, GraduationCap } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

export default function Management() {
  const leadership = [
    {
      role: 'Correspondent',
      name: 'Dr. Vikram A. Dev, Ph.D.',
      qualification: 'M.Tech, Ph.D. (IIT Madras), Former Advisor to Education Board',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
      message: 'Education is the most powerful tool to bridge societal divisions. At VillZone, our goal is to build an environment where students from every background gain absolute mastery in both sciences and life ethics. We ensure that our infrastructure matches international colleges, giving rural students equal chances at national ranks.',
      email: 'correspondent@villzoneschool.edu.in'
    },
    {
      role: 'Principal',
      name: 'Mrs. Shalini R. Prasad, M.Ed.',
      qualification: 'M.Sc., M.Ed., 18+ Years Administrative Experience in Top CBSE Schools',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
      message: 'School is not just about writing exams; it is about exploring fields, finding talents, and cultivating self-discipline. Our CBSE and State Board courses are designed with active visual methods to prepare students for real-world application. My door is always open to parents who wish to collaborate on their child\'s developmental journey.',
      email: 'principal@villzoneschool.edu.in'
    }
  ];

  return (
    <div className="pt-0 bg-slate-50 min-h-screen">
      
      {/* Banner */}
      <section className="bg-primary text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1000')" }} />
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl font-extrabold mb-2">School Management</h1>
          <p className="text-slate-200 max-w-xl mx-auto font-light">Leading with expertise, commitment, and a vision for future growth.</p>
        </div>
      </section>

      {/* Leadership Messages */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {leadership.map((leader, index) => (
            <AnimatedSection key={index} className="bg-white rounded-2xl shadow-premium border border-slate-100 overflow-hidden grid grid-cols-1 md:grid-cols-3">
              
              {/* Leader Photo */}
              <div className="relative group overflow-hidden md:col-span-1 min-h-[300px] bg-slate-100 flex items-center justify-center">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-primary/95 text-accent font-bold text-xs uppercase px-3.5 py-1.5 rounded-full shadow-md">
                  {leader.role}
                </div>
              </div>

              {/* Leader Content */}
              <div className="p-8 md:p-10 md:col-span-2 flex flex-col justify-center">
                <h3 className="text-2xl font-extrabold text-primary mb-1">{leader.name}</h3>
                <span className="text-sm font-semibold text-secondary mb-6 block">{leader.qualification}</span>
                
                <blockquote className="text-slate-600 text-sm leading-relaxed italic mb-6 relative">
                  <span className="text-4xl text-primary/10 absolute -top-4 -left-3 font-serif">“</span>
                  {leader.message}
                </blockquote>

                <div className="border-t border-slate-100 pt-6 flex flex-wrap gap-4 justify-between items-center text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-secondary" />
                    <span>{leader.email}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                    <ShieldCheck size={16} className="text-secondary" />
                    <span>Verified Management Member</span>
                  </div>
                </div>
              </div>

            </AnimatedSection>
          ))}

        </div>
      </section>

    </div>
  );
}

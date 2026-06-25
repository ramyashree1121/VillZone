import React from 'react';
import { Target, Music, Lightbulb, Heart } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

export default function Activities() {
  const activities = [
    { icon: Target, title: 'Sports & Athletics', desc: 'Football, cricket nets, kabaddi tournaments, and track-and-field training schedules with dedicated coaches.', imageUrl: 'https://images.unsplash.com/photo-1461896836934-bd45ba8fcf9b?auto=format&fit=crop&q=80&w=800' },
    { icon: Music, title: 'Dance & Music', desc: 'Sessional classes in classical Carnatic vocals, modern instruments (keyboard, guitar), and traditional folk dance formats.', imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800' },
    { icon: Heart, title: 'Yoga & Mindfulness', desc: 'Bi-weekly morning assembly sessions focused on relaxation postures, focus building, and emotional stability.', imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800' },
    { icon: Lightbulb, title: 'Science & Robotics Club', desc: 'Design thinking workshop modules for assembly of micro-processors, drone components, and eco-friendly machinery.', imageUrl: 'https://images.unsplash.com/photo-1581092921461-39b21c1e4f43?auto=format&fit=crop&q=80&w=800' }
  ];

  return (
    <div className="pt-0 bg-slate-50 min-h-screen">

      {/* Banner */}
      <section className="bg-primary text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=1000')" }} />
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl font-extrabold mb-2">Co-Curricular Activities</h1>
          <p className="text-slate-200 max-w-xl mx-auto font-light">Nurturing creative passions, teamwork, and healthy lifestyle choices.</p>
        </div>
      </section>

      {/* Activity Cards with Images */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {activities.map((act, idx) => {
              const Icon = act.icon;
              return (
                <AnimatedSection key={idx} delay={idx * 0.05} className="bg-white rounded-2xl border border-slate-100 shadow-premium overflow-hidden hover:shadow-premium-hover transition-all duration-300 group">
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img
                      src={act.imageUrl}
                      alt={act.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-4 left-4 w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                      <Icon size={24} className="text-white" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-extrabold text-primary text-lg mb-2">{act.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{act.desc}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Activity Photos & Videos Gallery */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-xs uppercase tracking-widest text-secondary font-bold mb-2">Activity Highlights</h2>
            <h3 className="text-3xl font-bold text-primary">More Photos & Videos</h3>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatedSection delay={0} className="bg-white rounded-2xl overflow-hidden shadow-premium border border-slate-100 hover:shadow-premium-hover transition-shadow duration-300 group">
              <div className="relative h-48 overflow-hidden bg-slate-50">
                <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800" alt="Sports Day" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-3">
                <h4 className="font-bold text-primary text-xs">Annual Sports Day 2025</h4>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.05} className="bg-white rounded-2xl overflow-hidden shadow-premium border border-slate-100 hover:shadow-premium-hover transition-shadow duration-300 group">
              <div className="relative h-48 overflow-hidden bg-slate-50">
                <img src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=800" alt="Dance Performance" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-3">
                <h4 className="font-bold text-primary text-xs">Traditional Dance Performance</h4>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1} className="bg-white rounded-2xl overflow-hidden shadow-premium border border-slate-100 hover:shadow-premium-hover transition-shadow duration-300 group">
              <div className="relative h-48 overflow-hidden bg-slate-50">
                <img src="https://images.unsplash.com/photo-1518314911008-8fef36c8c529?auto=format&fit=crop&q=80&w=800" alt="Music Band" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-3">
                <h4 className="font-bold text-primary text-xs">School Music Band Session</h4>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15} className="bg-white rounded-2xl overflow-hidden shadow-premium border border-slate-100 hover:shadow-premium-hover transition-shadow duration-300 group">
              <div className="relative h-48 overflow-hidden bg-slate-50">
                <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Video Highlight" className="w-full h-full" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              </div>
              <div className="p-3">
                <h4 className="font-bold text-primary text-xs">📹 Activity Highlights Reel</h4>
              </div>
            </AnimatedSection>
          </div>

          {/* Second row of activity images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            <AnimatedSection delay={0.2} className="bg-white rounded-2xl overflow-hidden shadow-premium border border-slate-100 hover:shadow-premium-hover transition-shadow duration-300 group">
              <div className="relative h-48 overflow-hidden bg-slate-50">
                <img src="https://images.unsplash.com/photo-1599058917765-a780eda07a3e?auto=format&fit=crop&q=80&w=800" alt="Yoga Session" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-3">
                <h4 className="font-bold text-primary text-xs">Morning Yoga Assembly</h4>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.25} className="bg-white rounded-2xl overflow-hidden shadow-premium border border-slate-100 hover:shadow-premium-hover transition-shadow duration-300 group">
              <div className="relative h-48 overflow-hidden bg-slate-50">
                <img src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800" alt="Robotics Lab" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-3">
                <h4 className="font-bold text-primary text-xs">Robotics Club Workshop</h4>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3} className="bg-white rounded-2xl overflow-hidden shadow-premium border border-slate-100 hover:shadow-premium-hover transition-shadow duration-300 group">
              <div className="relative h-48 overflow-hidden bg-slate-50">
                <img src="https://images.unsplash.com/photo-1518602164578-cd0074062767?auto=format&fit=crop&q=80&w=800" alt="Sports Training" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-3">
                <h4 className="font-bold text-primary text-xs">Cricket Coaching Session</h4>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.35} className="bg-white rounded-2xl overflow-hidden shadow-premium border border-slate-100 hover:shadow-premium-hover transition-shadow duration-300 group">
              <div className="relative h-48 overflow-hidden bg-slate-50">
                <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Cultural Fest Videos" className="w-full h-full" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              </div>
              <div className="p-3">
                <h4 className="font-bold text-primary text-xs">📹 Cultural Fest Videos</h4>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

    </div>
  );
}

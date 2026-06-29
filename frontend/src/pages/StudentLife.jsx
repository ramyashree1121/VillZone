import React, { useState, useEffect } from 'react';
import { Trophy } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

export default function StudentLife() {
  const [dynamicToppers, setDynamicToppers] = useState([]);
  const [dynamicAchievements, setDynamicAchievements] = useState([]);
  const [dynamicGallery, setDynamicGallery] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/student-life/toppers`)
      .then(r => r.json())
      .then(d => setDynamicToppers(d.filter(x => x.status === 'Published')))
      .catch(e => console.error(e));

    fetch(`${import.meta.env.VITE_API_URL}/api/student-life/achievements`)
      .then(r => r.json())
      .then(d => setDynamicAchievements(d.filter(x => x.status === 'Published')))
      .catch(e => console.error(e));

    fetch(`${import.meta.env.VITE_API_URL}/api/student-life/gallery`)
      .then(r => r.json())
      .then(d => setDynamicGallery(d.filter(x => x.status === 'Published')))
      .catch(e => console.error(e));
  }, []);

  const allToppers = dynamicToppers.map(t => ({
    name: t.name,
    grade: t.grade,
    score: t.score,
    image: t.imageUrl?.startsWith('http') ? t.imageUrl : `${import.meta.env.VITE_API_URL}${t.imageUrl}`
  }));

  const allAccomplishments = dynamicAchievements.map(a => ({
    badge: a.badge || a.category,
    title: a.title,
    desc: a.description,
    image: a.imageUrl?.startsWith('http') ? a.imageUrl : `${import.meta.env.VITE_API_URL}${a.imageUrl}`
  }));

  return (
    <div className="pt-0 bg-slate-50 min-h-screen">

      {/* Banner */}
      <section className="bg-primary text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=1000')" }} />
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl font-extrabold mb-2">Student Life</h1>
          <p className="text-slate-200 max-w-xl mx-auto font-light">Celebrating academic board toppers, creative victories, and all-round growth.</p>
        </div>
      </section>

      {/* Board Toppers */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-xs uppercase tracking-widest text-secondary font-bold mb-2">Academic Pride</h2>
            <h3 className="text-3xl font-bold text-primary">Class Board Toppers</h3>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {allToppers.map((top, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.1} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-premium text-center flex flex-col items-center group">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-slate-100 group-hover:border-secondary transition-colors duration-300">
                  <img src={top.image} alt={top.name} className="w-full h-full object-cover" onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200'; }} />
                </div>
                <h4 className="font-extrabold text-primary text-base leading-tight mb-1">{top.name}</h4>
                <span className="text-xs text-slate-400 block mb-2">{top.grade}</span>
                <span className="px-4 py-1.5 rounded-full bg-secondary-light/10 text-secondary text-lg font-black">
                  {top.score}
                </span>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Accomplishments */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-xs uppercase tracking-widest text-secondary font-bold mb-2">Co-curricular Wins</h2>
            <h3 className="text-3xl font-bold text-primary">Recent Competitions & Awards</h3>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {allAccomplishments.map((acc, i) => (
              <AnimatedSection key={i} delay={i * 0.1} className="overflow-hidden rounded-2xl bg-white border border-slate-100 hover:shadow-premium transition-shadow duration-300 group flex flex-col">
                <div className="relative h-48 overflow-hidden bg-slate-50">
                  <img src={acc.image} alt={acc.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&q=80&w=600'; }} />
                  <span className="absolute top-4 left-4 inline-block px-3 py-1 bg-accent/90 backdrop-blur-md text-accent-dark text-[10px] font-bold uppercase rounded-full shadow-sm">
                    {acc.badge}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h4 className="font-extrabold text-primary text-lg mb-2 flex items-center gap-2">
                    <Trophy size={18} className="text-secondary shrink-0" /> {acc.title}
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{acc.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Student Life Photos & Videos Gallery */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-xs uppercase tracking-widest text-secondary font-bold mb-2">Campus Moments</h2>
            <h3 className="text-3xl font-bold text-primary">Photos & Videos of Student Life</h3>
          </AnimatedSection>

          {/* Dynamic Gallery Row */}
          {dynamicGallery.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {dynamicGallery.map((item, idx) => (
                <AnimatedSection key={`dyn-${item._id}`} delay={idx * 0.1} className="bg-white rounded-2xl overflow-hidden shadow-premium border border-slate-100 hover:shadow-premium-hover transition-shadow duration-300 group">
                  <div className="relative h-48 overflow-hidden bg-slate-50">
                    {item.mediaType === 'video' ? (
                      <video src={`${import.meta.env.VITE_API_URL}${item.mediaUrl}`} className="w-full h-full object-cover" controls preload="metadata" />
                    ) : (
                      <img src={`${import.meta.env.VITE_API_URL}${item.mediaUrl}`} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    )}
                  </div>
                  <div className="p-3">
                    <h4 className="font-bold text-primary text-xs">{item.mediaType === 'video' ? `📹 ${item.title || item.eventName}` : item.title || item.eventName}</h4>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          )}

          {/* Static Gallery Row 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatedSection delay={0} className="bg-white rounded-2xl overflow-hidden shadow-premium border border-slate-100 hover:shadow-premium-hover transition-shadow duration-300 group">
              <div className="relative h-48 overflow-hidden bg-slate-50">
                <img src="https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&q=80&w=800" alt="Classroom Learning" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-3">
                <h4 className="font-bold text-primary text-xs">Collaborative Classroom Learning</h4>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.05} className="bg-white rounded-2xl overflow-hidden shadow-premium border border-slate-100 hover:shadow-premium-hover transition-shadow duration-300 group">
              <div className="relative h-48 overflow-hidden bg-slate-50">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800" alt="Student Discussion" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-3">
                <h4 className="font-bold text-primary text-xs">Peer Discussion Groups</h4>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1} className="bg-white rounded-2xl overflow-hidden shadow-premium border border-slate-100 hover:shadow-premium-hover transition-shadow duration-300 group">
              <div className="relative h-48 overflow-hidden bg-slate-50">
                <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="A Day at VillZone Video" className="w-full h-full" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              </div>
              <div className="p-3">
                <h4 className="font-bold text-primary text-xs">📹 A Day at VillZone Video</h4>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15} className="bg-white rounded-2xl overflow-hidden shadow-premium border border-slate-100 hover:shadow-premium-hover transition-shadow duration-300 group">
              <div className="relative h-48 overflow-hidden bg-slate-50">
                <img src="https://images.unsplash.com/photo-1529543544282-ea9620f946f6?auto=format&fit=crop&q=80&w=800" alt="Graduation Ceremony" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-3">
                <h4 className="font-bold text-primary text-xs">Graduation Ceremony</h4>
              </div>
            </AnimatedSection>
          </div>

          {/* Static Gallery Row 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            <AnimatedSection delay={0.2} className="bg-white rounded-2xl overflow-hidden shadow-premium border border-slate-100 hover:shadow-premium-hover transition-shadow duration-300 group">
              <div className="relative h-48 overflow-hidden bg-slate-50">
                <img src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&q=80&w=800" alt="Library Study" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-3">
                <h4 className="font-bold text-primary text-xs">Library Study Sessions</h4>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.25} className="bg-white rounded-2xl overflow-hidden shadow-premium border border-slate-100 hover:shadow-premium-hover transition-shadow duration-300 group">
              <div className="relative h-48 overflow-hidden bg-slate-50">
                <img src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800" alt="Computer Lab" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-3">
                <h4 className="font-bold text-primary text-xs">Computer Lab Practicals</h4>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3} className="bg-white rounded-2xl overflow-hidden shadow-premium border border-slate-100 hover:shadow-premium-hover transition-shadow duration-300 group">
              <div className="relative h-48 overflow-hidden bg-slate-50">
                <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800" alt="Art Class" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-3">
                <h4 className="font-bold text-primary text-xs">Art & Craft Workshops</h4>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.35} className="bg-white rounded-2xl overflow-hidden shadow-premium border border-slate-100 hover:shadow-premium-hover transition-shadow duration-300 group">
              <div className="relative h-48 overflow-hidden bg-slate-50">
                <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Events Video" className="w-full h-full" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              </div>
              <div className="p-3">
                <h4 className="font-bold text-primary text-xs">📹 Student Events Compilation</h4>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

    </div>
  );
}

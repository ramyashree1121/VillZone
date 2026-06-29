import { useState, useEffect } from 'react';
import { Mail, ShieldCheck } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

export default function Management() {
  const [leadership, setLeadership] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLeadership = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/leadership`);
        if (response.ok) {
          const data = await response.json();
          setLeadership(data.filter(member => member.status === 'Active'));
        }
      } catch (err) {
        console.error('Error fetching leadership:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLeadership();
  }, []);

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
          
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : leadership.length === 0 ? (
            <div className="text-center py-20 text-slate-500 font-bold">
              Leadership profiles are currently being updated. Please check back later.
            </div>
          ) : (
            leadership.map((leader, index) => (
              <AnimatedSection key={leader._id || index} className="bg-white rounded-2xl shadow-premium border border-slate-100 overflow-hidden grid grid-cols-1 md:grid-cols-3">
                
                {/* Leader Photo */}
              <div className="relative group overflow-hidden md:col-span-1 min-h-[300px] bg-slate-100 flex items-center justify-center">
                <img
                  src={leader.image?.startsWith('http') || leader.image?.startsWith('data:') ? leader.image : `${import.meta.env.VITE_API_URL}${leader.image}`}
                  alt={leader.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/400x500?text=Leadership'; }}
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
            ))
          )}

        </div>
      </section>

    </div>
  );
}

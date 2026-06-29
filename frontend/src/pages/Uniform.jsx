import { useState, useEffect } from 'react';
import AnimatedSection from '../components/AnimatedSection';

export default function Uniform() {
  const [uniforms, setUniforms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/uniforms`)
      .then(res => res.json())
      .then(data => {
        setUniforms(data.filter(u => u.status === 'Published'));
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching uniforms:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="pt-0 bg-slate-50 min-h-screen">
      
      {/* Banner */}
      <section className="bg-primary text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1000')" }} />
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl font-extrabold mb-2">School Uniforms</h1>
          <p className="text-slate-200 max-w-xl mx-auto font-light">Details regarding regular class dress codes and house sports uniform setups.</p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
            </div>
          ) : uniforms.length === 0 ? (
            <div className="text-center text-slate-500 py-12">No uniform guidelines available at the moment.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {uniforms.map((uni, idx) => (
                <AnimatedSection key={idx} delay={idx * 0.1} className="bg-white rounded-2xl overflow-hidden shadow-premium border border-slate-100 flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
                  <div className="relative h-60 overflow-hidden bg-slate-50">
                    <img src={uni.imageUrl?.startsWith('http') ? uni.imageUrl : `${import.meta.env.VITE_API_URL}${uni.imageUrl}`} alt={uni.title} className="w-full h-full object-cover" onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=400'; }} />
                  </div>
                  <div className="p-6">
                    <h3 className="font-extrabold text-primary text-lg mb-2">{uni.title}</h3>
                    <p className="text-slate-600 text-xs leading-relaxed">{uni.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  );
}

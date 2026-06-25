import React from 'react';
import AnimatedSection from '../components/AnimatedSection';

export default function Uniform() {
  const uniforms = [
    { title: 'Regular Boys Uniform', desc: 'Light blue pin-striped short-sleeve shirt, dark navy trousers/shorts, school belt, dark blue socks, and polished black shoes.', image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=400' },
    { title: 'Regular Girls Uniform', desc: 'Light blue pin-striped shirt, navy pleated skirt / pinafore, navy blue cycling shorts, school belt, dark blue socks, and black shoes.', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400' },
    { title: 'Sports House Uniform', desc: 'Coloured breathable dry-fit T-shirt (Red, Blue, Green, or Gold house specific), white track pants, white socks, and white sports sneakers.', image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=400' }
  ];

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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {uniforms.map((uni, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.1} className="bg-white rounded-2xl overflow-hidden shadow-premium border border-slate-100 flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
                <div className="relative h-60 overflow-hidden bg-slate-50">
                  <img src={uni.image} alt={uni.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="font-extrabold text-primary text-lg mb-2">{uni.title}</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">{uni.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

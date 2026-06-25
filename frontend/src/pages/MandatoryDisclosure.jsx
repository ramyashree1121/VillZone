import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ShieldAlert, BookOpen, ExternalLink } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

export default function MandatoryDisclosure() {
  const documents = [
    { id: 'cbse-affiliation', name: 'CBSE Affiliation Letter (Extension)', number: 'Affiliation No. 1930225' },
    { id: 'noc', name: 'No Objection Certificate (NOC)', number: 'NOC No. DDIS-2018-88A' },
    { id: 'school-recognition', name: 'School Recognition Certificate', number: 'Recognition No. RC-99-2019' },
    { id: 'building-safety', name: 'Building Safety Certificate', number: 'Safety Cert: BSC-2025-01' },
    { id: 'fire-safety', name: 'Fire Safety Certificate', number: 'Fire Cert: FSC-2026-99' },
    { id: 'water-sanitation', name: 'Water & Sanitation Health Certificate', number: 'Health Cert: WSH-2026-04' }
  ];

  return (
    <div className="pt-0 bg-slate-50 min-h-screen">
      
      {/* Banner */}
      <section className="bg-primary text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=1000')" }} />
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl font-extrabold mb-2">Mandatory CBSE Disclosure</h1>
          <p className="text-slate-200 max-w-xl mx-auto font-light">Public access page for affiliation, recognition letters, and structural certificates.</p>
        </div>
      </section>

      {/* Disclosures list */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <AnimatedSection className="bg-white p-8 rounded-2xl border border-slate-100 shadow-premium mb-10">
            <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
              <ShieldAlert className="text-secondary" /> General School Credentials
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              <div className="border-b pb-3">
                <span className="text-xs font-bold text-slate-400 block mb-1">AFFILIATION NO.</span>
                <span className="font-bold text-primary text-base">1930225 (CBSE Stream)</span>
              </div>
              <div className="border-b pb-3">
                <span className="text-xs font-bold text-slate-400 block mb-1">SCHOOL CODE</span>
                <span className="font-bold text-primary text-base">55198 (CBSE Stream)</span>
              </div>
              <div className="border-b pb-3">
                <span className="text-xs font-bold text-slate-400 block mb-1">TRUST NAME</span>
                <span className="font-bold text-primary text-base">VillZone Educational Trust</span>
              </div>
              <div className="border-b pb-3">
                <span className="text-xs font-bold text-slate-400 block mb-1">PRINCIPAL QUALIFICATION</span>
                <span className="font-bold text-primary text-base">M.Sc., M.Ed. (18+ Years Exp)</span>
              </div>
            </div>
          </AnimatedSection>

          {/* Certificate Documents */}
          <AnimatedSection className="bg-white p-8 rounded-2xl border border-slate-100 shadow-premium">
            <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
              <BookOpen className="text-secondary" /> Official Compliance Documents (PDF)
            </h3>
            <div className="space-y-4">
              {documents.map((doc, idx) => (
                <div key={idx} className="p-4 bg-slate-50 hover:bg-slate-100 transition-colors rounded-xl border border-slate-100 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-primary text-sm">{doc.name}</h4>
                    <span className="text-[10px] text-slate-400 font-semibold">{doc.number}</span>
                  </div>
                  <Link
                    to={`/document/${doc.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs font-extrabold text-secondary hover:text-secondary-dark transition-colors"
                  >
                    View File <ExternalLink size={14} />
                  </Link>
                </div>
              ))}
            </div>
          </AnimatedSection>

        </div>
      </section>

    </div>
  );
}

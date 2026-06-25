import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, Filter, AlertTriangle } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

export default function Calendar() {
  const [events, setEvents] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');

  const mockEvents = [
    { title: 'First Terminal Examinations', description: 'Term exams for Grades 1 to 12. Full syllabus coverage.', start: '2026-07-05', type: 'Exam', color: '#0A3D62' },
    { title: 'Annual Science Fair', description: 'Inter-school competition demonstrating student innovations and models.', start: '2026-07-15', type: 'Event', color: '#27AE60' },
    { title: 'Independence Day Celebrations', description: 'National Holiday and flag hosting assembly.', start: '2026-08-15', type: 'Holiday', color: '#F4B400' },
    { title: 'Parent-Teacher Meeting (Term 1)', description: 'One-on-one progress review for all grades.', start: '2026-07-28', type: 'Meeting', color: '#9B59B6' }
  ];

  useEffect(() => {
    fetch('http://localhost:5000/api/events')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          setEvents(data);
        } else {
          setEvents(mockEvents);
        }
      })
      .catch(() => {
        setEvents(mockEvents);
      });
  }, []);

  const eventTypes = ['All', 'Exam', 'Holiday', 'Event', 'Meeting'];

  const filteredEvents = events.filter((ev) => activeFilter === 'All' || ev.type === activeFilter);

  return (
    <div className="pt-0 bg-slate-50 min-h-screen">
      
      {/* Banner */}
      <section className="bg-primary text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=1000')" }} />
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl font-extrabold mb-2">School Calendar</h1>
          <p className="text-slate-200 max-w-xl mx-auto font-light">Stay updated with academic timelines, vacations, and examination cycles.</p>
        </div>
      </section>

      {/* Filter and Events List */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {eventTypes.map((type) => (
              <button
                key={type}
                onClick={() => setActiveFilter(type)}
                className={`px-4.5 py-2 rounded-lg text-xs font-bold transition-all shadow-sm ${
                  activeFilter === type
                    ? 'bg-primary text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-100'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* List */}
          <div className="space-y-6">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((ev, idx) => (
                <AnimatedSection key={idx} delay={idx * 0.05} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-premium flex flex-col sm:flex-row gap-6 items-start justify-between">
                  
                  <div className="flex gap-4">
                    {/* Event Color tag */}
                    <div className="w-3 h-16 rounded-full shrink-0" style={{ backgroundColor: ev.color || '#0A3D62' }} />
                    <div>
                      <span className="inline-block px-2.5 py-0.5 bg-slate-100 text-[10px] font-extrabold uppercase rounded text-slate-500 mb-2">
                        {ev.type}
                      </span>
                      <h3 className="font-extrabold text-primary text-lg mb-1 leading-snug">{ev.title}</h3>
                      <p className="text-slate-600 text-xs leading-relaxed max-w-xl">{ev.description}</p>
                    </div>
                  </div>

                  {/* Date display */}
                  <div className="flex items-center gap-1.5 shrink-0 bg-slate-50 border px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600">
                    <Clock size={14} />
                    <span>{new Date(ev.start).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>

                </AnimatedSection>
              ))
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300">
                <p className="text-slate-500 font-bold">No calendar events matches this filter category.</p>
              </div>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}

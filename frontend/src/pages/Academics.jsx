import React, { useState } from 'react';
import { BookOpen, GraduationCap, Award, CheckCircle } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

export default function Academics() {
  const [activeTab, setActiveTab] = useState('CBSE');
  const [gradeTab, setGradeTab] = useState('Primary');

  const curriculumDetails = {
    CBSE: {
      title: 'CBSE Curriculum (Central Board of Secondary Education)',
      description: 'Our CBSE wing focuses on application-based conceptual study, preparation for national level competitive examinations (JEE, NEET, CUET), and development of high analytical ability. It runs from Pre-KG up to Grade 12.',
      features: [
        'National system alignment for easy transfers.',
        'Continuous evaluation and active skill mapping.',
        'Integrated training modules for science and mathematics.',
        'Extensive digital lab support.'
      ]
    },
    StateBoard: {
      title: 'State Board Curriculum (Government of Tamil Nadu / State Syllabus)',
      description: 'The State Board stream provides deep local context, high scoring syllabus patterns, and specialized focus on local engineering and medical counseling systems (TNEA). It offers a rich foundation in languages and sciences.',
      features: [
        'Focused training to secure maximum board exam percentages.',
        'Specialized language mastery programs.',
        'In-depth laboratory sessions matching university levels.',
        'Subsidized material cost options.'
      ]
    }
  };

  const gradeSubjects = {
    Kindergarten: {
      grades: 'Pre-KG, LKG, UKG',
      focus: 'Foundational literacy, motor skill cultivation, social values, and play-way interactive modules.',
      subjects: ['Phonics & English Reading', 'Basic Mathematics & Counting', 'EVS & Nature Studies', 'Storytelling, Music & Art', 'Fine Motor Activities']
    },
    Primary: {
      grades: 'Grade 1 to Grade 5',
      focus: 'Building core analytical capabilities in languages, science, and arithmetic.',
      subjects: ['English Language & Grammar', 'Second Language (Hindi/Tamil)', 'Mathematics', 'General Science', 'Social Studies', 'Computer Literacy', 'Arts & Value Education']
    },
    Middle: {
      grades: 'Grade 6 to Grade 8',
      focus: 'Transitioning to advanced scientific frameworks, project exhibitions, and second/third language integration.',
      subjects: ['Advanced English', 'Second Language', 'Third Language (Sanskrit/French/Local)', 'Physics, Chemistry & Biology', 'History, Civics & Geography', 'Foundational Coding & ICT', 'Physical Education']
    },
    HighSchool: {
      grades: 'Grade 9 & Grade 10',
      focus: 'Board exam preparation, advanced experimental projects, and career exploration sessions.',
      subjects: ['English Communications', 'Second Language', 'Mathematics (Core/Standard)', 'Integrated Sciences (Lab based)', 'Social Sciences (History, Geography, Economics, Pol. Science)', 'Information Technology (AI/Coding)']
    },
    HigherSecondary: {
      grades: 'Grade 11 & Grade 12',
      focus: 'Stream-specific professional preparation with daily mock-test cycles.',
      subjects: [
        'Science Stream: Physics, Chemistry, Mathematics, Biology / Computer Science, English.',
        'Commerce Stream: Accountancy, Business Studies, Economics, Computer Applications / Mathematics, English.',
        'Arts Stream: History, Economics, Political Science, Geography, English.'
      ]
    }
  };

  return (
    <div className="pt-0 bg-slate-50 min-h-screen">
      
      {/* Banner */}
      <section className="bg-primary text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=1000')" }} />
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl font-extrabold mb-2">Academics & Curriculum</h1>
          <p className="text-slate-200 max-w-xl mx-auto font-light">Custom curriculum pathways for pre-kindergarten to higher secondary grades.</p>
        </div>
      </section>

      {/* Curriculum Selector */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex justify-center gap-4 mb-10">
            {Object.keys(curriculumDetails).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-6 py-3 rounded-full font-bold text-sm shadow-premium transition-all ${
                  activeTab === key
                    ? 'bg-primary text-white'
                    : 'bg-white text-primary hover:bg-slate-100'
                }`}
              >
                {key === 'CBSE' ? 'CBSE Stream' : 'State Board Stream'}
              </button>
            ))}
          </div>

          <AnimatedSection className="bg-white p-8 rounded-2xl border border-slate-100 shadow-premium">
            <h3 className="text-2xl font-extrabold text-primary mb-4">
              {curriculumDetails[activeTab].title}
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              {curriculumDetails[activeTab].description}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {curriculumDetails[activeTab].features.map((feat, index) => (
                <div key={index} className="flex gap-3 items-start">
                  <CheckCircle size={18} className="text-secondary shrink-0 mt-0.5" />
                  <span className="text-slate-700 text-sm">{feat}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>

        </div>
      </section>

      {/* Grade Selector Tabs */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-xs uppercase tracking-widest text-secondary font-bold mb-2">Subjects Offered</h2>
            <h3 className="text-3xl font-bold text-primary">Class-wise Core Focus</h3>
          </AnimatedSection>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {Object.keys(gradeSubjects).map((grade) => (
              <button
                key={grade}
                onClick={() => setGradeTab(grade)}
                className={`px-5 py-2.5 rounded-lg font-bold text-xs transition-all ${
                  gradeTab === grade
                    ? 'bg-secondary text-white shadow-premium'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {grade}
              </button>
            ))}
          </div>

          <AnimatedSection key={gradeTab} className="bg-slate-50 p-8 rounded-2xl border border-slate-100 max-w-4xl mx-auto">
            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase rounded-full mb-3">
                {gradeSubjects[gradeTab].grades}
              </span>
              <h4 className="text-xl font-extrabold text-primary mb-2">Academic Objectives & Focus</h4>
              <p className="text-slate-600 text-sm leading-relaxed">{gradeSubjects[gradeTab].focus}</p>
            </div>
            
            <div>
              <h5 className="font-bold text-primary text-sm uppercase tracking-wider mb-4">Core Subjects</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {gradeSubjects[gradeTab].subjects.map((subj, idx) => (
                  <div key={idx} className="p-3 bg-white rounded-lg border border-slate-100 shadow-sm text-sm text-slate-700 font-medium">
                    {subj}
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

        </div>
      </section>

    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { BookOpen, FileText, Download, CheckCircle, Brain, Monitor, Users, Target, Award, Shield, FileDown } from 'lucide-react';

export default function Syllabus() {
  const [activeTab, setActiveTab] = useState('Kindergarten');
  const [syllabusDocs, setSyllabusDocs] = useState([]);

  useEffect(() => {
    document.title = "Academic Syllabus | Villzone School | Pre-KG to Grade 12";
    
    fetch('http://localhost:5000/api/syllabus')
      .then(res => res.json())
      .then(data => setSyllabusDocs(data.filter(s => s.status === 'Published')))
      .catch(err => console.error(err));
  }, []);

  const curriculumData = {
    Kindergarten: {
      tags: 'PRE-KG, LKG, UKG',
      title: 'Academic Objectives & Focus',
      description: 'Foundational literacy, motor skill cultivation, social values, and play-way interactive modules.',
      subjects: [
        'Phonics & English Reading',
        'Basic Mathematics & Counting',
        'EVS & Nature Studies',
        'Storytelling, Music & Art',
        'Fine Motor Activities'
      ]
    },
    Primary: {
      tags: 'GRADES 1-5',
      title: 'Academic Objectives & Focus',
      description: 'Building strong foundations in literacy, numeracy, and environmental awareness while fostering creativity and critical thinking.',
      subjects: [
        'English Language Arts',
        'Mathematics Foundation',
        'Environmental Studies (EVS)',
        'Basic Computer Science',
        'Value Education',
        'Physical Education'
      ]
    },
    Middle: {
      tags: 'GRADES 6-8',
      title: 'Academic Objectives & Focus',
      description: 'Developing conceptual understanding, scientific inquiry, analytical skills, and holistic personal growth.',
      subjects: [
        'Languages (English, Regional)',
        'Advanced Mathematics',
        'Integrated Sciences',
        'Social Sciences',
        'Information Technology',
        'Art & Physical Education'
      ]
    },
    HighSchool: {
      tags: 'GRADES 9-10',
      title: 'Academic Objectives & Focus',
      description: 'Comprehensive preparation for board examinations with a focus on deep subject knowledge and career awareness.',
      subjects: [
        'English Language & Literature',
        'Second Language Options',
        'Mathematics',
        'Science',
        'Social Science',
        'Artificial Intelligence / IT'
      ]
    },
    HigherSecondary: {
      tags: 'GRADES 11-12',
      title: 'Academic Objectives & Focus',
      description: 'Specialized stream-based education preparing students for higher education and professional career pathways.',
      subjects: [
        'Science (Physics/Chem/Maths/Bio)',
        'Commerce (Accounts/Business/Econ)',
        'Humanities & Social Sciences',
        'Computer Science',
        'Core English',
        'Skill Electives'
      ]
    }
  };

  const tabs = ['Kindergarten', 'Primary', 'Middle', 'HighSchool', 'HigherSecondary'];

  const stats = [
    { label: 'Pre-KG to Grade 12', desc: 'Comprehensive Education', icon: Target },
    { label: 'Dual Curriculum', desc: 'CBSE & State Board', icon: BookOpen },
    { label: 'Smart Classrooms', desc: 'Technology Integrated', icon: Monitor },
    { label: 'Qualified Faculty', desc: 'Experienced Mentors', icon: Users }
  ];

  const methodologies = [
    'Activity-Based Learning', 'Experiential Learning', 'Project-Based Learning',
    'Smart Classroom Learning', 'Digital Learning Resources', 'Collaborative Learning',
    'Continuous Assessment', 'Value-Based Education'
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-[#0A1128] overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-300 text-sm font-bold tracking-widest mb-4 border border-blue-500/30">
            EXCELLENCE IN EDUCATION
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">Academic Syllabus</h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            At Villzone School, our syllabus is thoughtfully designed to nurture knowledge, creativity, critical thinking, communication skills, and character development from Pre-KG to Grade 12.
          </p>
        </div>
      </section>

      {/* About Our Curriculum / Stats */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-[#0A1128] mb-4">About Our Curriculum</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-primary mb-4">
                  <stat.icon size={28} />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-1">{stat.label}</h3>
                <p className="text-sm text-slate-500 font-medium">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Class-wise Core Focus (Exact UI Match) */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black text-[#0A1128] text-center mb-10">Class-wise Core Focus</h2>
          
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                  activeTab === tab 
                    ? 'bg-[#10B981] text-white shadow-md shadow-emerald-500/20' 
                    : 'bg-[#F3F4F6] text-[#374151] hover:bg-slate-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Content Card */}
          <div className="bg-[#F8FAFC] rounded-[2rem] p-8 md:p-12 border border-slate-100 shadow-sm transition-all duration-500 animate-fadeIn">
            <span className="inline-block px-4 py-1.5 bg-[#E2E8F0] text-[#1E293B] text-xs font-black rounded-full mb-6 tracking-wider">
              {curriculumData[activeTab].tags}
            </span>
            
            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] mb-3">
              {curriculumData[activeTab].title}
            </h3>
            
            <p className="text-[#475569] text-base mb-10">
              {curriculumData[activeTab].description}
            </p>

            <h4 className="text-xs font-black text-[#0F172A] tracking-widest uppercase mb-5">
              CORE SUBJECTS
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {curriculumData[activeTab].subjects.map((subject, idx) => (
                <div key={idx} className="bg-white px-6 py-4 rounded-xl shadow-sm border border-slate-100 flex items-center text-[#334155] font-bold text-sm">
                  {subject}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Teaching Methodology */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-[#0A1128] mb-4">Teaching Methodology</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {methodologies.map((method, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3 hover:-translate-y-1 transition-transform">
                <CheckCircle className="text-emerald-500 shrink-0" size={20} />
                <span className="text-sm font-bold text-slate-700">{method}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Downloadable Syllabus */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-black text-[#0A1128] mb-4">Download Syllabus</h2>
              <p className="text-slate-500 max-w-2xl">Access detailed grade-wise curriculum documents for the current academic year.</p>
            </div>
            <div className="w-24 h-1 bg-primary rounded-full mt-4 md:hidden"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {syllabusDocs.length === 0 ? (
              <div className="col-span-full py-12 text-center text-slate-500 bg-slate-50 rounded-2xl">
                <FileDown size={48} className="mx-auto text-slate-300 mb-4" />
                <p className="font-semibold">Syllabus documents are currently being updated.</p>
                <p className="text-sm">Please check back later.</p>
              </div>
            ) : (
              syllabusDocs.map((doc) => (
                <div key={doc._id} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl transition-all group flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-red-50 text-red-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <FileText size={24} />
                    </div>
                    <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold tracking-wider">
                      {doc.gradeLevel}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-slate-800 mb-2">{doc.title}</h3>
                  <p className="text-xs text-slate-500 font-medium mb-6">Updated: {new Date(doc.updatedAt || doc.createdAt).toLocaleDateString()}</p>
                  
                  <div className="mt-auto flex gap-3">
                    <a href={`http://localhost:5000${doc.pdfUrl}`} target="_blank" rel="noreferrer" className="flex-1 bg-[#0A1128] hover:bg-primary text-white text-center py-2.5 rounded-xl text-sm font-bold transition-colors">
                      View
                    </a>
                    <a href={`http://localhost:5000${doc.pdfUrl}`} download className="flex-1 bg-blue-50 hover:bg-blue-100 text-primary text-center py-2.5 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2">
                      <Download size={16} /> Download
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

    </div>
  );
}

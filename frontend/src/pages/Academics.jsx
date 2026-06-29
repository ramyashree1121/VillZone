import React, { useState, useEffect } from 'react';
import { BookOpen, CheckCircle, Brain, Monitor, Users, Target, Award, Shield } from 'lucide-react';

export default function Academics() {
  const [activeTab, setActiveTab] = useState('Kindergarten');
  const [curriculumBoards, setCurriculumBoards] = useState([]);
  const [curriculumFeatures, setCurriculumFeatures] = useState([]);
  const [curriculumCategories, setCurriculumCategories] = useState([]);
  const [isCurriculumLoading, setIsCurriculumLoading] = useState(true);

  useEffect(() => {
    document.title = "Curriculum | Villzone School | Pre-KG to Grade 12";

    // Fetch Dynamic Curriculum Data
    Promise.all([
      fetch(`${import.meta.env.VITE_API_URL}/api/curriculum-boards`),
      fetch(`${import.meta.env.VITE_API_URL}/api/curriculum-features`),
      fetch(`${import.meta.env.VITE_API_URL}/api/curriculum-categories`)
    ])
      .then(async ([boardsRes, featuresRes, categoriesRes]) => {
        if (boardsRes.ok) {
          const boards = await boardsRes.json();
          setCurriculumBoards(boards.filter(b => b.status === 'Active'));
        }
        if (featuresRes.ok) {
          const features = await featuresRes.json();
          setCurriculumFeatures(features.filter(f => f.status === 'Active'));
        }
        if (categoriesRes.ok) {
          const categories = await categoriesRes.json();
          const activeCategories = categories.filter(c => c.status === 'Active');
          setCurriculumCategories(activeCategories);
          if (activeCategories.length > 0) {
            setActiveTab(activeCategories[0].idName);
          }
        }
        setIsCurriculumLoading(false);
      })
      .catch(err => {
        console.error('Error fetching dynamic curriculum:', err);
        setIsCurriculumLoading(false);
      });
  }, []);

  const icons = [Target, BookOpen, Monitor, Users, Award, Shield, Brain];

  const activeCategoryData = curriculumCategories.find(c => c.idName === activeTab);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-[#0A1128] overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white mb-6">
            <BookOpen size={16} className="text-blue-300" />
            <span className="text-sm font-bold tracking-wide uppercase">Curriculum Framework</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">Curriculum</h1>
          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            A comprehensive, modern educational approach designed to foster holistic development and academic excellence across all grade levels.
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
            {curriculumBoards.map((board, idx) => {
              const Icon = icons[idx % icons.length];
              return (
                <div key={board._id || idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-primary mb-4">
                    <Icon size={28} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-1">{board.title}</h3>
                  <p className="text-sm text-slate-500 font-medium">{board.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Class-wise Core Focus (Exact UI Match) */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black text-[#0A1128] text-center mb-10">Class-wise Core Focus</h2>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {curriculumCategories.map(category => (
              <button
                key={category.idName}
                onClick={() => setActiveTab(category.idName)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${activeTab === category.idName
                  ? 'bg-[#10B981] text-white shadow-md shadow-emerald-500/20'
                  : 'bg-[#F3F4F6] text-[#374151] hover:bg-slate-200'
                  }`}
              >
                {category.tabLabel}
              </button>
            ))}
          </div>

          {/* Content Card */}
          {activeCategoryData && (
            <div className="bg-[#F8FAFC] rounded-[2rem] p-8 md:p-12 border border-slate-100 shadow-sm transition-all duration-500 animate-fadeIn">
              <span className="inline-block px-4 py-1.5 bg-[#E2E8F0] text-[#1E293B] text-xs font-black rounded-full mb-6 tracking-wider">
                {activeCategoryData.tags}
              </span>

              <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] mb-3">
                {activeCategoryData.title}
              </h3>

              <p className="text-[#475569] text-base mb-10 whitespace-pre-line">
                {activeCategoryData.description}
              </p>

              <h4 className="text-xs font-black text-[#0F172A] tracking-widest uppercase mb-5">
                CORE SUBJECTS
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeCategoryData.subjects.map((subject, idx) => (
                  <div key={idx} className="bg-white px-6 py-4 rounded-xl shadow-sm border border-slate-100 flex items-center text-[#334155] font-bold text-sm">
                    {subject}
                  </div>
                ))}
              </div>
            </div>
          )}
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
            {curriculumFeatures.map((feature, idx) => (
              <div key={feature._id || idx} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-2 hover:-translate-y-1 transition-transform group">
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-emerald-500 shrink-0 group-hover:scale-110 transition-transform" size={20} />
                  <span className="text-sm font-bold text-slate-700">{feature.title}</span>
                </div>
                {feature.description && (
                  <p className="text-xs text-slate-500 pl-8">{feature.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

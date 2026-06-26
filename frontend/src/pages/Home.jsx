import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, BookOpen, Users, Trophy, ChevronRight, CheckCircle, Star, Phone, Mail, MapPin, Calendar, Clock, Quote, ArrowUpRight, GraduationCap, Building, Activity, Sparkles, X, Info, Compass, Shield, Play, Award, Bus, MessageSquare, FileText, HelpCircle, Send
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import AnimatedSection from '../components/AnimatedSection';

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export default function Home() {
  // Stats counters
  const [studentsCount, setStudentsCount] = useState(0);
  const [facultyCount, setFacultyCount] = useState(0);
  const [yearsCount, setYearsCount] = useState(0);
  const [notices, setNotices] = useState([]);
  const [events, setEvents] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [settings, setSettings] = useState({
    academicYear: '2026-27',
    schoolLogoUrl: '',
    schoolPhone: '+91 8220524146',
    schoolEmail: 'admissions@villzone.edu.in',
    schoolAddress: 'VillZone Area, Tiruvannamalai, Tamil Nadu - 606601',
    principalName: 'Dr. K. Raghavan, M.Sc., Ph.D.',
    principalMessage: 'Welcome to VillZone International School. Our focus goes beyond standard textbook learning. We build resilience, practical logic, and moral integrity. Our students succeed not only in examinations but in their careers and civic duties. We invite you to visit our campus and join the VillZone family.',
    principalPhotoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=600',
    heroTitle1: 'Empowering Future Leaders',
    heroDesc1: 'CBSE & State Board Education from Pre-KG to Grade 12',
    heroImg1: 'https://images.unsplash.com/photo-1544717302-de2904281a85?auto=format&fit=crop&q=80&w=1920',
    heroTitle2: 'State-of-the-Art Smart Labs',
    heroDesc2: 'Concept-based visual learning & hands-on experimentations',
    heroImg2: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=1920',
    heroTitle3: 'Holistic Co-curricular Focus',
    heroDesc3: 'Sports, Dance, Music, Yoga & Professional Olympiad Mentorships',
    heroImg3: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1920'
  });

  // Enquiry & Callback Form states
  const [enquiryForm, setEnquiryForm] = useState({
    parentName: '',
    studentName: '',
    mobile: '',
    classInterested: 'Pre-KG',
    location: ''
  });
  const [enquirySuccess, setEnquirySuccess] = useState(false);
  const [enquiryLoading, setEnquiryLoading] = useState(false);


  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Stats counter animation
    const duration = 2000;
    const steps = 50;
    const stepTime = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setStudentsCount(Math.min(Math.floor((1800 / steps) * step), 1800));
      setFacultyCount(Math.min(Math.floor((120 / steps) * step), 120));
      setYearsCount(Math.min(Math.floor((20 / steps) * step), 20));
      if (step >= steps) clearInterval(timer);
    }, stepTime);

    // Auto-slide interval
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    // Fetch dynamic notices & events
    const fetchHomeData = async () => {
      try {
        const noticesRes = await fetch('${import.meta.env.VITE_API_URL}/api/notices');
        const eventsRes = await fetch('${import.meta.env.VITE_API_URL}/api/events');
        const galleryRes = await fetch('${import.meta.env.VITE_API_URL}/api/gallery');
        const settingsRes = await fetch('${import.meta.env.VITE_API_URL}/api/settings');
        if (noticesRes.ok) setNotices(await noticesRes.json());
        if (eventsRes.ok) setEvents(await eventsRes.json());
        if (galleryRes.ok) setGallery(await galleryRes.json());
        if (settingsRes.ok) setSettings(await settingsRes.json());
      } catch (err) {
        console.warn('Backend server offline. Fallbacks active.', err.message);
      }
    };
    fetchHomeData();

    return () => {
      clearInterval(timer);
      clearInterval(slideInterval);
    };
  }, []);

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    setEnquiryLoading(true);
    try {
      // Map to general inquiries route on server
      const response = await fetch('${import.meta.env.VITE_API_URL}/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: enquiryForm.parentName,
          email: `${enquiryForm.studentName.replace(/\s+/g, '').toLowerCase()}@villzone.temp`,
          mobile: enquiryForm.mobile,
          subject: `Admission Enquiry - ${enquiryForm.classInterested}`,
          message: `Interested Class: ${enquiryForm.classInterested}. Student Location: ${enquiryForm.location}. Student Name: ${enquiryForm.studentName}`
        })
      });
      if (response.ok) {
        setEnquirySuccess(true);
        setEnquiryForm({ parentName: '', studentName: '', mobile: '', classInterested: 'Pre-KG', location: '' });
        setTimeout(() => setEnquirySuccess(false), 5000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setEnquiryLoading(false);
    }
  };

  // Authentic Indian School Visuals (Unsplash matches)
  const slides = [
    {
      img: settings.heroImg1 || 'https://images.unsplash.com/photo-1544717302-de2904281a85?auto=format&fit=crop&q=80&w=1920',
      title: settings.heroTitle1 || 'Empowering Future Leaders',
      desc: settings.heroDesc1 || 'CBSE & State Board Education from Pre-KG to Grade 12'
    },
    {
      img: settings.heroImg2 || 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=1920',
      title: settings.heroTitle2 || 'State-of-the-Art Smart Labs',
      desc: settings.heroDesc2 || 'Concept-based visual learning & hands-on experimentations'
    },
    {
      img: settings.heroImg3 || 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1920',
      title: settings.heroTitle3 || 'Holistic Co-curricular Focus',
      desc: settings.heroDesc3 || 'Sports, Dance, Music, Yoga & Professional Olympiad Mentorships'
    }
  ];

  return (
    <div className="overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          "name": settings.websiteTitle || "VillZone International School",
          "description": settings.defaultMetaDescription,
          "url": settings.canonicalDomain || "https://villzone.edu.in",
          "telephone": settings.schoolPhone,
          "email": settings.schoolEmail,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": settings.schoolAddress,
            "addressLocality": "Tiruvannamalai",
            "addressRegion": "Tamil Nadu",
            "addressCountry": "IN"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "Admissions",
            "telephone": settings.schoolPhone,
            "email": settings.schoolEmail
          }
        })
      }} />

      {/* 1. HERO SECTION WITH CUSTOM AUTO SLIDER */}
      <section className="relative min-h-[90vh] flex items-center justify-center text-white bg-slate-950 overflow-hidden">
        {/* Slide backgrounds */}
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 bg-cover bg-center transition-all duration-[1500ms] ease-in-out ${idx === currentSlide ? 'opacity-40 scale-100' : 'opacity-0 scale-105 pointer-events-none'
              }`}
            style={{ backgroundImage: `url('${slide.img}')` }}
          />
        ))}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 hero-gradient opacity-90 z-10" />

        {/* Slide Content */}
        <div className="relative max-w-4xl mx-auto text-center px-4 z-20 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-accent font-bold text-xs uppercase tracking-widest mb-6 animate-float">
            <Star size={14} className="fill-accent" /> Admissions Open For 2026-27 <Star size={14} className="fill-accent" />
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight mb-6 animate-fadeIn">
            {slides[currentSlide].title}
          </h1>
          <p className="text-lg sm:text-xl text-slate-200 font-light mb-10 leading-relaxed max-w-2xl mx-auto">
            {slides[currentSlide].desc}
          </p>

          <div className="flex flex-wrap gap-4 justify-center items-center w-full">
            <Link
              to="/admissions"
              className="px-8 py-4 bg-secondary hover:bg-secondary-dark text-white rounded-full font-bold shadow-premium transition-all hover:scale-105"
            >
              Apply Now
            </Link>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-campus-visit'))}
              className="px-8 py-4 bg-accent hover:bg-accent-light text-primary-dark rounded-full font-bold shadow-premium transition-all hover:scale-105"
            >
              Book Campus Visit
            </button>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2.5 z-20">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === currentSlide ? 'bg-accent w-6' : 'bg-white/40 hover:bg-white/60'
                }`}
            />
          ))}
        </div>
      </section>

      {/* 2. STATS BAR */}
      <section className="py-12 bg-white relative border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { count: `${studentsCount}+`, label: 'Students Enrolled' },
              { count: `${facultyCount}+`, label: 'Experienced Teachers' },
              { count: `${yearsCount}+`, label: 'Years of Trust' },
              { count: '100%', label: 'CBSE & State Board Pass' }
            ].map((stat, i) => (
              <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 shadow-premium">
                <span className="block text-3xl sm:text-4xl font-extrabold text-primary mb-1">{stat.count}</span>
                <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ABOUT VILLZONE SECTION */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=800"
                alt="VillZone Classroom"
                className="rounded-2xl shadow-2xl border-4 border-white object-cover h-[450px] w-full"
              />
              <div className="absolute -bottom-6 -right-6 bg-accent text-primary-dark p-6 rounded-2xl shadow-xl hidden sm:block max-w-xs">
                <p className="font-extrabold text-lg">Since 2006</p>
                <p className="text-xs font-semibold">Bridging traditional values with modern learning ecosystems.</p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <span className="text-xs uppercase tracking-widest text-secondary font-bold block mb-2">About Our Institution</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary mb-6">Nurturing Leaders with Academic Excellence</h2>
            <p className="text-slate-600 mb-4 leading-relaxed text-sm">
              VillZone International School was established to offer students from Tamil Nadu the highest standards of CBSE and State Board curriculum education. We combine strict academic discipline with cutting-edge tech integration, preparing children to lead tomorrow's global economy.
            </p>
            <p className="text-slate-600 mb-8 leading-relaxed text-sm">
              With smart classrooms, computer science labs, high-performance athletic grounds, and GPS-guarded transport, we deliver an all-round development environment that ensures child comfort and parent peace-of-mind.
            </p>
            <div className="flex gap-4">
              <Link to="/about-school" className="px-6 py-3 bg-primary text-white rounded-xl text-xs font-bold hover:bg-primary-light flex items-center gap-1.5">
                Read More <ArrowRight size={14} />
              </Link>
              <a href="tel:+919876543210" className="px-6 py-3 border rounded-xl text-xs font-bold hover:bg-slate-100 flex items-center gap-1.5 text-slate-700">
                Call Admissions
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ABOUT THE TRUST */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-secondary font-bold block mb-2">About the Trust</span>
            <h2 className="text-3xl font-extrabold text-primary mb-4">VillZone Educational Trust – Empowering Communities Through Quality Education Since 1998</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* Left Column: Content */}
            <AnimatedSection delay={0.1} className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-800">VillZone Educational Trust</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Established in 1998, the VillZone Educational Trust was founded with a vision to make quality education accessible to students from all backgrounds. Through modern infrastructure, academic excellence, and community-focused initiatives, the trust continues to nurture future leaders and responsible citizens.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                The trust is committed to creating world-class educational opportunities while maintaining affordability, inclusivity, and strong moral values.
              </p>

              <ul className="space-y-3 mt-6">
                <li className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                  <CheckCircle size={18} className="text-secondary shrink-0" />
                  Experienced Educational Leadership
                </li>
                <li className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                  <CheckCircle size={18} className="text-secondary shrink-0" />
                  Student-Centric Learning Environment
                </li>
                <li className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                  <CheckCircle size={18} className="text-secondary shrink-0" />
                  Scholarship & Community Support Programs
                </li>
                <li className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                  <CheckCircle size={18} className="text-secondary shrink-0" />
                  Commitment to Academic Excellence
                </li>
              </ul>

              <div className="pt-6">
                <Link to="/about-trust" className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary hover:bg-primary-dark text-white font-extrabold rounded-xl shadow-md transition-all text-sm">
                  Learn More About the Trust <ArrowRight size={16} />
                </Link>
              </div>
            </AnimatedSection>

            {/* Right Column: Trust Commitments Card */}
            <AnimatedSection delay={0.2} className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-premium">
              <h4 className="text-xl font-extrabold text-primary mb-6 flex items-center gap-3">
                <Shield size={24} className="text-secondary" /> Trust Commitments
              </h4>
              <div className="space-y-6">
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex gap-4">
                  <div className="bg-primary/5 p-3 rounded-xl h-fit">
                    <Building size={20} className="text-primary" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-800 text-sm mb-1">Quality Infrastructure</h5>
                    <p className="text-xs text-slate-500 leading-relaxed">State-of-the-art classrooms, laboratories, libraries, and learning facilities.</p>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex gap-4">
                  <div className="bg-primary/5 p-3 rounded-xl h-fit">
                    <Activity size={20} className="text-primary" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-800 text-sm mb-1">Holistic Development</h5>
                    <p className="text-xs text-slate-500 leading-relaxed">Focus on academics, sports, leadership, creativity, and life skills.</p>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex gap-4">
                  <div className="bg-primary/5 p-3 rounded-xl h-fit">
                    <Star size={20} className="text-primary" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-800 text-sm mb-1">Values & Ethics</h5>
                    <p className="text-xs text-slate-500 leading-relaxed">Building responsible, confident, and socially aware citizens.</p>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex gap-4">
                  <div className="bg-primary/5 p-3 rounded-xl h-fit">
                    <Users size={20} className="text-primary" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-800 text-sm mb-1">Community Impact</h5>
                    <p className="text-xs text-slate-500 leading-relaxed">Supporting educational growth and development within the local community.</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* 4. VISION, MISSION & VALUES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Our Vision',
                desc: 'To cultivate a learning space where traditional Indian values merge seamlessly with global technology skills, creating tomorrow\'s innovators.',
                color: 'border-l-primary'
              },
              {
                title: 'Our Mission',
                desc: 'To provide tailored CBSE and State Board pathways, enabling individualized child-centered development and 100% board exam confidence.',
                color: 'border-l-secondary'
              },
              {
                title: 'Core Values',
                desc: 'Instilling accountability, academic integrity, gender equality, mutual respect, and a continuous drive for learning and character development.',
                color: 'border-l-accent'
              }
            ].map((card, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.1} className={`p-8 rounded-2xl bg-slate-50 border border-slate-100 border-l-4 ${card.color} shadow-premium hover:shadow-premium-hover transition-all duration-300`}>
                <h3 className="text-xl font-extrabold text-primary mb-4">{card.title}</h3>
                <p className="text-slate-600 text-xs leading-relaxed">{card.desc}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PRINCIPAL MESSAGE */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <AnimatedSection className="bg-white rounded-3xl shadow-premium border border-slate-100 overflow-hidden grid grid-cols-1 md:grid-cols-3">
            <div className="h-full min-h-[300px]">
              <img
                src={settings.principalPhotoUrl || "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=600"}
                alt="School Principal"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="p-8 md:p-12 md:col-span-2 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-widest text-secondary font-bold block mb-2">Welcome Note</span>
              <h3 className="text-2xl font-extrabold text-primary mb-4">From the Principal's Desk</h3>
              <p className="text-slate-600 text-xs italic leading-relaxed mb-6">
                "{settings.principalMessage}"
              </p>
              <div>
                <h4 className="font-bold text-primary">{settings.principalName}</h4>
                <p className="text-xs text-slate-500 font-semibold">Principal, VillZone International School</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 6. CURRICULUM OVERVIEW */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-secondary font-bold block mb-2">Academics</span>
            <h2 className="text-3xl font-extrabold text-primary mb-4">Curriculum Pathways (Pre-KG to Grade 12)</h2>
            <p className="text-slate-600 text-sm">Choose the best stream suited for your child's career aspirations.</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* CBSE */}
            <AnimatedSection className="p-8 bg-slate-50 rounded-2xl shadow-premium border border-slate-100 hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-primary text-white font-bold text-sm">CBSE</div>
                <h3 className="text-xl font-extrabold text-primary">Central Board Wing</h3>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed mb-6">
                Focuses on conceptual clarity, national competitive exams preparation (JEE, NEET, CUET), and child-centered syllabus rules. Perfect for science and business careers.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-700 font-semibold mb-6">
                <li className="flex items-center gap-2">✔ Integrated Math & Science Projects</li>
                <li className="flex items-center gap-2">✔ Professional Lab Practicals & Field Visits</li>
                <li className="flex items-center gap-2">✔ Strict Continuous Internal Evaluation</li>
              </ul>
              <Link to="/academics" className="text-xs font-bold text-primary flex items-center gap-1 hover:underline">
                Explore CBSE Subjects <ChevronRight size={14} />
              </Link>
            </AnimatedSection>

            {/* STATE BOARD */}
            <AnimatedSection delay={0.1} className="p-8 bg-slate-50 rounded-2xl shadow-premium border border-slate-100 hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-secondary text-white font-bold text-sm">TN</div>
                <h3 className="text-xl font-extrabold text-primary">State Board Wing</h3>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed mb-6">
                Focuses heavily on state engineering and medical counseling preparations, localized language enrichment, and comprehensive syllabus execution.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-700 font-semibold mb-6">
                <li className="flex items-center gap-2">✔ High-scoring exam training methodologies</li>
                <li className="flex items-center gap-2">✔ Deep regional history & language programs</li>
                <li className="flex items-center gap-2">✔ State-level sports and cultural competition prep</li>
              </ul>
              <Link to="/academics" className="text-xs font-bold text-secondary flex items-center gap-1 hover:underline">
                Explore State Board <ChevronRight size={14} />
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* 7. WHY CHOOSE VILLZONE */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-secondary font-bold block mb-2">Our Features</span>
            <h2 className="text-3xl font-extrabold text-primary mb-4">Why Choose VillZone International School</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { icon: BookOpen, title: 'CBSE Curriculum', desc: 'World-class academic standards and future-ready learning.' },
              { icon: Users, title: 'Experienced Faculty', desc: 'Highly qualified and student-focused educators.' },
              { icon: GraduationCap, title: 'Smart Classroom', desc: 'Technology-enabled learning with interactive tools.' },
              { icon: Award, title: 'Sports & Co-Curricular', desc: 'Holistic development through athletic and cultural activities.' },
              { icon: Shield, title: 'Safe & Secure Campus', desc: '24/7 monitoring, GPS transport, and secure entry/exit.' }
            ].map((feat, i) => {
              const Icon = feat.icon;
              return (
                <AnimatedSection key={i} delay={i * 0.1} className="p-6 bg-white rounded-2xl shadow-premium border border-slate-100 hover:shadow-premium-hover transition-all duration-300 text-center group flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-full bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 flex items-center justify-center mx-auto mb-4">
                      <Icon size={22} />
                    </div>
                    <h4 className="font-extrabold text-primary mb-2 text-sm">{feat.title}</h4>
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed mt-2">{feat.desc}</p>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. ADMISSION PROCESS OVERVIEW */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-secondary font-bold block mb-2">Simple Steps</span>
            <h2 className="text-3xl font-extrabold text-primary mb-4">4-Step Admission Journey</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center relative">
            <AnimatedSection delay={0} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-premium relative flex flex-col hover:-translate-y-1 transition-transform duration-300">
              <span className="block text-3xl font-extrabold text-secondary/30 mb-3">01</span>
              <h4 className="font-bold text-primary mb-2 text-xs uppercase tracking-wider">Submit Enquiry</h4>
              <p className="text-slate-500 text-[11px] leading-relaxed flex-grow mb-6">Fill out our online enquiry form and connect with our admissions team.</p>
              <a href="/contact" aria-label="Submit Enquiry" className="w-full mt-auto py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl text-xs transition-colors shadow-sm hover:shadow-md block">
                Submit Enquiry
              </a>
            </AnimatedSection>

            <AnimatedSection delay={0.1} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-premium relative flex flex-col hover:-translate-y-1 transition-transform duration-300">
              <span className="block text-3xl font-extrabold text-secondary/30 mb-3">02</span>
              <h4 className="font-bold text-primary mb-2 text-xs uppercase tracking-wider">Counselling Call</h4>
              <p className="text-slate-500 text-[11px] leading-relaxed flex-grow mb-6">Speak with our academic advisor regarding curriculum, facilities, and admissions.</p>
              <a href="tel:+919876543210" aria-label="Request Call Back" className="w-full mt-auto py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl text-xs transition-colors shadow-sm hover:shadow-md block">
                Request Call Back
              </a>
            </AnimatedSection>

            <AnimatedSection delay={0.2} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-premium relative flex flex-col hover:-translate-y-1 transition-transform duration-300">
              <span className="block text-3xl font-extrabold text-secondary/30 mb-3">03</span>
              <h4 className="font-bold text-primary mb-2 text-xs uppercase tracking-wider">Campus Visit</h4>
              <p className="text-slate-500 text-[11px] leading-relaxed flex-grow mb-6">Book a campus visit and explore our classrooms, facilities, and learning environment.</p>
              <button onClick={() => window.dispatchEvent(new CustomEvent('open-campus-visit'))} aria-label="Book Campus Visit" className="w-full mt-auto py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl text-xs transition-colors shadow-sm hover:shadow-md">
                Book Campus Visit
              </button>
            </AnimatedSection>

            <AnimatedSection delay={0.3} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-premium relative flex flex-col hover:-translate-y-1 transition-transform duration-300">
              <span className="block text-3xl font-extrabold text-secondary/30 mb-3">04</span>
              <h4 className="font-bold text-primary mb-2 text-xs uppercase tracking-wider">Apply Online</h4>
              <p className="text-slate-500 text-[11px] leading-relaxed flex-grow mb-6">Complete the online admission application form and begin the admission process.</p>
              <a href="/admissions" aria-label="Apply Online" className="w-full mt-auto py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl text-xs transition-colors shadow-sm hover:shadow-md block">
                Apply Online
              </a>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* 9. CAMPUS VISIT CTA */}
      <section className="py-16 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1')" }} />
        <div className="relative max-w-4xl mx-auto px-4 text-center z-10">
          <h2 className="text-2xl sm:text-4xl font-extrabold mb-4">Experience VillZone In Person</h2>
          <p className="text-slate-200 text-sm max-w-xl mx-auto mb-8 font-light leading-relaxed">
            Schedule a physical campus tour. We will guide you through our smart classrooms, science labs, and sports complexes.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-campus-visit'))}
              className="px-6 py-3 bg-accent hover:bg-accent-light text-primary-dark font-extrabold rounded-xl text-xs transition-transform hover:scale-105 shadow-md"
            >
              Book Campus Tour
            </button>
            <a
              href="tel:+919876543210"
              className="px-6 py-3 border border-white/20 hover:bg-white/10 text-white rounded-xl text-xs font-bold transition-transform hover:scale-105"
            >
              Contact Admissions
            </a>
          </div>
        </div>
      </section>

      {/* 10. QUICK ADMISSION ENQUIRY FORM */}
      <section className="py-20 bg-slate-50" id="quick-enquiry">
        <div className="max-w-3xl mx-auto px-4">
          <AnimatedSection className="bg-white p-8 sm:p-12 rounded-3xl shadow-premium border border-slate-100">
            <div className="text-center mb-8">
              <span className="text-xs uppercase tracking-widest text-secondary font-bold block mb-2">Admission Enquiry</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-primary">Get Admission Callback</h3>
              <p className="text-slate-500 text-xs mt-1">Leave your details and we will call you with syllabus structures.</p>
            </div>

            {enquirySuccess && (
              <div className="p-4 bg-secondary-light/10 text-secondary font-bold text-xs rounded-xl mb-6 flex items-center gap-2">
                <CheckCircle size={16} /> Thank you! Callback request received. Our counsel executive will contact you.
              </div>
            )}

            <form onSubmit={handleEnquirySubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Parent Name</label>
                  <input
                    type="text"
                    required
                    value={enquiryForm.parentName}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, parentName: e.target.value })}
                    placeholder="Enter parent name"
                    className="w-full px-4 py-2 border rounded-xl text-sm outline-none focus:border-secondary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Student Name</label>
                  <input
                    type="text"
                    required
                    value={enquiryForm.studentName}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, studentName: e.target.value })}
                    placeholder="Enter student name"
                    className="w-full px-4 py-2 border rounded-xl text-sm outline-none focus:border-secondary transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    value={enquiryForm.mobile}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, mobile: e.target.value })}
                    placeholder="Mobile number"
                    className="w-full px-4 py-2 border rounded-xl text-sm outline-none focus:border-secondary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Class Interested</label>
                  <select
                    value={enquiryForm.classInterested}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, classInterested: e.target.value })}
                    className="w-full px-4 py-2 border rounded-xl text-sm outline-none focus:border-secondary transition-colors bg-white"
                  >
                    {['Pre-KG', 'LKG', 'UKG', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'].map((cls) => (
                      <option key={cls} value={cls}>{cls}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Residential Town / Location</label>
                <input
                  type="text"
                  required
                  value={enquiryForm.location}
                  onChange={(e) => setEnquiryForm({ ...enquiryForm, location: e.target.value })}
                  placeholder="e.g. Tiruvannamalai / Chengam"
                  className="w-full px-4 py-2 border rounded-xl text-sm outline-none focus:border-secondary transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={enquiryLoading}
                className="w-full py-3 bg-secondary hover:bg-secondary-dark text-white font-bold rounded-xl shadow-premium transition-all text-xs flex items-center justify-center gap-1.5"
              >
                {enquiryLoading ? 'Submitting...' : 'Submit Admission Enquiry'} <ArrowRight size={16} />
              </button>
            </form>
          </AnimatedSection>
        </div>
      </section>

      {/* 11. FAQ SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-secondary font-bold block mb-2">FAQ</span>
            <h2 className="text-3xl font-extrabold text-primary">Frequently Asked Questions</h2>
          </AnimatedSection>

          <div className="space-y-4">
            {[
              {
                q: "What curriculum streams are offered at VillZone?",
                a: "We offer dual syllabus pathways: CBSE (Central Board of Secondary Education) and Tamil Nadu Matriculation / State Board curriculum from Pre-KG to Grade 12."
              },
              {
                q: "What is the teacher-to-student ratio?",
                a: "We maintain a maximum ratio of 1:15 to allow our experienced teachers to provide customized conceptual mentoring for every student."
              },
              {
                q: "Are school bus services equipped with safety systems?",
                a: "Yes, our entire bus network is equipped with speed governors, CCTV surveillance, GPS tracking, and parent mobile alert applications."
              },
              {
                q: "How can we apply for school admissions?",
                a: "You can apply easily by completing our Multi-step Online Registration form on our Admissions page, or visit our campus for counseling guidance."
              }
            ].map((faq, idx) => (
              <details key={idx} className="group bg-slate-50 p-6 rounded-2xl border border-slate-100 cursor-pointer outline-none">
                <summary className="font-extrabold text-primary text-sm flex justify-between items-center list-none outline-none">
                  <span className="flex items-center gap-2">
                    <HelpCircle size={16} className="text-secondary" /> {faq.q}
                  </span>
                  <ChevronRight size={16} className="group-open:rotate-90 transition-transform text-slate-400" />
                </summary>
                <p className="text-slate-600 text-xs mt-3 leading-relaxed pl-6 border-l border-secondary">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>


    </div>
  );
}

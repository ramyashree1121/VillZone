import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, GraduationCap, Phone, Mail, MessageSquare } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const [settings, setSettings] = useState({
    academicYear: '2026-27',
    schoolLogoUrl: '',
    schoolPhone: '+91 8220524146',
    schoolEmail: 'admissions@villzone.edu.in'
  });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/settings`)
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) setSettings(data);
      })
      .catch(err => console.error('Error fetching settings in Navbar:', err));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) setIsOpen(false);
    if (activeDropdown !== null) setActiveDropdown(null);
  }, [location]);

  const navCategories = [
    {
      title: 'About Us',
      items: [
        { label: 'About School', path: '/about-school' },
        { label: 'About Trust', path: '/about-trust' },
        { label: 'Vision & Mission', path: '/vision-mission' },
        { label: 'Management Team', path: '/management' }
      ],
    },
    {
      title: 'Academics',
      items: [
        { label: 'Curriculum', path: '/academics' },
        { label: 'Faculty Directory', path: '/faculty' },
        { label: 'School Calendar', path: '/calendar' },
      ],
    },
    {
      title: 'Facilities',
      items: [
        { label: 'Campus & Classes', path: '/facilities' },
        { label: 'Infrastructure Details', path: '/infrastructure' },
        { label: 'Transport & GPS Routes', path: '/transport' },
      ],
    },
    {
      title: 'Students',
      items: [
        { label: 'Achievements', path: '/student-life' },
        { label: 'Co-curricular Activities', path: '/activities' },
        { label: 'Uniform Guidelines', path: '/uniform' },
        { label: 'Rules & Regulations', path: '/rules' },
        { label: 'Parent Guidelines', path: '/guidelines' },
        { label: 'Awards & Honours', path: '/awards' }
      ],
    },
    {
      title: 'Gallery',
      items: [
        { label: 'Photos & Videos', path: '/gallery' },
        { label: 'Social Channels', path: '/social-media' }
      ],
    },
    {
      title: 'CBSE Compliance',
      items: [
        { label: 'Mandatory Public Disclosure', path: '/cbse-disclosure' }
      ]
    }
  ];

  const isAdmin = location.pathname.startsWith('/admin') || location.pathname === '/admin-login';

  if (isAdmin) {
    return (
      <header className="w-full z-50">
        <nav
          className="fixed top-0 left-0 right-0 bg-[#0F172A] text-white py-4 z-50 border-b border-slate-800"
        >
          <div className="max-w-full px-6 sm:px-10 lg:px-12 mx-auto">
            <div className="flex justify-between items-center">
              {/* Logo + Admin Badge */}
              <div className="flex items-center gap-3">
                <Link to="/" className="flex items-center gap-2.5 group">
                  <div className="p-2 rounded-xl bg-white text-[#0F172A]">
                    <GraduationCap size={24} />
                  </div>
                  <div>
                    <span className="font-extrabold text-lg tracking-tight block">VILLZONE</span>
                    <span className="text-[9px] uppercase tracking-widest block opacity-90 font-bold text-slate-400">International School</span>
                  </div>
                </Link>
                <span className="h-5 w-[1px] bg-slate-800 self-center mx-1" />
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-sm">
                  Admin Portal
                </span>
              </div>
            </div>
          </div>
        </nav>
      </header>
    );
  }

  return (
    <header className="w-full z-50">
      {/* 1. TOP HEADER (Double-decker style) */}
      <div className="bg-primary-dark text-white text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-primary/20 flex flex-col md:flex-row justify-between items-center gap-2">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href={`tel:${settings.schoolPhone}`} className="flex items-center gap-1 hover:text-accent transition-colors font-medium">
            <Phone size={12} className="text-accent" /> {settings.schoolPhone}
          </a>
          <span className="text-white/20 hidden sm:inline">|</span>
          <a href={`mailto:${settings.schoolEmail}`} className="flex items-center gap-1 hover:text-accent transition-colors font-medium">
            <Mail size={12} className="text-accent" /> {settings.schoolEmail}
          </a>
        </div>

        {/* Animated Marquee text */}
        <div className="flex-1 max-w-sm md:max-w-md lg:max-w-xl overflow-hidden relative h-5 hidden sm:flex items-center">
          <div className="animate-marquee whitespace-nowrap text-[11px] font-bold text-accent">
            📢 Admissions Open for CBSE & State Board (Pre-KG to Grade 12) for Academic Year {settings.academicYear}! Register Online Now!
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/918220524146?text=Hello%20VillZone%20Admissions%20Team"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 bg-[#25D366] hover:bg-[#20ba56] text-white px-2 py-0.5 rounded-full font-bold text-[10px]"
          >
            <FaWhatsapp size={12} className="text-white" /> WhatsApp
          </a>
          <Link
            to="/admissions"
            className="bg-accent hover:bg-accent-light text-primary-dark font-extrabold px-3 py-0.5 rounded-full text-[10px] uppercase tracking-wider transition-colors"
          >
            Apply Online
          </Link>
        </div>
      </div>

      {/* 2. STICKY NAVIGATION BAR */}
      <nav
        className={`w-full transition-all duration-300 ${isScrolled
            ? 'fixed top-0 left-0 right-0 bg-white/95 text-slate-800 shadow-premium backdrop-blur-md py-3 z-50'
            : 'relative bg-primary text-white py-4'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className={`p-1.5 rounded-xl transition-colors duration-300 ${isScrolled ? 'bg-primary text-white' : 'bg-white text-primary'}`}>
                {settings.schoolLogoUrl ? (
                  <img src={settings.schoolLogoUrl} alt="Logo" className="h-8 w-8 object-contain" />
                ) : (
                  <GraduationCap size={28} />
                )}
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight block">VILLZONE</span>
                <span className="text-[10px] uppercase tracking-widest block opacity-90 font-bold">International School</span>
              </div>
            </Link>

            {/* Links */}
            <div className="hidden lg:flex items-center gap-7">
              <Link to="/" className="font-bold hover:text-accent transition-colors text-sm">
                Home
              </Link>

              {navCategories.map((category) => (
                <div
                  key={category.title}
                  className="relative group py-2"
                  onMouseEnter={() => setActiveDropdown(category.title)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="flex items-center gap-1 font-bold text-sm hover:text-accent transition-colors">
                    {category.title} <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
                  </button>

                  <div
                    className={`absolute left-0 mt-2 w-64 rounded-2xl bg-white text-slate-800 shadow-2xl border border-slate-100 overflow-hidden transition-all duration-300 transform origin-top-left ${activeDropdown === category.title
                        ? 'scale-100 opacity-100 pointer-events-auto'
                        : 'scale-95 opacity-0 pointer-events-none'
                      }`}
                  >
                    <div className="p-3 grid gap-1">
                      {category.items.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="block px-3 py-2 text-xs rounded-xl hover:bg-slate-50 hover:text-primary transition-colors font-semibold"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              <Link to="/contact" className="font-bold hover:text-accent transition-colors text-sm">
                Contact
              </Link>

              <Link
                to="/admissions"
                className={`px-5 py-2.5 rounded-full font-bold text-xs shadow-premium hover:shadow-premium-hover hover:scale-105 active:scale-95 transition-all ${isScrolled
                    ? 'bg-secondary text-white hover:bg-secondary-dark'
                    : 'bg-accent text-primary-dark hover:bg-accent-light'
                  }`}
              >
                Apply Admission
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="lg:hidden flex items-center gap-3">
              <Link
                to="/admissions"
                className="px-3.5 py-1.5 rounded-full font-extrabold text-xs bg-secondary text-white shadow-sm"
              >
                Apply
              </Link>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 rounded-xl border transition-colors ${isScrolled ? 'border-slate-200 text-slate-700' : 'border-white/20 text-white'
                  }`}
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu panel */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-slate-900 border-t border-white/5 text-white shadow-2xl z-40 lg:hidden overflow-y-auto max-h-[80vh]">
            <div className="p-5 flex flex-col gap-4">
              <Link to="/" className="text-sm font-bold border-b border-white/5 pb-2 hover:text-accent">
                Home
              </Link>

              {navCategories.map((category) => (
                <div key={category.title} className="border-b border-white/5 pb-2">
                  <h3 className="font-bold text-slate-400 text-xs uppercase tracking-wider mb-2">
                    {category.title}
                  </h3>
                  <div className="flex flex-col gap-2 pl-2 border-l border-white/10">
                    {category.items.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="text-xs py-1 text-slate-200 hover:text-accent font-semibold transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              <Link to="/contact" className="text-sm font-bold border-b border-white/5 pb-2 hover:text-accent">
                Contact
              </Link>

              <div className="pt-2 flex flex-col gap-2">
                <Link
                  to="/admissions"
                  className="w-full text-center py-2.5 rounded-xl font-bold bg-secondary hover:bg-secondary-dark text-sm shadow-md"
                >
                  Apply Online
                </Link>
                <Link
                  to="/admin-login"
                  className="w-full text-center py-2 rounded-xl font-bold bg-white/10 hover:bg-white/20 text-xs text-slate-300"
                >
                  Admin Portal
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

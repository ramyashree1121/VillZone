import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin } from 'lucide-react';
import { FaFacebook, FaYoutube, FaInstagram, FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  const [socialLinks, setSocialLinks] = useState({ facebookUrl: '', instagramUrl: '', youtubeUrl: '' });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/settings`)
      .then(res => res.json())
      .then(data => {
        if (data) {
          setSocialLinks(data);
        }
      })
      .catch(err => console.error('Error loading settings in footer:', err));
  }, []);

  return (
    <footer className="bg-primary-dark text-slate-300 pt-16 pb-8 border-t-4 border-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Column 1: School Info */}
          <div>
            <div className="flex items-center gap-2 text-white mb-4">
              <div className="p-2 rounded-lg bg-secondary text-white">
                <GraduationCap size={28} />
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight block">VILLZONE</span>
                <span className="text-[10px] uppercase tracking-widest block opacity-90">International School</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Empowering students from day one to lead academic, personal, and societal growth through custom curriculums and local community integration.
            </p>
            <div className="flex gap-4">
              <a
                href={socialLinks.facebookUrl || "https://www.facebook.com/villzoneschool"}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full bg-slate-800 hover:bg-secondary hover:text-white transition-all text-slate-300 flex items-center justify-center"
              >
                <FaFacebook size={18} />
              </a>
              <a
                href={socialLinks.instagramUrl || "https://www.instagram.com/villzoneschool"}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full bg-slate-800 hover:bg-secondary hover:text-white transition-all text-slate-300 flex items-center justify-center"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href={socialLinks.youtubeUrl || "https://www.youtube.com/@villzoneschool"}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full bg-slate-800 hover:bg-secondary hover:text-white transition-all text-slate-300 flex items-center justify-center"
              >
                <FaYoutube size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4 pb-2 border-b border-white/10">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about-school" className="hover:text-accent transition-colors">About Our School</Link>
              </li>
              <li>
                <Link to="/academics" className="hover:text-accent transition-colors">Academics & Curriculum</Link>
              </li>
              <li>
                <Link to="/facilities" className="hover:text-accent transition-colors">Campus Facilities</Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-accent transition-colors">Photo & Video Gallery</Link>
              </li>
              <li>
                <Link to="/cbse-disclosure" className="hover:text-accent transition-colors">CBSE Public Disclosure</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Portals & Info */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4 pb-2 border-b border-white/10">Important Info</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/admissions" className="hover:text-accent transition-colors">Admissions Procedure</Link>
              </li>
              <li>
                <Link to="/rules" className="hover:text-accent transition-colors">Rules & Regulations</Link>
              </li>
              <li>
                <Link to="/calendar" className="hover:text-accent transition-colors">School Calendar</Link>
              </li>
              <li>
                <Link to="/transport" className="hover:text-accent transition-colors">Transport Routes</Link>
              </li>
              <li>
                <Link to="/admin-login" className="hover:text-accent transition-colors">Management Portal</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact details */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4 pb-2 border-b border-white/10">Get In Touch</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3 group">
                <MapPin size={18} className="text-secondary shrink-0 mt-0.5 group-hover:text-accent transition-colors" />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=VillZone+School+Opposite+Indian+Bank+Near+Annanya+Mahal+Kilpennathur+Tiruvannamalai+Tamil+Nadu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  VillZone School, Opposite Indian Bank, Near Annanya Mahal, Kilpennathur, Tiruvannamalai
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-secondary shrink-0" />
                <a href="tel:+918220524146" className="hover:text-accent transition-colors">8220524146</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-secondary shrink-0" />
                <a href="mailto:villzone.india@gmail.com?subject=Admission Enquiry" className="hover:text-accent transition-colors">villzone.india@gmail.com</a>
              </li>
            </ul>


          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 my-10" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>&copy; {new Date().getFullYear()} VillZone International School. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/rules" className="hover:underline">Privacy Policy</Link>
            <Link to="/rules" className="hover:underline">Terms of Use</Link>
            <Link to="/cbse-disclosure" className="hover:underline">Mandatory Disclosures</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

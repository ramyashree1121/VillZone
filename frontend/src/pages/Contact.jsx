import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, MessageSquare, ExternalLink } from 'lucide-react';
import { FaFacebook, FaYoutube, FaInstagram } from 'react-icons/fa';
import AnimatedSection from '../components/AnimatedSection';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });
  const [socialLinks, setSocialLinks] = useState({ facebookUrl: '', instagramUrl: '', youtubeUrl: '' });

  useEffect(() => {
    fetch('${import.meta.env.VITE_API_URL}/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data) setSocialLinks(data);
      })
      .catch(err => console.error('Error fetching settings on contact page:', err));
  }, []);

  const validateForm = () => {
    const newErrors = {};
    const mobileRegex = /^[6-9]\d{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
      newErrors.name = "Parent name is required.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required.";
    } else if (!mobileRegex.test(formData.mobile)) {
      newErrors.mobile = "Must be exactly 10 digits starting with 6, 7, 8, or 9.";
    }
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required.";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus({ loading: true, success: false, error: '' });
    try {
      const response = await fetch('${import.meta.env.VITE_API_URL}/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setStatus({ loading: false, success: true, error: '' });
        setFormData({ name: '', email: '', mobile: '', subject: '', message: '' });
      } else {
        throw new Error(data.message || 'Failed to submit inquiry');
      }
    } catch (err) {
      setStatus({ loading: false, success: false, error: err.message });
    }
  };

  const mapSearchUrl = 'https://www.google.com/maps/search/?api=1&query=Ananya+Mahal,+Kilpennathur';

  return (
    <div className="pt-0 bg-slate-50 min-h-screen">

      {/* Banner */}
      <section className="bg-primary text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&q=80&w=1000')" }} />
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl font-extrabold mb-2 animate-fadeIn">Get In Touch</h1>
          <p className="text-slate-200 max-w-xl mx-auto font-light text-sm">We are here to answer your admission queries and welcome you to our campus.</p>
        </div>
      </section>

      {/* Forms & Coordinates */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Coordinates */}
          <div className="space-y-8">
            <AnimatedSection>
              <h2 className="text-2xl font-black text-primary mb-6">Contact Coordinates</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                {/* Phone Call */}
                <a
                  href="tel:+918220524146"
                  className="block p-5 bg-white rounded-2xl border hover:border-secondary transition-all shadow-sm group hover:-translate-y-0.5"
                >
                  <Phone size={24} className="text-secondary mb-3 group-hover:scale-110 transition-transform" />
                  <h4 className="font-bold text-primary text-sm">📞 Call Admissions Team</h4>
                  <p className="text-xs text-slate-500 mt-1 font-semibold">+91 8220524146</p>
                  <span className="text-[10px] text-secondary font-bold mt-2 inline-flex items-center gap-1 group-hover:underline">
                    Click to Call <ExternalLink size={10} />
                  </span>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/918220524146?text=Hello%20VillZone%20School,%20I%20would%20like%20to%20know%20more%20about%20admissions%20for%20my%20child."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-5 bg-white rounded-2xl border hover:border-[#25D366] transition-all shadow-sm group hover:-translate-y-0.5"
                >
                  <MessageSquare size={24} className="text-[#25D366] mb-3 group-hover:scale-110 transition-transform" />
                  <h4 className="font-bold text-primary text-sm">💬 Chat on WhatsApp</h4>
                  <p className="text-xs text-slate-500 mt-1 font-semibold">Available 9 AM - 6 PM</p>
                  <span className="text-[10px] text-[#25D366] font-bold mt-2 inline-flex items-center gap-1 group-hover:underline">
                    Connect Now <ExternalLink size={10} />
                  </span>
                </a>

                {/* Email */}
                <a
                  href="mailto:villzone.india@gmail.com?subject=Admission Enquiry"
                  className="block p-5 bg-white rounded-2xl border hover:border-primary transition-all shadow-sm group hover:-translate-y-0.5"
                >
                  <Mail size={24} className="text-primary mb-3 group-hover:scale-110 transition-transform" />
                  <h4 className="font-bold text-primary text-sm">✉️ Send Email</h4>
                  <p className="text-xs text-slate-500 mt-1 font-semibold">villzone.india@gmail.com</p>
                  <span className="text-[10px] text-primary font-bold mt-2 inline-flex items-center gap-1 group-hover:underline">
                    Compose Email <ExternalLink size={10} />
                  </span>
                </a>

                {/* View Location */}
                <a
                  href={mapSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-5 bg-white rounded-2xl border hover:border-accent transition-all shadow-sm group hover:-translate-y-0.5"
                >
                  <MapPin size={24} className="text-accent mb-3 group-hover:scale-110 transition-transform" />
                  <h4 className="font-bold text-primary text-sm">📍 View Location</h4>
                  <p className="text-xs text-slate-500 mt-1 font-semibold">Opposite Indian Bank, Kilpennathur</p>
                  <span className="text-[10px] text-accent-dark font-bold mt-2 inline-flex items-center gap-1 group-hover:underline">
                    Open Search Map <ExternalLink size={10} />
                  </span>
                </a>

              </div>
            </AnimatedSection>

            {/* Embedded Google Map */}
            <AnimatedSection className="bg-white p-4 rounded-2xl border shadow-sm space-y-4">
              <div className="rounded-xl overflow-hidden h-64 border">
                <iframe
                  title="VillZone School Location Map"
                  src="https://maps.google.com/maps?q=Ananya%20Mahal,%20Kilpennathur&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
              <div className="flex gap-3">
                <a
                  href={mapSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs text-center flex items-center justify-center gap-1.5 border"
                >
                  Open in Google Maps <ExternalLink size={12} />
                </a>
                <a
                  href={mapSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-4 bg-primary hover:bg-primary-light text-white rounded-xl font-bold text-xs text-center flex items-center justify-center gap-1.5"
                >
                  Get Directions <MapPin size={12} />
                </a>
              </div>
            </AnimatedSection>

            {/* Social Media settings display */}
            <AnimatedSection className="bg-white p-6 rounded-2xl border shadow-sm">
              <h4 className="font-bold text-primary text-sm mb-4">Connect on Social Media</h4>
              <div className="flex gap-4">
                {socialLinks.facebookUrl ? (
                  <a href={socialLinks.facebookUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 border border-blue-100 rounded-xl hover:bg-blue-100 transition-colors text-xs font-bold">
                    <FaFacebook size={16} /> Facebook
                  </a>
                ) : (
                  <span className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-400 border border-slate-100 rounded-xl cursor-not-allowed text-xs font-bold" title="Facebook URL is not configured by Admin">
                    <FaFacebook size={16} /> Facebook
                  </span>
                )}

                {socialLinks.instagramUrl ? (
                  <a href={socialLinks.instagramUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-pink-50 text-pink-600 border border-pink-100 rounded-xl hover:bg-pink-100 transition-colors text-xs font-bold">
                    <FaInstagram size={16} /> Instagram
                  </a>
                ) : (
                  <span className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-400 border border-slate-100 rounded-xl cursor-not-allowed text-xs font-bold" title="Instagram URL is not configured by Admin">
                    <FaInstagram size={16} /> Instagram
                  </span>
                )}

                {socialLinks.youtubeUrl ? (
                  <a href={socialLinks.youtubeUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 border border-red-100 rounded-xl hover:bg-red-100 transition-colors text-xs font-bold">
                    <FaYoutube size={16} /> YouTube
                  </a>
                ) : (
                  <span className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-400 border border-slate-100 rounded-xl cursor-not-allowed text-xs font-bold" title="YouTube URL is not configured by Admin">
                    <FaYoutube size={16} /> YouTube
                  </span>
                )}
              </div>
            </AnimatedSection>
          </div>

          {/* Form */}
          <AnimatedSection className="bg-white p-8 rounded-3xl border border-slate-100 shadow-premium h-fit">
            <h2 className="text-2xl font-extrabold text-primary mb-2">Send An Enquiry</h2>
            <p className="text-xs text-slate-400 mb-6">Submit your general enquiry. Our team will contact you shortly.</p>

            {status.success && (
              <div className="p-4 bg-secondary-light/10 text-secondary font-bold text-xs rounded-xl mb-6 flex items-center gap-2 border">
                <CheckCircle size={18} /> Inquiry submitted successfully! Our office desk will email or call you.
              </div>
            )}

            {status.error && (
              <div className="p-4 bg-red-50 text-red-600 font-bold text-xs rounded-xl mb-6 border border-red-100">
                {status.error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Parent Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter parent name"
                  className="w-full px-4 py-2.5 border rounded-xl text-sm outline-none focus:border-secondary transition-colors"
                />
                {errors.name && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="parent@domain.com"
                    className="w-full px-4 py-2.5 border rounded-xl text-sm outline-none focus:border-secondary transition-colors"
                  />
                  {errors.email && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    placeholder="10 digits Indian format"
                    className="w-full px-4 py-2.5 border rounded-xl text-sm outline-none focus:border-secondary transition-colors"
                  />
                  {errors.mobile && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.mobile}</p>}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Subject *</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Admission Inquiry Grade 6"
                  className="w-full px-4 py-2.5 border rounded-xl text-sm outline-none focus:border-secondary transition-colors"
                />
                {errors.subject && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.subject}</p>}
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Message *</label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Type details here..."
                  rows="4"
                  className="w-full px-4 py-2.5 border rounded-xl text-sm outline-none focus:border-secondary transition-colors"
                />
                {errors.message && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={status.loading}
                className="w-full py-3 bg-secondary hover:bg-secondary-dark text-white font-bold rounded-xl shadow-premium transition-all text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                {status.loading ? 'Sending Inquiry...' : 'Send Message'} <Send size={16} />
              </button>

            </form>
          </AnimatedSection>

        </div>
      </section>

    </div>
  );
}

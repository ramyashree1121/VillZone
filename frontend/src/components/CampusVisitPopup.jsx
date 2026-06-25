import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { X, CheckCircle, Info } from 'lucide-react';

export default function CampusVisitPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const [visitForm, setVisitForm] = useState({
    parentName: '',
    mobile: '',
    email: '',
    visitDate: '',
    message: ''
  });
  const [visitSuccess, setVisitSuccess] = useState(false);
  const [visitLoading, setVisitLoading] = useState(false);
  const [visitError, setVisitError] = useState('');

  useEffect(() => {
    // Hide popup initially on any route change or refresh
    setIsOpen(false);

    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-campus-visit', handleOpen);

    // Exclude contact and admission pages
    if (location.pathname === '/contact' || location.pathname === '/admissions') {
      return () => window.removeEventListener('open-campus-visit', handleOpen);
    }

    // We set it to true after a slight delay
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1500);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('open-campus-visit', handleOpen);
    };
  }, [location.pathname]);

  const handleVisitSubmit = async (e) => {
    e.preventDefault();
    setVisitError('');

    if (!/^\d{10}$/.test(visitForm.mobile)) {
      setVisitError('Please enter a valid 10-digit mobile number.');
      return;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(visitForm.visitDate);
    if (selectedDate < today) {
      setVisitError('Visit date cannot be in the past.');
      return;
    }

    setVisitLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/campus-visits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parentName: visitForm.parentName,
          mobileNumber: visitForm.mobile,
          emailAddress: visitForm.email,
          visitDate: visitForm.visitDate,
          message: visitForm.message
        })
      });
      if (response.ok) {
        setVisitSuccess(true);
        setVisitForm({ parentName: '', mobile: '', email: '', visitDate: '', message: '' });
        setTimeout(() => {
          setVisitSuccess(false);
          setIsOpen(false);
        }, 3000);
      } else {
        setVisitError('Failed to submit request. Please try again.');
      }
    } catch (err) {
      setVisitError('Server connection error. Please try again later.');
      console.error(err);
    } finally {
      setVisitLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-[100] flex items-center justify-center p-4 transition-all duration-500" onClick={() => setIsOpen(false)}>
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 w-full max-w-2xl relative overflow-hidden flex flex-col max-h-[90vh] animate-fadeIn scale-100 transform transition-transform" onClick={(e) => e.stopPropagation()}>
        
        <div className="bg-gradient-to-r from-primary to-primary-dark p-6 text-center relative shrink-0">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition z-50 cursor-pointer"
          >
            <X size={20} />
          </button>
          <h3 className="text-2xl font-black text-white mb-2 tracking-wide drop-shadow-md">Book Campus Visit</h3>
          <p className="text-sm text-blue-100/90 font-medium max-w-md mx-auto">
            Schedule a personalized campus tour and discover the world-class learning environment at VillZone International School.
          </p>
        </div>

        <div className="p-6 overflow-y-auto custom-scrollbar">
          {!visitSuccess ? (
            <form onSubmit={handleVisitSubmit} className="space-y-5">
              {visitError && (
                <div className="bg-rose-50 text-rose-600 p-3 rounded-lg text-sm font-semibold border border-rose-100">
                  {visitError}
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Parent / Applicant Name *</label>
                  <input type="text" required value={visitForm.parentName} onChange={(e) => setVisitForm({ ...visitForm, parentName: e.target.value })}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition shadow-sm bg-slate-50/50 focus:bg-white" placeholder="Enter parent or applicant name" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Mobile Number *</label>
                  <input type="tel" required value={visitForm.mobile} onChange={(e) => setVisitForm({ ...visitForm, mobile: e.target.value })}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition shadow-sm bg-slate-50/50 focus:bg-white" placeholder="10-digit mobile number" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Email Address *</label>
                  <input type="email" required value={visitForm.email} onChange={(e) => setVisitForm({ ...visitForm, email: e.target.value })}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition shadow-sm bg-slate-50/50 focus:bg-white" placeholder="Email address" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Preferred Visit Date *</label>
                  <input type="date" required value={visitForm.visitDate} onChange={(e) => setVisitForm({ ...visitForm, visitDate: e.target.value })}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition shadow-sm bg-slate-50/50 focus:bg-white" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Additional Message (Optional)</label>
                <textarea value={visitForm.message} onChange={(e) => setVisitForm({ ...visitForm, message: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition shadow-sm bg-slate-50/50 focus:bg-white" placeholder="Any specific questions or requests?" rows="2"></textarea>
              </div>

              <div className="space-y-1 mb-2 pt-2">
                <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5"><Info size={14} className="text-slate-400" /> Campus Visit Hours: Monday to Friday – 09:00 AM to 04:00 PM</p>
                <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5 pl-5">• Saturday – 09:00 AM to 01:00 PM</p>
                <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5 pl-5">• Sunday – Closed</p>
                <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5 pl-5 pt-1">• Our admissions team will contact you to confirm a convenient visit time after your request is submitted.</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-100">
                <button type="submit" disabled={visitLoading} className="flex-1 py-3.5 bg-primary hover:bg-primary-dark text-white font-black rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 text-sm">
                  {visitLoading ? 'Submitting...' : 'Book My Visit'}
                </button>
                <a href="/admissions" className="flex-1 py-3.5 bg-white border-2 border-secondary hover:bg-secondary hover:text-white text-secondary text-center font-black rounded-xl transition-all text-sm">
                  Apply for Admission
                </a>
              </div>
            </form>
          ) : (
            <div className="py-12 text-center flex flex-col items-center gap-5">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-2">
                <CheckCircle size={48} className="text-emerald-500" />
              </div>
              <h3 className="text-xl font-black text-slate-800 max-w-sm">Thank you for your interest in VillZone International School.</h3>
              <p className="text-slate-600 font-medium text-sm max-w-sm">
                Your campus visit request has been submitted successfully. Our admissions team will contact you shortly to confirm your visit.
              </p>
              <button onClick={() => setIsOpen(false)} className="mt-4 px-8 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition">
                Close Window
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

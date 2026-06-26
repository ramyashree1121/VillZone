import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Calendar, GraduationCap, Users, Phone, Mail,
  MapPin, CheckCircle, ArrowRight, ArrowLeft, Download,
  ShieldCheck, FileText, FileSpreadsheet, Search, Check, AlertCircle, Clock, BookOpen, MessageSquare, ExternalLink, Award, X
} from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

export default function Admission() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeMode, setActiveMode] = useState('apply'); // 'apply' or 'track'
  const [step, setStep] = useState(1);
  const [uploadProgress, setUploadProgress] = useState({});
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ loading: false, success: false, error: '', appNumber: '' });

  // Tracking State
  const [trackingNum, setTrackingNum] = useState('');
  const [trackingMobile, setTrackingMobile] = useState('');
  const [trackedApplication, setTrackedApplication] = useState(null);
  const [trackingError, setTrackingError] = useState('');
  const [trackingLoading, setTrackingLoading] = useState(false);

  // Form Data State
  const [formData, setFormData] = useState({
    studentName: '', dateOfBirth: '', gender: '', classApplyingFor: '',
    academicSession: '2026-27', bloodGroup: '', nationality: 'Indian', religion: 'Hindu',
    motherTongue: 'Tamil', aadhaarNumber: '', specialNeeds: '',
    fatherName: '', fatherOccupation: '', fatherQualification: '', fatherMobile: '', fatherEmail: '',
    motherName: '', motherOccupation: '', motherQualification: '', motherMobile: '', motherEmail: '',
    preferredCommunication: 'WhatsApp',
    addressLine1: '', addressLine2: '', city: '', district: '', state: 'Tamil Nadu', country: 'India', pincode: '',
    transportRequired: false, transportRoute: '',
    previousSchool: '', previousBoard: '', previousGrade: '', previousPerformance: 'Good', reasonForTransfer: '',
    studentPhoto: '', birthCertificate: '', aadhaarCard: '', transferCertificate: '', previousMarksheet: '', medicalRecords: ''
  });

  const formRef = useRef(null);

  const classes = [
    'Pre-KG', 'LKG', 'UKG', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5',
    'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'
  ];

  const tnDistricts = [
    'Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Tiruchirappalli', 'Tirunelveli',
    'Erode', 'Vellore', 'Ranipet', 'Kanchipuram', 'Tiruvannamalai', 'Dharmapuri'
  ];

  const routes = ['Route 1 (Vellore bypass)', 'Route 2 (Tiruvannamalai Town)', 'Route 3 (Chengam Bypass)', 'Route 4 (Polur Ring Road)'];

  // Match active mode based on route path
  useEffect(() => {
    if (location.pathname === '/track-application') {
      setActiveMode('track');
    } else {
      setActiveMode('apply');
    }
  }, [location]);

  const validateFieldName = (name, value) => {
    const nameRegex = /^[A-Za-z ]+$/;
    const mobileRegex = /^[6-9]\d{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const pinRegex = /^\d{6}$/;
    const aadhaarRegex = /^\d{12}$/;

    switch (name) {
      case 'studentName':
        if (!value) return 'Student name is required.';
        if (!nameRegex.test(value)) return 'Name must contain only letters.';
        break;
      case 'dateOfBirth':
        if (!value) return 'Date of Birth is required.';
        break;
      case 'gender':
        if (!value) return 'Gender selection is required.';
        break;
      case 'classApplyingFor':
        if (!value) return 'Please select the grade you are applying for.';
        break;
      case 'aadhaarNumber':
        if (value && !aadhaarRegex.test(value)) return 'Aadhaar must be 12 digits.';
        break;
      case 'fatherName':
        if (!value) return "Father's name is required.";
        if (!nameRegex.test(value)) return 'Father name must contain only letters.';
        break;
      case 'motherName':
        if (!value) return "Mother's name is required.";
        if (!nameRegex.test(value)) return 'Mother name must contain only letters.';
        break;
      case 'fatherMobile':
        if (!value) return 'Father mobile number is required.';
        if (!mobileRegex.test(value)) return 'Mobile must be a valid 10-digit number.';
        break;
      case 'fatherEmail':
        if (!value) return 'Father email is required.';
        if (!emailRegex.test(value)) return 'Please enter a valid email.';
        break;
      case 'addressLine1':
        if (!value) return 'Address Line 1 is required.';
        break;
      case 'city':
        if (!value) return 'City/Town is required.';
        break;
      case 'district':
        if (!value) return 'District is required.';
        break;
      case 'pincode':
        if (!value) return 'Pincode is required.';
        if (!pinRegex.test(value)) return 'Pincode must be exactly 6 digits.';
        break;
      case 'previousBoard':
        if (!value) return 'Previous Board is required.';
        break;
      default:
        return '';
    }
    return '';
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const tagName = e.target.tagName;
      if (tagName === 'TEXTAREA' && !e.ctrlKey) {
        e.preventDefault();
        focusNextField(e.target);
        return;
      }
      if (tagName === 'TEXTAREA' && e.ctrlKey) return; // Allow newline on Ctrl+Enter

      e.preventDefault();

      const name = e.target.name;
      const value = e.target.value;
      const errorMsg = validateFieldName(name, value);

      if (errorMsg) {
        setErrors(prev => ({ ...prev, [name]: errorMsg }));
        e.target.focus();
        return;
      } else {
        setErrors(prev => {
          const copy = { ...prev };
          delete copy[name];
          return copy;
        });
      }

      focusNextField(e.target);
    }
  };

  const focusNextField = (currentInput) => {
    if (!formRef.current) return;
    const elements = Array.from(formRef.current.querySelectorAll('input, select, textarea, button'))
      .filter(el => !el.disabled && el.type !== 'hidden');
    const index = elements.indexOf(currentInput);
    if (index > -1 && index < elements.length - 1) {
      elements[index + 1].focus();
    } else {
      if (step < 6) {
        handleNextStep();
      } else {
        handleSubmitForm();
      }
    }
  };

  const validateStep = (activeStep) => {
    const stepErrors = {};
    let fields = [];

    if (activeStep === 1) fields = ['studentName', 'dateOfBirth', 'aadhaarNumber', 'gender', 'classApplyingFor'];
    if (activeStep === 2) fields = ['fatherName', 'motherName', 'fatherMobile', 'fatherEmail'];
    if (activeStep === 3) fields = ['addressLine1', 'city', 'district', 'pincode'];
    if (activeStep === 4) fields = ['previousBoard'];
    if (activeStep === 5) {
      if (!formData.studentPhoto) stepErrors.studentPhoto = 'Student photo is required.';
      if (!formData.birthCertificate) stepErrors.birthCertificate = 'Birth certificate is required.';
      if (!formData.aadhaarCard) stepErrors.aadhaarCard = 'Aadhaar card is required.';
    }

    fields.forEach(f => {
      const err = validateFieldName(f, formData[f]);
      if (err) stepErrors[f] = err;
    });

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(step)) {
      setStep(prev => Math.min(prev + 1, 6));
    } else {
      // Focus the first field that has an error
      setTimeout(() => {
        const firstErrorEl = formRef.current?.querySelector('.border-rose-500');
        if (firstErrorEl) firstErrorEl.focus();
      }, 50);
    }
  };

  const handlePrevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadProgress(prev => ({ ...prev, [field]: 10 }));
    let prog = 10;
    const interval = setInterval(() => {
      prog += 30;
      if (prog >= 100) {
        clearInterval(interval);
        setUploadProgress(prev => ({ ...prev, [field]: 100 }));
        setFormData(prev => ({ ...prev, [field]: file.name }));
      } else {
        setUploadProgress(prev => ({ ...prev, [field]: prog }));
      }
    }, 150);
  };

  const handleSubmitForm = async (e) => {
    if (e) e.preventDefault();
    if (!validateStep(step)) {
      setTimeout(() => {
        const firstErrorEl = formRef.current?.querySelector('.border-rose-500');
        if (firstErrorEl) firstErrorEl.focus();
      }, 50);
      return;
    }

    setStatus({ loading: true, success: false, error: '', appNumber: '' });
    try {
      const response = await fetch('${import.meta.env.VITE_API_URL}/api/admissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setStatus({
          loading: false,
          success: true,
          error: '',
          appNumber: data.data.applicationNumber
        });
      } else {
        throw new Error(data.message || 'Submission failed.');
      }
    } catch (err) {
      setStatus({ loading: false, success: false, error: err.message, appNumber: '' });
    }
  };

  const handleTrackApplication = async (e) => {
    e.preventDefault();
    setTrackingError('');
    setTrackedApplication(null);
    if (!trackingNum || !trackingMobile) {
      setTrackingError('Application Number and Mobile Number are required.');
      return;
    }
    setTrackingLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admissions/track?applicationNumber=${trackingNum}&mobileNumber=${trackingMobile}`);
      const data = await response.json();
      if (response.ok) {
        setTrackedApplication(data);
      } else {
        setTrackingError(data.message || 'Application record not found.');
      }
    } catch (err) {
      setTrackingError('Connection error to tracking servers.');
    } finally {
      setTrackingLoading(false);
    }
  };

  return (
    <div className="pt-0 bg-[#F8FAFC] text-[#0F172A] min-h-screen font-sans">

      {/* HERO SECTION */}
      <section className="relative py-10 bg-gradient-to-b from-[#EBF3FC] to-[#F8FAFC] overflow-hidden border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <div className="space-y-6 text-left">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-primary/10 text-primary border border-primary/20">
              ⚡ Admissions Open 2026-27
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0F172A] leading-tight">
              Apply for Admission at <span className="text-primary">VillZone</span> International School
            </h1>
            <p className="text-slate-600 text-sm md:text-base font-light leading-relaxed max-w-xl">
              Give your child the opportunity to learn, grow and succeed in a safe, premium, and future-ready learning environment.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => {
                  setActiveMode('apply');
                  navigate('/admissions');
                  document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-3.5 bg-secondary hover:bg-secondary-dark text-white font-extrabold rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all text-xs uppercase tracking-wider cursor-pointer font-sans"
              >
                Apply Online
              </button>
              <button
                onClick={() => window.open('/document/prospectus', '_blank')}
                className="px-8 py-3.5 border border-[#E2E8F0] hover:bg-slate-50 text-primary font-extrabold rounded-2xl hover:scale-105 active:scale-95 transition-all text-xs uppercase tracking-wider cursor-pointer bg-white"
              >
                Download Prospectus
              </button>
              <button
                onClick={() => {
                  setActiveMode('track');
                  navigate('/track-application');
                  document.getElementById('track-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-3.5 bg-[#1E88E5] hover:bg-[#1976D2] text-white font-extrabold rounded-2xl shadow-md hover:scale-105 active:scale-95 transition-all text-xs uppercase tracking-wider cursor-pointer"
              >
                Track Application
              </button>
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="w-full max-w-md bg-white border border-[#E2E8F0] rounded-3xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full" />
              <GraduationCap size={44} className="text-primary mb-4" />
              <h3 className="text-lg font-black text-slate-800 mb-2">Central Admissions Office</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-light mb-4">
                VillZone CBSE wing holds international standards of safety, classrooms equipped with smart interfaces, and seasoned educational staff.
              </p>
              <div className="border-t border-[#E2E8F0] pt-4 flex gap-4 text-xs font-semibold text-primary">
                <span>✓ CBSE Affiliated</span>
                <span>✓ Smart Campus</span>
                <span>✓ Sports Hub</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* TRACK APPLICATION SECTION */}
      {activeMode === 'track' && (
        <section id="track-section" className="py-10 max-w-lg mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 shadow-xl">
            <h3 className="text-lg font-black text-slate-800 flex items-center gap-2 mb-4 border-b pb-3 border-[#E2E8F0]">
              <Search size={18} className="text-primary" /> Track Application
            </h3>
            {trackingError && (
              <div className="p-3.5 bg-rose-50 border-l-4 border-rose-500 text-rose-600 font-bold text-xs rounded-r-xl mb-4">
                {trackingError}
              </div>
            )}
            <form onSubmit={handleTrackApplication} className="space-y-4 font-semibold text-xs text-slate-700">
              <div>
                <label className="block text-[10px] text-slate-400 uppercase tracking-widest mb-1.5">Application Number</label>
                <input
                  type="text"
                  value={trackingNum}
                  onChange={(e) => setTrackingNum(e.target.value)}
                  placeholder="e.g. VHIS-2026-000001"
                  className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl outline-none bg-slate-50 focus:bg-white focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 uppercase tracking-widest mb-1.5">Mobile Number</label>
                <input
                  type="tel"
                  value={trackingMobile}
                  onChange={(e) => setTrackingMobile(e.target.value)}
                  placeholder="Registered father/mother mobile"
                  className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl outline-none bg-slate-50 focus:bg-white focus:border-primary transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={trackingLoading}
                className="w-full py-3 bg-[#1E88E5] hover:bg-[#1976D2] text-white font-extrabold rounded-xl uppercase tracking-wider cursor-pointer shadow transition-all flex items-center justify-center gap-1"
              >
                {trackingLoading ? 'Searching...' : 'Track Status'}
              </button>
            </form>

            {trackedApplication && (
              <div className="mt-8 pt-6 border-t border-[#E2E8F0] space-y-4">
                <div className="bg-[#F8FAFC] p-4 rounded-2xl border flex justify-between items-center">
                  <div>
                    <h5 className="font-bold text-xs text-slate-800">{trackedApplication.studentName}</h5>
                    <span className="text-[9px] font-semibold text-slate-400">Class: {trackedApplication.classApplyingFor}</span>
                  </div>
                  <span className="px-2.5 py-0.5 text-[9px] font-black bg-primary/10 text-primary rounded-full uppercase">
                    {trackedApplication.status}
                  </span>
                </div>
                {/* visual pipeline status check */}
                <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-1 before:bottom-1 before:w-[2px] before:bg-slate-100">
                  {['Applied', 'Verified', 'Interview Scheduled', 'Approved', 'Enrolled'].map((stepVal, stepIdx) => {
                    const trackingIdx = ['Applied', 'Verified', 'Interview Scheduled', 'Approved', 'Enrolled'].indexOf(trackedApplication.status);
                    const completed = stepIdx <= trackingIdx;
                    return (
                      <div key={stepVal} className="relative flex items-center gap-3">
                        <div className={`absolute -left-6 w-4 h-4 rounded-full border flex items-center justify-center text-[8px] font-bold ${completed ? 'bg-secondary border-secondary text-white' : 'bg-white border-slate-200 text-slate-400'}`}>
                          {completed ? '✓' : stepIdx + 1}
                        </div>
                        <span className={`text-[11px] font-bold ${completed ? 'text-slate-800' : 'text-slate-400'}`}>{stepVal}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>
        </section>
      )}

      {/* ADMISSION FORM SECTION */}
      {activeMode === 'apply' && (
        <section id="form-section" className="py-10 max-w-3xl mx-auto px-6">
          <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-10 shadow-premium">

            {status.success ? (
              <div className="text-center p-8 space-y-6 flex flex-col items-center">
                <div className="w-16 h-16 bg-[#22C55E]/10 text-[#22C55E] rounded-full flex items-center justify-center">
                  <CheckCircle size={36} />
                </div>
                <h3 className="text-xl md:text-2xl font-black text-slate-800">Application Submitted!</h3>
                <div className="bg-slate-50 border p-4 rounded-2xl w-full max-w-sm">
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest font-black block">Application Number</span>
                  <span className="text-xl font-black text-primary block mt-1">{status.appNumber}</span>
                </div>
                <p className="text-xs text-slate-500 max-w-xs leading-relaxed font-light">
                  A confirmation SMS, WhatsApp and Email alert has been sent. Please keep the application number for tracking.
                </p>
                <div className="flex gap-3">
                  <button onClick={() => window.print()} className="px-5 py-2.5 bg-slate-900 text-white font-extrabold text-xs rounded-xl uppercase tracking-wider">Print PDF</button>
                  <button
                    onClick={() => {
                      setTrackingNum(status.appNumber);
                      setTrackingMobile(formData.fatherMobile);
                      setActiveMode('track');
                      setStatus({ loading: false, success: false, error: '', appNumber: '' });
                    }}
                    className="px-5 py-2.5 border rounded-xl font-extrabold text-xs uppercase tracking-wider text-primary"
                  >
                    Track Status
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {/* Title */}
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-extrabold text-primary">Application Form</h2>
                  <p className="text-xs text-slate-400 mt-1 font-sans">Please fill out the multi-step form to apply for admission.</p>
                </div>

                {/* 6 Step Indicators */}
                <div className="flex items-center justify-between mb-10 border-b pb-6 px-2 overflow-x-auto">
                  {['Student', 'Parents', 'Address', 'Academic', 'Docs', 'Review'].map((val, idx) => {
                    const stepNum = idx + 1;
                    const isActive = step === stepNum;
                    const isCompleted = step > stepNum;
                    return (
                      <div key={idx} className="flex-1 flex items-center last:flex-none">
                        <div className="flex flex-col items-center relative z-10 shrink-0">
                          <button
                            type="button"
                            onClick={() => stepNum < step && setStep(stepNum)}
                            disabled={stepNum >= step}
                            className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${isActive
                                ? 'bg-primary text-white ring-4 ring-primary/20 shadow-md'
                                : isCompleted
                                  ? 'bg-secondary text-white'
                                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                              }`}
                          >
                            {isCompleted ? <Check size={14} /> : stepNum}
                          </button>
                          <span className={`text-[10px] font-bold mt-2 tracking-wider ${isActive ? 'text-primary' : isCompleted ? 'text-secondary' : 'text-slate-400'
                            }`}>
                            {val}
                          </span>
                        </div>
                        {idx < 5 && (
                          <div className="flex-grow h-0.5 mx-2 bg-slate-100 relative -top-3 min-w-[20px]">
                            <div className="absolute top-0 left-0 h-full bg-primary transition-all duration-500" style={{ width: step > stepNum ? '100%' : '0%' }} />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {status.error && (
                  <div className="p-3.5 bg-rose-50 border-l-4 border-rose-500 text-rose-600 font-bold text-xs rounded-r-xl mb-6">
                    {status.error}
                  </div>
                )}

                <form ref={formRef} onSubmit={(e) => e.preventDefault()} className="space-y-6 text-xs font-semibold text-slate-700">

                  {/* STEP 1 */}
                  {step === 1 && (
                    <div className="space-y-4">
                      <h3 className="text-sm font-black text-[#0F4C81] uppercase tracking-wider border-b pb-1">1. Student Details</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] text-slate-400 uppercase tracking-widest mb-1.5">Student Full Name *</label>
                          <input
                            type="text"
                            name="studentName"
                            required
                            value={formData.studentName}
                            onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                            onKeyDown={handleKeyDown}
                            className={`w-full px-3 py-2.5 border rounded-xl outline-none bg-slate-50 ${errors.studentName ? 'border-rose-500' : 'border-slate-200'}`}
                          />
                          {errors.studentName && <span className="text-[9px] text-rose-500 block mt-1">{errors.studentName}</span>}
                        </div>
                        <div>
                          <label className="block text-[10px] text-slate-400 uppercase tracking-widest mb-1.5">Date of Birth *</label>
                          <input
                            type="date"
                            name="dateOfBirth"
                            required
                            value={formData.dateOfBirth}
                            onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                            onKeyDown={handleKeyDown}
                            className={`w-full px-3 py-2.5 border rounded-xl outline-none bg-slate-50 ${errors.dateOfBirth ? 'border-rose-500' : 'border-slate-200'}`}
                          />
                          {errors.dateOfBirth && <span className="text-[9px] text-rose-500 block mt-1">{errors.dateOfBirth}</span>}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] text-slate-400 uppercase tracking-widest mb-1.5">Gender *</label>
                          <select
                            name="gender"
                            value={formData.gender}
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                            onKeyDown={handleKeyDown}
                            className={`w-full px-3 py-2.5 border rounded-xl outline-none bg-slate-50 ${errors.gender ? 'border-rose-500' : 'border-slate-200'}`}
                          >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                          {errors.gender && <span className="text-[9px] text-rose-500 block mt-1">{errors.gender}</span>}
                        </div>
                        <div>
                          <label className="block text-[10px] text-slate-400 uppercase tracking-widest mb-1.5">Applying Grade *</label>
                          <select
                            name="classApplyingFor"
                            value={formData.classApplyingFor}
                            onChange={(e) => setFormData({ ...formData, classApplyingFor: e.target.value })}
                            onKeyDown={handleKeyDown}
                            className={`w-full px-3 py-2.5 border rounded-xl outline-none bg-slate-50 ${errors.classApplyingFor ? 'border-rose-500' : 'border-slate-200'}`}
                          >
                            <option value="">Select Grade</option>
                            {classes.map(c => <option key={c} value={c}>{c}</option>)}
                          </select>
                          {errors.classApplyingFor && <span className="text-[9px] text-rose-500 block mt-1">{errors.classApplyingFor}</span>}
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-400 uppercase tracking-widest mb-1.5">Aadhaar Number</label>
                        <input
                          type="text"
                          name="aadhaarNumber"
                          value={formData.aadhaarNumber}
                          onChange={(e) => setFormData({ ...formData, aadhaarNumber: e.target.value })}
                          onKeyDown={handleKeyDown}
                          className="w-full px-3 py-2.5 border border-slate-200 rounded-xl outline-none bg-slate-50"
                        />
                      </div>
                    </div>
                  )}

                  {/* STEP 2 */}
                  {step === 2 && (
                    <div className="space-y-4">
                      <h3 className="text-sm font-black text-[#0F4C81] uppercase tracking-wider border-b pb-1">2. Parent Details</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] text-slate-400 uppercase tracking-widest mb-1.5">Father's Name *</label>
                          <input
                            type="text"
                            name="fatherName"
                            required
                            value={formData.fatherName}
                            onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                            onKeyDown={handleKeyDown}
                            className={`w-full px-3 py-2.5 border rounded-xl outline-none bg-slate-50 ${errors.fatherName ? 'border-rose-500' : 'border-slate-200'}`}
                          />
                          {errors.fatherName && <span className="text-[9px] text-rose-500 block mt-1">{errors.fatherName}</span>}
                        </div>
                        <div>
                          <label className="block text-[10px] text-slate-400 uppercase tracking-widest mb-1.5">Mother's Name *</label>
                          <input
                            type="text"
                            name="motherName"
                            required
                            value={formData.motherName}
                            onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
                            onKeyDown={handleKeyDown}
                            className={`w-full px-3 py-2.5 border rounded-xl outline-none bg-slate-50 ${errors.motherName ? 'border-rose-500' : 'border-slate-200'}`}
                          />
                          {errors.motherName && <span className="text-[9px] text-rose-500 block mt-1">{errors.motherName}</span>}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] text-slate-400 uppercase tracking-widest mb-1.5">Father Mobile *</label>
                          <input
                            type="tel"
                            name="fatherMobile"
                            required
                            value={formData.fatherMobile}
                            onChange={(e) => setFormData({ ...formData, fatherMobile: e.target.value })}
                            onKeyDown={handleKeyDown}
                            className={`w-full px-3 py-2.5 border rounded-xl outline-none bg-slate-50 ${errors.fatherMobile ? 'border-rose-500' : 'border-slate-200'}`}
                          />
                          {errors.fatherMobile && <span className="text-[9px] text-rose-500 block mt-1">{errors.fatherMobile}</span>}
                        </div>
                        <div>
                          <label className="block text-[10px] text-slate-400 uppercase tracking-widest mb-1.5">Father Email *</label>
                          <input
                            type="email"
                            name="fatherEmail"
                            required
                            value={formData.fatherEmail}
                            onChange={(e) => setFormData({ ...formData, fatherEmail: e.target.value })}
                            onKeyDown={handleKeyDown}
                            className={`w-full px-3 py-2.5 border rounded-xl outline-none bg-slate-50 ${errors.fatherEmail ? 'border-rose-500' : 'border-slate-200'}`}
                          />
                          {errors.fatherEmail && <span className="text-[9px] text-rose-500 block mt-1">{errors.fatherEmail}</span>}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 3 */}
                  {step === 3 && (
                    <div className="space-y-4">
                      <h3 className="text-sm font-black text-[#0F4C81] uppercase tracking-wider border-b pb-1">3. Address details</h3>
                      <div>
                        <label className="block text-[10px] text-slate-400 uppercase tracking-widest mb-1.5">Address Line 1 *</label>
                        <input
                          type="text"
                          name="addressLine1"
                          required
                          value={formData.addressLine1}
                          onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                          onKeyDown={handleKeyDown}
                          className={`w-full px-3 py-2.5 border rounded-xl outline-none bg-slate-50 ${errors.addressLine1 ? 'border-rose-500' : 'border-slate-200'}`}
                        />
                        {errors.addressLine1 && <span className="text-[9px] text-rose-500 block mt-1">{errors.addressLine1}</span>}
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] text-slate-400 uppercase tracking-widest mb-1.5">City *</label>
                          <input
                            type="text"
                            name="city"
                            required
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            onKeyDown={handleKeyDown}
                            className={`w-full px-3 py-2.5 border rounded-xl outline-none bg-slate-50 ${errors.city ? 'border-rose-500' : 'border-slate-200'}`}
                          />
                          {errors.city && <span className="text-[9px] text-rose-500 block mt-1">{errors.city}</span>}
                        </div>
                        <div>
                          <label className="block text-[10px] text-slate-400 uppercase tracking-widest mb-1.5">District *</label>
                          <select
                            name="district"
                            value={formData.district}
                            onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                            onKeyDown={handleKeyDown}
                            className={`w-full px-3 py-2.5 border rounded-xl outline-none bg-slate-50 ${errors.district ? 'border-rose-500' : 'border-slate-200'}`}
                          >
                            <option value="">Select District</option>
                            {tnDistricts.map(d => <option key={d} value={d}>{d}</option>)}
                          </select>
                          {errors.district && <span className="text-[9px] text-rose-500 block mt-1">{errors.district}</span>}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] text-slate-400 uppercase tracking-widest mb-1.5">State</label>
                          <input type="text" readOnly value={formData.state} className="w-full px-3 py-2.5 border border-slate-200 rounded-xl bg-slate-100 outline-none text-slate-500" />
                        </div>
                        <div>
                          <label className="block text-[10px] text-slate-400 uppercase tracking-widest mb-1.5">Pincode *</label>
                          <input
                            type="text"
                            name="pincode"
                            required
                            value={formData.pincode}
                            onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                            onKeyDown={handleKeyDown}
                            className={`w-full px-3 py-2.5 border rounded-xl outline-none bg-slate-50 ${errors.pincode ? 'border-rose-500' : 'border-slate-200'}`}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 4 */}
                  {step === 4 && (
                    <div className="space-y-4">
                      <h3 className="text-sm font-black text-[#0F4C81] uppercase tracking-wider border-b pb-1">4. Academic Details</h3>
                      <div>
                        <label className="block text-[10px] text-slate-400 uppercase tracking-widest mb-1.5">Previous School Name</label>
                        <input
                          type="text"
                          name="previousSchool"
                          value={formData.previousSchool}
                          onChange={(e) => setFormData({ ...formData, previousSchool: e.target.value })}
                          onKeyDown={handleKeyDown}
                          className="w-full px-3 py-2.5 border border-slate-200 rounded-xl outline-none bg-slate-50"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] text-slate-400 uppercase tracking-widest mb-1.5">Board *</label>
                          <select
                            name="previousBoard"
                            value={formData.previousBoard}
                            onChange={(e) => setFormData({ ...formData, previousBoard: e.target.value })}
                            onKeyDown={handleKeyDown}
                            className={`w-full px-3 py-2.5 border rounded-xl outline-none bg-slate-50 ${errors.previousBoard ? 'border-rose-500' : 'border-slate-200'}`}
                          >
                            <option value="">Select Board</option>
                            <option value="CBSE">CBSE</option>
                            <option value="ICSE">ICSE</option>
                            <option value="State Board">State Board</option>
                            <option value="International">International</option>
                            <option value="None">None (Fresher)</option>
                          </select>
                          {errors.previousBoard && <span className="text-[9px] text-rose-500 block mt-1">{errors.previousBoard}</span>}
                        </div>
                        <div>
                          <label className="block text-[10px] text-slate-400 uppercase tracking-widest mb-1.5">Last Grade</label>
                          <input
                            type="text"
                            name="previousGrade"
                            value={formData.previousGrade}
                            onChange={(e) => setFormData({ ...formData, previousGrade: e.target.value })}
                            onKeyDown={handleKeyDown}
                            className="w-full px-3 py-2.5 border border-slate-200 rounded-xl outline-none bg-slate-50"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 5 */}
                  {step === 5 && (
                    <div className="space-y-4">
                      <h3 className="text-sm font-black text-[#0F4C81] uppercase tracking-wider border-b pb-1">5. Document Uploads</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          { key: 'studentPhoto', label: 'Passport Photo *' },
                          { key: 'birthCertificate', label: 'Birth Certificate *' },
                          { key: 'aadhaarCard', label: 'Aadhaar Card *' }
                        ].map((doc) => (
                          <div key={doc.key} className="bg-slate-50 p-4 border rounded-2xl flex flex-col justify-between">
                            <span className="block font-bold text-xs text-slate-800 mb-1">{doc.label}</span>
                            <input
                              type="file"
                              onChange={(e) => handleFileChange(e, doc.key)}
                              className="text-[10px] mt-2 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-[10px] file:bg-[#0F4C81]/15 file:text-[#0F4C81] cursor-pointer"
                            />
                            {uploadProgress[doc.key] !== undefined && (
                              <span className="text-[9px] text-[#1E88E5] font-bold block mt-1.5">Uploading: {uploadProgress[doc.key]}%</span>
                            )}
                            {formData[doc.key] && (
                              <span className="text-[10px] text-green-600 block mt-1 font-bold">✓ {formData[doc.key].substring(0, 20)}...</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* STEP 6 */}
                  {step === 6 && (
                    <div className="space-y-4">
                      <h3 className="text-sm font-black text-[#0F4C81] uppercase tracking-wider border-b pb-1">6. Review & Submit</h3>
                      <div className="bg-slate-50 p-4 rounded-2xl border text-xs leading-relaxed space-y-2 text-slate-600">
                        <p><strong>Student Name:</strong> {formData.studentName}</p>
                        <p><strong>Grade applying:</strong> {formData.classApplyingFor}</p>
                        <p><strong>Father Mobile:</strong> {formData.fatherMobile}</p>
                      </div>
                      <label className="flex items-center gap-2 cursor-pointer mt-4">
                        <input type="checkbox" required className="w-4 h-4 text-[#0F4C81]" />
                        <span>I confirm that all information provided is accurate.</span>
                      </label>
                    </div>
                  )}

                  {/* Nav */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mt-8 mb-6">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">Important Admission Information</h4>
                    <ul className="space-y-2 text-xs font-medium text-slate-600">
                      <li className="flex gap-2 items-start"><Check className="text-emerald-500 shrink-0 mt-0.5" size={14} /><span>Complete all mandatory fields accurately before submission.</span></li>
                      <li className="flex gap-2 items-start"><Check className="text-emerald-500 shrink-0 mt-0.5" size={14} /><span>Keep scanned copies of required documents ready for verification if requested by the admissions team.</span></li>
                      <li className="flex gap-2 items-start"><Check className="text-emerald-500 shrink-0 mt-0.5" size={14} /><span>After submitting the application, our admissions team will review your details and contact you regarding the next steps.</span></li>
                    </ul>
                  </div>

                  <div className="flex justify-between items-center border-t pt-6">
                    {step > 1 ? (
                      <button type="button" onClick={handlePrevStep} className="px-5 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-colors">
                        <ArrowLeft size={14} /> Back
                      </button>
                    ) : <div />}

                    {step < 6 ? (
                      <button type="button" onClick={handleNextStep} className="px-6 py-2.5 bg-primary text-white font-extrabold rounded-xl uppercase tracking-wider flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95 transition-all shadow-md">
                        Next <ArrowRight size={14} />
                      </button>
                    ) : (
                      <button type="button" onClick={handleSubmitForm} disabled={status.loading} className="px-8 py-2.5 bg-secondary text-white font-black rounded-xl uppercase tracking-wider flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95 transition-all shadow-md">
                        {status.loading ? 'Submitting...' : 'Submit Form'} <CheckCircle size={14} />
                      </button>
                    )}
                  </div>

                </form>
              </div>
            )}
          </div>
        </section>
      )}

      {/* CONTACT & COMMUNICATION SECTION */}
      <section className="py-10 bg-white border-t border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">

          <div className="space-y-6">
            <h3 className="text-2xl font-extrabold text-[#0F172A]">Admission Communication Hub</h3>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Reach out to our desk for counseling tours and queries</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="tel:+919876543210"
                className="p-5 border border-[#E2E8F0] hover:border-[#1E88E5] rounded-3xl flex items-center gap-4 transition-all hover:bg-slate-50 cursor-pointer"
              >
                <div className="p-3 bg-[#0F4C81]/5 text-[#0F4C81] rounded-2xl"><Phone size={20} /></div>
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase font-black tracking-widest">Call Us</span>
                  <span className="text-xs font-black text-[#0F172A]">+91 98765 43210</span>
                </div>
              </a>

              <a
                href="https://wa.me/919876543210?text=Hello,%20I%20would%2520like%20to%20know%20more%20about%20admissions%20at%20VillZone%20International%20School."
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 border border-[#E2E8F0] hover:border-[#22C55E] rounded-3xl flex items-center gap-4 transition-all hover:bg-slate-50 cursor-pointer"
              >
                <div className="p-3 bg-green-500/10 text-green-600 rounded-2xl"><MessageSquare size={20} /></div>
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase font-black tracking-widest">WhatsApp</span>
                  <span className="text-xs font-black text-[#0F172A]">Send Message</span>
                </div>
              </a>

              <a
                href="mailto:admissions@villzone.edu.in"
                className="p-5 border border-[#E2E8F0] hover:border-[#1E88E5] rounded-3xl flex items-center gap-4 transition-all hover:bg-slate-50 cursor-pointer"
              >
                <div className="p-3 bg-[#0F4C81]/5 text-[#0F4C81] rounded-2xl"><Mail size={20} /></div>
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase font-black tracking-widest">Email</span>
                  <span className="text-xs font-black text-[#0F172A]">admissions@villzone.edu.in</span>
                </div>
              </a>

              <a
                href="https://maps.google.com/?q=VillZone+International+School"
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 border border-[#E2E8F0] hover:border-[#1E88E5] rounded-3xl flex items-center gap-4 transition-all hover:bg-slate-50 cursor-pointer"
              >
                <div className="p-3 bg-[#0F4C81]/5 text-[#0F4C81] rounded-2xl"><MapPin size={20} /></div>
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase font-black tracking-widest">Visit Campus</span>
                  <span className="text-xs font-black text-[#0F172A]">Google Maps</span>
                </div>
              </a>
            </div>
          </div>

          <div className="bg-slate-50 border p-6 rounded-3xl border-[#E2E8F0] flex flex-col justify-between space-y-4">
            <div>
              <h4 className="font-extrabold text-sm text-[#0F172A] mb-3">Admission Desk Timings</h4>
              <p className="text-xs text-slate-600 font-light leading-relaxed">
                Parents are welcome to visit our counseling team for smart classroom demonstration tours during operating schedules.
              </p>
            </div>
            <div className="text-xs font-semibold text-slate-700 space-y-2 border-t pt-4 border-[#E2E8F0]">
              <div className="flex justify-between"><span>Helpline</span><span className="text-[#0F4C81]">+91 8220524146</span></div>
              <div className="flex justify-between"><span>Office hours</span><span>Mon – Sat: 9:00 AM – 5:00 PM</span></div>
              <div className="flex justify-between"><span>Sundays</span><span className="text-rose-500">Closed</span></div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}

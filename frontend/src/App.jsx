import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';

// Global Layout Components (Public)
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import QuickContactWidget from './components/QuickContactWidget';
import StickyActionBar from './components/StickyActionBar';
import AIAssistant from './components/AIAssistant';
import CampusVisitPopup from './components/CampusVisitPopup';

// Page imports
import Home from './pages/Home';
import AboutSchool from './pages/AboutSchool';
import AboutTrust from './pages/AboutTrust';
import Management from './pages/Management';
import VisionMission from './pages/VisionMission';
import Academics from './pages/Academics';
import Syllabus from './pages/Syllabus';
import Faculty from './pages/Faculty';
import Facilities from './pages/Facilities';
import Infrastructure from './pages/Infrastructure';
import StudentLife from './pages/StudentLife';
import Activities from './pages/Activities';
import Admission from './pages/Admission';
import Uniform from './pages/Uniform';
import Transport from './pages/Transport';
import RulesRegulations from './pages/RulesRegulations';
import Guidelines from './pages/Guidelines';
import Awards from './pages/Awards';
import Gallery from './pages/Gallery';
import Calendar from './pages/Calendar';
import MandatoryDisclosure from './pages/MandatoryDisclosure';
import Contact from './pages/Contact';
import SocialMedia from './pages/SocialMedia';

// Admin Portals
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import DocumentViewer from './pages/DocumentViewer';

const PublicLayout = () => (
  <div className="flex flex-col min-h-screen">
    {/* Global Utilities */}
    <ScrollProgress />
    <BackToTop />
    <QuickContactWidget />
    <StickyActionBar />
    <AIAssistant />
    <CampusVisitPopup />
    
    {/* Navbar */}
    <Navbar />

    {/* Main Content Router */}
    <main className="flex-grow">
      <Outlet />
    </main>

    {/* Footer */}
    <Footer />
  </div>
);

export default function App() {
  return (
    <Router>
      <Routes>
        {/* PUBLIC ROUTES (With Navbar & Footer) */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about-school" element={<AboutSchool />} />
          <Route path="/about-trust" element={<AboutTrust />} />
          <Route path="/management" element={<Management />} />
          <Route path="/vision-mission" element={<VisionMission />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/syllabus" element={<Syllabus />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/infrastructure" element={<Infrastructure />} />
          <Route path="/student-life" element={<StudentLife />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/admissions" element={<Admission />} />
          <Route path="/track-application" element={<Admission />} />
          <Route path="/uniform" element={<Uniform />} />
          <Route path="/transport" element={<Transport />} />
          <Route path="/rules" element={<RulesRegulations />} />
          <Route path="/guidelines" element={<Guidelines />} />
          <Route path="/awards" element={<Awards />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/cbse-disclosure" element={<MandatoryDisclosure />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/social-media" element={<SocialMedia />} />
          <Route path="/document/:docId" element={<DocumentViewer />} />
        </Route>

        {/* ADMIN ROUTES (Isolated from Public Layout) */}
        <Route path="/admin" element={<Navigate to="/admin-login" replace />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* Fallback to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

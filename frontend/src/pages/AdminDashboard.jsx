import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminTopbar from '../components/admin/AdminTopbar';
import DashboardTab from '../components/admin/DashboardTab';
import AdmissionsTab from '../components/admin/AdmissionsTab';
import EnquiriesTab from '../components/admin/EnquiriesTab';
import CampusVisitsTab from '../components/admin/CampusVisitsTab';
import AILeadsTab from '../components/admin/AILeadsTab';
import NoticesTab from '../components/admin/NoticesTab';
import EventsTab from '../components/admin/EventsTab';
import GalleryTab from '../components/admin/GalleryTab';
import FacultyTab from '../components/admin/FacultyTab';
import SyllabusTab from '../components/admin/SyllabusTab';
import StudentLifeTab from '../components/admin/StudentLifeTab';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [token, setToken] = useState('');
  const [userName, setUserName] = useState('Administrator');
  const [role, setRole] = useState('Super Admin');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  
  // Data states
  const [stats, setStats] = useState({});
  const [logs, setLogs] = useState([]);
  const [leads, setLeads] = useState([]);
  const [successMsg, setSuccessMsg] = useState('');
  
  // Notification states
  const [hasSeenNotifications, setHasSeenNotifications] = useState(false);
  const [lastSeenCount, setLastSeenCount] = useState(0);

  useEffect(() => {
    const savedToken = localStorage.getItem('admin_token');
    const name = localStorage.getItem('admin_name');
    const savedRole = localStorage.getItem('admin_role');
    
    if (!savedToken) {
      navigate('/admin-login');
    } else {
      setToken(savedToken);
      if (name) setUserName(name);
      if (savedRole) setRole(savedRole);
    }
  }, [navigate]);

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const loadDashboardData = async () => {
    try {
      const [statsRes, logsRes, leadsRes] = await Promise.all([
        fetch('http://localhost:5000/api/admin/stats', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('http://localhost:5000/api/logs', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('http://localhost:5000/api/leads', { headers: { Authorization: `Bearer ${token}` } })
      ]);
      if (statsRes.ok) setStats(await statsRes.json());
      if (logsRes.ok) setLogs(await logsRes.json());
      if (leadsRes.ok) setLeads(await leadsRes.json());
    } catch (err) {
      console.warn('Failed to load data:', err);
    }
  };

  useEffect(() => {
    if (token && activeTab === 'dashboard') loadDashboardData();
  }, [token, activeTab]);

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardTab stats={stats} logs={logs} setActiveTab={setActiveTab} />;
      case 'admissions': return <AdmissionsTab token={token} showSuccess={showSuccess} />;
      case 'inquiries': return <EnquiriesTab token={token} showSuccess={showSuccess} />;
      case 'campus-visits': return <CampusVisitsTab token={token} />;
      case 'ai-leads': return <AILeadsTab token={token} showSuccess={showSuccess} />;
      case 'notices': return <NoticesTab token={token} showSuccess={showSuccess} />;
      case 'events': return <EventsTab token={token} showSuccess={showSuccess} />;
      case 'gallery': return <GalleryTab token={token} showSuccess={showSuccess} />;
      case 'faculty': return <FacultyTab token={token} showSuccess={showSuccess} />;
      case 'syllabus': return <SyllabusTab token={token} showSuccess={showSuccess} />;
      case 'student-life': return <StudentLifeTab token={token} showSuccess={showSuccess} />;
      // Fallback for not-yet-implemented tabs
      default: return (
        <div className="p-8 text-center bg-white rounded-2xl border shadow-sm m-6">
          <p className="text-slate-500 font-bold">This module ({activeTab}) is currently under construction.</p>
        </div>
      );
    }
  };

  const unreadEnquiries = leads.filter(l => l.status === 'New').length;

  useEffect(() => {
    if (activeTab === 'inquiries') {
      setHasSeenNotifications(true);
      setLastSeenCount(unreadEnquiries);
    } else if (unreadEnquiries > lastSeenCount) {
      setHasSeenNotifications(false);
    }
  }, [activeTab, unreadEnquiries, lastSeenCount]);

  const displayUnreadCount = hasSeenNotifications ? 0 : unreadEnquiries;

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-[#0F172A] font-sans overflow-hidden">
      
      {/* Success Toast */}
      {successMsg && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white text-sm font-black px-6 py-4 rounded-2xl shadow-2xl z-50 flex items-center gap-3 animate-fadeIn">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
          {successMsg}
        </div>
      )}

      {/* Sidebar (Responsive) */}
      <AdminSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        unreadCount={displayUnreadCount}
        role={role}
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content Wrapper */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Topbar */}
        <AdminTopbar 
          setSidebarOpen={setSidebarOpen} 
          userName={userName} 
          role={role} 
          unreadCount={displayUnreadCount}
          setActiveTab={setActiveTab}
        />
        
        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {renderActiveTab()}
          </div>
        </main>
      </div>

    </div>
  );
}
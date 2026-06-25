import React from 'react';
import {
  BarChart3, FileText, Calendar, Image, Inbox, Settings,
  User, Search, GraduationCap, Users, LogOut, MessageSquare, X, Globe, BookOpen, Star
} from 'lucide-react';

export default function AdminSidebar({ activeTab, setActiveTab, unreadCount, role, isSidebarOpen, setSidebarOpen }) {
  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_role');
    localStorage.removeItem('admin_name');
    window.location.href = '/admin-login';
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, roles: ['Super Admin', 'Content Manager', 'Admission Officer'] },
    { id: 'admissions', label: 'Admissions', icon: GraduationCap, roles: ['Super Admin', 'Admission Officer'] },
    { id: 'campus-visits', label: 'Campus Visits', icon: Users, roles: ['Super Admin', 'Admission Officer', 'Content Manager'] },
    { id: 'inquiries', label: 'Contact Enquiries', icon: Inbox, roles: ['Super Admin', 'Content Manager', 'Admission Officer'] },
    { id: 'ai-leads', label: 'AI Assistant Leads', icon: MessageSquare, roles: ['Super Admin', 'Admission Officer', 'Content Manager'] },
    { id: 'notices', label: 'News & Alerts', icon: FileText, roles: ['Super Admin', 'Content Manager'] },
    { id: 'events', label: 'Events', icon: Calendar, roles: ['Super Admin', 'Content Manager'] },
    { id: 'gallery', label: 'Gallery', icon: Image, roles: ['Super Admin', 'Content Manager'] },
    { id: 'faculty', label: 'Faculty', icon: User, roles: ['Super Admin', 'Content Manager'] },
    { id: 'syllabus', label: 'Syllabus', icon: BookOpen, roles: ['Super Admin', 'Content Manager'] },
    { id: 'student-life', label: 'Student Life', icon: Star, roles: ['Super Admin', 'Content Manager'] },
  ];

  const visibleNavItems = navItems.filter(item => item.roles.includes(role));

  const handleTabClick = (id) => {
    setActiveTab(id);
    if (window.innerWidth < 1024) {
      setSidebarOpen(false); // Close drawer on mobile after selection
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed lg:static top-0 left-0 h-full bg-[#0A1128] shadow-2xl lg:shadow-none z-40
        w-64 flex flex-col transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Mobile Close Button */}
        <div className="absolute top-4 right-4 lg:hidden">
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Logo Section */}
        <div className="p-6 flex items-center gap-3 border-b border-[#1a233a]">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#0A1128]">
            <GraduationCap size={24} strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-white font-black text-lg tracking-wide leading-none">VILLZONE</h2>
            <span className="text-[9px] font-medium tracking-widest text-slate-400 uppercase">International School</span>
          </div>
        </div>

        {/* Nav Links */}
        <div className="flex-1 overflow-y-auto py-2 space-y-1 custom-scrollbar mt-2">
          {visibleNavItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-[calc(100%-1rem)] ml-0 mr-4 flex items-center gap-4 px-6 py-3.5 rounded-r-full transition-all text-sm font-bold ${isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'text-slate-400 hover:bg-[#1a233a] hover:text-white'
                  }`}
              >
                <Icon size={18} className={isActive ? 'text-white' : 'text-slate-500'} />
                <span>{item.label}</span>
                {item.id === 'inquiries' && unreadCount > 0 && (
                  <span className={`ml-auto text-[10px] px-2 py-0.5 rounded-full ${isActive ? 'bg-white text-blue-600' : 'bg-rose-500 text-white'}`}>
                    {unreadCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#1a233a] flex flex-col gap-1">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-xl transition-colors text-sm font-bold"
          >
            <Globe size={16} /> View Website
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors text-sm font-bold"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>
    </>
  );
}

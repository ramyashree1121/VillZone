import React, { useState, useEffect } from 'react';
import { Menu, Bell } from 'lucide-react';

export default function AdminTopbar({ setSidebarOpen, userName, role, unreadCount, setActiveTab }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-20 h-[73px] flex items-center justify-between px-4 lg:px-8">
      {/* Left side: Hamburger & Title/Session */}
      <div className="flex items-center gap-6">
        {/* Mobile Hamburger Menu */}
        <button 
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-2 text-slate-500 hover:text-primary hover:bg-slate-100 rounded-lg transition-colors"
        >
          <Menu size={24} />
        </button>

        <div className="hidden sm:block">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Session Active</p>
          <p className="text-sm font-bold text-slate-700">{currentTime.toLocaleString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })}</p>
        </div>
      </div>

      {/* Right side: Notifications & Profile */}
      <div className="flex items-center gap-4 sm:gap-8">
        <button 
          onClick={() => setActiveTab && setActiveTab('inquiries')}
          className="relative p-2.5 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-full border border-slate-200 transition-colors"
        >
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white">
              {unreadCount}
            </span>
          )}
        </button>

        <div className="h-8 w-[1px] bg-slate-200 hidden sm:block"></div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold tracking-wider shadow-md">
            {userName ? userName.substring(0, 2).toUpperCase() : 'AD'}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-black text-slate-800 leading-none mb-1">{userName}</p>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">{role}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

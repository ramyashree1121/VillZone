import React, { useState } from 'react';
import { FileText, Calendar } from 'lucide-react';
import NoticesTab from './NoticesTab';
import EventsTab from './EventsTab';

export default function NewsAndEventsTab({ token, showSuccess }) {
  const [activeSubTab, setActiveSubTab] = useState('notices');

  return (
    <div className="space-y-6">
      {/* Header & Sub-navigation */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">News & Events Management</h2>
          <p className="text-sm text-slate-500">Manage all school announcements, news, and upcoming events.</p>
        </div>

        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setActiveSubTab('notices')}
            className={`flex items-center gap-2 px-6 py-3 font-semibold text-sm transition-colors border-b-2 ${
              activeSubTab === 'notices'
                ? 'border-primary text-primary'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            <FileText size={16} />
            News & Alerts
          </button>
          <button
            onClick={() => setActiveSubTab('events')}
            className={`flex items-center gap-2 px-6 py-3 font-semibold text-sm transition-colors border-b-2 ${
              activeSubTab === 'events'
                ? 'border-primary text-primary'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            <Calendar size={16} />
            Events
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="mt-6">
        {activeSubTab === 'notices' && <NoticesTab token={token} showSuccess={showSuccess} isNested={true} />}
        {activeSubTab === 'events' && <EventsTab token={token} showSuccess={showSuccess} isNested={true} />}
      </div>
    </div>
  );
}

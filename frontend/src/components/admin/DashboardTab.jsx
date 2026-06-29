import React from 'react';
import { Users, GraduationCap, Calendar, Image, FileText, MapPin, Activity } from 'lucide-react';

export default function DashboardTab({ stats, logs, setActiveTab }) {
  const kpiCards = [
    { title: 'Total Admissions', value: stats.admissions || 0, icon: GraduationCap, color: 'text-blue-500 bg-blue-50', tabId: 'admissions' },
    { title: 'New Enquiries', value: stats.leads || 0, icon: Users, color: 'text-amber-500 bg-amber-50', tabId: 'inquiries' },
    { title: 'Campus Visits', value: stats.campusVisits?.total || 0, icon: MapPin, color: 'text-indigo-500 bg-indigo-50', tabId: 'campus-visits' },
    { title: 'Gallery Photos', value: stats.gallery || 0, icon: Image, color: 'text-purple-500 bg-purple-50', tabId: 'gallery' },
  ];

  return (
    <div className="p-6 space-y-8 bg-[#F4F7FA] min-h-full">
      <h2 className="text-2xl font-black text-slate-800">Admin Dashboard</h2>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
        {kpiCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div 
              key={idx} 
              className="bg-white rounded-[1.5rem] p-5 shadow-sm border border-slate-100 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.color}`}>
                  <Icon size={20} strokeWidth={2} />
                </div>
              </div>
              <div className="mb-4">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{card.title}</p>
                <h3 className="text-2xl font-black text-slate-800">{card.value}</h3>
              </div>
              <button 
                onClick={() => setActiveTab && setActiveTab(card.tabId)}
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow text-[10px] uppercase tracking-wider font-bold rounded-xl transition-all"
              >
                View Details
              </button>
            </div>
          );
        })}
      </div>

      {/* Recent Activity Log */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex items-center gap-2">
          <Activity className="text-slate-400" size={20} />
          <h3 className="font-black text-slate-800">Recent Activity Logs</h3>
        </div>
        <div className="divide-y divide-slate-50 max-h-[400px] overflow-y-auto custom-scrollbar">
          {logs && logs.length > 0 ? logs.map((log, i) => (
            <div key={i} className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                  <FileText size={18} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">
                    <span className="text-blue-600">{log.username}</span> {log.action}
                  </p>
                  <p className="text-xs text-slate-500 font-medium">Module: {log.module} {log.details && `- ${log.details}`}</p>
                </div>
              </div>
              <span className="text-xs font-bold text-slate-400">
                {new Date(log.createdAt).toLocaleString()}
              </span>
            </div>
          )) : (
            <div className="p-10 text-center text-slate-400 text-sm font-bold">No recent activities found.</div>
          )}
        </div>
      </div>
    </div>
  );
}

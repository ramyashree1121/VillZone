import React, { useState, useEffect } from 'react';
import { Mail, Check, Archive, Trash2, Search, Eye, X } from 'lucide-react';

export default function EnquiriesTab({ token, showSuccess }) {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLead, setSelectedLead] = useState(null);

  const fetchLeads = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/leads', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setLeads(await res.json());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [token]);

  const updateLeadStatus = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:5000/api/leads/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        showSuccess(`Enquiry marked as ${status}`);
        fetchLeads();
        if (selectedLead && selectedLead._id === id) setSelectedLead(null);
      }
    } catch (err) { console.error(err); }
  };

  const deleteLead = async (id) => {
    if (!window.confirm("Are you sure you want to delete this enquiry?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/leads/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        showSuccess('Enquiry deleted');
        fetchLeads();
        if (selectedLead && selectedLead._id === id) setSelectedLead(null);
      }
    } catch (err) { console.error(err); }
  };

  const filteredLeads = leads.filter(l => 
    l.parentName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    l.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-black text-slate-800">Contact Enquiries</h2>
        <div className="bg-rose-100 text-rose-700 px-4 py-2 rounded-xl text-sm font-bold shadow-sm">
          {leads.filter(l => l.status === 'New').length} New Enquiries
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] overflow-hidden flex flex-col h-[calc(100vh-200px)]">
        <div className="p-4 border-b border-[#E2E8F0] bg-slate-50 relative">
          <Search className="absolute left-7 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Search by name, email or subject..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md pl-10 pr-4 py-2 border rounded-xl text-sm outline-none focus:border-primary"
          />
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="p-8 text-center text-slate-400">Loading enquiries...</div>
          ) : filteredLeads.length === 0 ? (
            <div className="p-8 text-center text-slate-400">No enquiries found.</div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredLeads.map((lead) => (
                <div 
                  key={lead._id} 
                  className={`p-4 flex gap-4 hover:bg-slate-50 transition-colors ${lead.status === 'New' ? 'bg-blue-50/50' : ''}`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${lead.status === 'New' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400'}`}>
                    <Mail size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className={`text-sm truncate pr-4 ${lead.status === 'New' ? 'font-black text-slate-800' : 'font-bold text-slate-600'}`}>
                        {lead.parentName} <span className="font-normal text-xs text-slate-400">({lead.email})</span>
                      </h4>
                      <span className="text-[10px] font-bold text-slate-400 whitespace-nowrap">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className={`text-sm mb-1 truncate ${lead.status === 'New' ? 'font-bold text-slate-700' : 'text-slate-500'}`}>
                      {lead.subject || 'Website Enquiry'}
                    </p>
                    <p className="text-xs text-slate-400 truncate">{lead.message}</p>
                    
                    <div className="flex gap-2 mt-3">
                      <button 
                        onClick={() => setSelectedLead(lead)}
                        className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200"
                      >
                        Read Full Message
                      </button>
                      {lead.status === 'New' && (
                        <button 
                          onClick={() => updateLeadStatus(lead._id, 'Read')}
                          className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 flex items-center gap-1"
                        >
                          <Check size={12} /> Mark as Read
                        </button>
                      )}
                      {lead.status !== 'Archived' && (
                        <button 
                          onClick={() => updateLeadStatus(lead._id, 'Archived')}
                          className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 flex items-center gap-1"
                        >
                          <Archive size={12} /> Archive
                        </button>
                      )}
                      <button 
                        onClick={() => deleteLead(lead._id)}
                        className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 text-rose-500 hover:bg-rose-50 rounded-lg flex items-center gap-1 ml-auto"
                      >
                        <Trash2 size={12} /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Read Message Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b flex justify-between items-center bg-slate-50">
              <h3 className="text-xl font-black text-slate-800">Message from {selectedLead.parentName}</h3>
              <button onClick={() => setSelectedLead(null)} className="p-2 text-slate-400 hover:bg-slate-200 rounded-full">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1 space-y-4 text-sm">
              <div className="flex gap-6 border-b pb-4">
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase block mb-1">Email</span>
                  <a href={`mailto:${selectedLead.email}`} className="text-primary font-bold">{selectedLead.email || 'N/A'}</a>
                </div>
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase block mb-1">Phone</span>
                  <a href={`tel:${selectedLead.phoneNumber}`} className="text-primary font-bold">{selectedLead.phoneNumber}</a>
                </div>
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase block mb-1">Date Received</span>
                  <span className="font-bold text-slate-700">{new Date(selectedLead.createdAt).toLocaleString()}</span>
                </div>
              </div>
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase block mb-2">Subject</span>
                <h4 className="text-lg font-black text-slate-800">{selectedLead.subject || 'Website Enquiry'}</h4>
              </div>
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase block mb-2">Message Content</span>
                <p className="text-slate-600 whitespace-pre-wrap leading-relaxed">{selectedLead.message || selectedLead.notes}</p>
              </div>
            </div>
            <div className="p-6 border-t bg-slate-50 flex gap-3">
              {selectedLead.status === 'New' && (
                <button 
                  onClick={() => updateLeadStatus(selectedLead._id, 'Read')}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold text-sm"
                >
                  Mark as Read
                </button>
              )}
              <a 
                href={`mailto:${selectedLead.email}?subject=Re: ${selectedLead.subject || 'Your Enquiry'}`}
                className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold text-sm"
              >
                Reply via Email
              </a>
              <button onClick={() => setSelectedLead(null)} className="px-4 py-2 border rounded-xl font-bold text-sm hover:bg-slate-100 ml-auto">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

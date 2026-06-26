import React, { useState, useEffect } from 'react';
import { Users, UserPlus, CalendarCheck, GraduationCap, Clock } from 'lucide-react';

const CampusVisitsTab = ({ token }) => {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchVisits();
  }, [token]);

  const fetchVisits = async () => {
    try {
      const res = await fetch('${import.meta.env.VITE_API_URL}/api/campus-visits', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setVisits(await res.json());
      } else {
        setError('Failed to fetch campus visits');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/campus-visits/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        fetchVisits();
        setEditingId(null);
      } else {
        alert('Failed to update status');
      }
    } catch (err) {
      alert('Error updating status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this campus visit request?')) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/campus-visits/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        fetchVisits();
      } else {
        alert('Failed to delete request');
      }
    } catch (err) {
      alert('Error deleting request');
    }
  };

  const exportCSV = () => {
    const headers = ['Parent / Applicant Name', 'Mobile', 'Email', 'Preferred Visit Date', 'Message', 'Lead Source', 'Status', 'Date Submitted'];
    const csvContent = [
      headers.join(','),
      ...visits.map(v => [
        `"${v.parentName}"`, `"${v.mobileNumber}"`, `"${v.emailAddress || ''}"`, `"${new Date(v.visitDate).toLocaleDateString()}"`,
        `"${v.message || ''}"`, `"${v.leadSource || 'Campus Visit Popup'}"`, `"${v.status}"`, `"${new Date(v.createdAt).toLocaleString()}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `campus_visits_${new Date().toLocaleDateString().replace(/\//g, '-')}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const filteredVisits = visits.filter(v => {
    const matchesFilter = filter === 'All' || v.status === filter;
    const matchesSearch = v.parentName.toLowerCase().includes(search.toLowerCase()) ||
      v.mobileNumber.includes(search) ||
      (v.emailAddress && v.emailAddress.toLowerCase().includes(search.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  const todayLeadsCount = visits.filter(v => new Date(v.createdAt).toDateString() === new Date().toDateString()).length;
  const newLeadsCount = visits.filter(v => v.status === 'New Lead').length;
  const confirmedCount = visits.filter(v => v.status === 'Confirmed Visit').length;
  const convertedCount = visits.filter(v => v.status === 'Converted').length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg"><Users size={24} /></div>
          <div><p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Total Leads</p><h3 className="text-2xl font-black text-slate-800">{visits.length}</h3></div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-lg"><UserPlus size={24} /></div>
          <div><p className="text-xs text-slate-500 font-bold uppercase tracking-wider">New Leads</p><h3 className="text-2xl font-black text-slate-800">{newLeadsCount}</h3></div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-lg"><CalendarCheck size={24} /></div>
          <div><p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Confirmed</p><h3 className="text-2xl font-black text-slate-800">{confirmedCount}</h3></div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-lg"><GraduationCap size={24} /></div>
          <div><p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Converted</p><h3 className="text-2xl font-black text-slate-800">{convertedCount}</h3></div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg"><Clock size={24} /></div>
          <div><p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Today's Leads</p><h3 className="text-2xl font-black text-slate-800">{todayLeadsCount}</h3></div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-[#0A3D62]">Campus Visit CRM</h2>
          <button onClick={exportCSV} className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition">
            Export CSV
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by name, mobile, or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A3D62] outline-none"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A3D62] outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="New Lead">New Lead</option>
            <option value="Contacted">Contacted</option>
            <option value="Follow Up">Follow Up</option>
            <option value="Qualified">Qualified</option>
            <option value="Confirmed Visit">Confirmed Visit</option>
            <option value="Admission Applied">Admission Applied</option>
            <option value="Converted">Converted</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-3 font-semibold text-gray-700">Preferred Date</th>
                <th className="p-3 font-semibold text-gray-700">Parent / Applicant Name</th>
                <th className="p-3 font-semibold text-gray-700">Message</th>
                <th className="p-3 font-semibold text-gray-700">Status</th>
                <th className="p-3 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVisits.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-500">No campus visit requests found.</td>
                </tr>
              ) : (
                filteredVisits.map((v) => (
                  <tr key={v._id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="p-3">
                      <div className="font-semibold">{new Date(v.visitDate).toLocaleDateString()}</div>
                    </td>
                    <td className="p-3">
                      <div className="font-semibold text-[#0A3D62]">{v.parentName}</div>
                      <div className="text-sm text-gray-600">{v.mobileNumber}</div>
                      {v.emailAddress && <div className="text-sm text-gray-500">{v.emailAddress}</div>}
                    </td>
                    <td className="p-3 text-sm text-gray-600">
                      {v.message || <span className="text-gray-400 italic">No message</span>}
                    </td>
                    <td className="p-3">
                      {editingId === v._id ? (
                        <select
                          defaultValue={v.status}
                          onChange={(e) => handleStatusChange(v._id, e.target.value)}
                          className="p-1 border rounded"
                        >
                          <option value="New Lead">New Lead</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Follow Up">Follow Up</option>
                          <option value="Qualified">Qualified</option>
                          <option value="Confirmed Visit">Confirmed Visit</option>
                          <option value="Admission Applied">Admission Applied</option>
                          <option value="Converted">Converted</option>
                          <option value="Closed">Closed</option>
                        </select>
                      ) : (
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${v.status === 'New Lead' ? 'bg-blue-100 text-blue-800' :
                            v.status === 'Contacted' ? 'bg-yellow-100 text-yellow-800' :
                              v.status === 'Follow Up' ? 'bg-orange-100 text-orange-800' :
                                v.status === 'Qualified' ? 'bg-indigo-100 text-indigo-800' :
                                  v.status === 'Confirmed Visit' ? 'bg-green-100 text-green-800' :
                                    v.status === 'Admission Applied' ? 'bg-purple-100 text-purple-800' :
                                      v.status === 'Converted' ? 'bg-emerald-100 text-emerald-800' :
                                        'bg-gray-200 text-gray-800'
                          }`}>
                          {v.status}
                        </span>
                      )}
                    </td>
                    <td className="p-3 flex gap-2 items-center">
                      <button
                        onClick={() => setEditingId(v._id)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(v._id)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium ml-2"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CampusVisitsTab;

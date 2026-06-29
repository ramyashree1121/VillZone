import React, { useState, useEffect } from 'react';
import { Eye, Search, Download, CheckCircle, XCircle, Save, CheckSquare, Phone } from 'lucide-react';

export default function AdmissionsTab({ token, showSuccess }) {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const [selectedApp, setSelectedApp] = useState(null);
  const [editStatus, setEditStatus] = useState('');
  const [adminRemarks, setAdminRemarks] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredAdmissions.map(a => a._id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelect = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleBulkUpdate = async (status) => {
    if (!window.confirm(`Are you sure you want to mark ${selectedIds.length} applications as ${status}?`)) return;
    try {
      setLoading(true);
      await Promise.all(selectedIds.map(id =>
        fetch(`${import.meta.env.VITE_API_URL}/api/admissions/${id}/status`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ status })
        })
      ));
      showSuccess(`Successfully marked ${selectedIds.length} applications as ${status}`);
      setSelectedIds([]);
      fetchAdmissions();
    } catch (err) {
      console.error(err);
      alert('Failed to update some applications.');
    } finally {
      setLoading(false);
    }
  };

  const fetchAdmissions = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admissions`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setAdmissions(await res.json());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmissions();
  }, [token]);

  const handleStatusUpdate = async (status, skipConfirm = false) => {
    if (!skipConfirm) {
      if (status === 'Approved' && !window.confirm("Are you sure you want to approve this admission application?")) return;
      if (status === 'Confirmed' && !window.confirm("Are you sure you want to confirm this admission?")) return;
      if (status === 'Rejected' && !window.confirm("Are you sure you want to reject this application?")) return;
    }

    try {
      const payload = { status, adminRemarks };

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admissions/${selectedApp._id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const updated = await res.json();
        showSuccess(`Application ${status}!`);

        // Update local state directly to prevent jumping
        setAdmissions(prev => prev.map(a => a._id === updated._id ? updated : a));
        setSelectedApp(updated);
        setEditStatus(updated.status);
        setAdminRemarks('');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const openAppDetails = (app) => {
    setSelectedApp(app);
    setEditStatus(app.status);
    setAdminRemarks('');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'New': return <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-[10px] font-black uppercase">New</span>;
      case 'Verified': return <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-[10px] font-black uppercase">Verified</span>;
      case 'Confirmed': return <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-[10px] font-black uppercase">Confirmed</span>;
      case 'Rejected': return <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-[10px] font-black uppercase">Rejected</span>;
      // Legacy status support
      case 'Under Review': return <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-[10px] font-black uppercase">Under Review</span>;
      case 'Contacted': return <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-[10px] font-black uppercase">Contacted</span>;
      case 'Documents Pending': return <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-[10px] font-black uppercase">Docs Pending</span>;
      case 'Approved': return <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-[10px] font-black uppercase">Approved (Legacy)</span>;
      case 'Applied': return <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-[10px] font-black uppercase">New (Legacy)</span>;
      default: return <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-[10px] font-black uppercase">{status}</span>;
    }
  };

  const filteredAdmissions = admissions.filter(app => {
    const matchesSearch = app.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.applicationNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || app.status === statusFilter || (statusFilter === 'New' && app.status === 'Applied');
    return matchesSearch && matchesStatus;
  });

  const handleExport = () => {
    let csv = 'Application No,Student Name,Grade,Parent Name,Mobile,Status,Date\n';
    filteredAdmissions.forEach(a => {
      csv += `${a.applicationNumber},${a.studentName},${a.classApplyingFor},${a.fatherName},${a.fatherMobile},${a.status},${new Date(a.createdAt).toLocaleDateString()}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `admissions_export_${new Date().getTime()}.csv`;
    a.click();
  };

  const statusOptions = ['New', 'Confirmed', 'Rejected'];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-black text-slate-800">Admissions Management</h2>
      </div>

      {/* Dashboard Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border rounded-xl p-4 shadow-sm text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total</p>
          <p className="text-2xl font-black text-slate-800">{admissions.length}</p>
        </div>
        <div className="bg-white border rounded-xl p-4 shadow-sm text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">New</p>
          <p className="text-2xl font-black text-blue-500">{admissions.filter(a => a.status === 'New' || a.status === 'Applied').length}</p>
        </div>
        <div className="bg-white border rounded-xl p-4 shadow-sm text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Confirmed</p>
          <p className="text-2xl font-black text-emerald-600">{admissions.filter(a => ['Confirmed', 'Approved'].includes(a.status)).length}</p>
        </div>
        <div className="bg-white border rounded-xl p-4 shadow-sm text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Rejected</p>
          <p className="text-2xl font-black text-red-500">{admissions.filter(a => a.status === 'Rejected').length}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] overflow-hidden">
        <div className="p-4 border-b border-[#E2E8F0] flex flex-wrap gap-4 justify-between bg-slate-50 items-center">
          <div className="flex gap-4 flex-1">
            <div className="relative max-w-sm w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-xl text-sm outline-none focus:border-primary"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border rounded-xl text-sm font-semibold text-slate-700 outline-none focus:border-primary"
            >
              <option value="All">All Statuses</option>
              {statusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
          
          <div className="flex items-center gap-3">
            {selectedIds.length > 0 && (
              <div className="flex items-center gap-2 bg-slate-200 px-3 py-1.5 rounded-xl text-sm font-bold shadow-inner">
                <span className="text-slate-600 mr-2">{selectedIds.length} selected:</span>
                <button onClick={() => handleBulkUpdate('New')} className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-sm text-xs">New</button>
                <button onClick={() => handleBulkUpdate('Confirmed')} className="px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg shadow-sm text-xs">Confirm</button>
                <button onClick={() => handleBulkUpdate('Rejected')} className="px-3 py-1 bg-rose-500 hover:bg-rose-600 text-white rounded-lg shadow-sm text-xs">Reject</button>
              </div>
            )}
            <button
              onClick={handleExport}
              className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-slate-700 transition-colors"
            >
              <Download size={16} /> Export CSV
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-[10px] uppercase font-black tracking-wider text-slate-400 border-b border-[#E2E8F0]">
              <tr>
                <th className="px-6 py-4 w-12">
                  <input type="checkbox" onChange={handleSelectAll} checked={filteredAdmissions.length > 0 && selectedIds.length === filteredAdmissions.length} className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"/>
                </th>
                <th className="px-6 py-4">App Number</th>
                <th className="px-6 py-4">Student Name</th>
                <th className="px-6 py-4">Grade</th>
                <th className="px-6 py-4">Parent Name</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Docs</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan="7" className="text-center py-8 font-bold text-slate-400">Loading admissions...</td></tr>
              ) : filteredAdmissions.length === 0 ? (
                <tr><td colSpan="7" className="text-center py-8 font-bold text-slate-400">No applications found.</td></tr>
              ) : (
                filteredAdmissions.map((app) => (
                  <tr key={app._id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <input type="checkbox" checked={selectedIds.includes(app._id)} onChange={() => handleSelect(app._id)} className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"/>
                    </td>
                    <td className="px-6 py-4 font-bold text-primary">{app.applicationNumber}</td>
                    <td className="px-6 py-4 font-bold text-slate-800">{app.studentName}</td>
                    <td className="px-6 py-4 font-semibold">{app.classApplyingFor}</td>
                    <td className="px-6 py-4">{app.fatherName}</td>
                    <td className="px-6 py-4">{app.fatherMobile}</td>
                    <td className="px-6 py-4">{getStatusBadge(app.status)}</td>
                    <td className="px-6 py-4">
                      {(app.studentPhoto || app.birthCertificate || app.aadhaarCard) ? (
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Uploaded</span>
                      ) : (
                        <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded">Missing</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => openAppDetails(app)}
                        className="flex items-center justify-end w-full gap-2 text-primary hover:text-primary-dark font-bold text-xs"
                      >
                        <Eye size={16} /> Review
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View & Manage Application Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row">

            {/* Left Column: Application Details */}
            <div className="w-full md:w-3/5 overflow-y-auto border-r border-slate-100 flex flex-col">
              <div className="p-6 border-b flex justify-between items-center bg-slate-50 sticky top-0 z-10">
                <div>
                  <h3 className="text-xl font-black text-slate-800">Application Details</h3>
                  <p className="text-xs text-primary font-bold">{selectedApp.applicationNumber}</p>
                </div>
                <button onClick={() => setSelectedApp(null)} className="p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-700 rounded-full transition-colors md:hidden">
                  <XCircle size={20} />
                </button>
              </div>
              <div className="p-6 space-y-6 text-sm flex-1">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <h4 className="font-black text-slate-400 uppercase text-[10px] tracking-widest mb-3 pb-1 border-b">Student Info</h4>
                    <p className="mb-1"><span className="text-slate-400 w-24 inline-block">Name:</span> <strong className="text-slate-800">{selectedApp.studentName}</strong></p>
                    <p className="mb-1"><span className="text-slate-400 w-24 inline-block">DOB:</span> {selectedApp.dateOfBirth}</p>
                    <p className="mb-1"><span className="text-slate-400 w-24 inline-block">Gender:</span> {selectedApp.gender}</p>
                    <p className="mb-1"><span className="text-slate-400 w-24 inline-block">Applying For:</span> <strong className="text-primary">{selectedApp.classApplyingFor}</strong></p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <h4 className="font-black text-slate-400 uppercase text-[10px] tracking-widest mb-3 pb-1 border-b">Parent Info</h4>
                    <p className="mb-1"><span className="text-slate-400 w-16 inline-block">Father:</span> {selectedApp.fatherName} ({selectedApp.fatherMobile})</p>
                    <p className="mb-1"><span className="text-slate-400 w-16 inline-block">Mother:</span> {selectedApp.motherName} ({selectedApp.motherMobile})</p>
                    <p className="mb-1"><span className="text-slate-400 w-16 inline-block">Email:</span> {selectedApp.fatherEmail}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-black text-slate-400 uppercase text-[10px] tracking-widest mb-2 border-b pb-1">Address</h4>
                  <p className="text-slate-700">{selectedApp.addressLine1}, {selectedApp.city}, {selectedApp.district}, {selectedApp.state} - {selectedApp.pincode}</p>
                </div>
                {selectedApp.previousSchool && (
                  <div>
                    <h4 className="font-black text-slate-400 uppercase text-[10px] tracking-widest mb-2 border-b pb-1">Academic History</h4>
                    <p><strong>Previous School:</strong> {selectedApp.previousSchool}</p>
                    <p><strong>Board:</strong> {selectedApp.previousBoard}</p>
                  </div>
                )}
                
                {/* Documents Section */}
                <div className="mt-6 border-t border-slate-100 pt-6">
                  <h4 className="font-black text-slate-400 uppercase text-[10px] tracking-widest mb-4">Uploaded Documents</h4>
                  <div className="flex flex-col gap-3">
                    {selectedApp.studentPhoto && (
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex justify-between items-center">
                        <div>
                          <p className="text-[10px] font-bold text-slate-500 mb-0.5 uppercase tracking-wider">Student Photo</p>
                          <p className="text-sm font-bold text-slate-800 truncate max-w-[200px] sm:max-w-[300px]">{selectedApp.studentPhoto.split('/').pop()}</p>
                        </div>
                        <button onClick={() => alert(`Simulating download for: ${selectedApp.studentPhoto}`)} className="flex items-center gap-1.5 text-xs font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors shrink-0">
                          <Download size={14} /> Download
                        </button>
                      </div>
                    )}
                    {selectedApp.birthCertificate && (
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex justify-between items-center">
                        <div>
                          <p className="text-[10px] font-bold text-slate-500 mb-0.5 uppercase tracking-wider">Birth Certificate</p>
                          <p className="text-sm font-bold text-slate-800 truncate max-w-[200px] sm:max-w-[300px]">{selectedApp.birthCertificate.split('/').pop()}</p>
                        </div>
                        <button onClick={() => alert(`Simulating download for: ${selectedApp.birthCertificate}`)} className="flex items-center gap-1.5 text-xs font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors shrink-0">
                          <Download size={14} /> Download
                        </button>
                      </div>
                    )}
                    {selectedApp.aadhaarCard && (
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex justify-between items-center">
                        <div>
                          <p className="text-[10px] font-bold text-slate-500 mb-0.5 uppercase tracking-wider">Aadhaar Card</p>
                          <p className="text-sm font-bold text-slate-800 truncate max-w-[200px] sm:max-w-[300px]">{selectedApp.aadhaarCard.split('/').pop()}</p>
                        </div>
                        <button onClick={() => alert(`Simulating download for: ${selectedApp.aadhaarCard}`)} className="flex items-center gap-1.5 text-xs font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors shrink-0">
                          <Download size={14} /> Download
                        </button>
                      </div>
                    )}
                    {(!selectedApp.studentPhoto && !selectedApp.birthCertificate && !selectedApp.aadhaarCard) && (
                      <p className="text-sm text-slate-400 italic">No documents were uploaded for this application.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Status Management */}
            <div className="w-full md:w-2/5 flex flex-col bg-white">
              <div className="p-6 border-b flex justify-between items-center bg-white sticky top-0 z-10">
                <h3 className="text-lg font-black text-slate-800">Status Management</h3>
                <button onClick={() => setSelectedApp(null)} className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 rounded-full transition-colors hidden md:block">
                  <XCircle size={20} />
                </button>
              </div>

              <div className="p-6 overflow-y-auto flex-1 bg-slate-50/50">
                {/* Editable Status */}
                <div className="mb-5">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Admission Status</label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    className="w-full p-3 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white"
                  >
                    {statusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>

                {/* Admin Remarks */}
                <div className="mb-6">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Admin Remarks</label>
                  <textarea
                    value={adminRemarks}
                    onChange={(e) => setAdminRemarks(e.target.value)}
                    placeholder="Enter remarks or comments regarding this application..."
                    className="w-full p-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none h-24 bg-white"
                  ></textarea>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  <button onClick={() => handleStatusUpdate('Confirmed')} className="flex justify-center items-center gap-2 bg-emerald-500 text-white p-3 rounded-xl font-bold text-sm hover:bg-emerald-600 transition-colors">
                    <CheckSquare size={16} /> Confirm
                  </button>
                  <button onClick={() => handleStatusUpdate('Rejected')} className="flex justify-center items-center gap-2 bg-rose-500 text-white p-3 rounded-xl font-bold text-sm hover:bg-rose-600 transition-colors">
                    <XCircle size={16} /> Reject
                  </button>
                  <a href={`tel:${selectedApp.fatherMobile}`} className="col-span-2 flex justify-center items-center gap-2 bg-blue-600 text-white p-3 rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors text-center">
                    <Phone size={16} /> Contact Applicant
                  </a>
                </div>

                {/* Status History Timeline */}
                {selectedApp.statusHistory && selectedApp.statusHistory.length > 0 && (
                  <div>
                    <h4 className="font-black text-slate-400 uppercase text-[10px] tracking-widest mb-4">Status History</h4>
                    <div className="space-y-4 border-l-2 border-slate-200 ml-2 pl-4 relative">
                      {[...selectedApp.statusHistory].reverse().map((history, idx) => (
                        <div key={idx} className="relative">
                          <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 bg-primary rounded-full border-2 border-white"></span>
                          <p className="text-[10px] text-slate-400 font-bold mb-0.5">{new Date(history.date).toLocaleString()}</p>
                          <p className="text-sm font-semibold text-slate-700">
                            {history.previousStatus} <span className="text-slate-400">→</span> <span className="text-primary">{history.newStatus}</span>
                          </p>
                          <p className="text-xs text-slate-500 mt-1">By: {history.adminName}</p>
                          {history.remarks && <p className="text-xs text-slate-600 italic bg-white p-2 rounded-lg border mt-2">"{history.remarks}"</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

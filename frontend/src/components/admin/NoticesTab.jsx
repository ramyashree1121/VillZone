import React, { useState, useEffect } from 'react';
import { Plus, Trash2, FileText, Bell, Edit2 } from 'lucide-react';

export default function NoticesTab({ token, showSuccess }) {
  const [notices, setNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    title: '', content: '', category: 'General', isImportant: false
  });

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/notices', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setNotices(await res.json());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isEditing ? `http://localhost:5000/api/notices/${editId}` : 'http://localhost:5000/api/notices';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        showSuccess(isEditing ? 'Notice updated successfully!' : 'Notice published successfully!');
        setIsAdding(false);
        setIsEditing(false);
        setEditId(null);
        setFormData({ title: '', content: '', category: 'General', isImportant: false });
        fetchNotices();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const openEditForm = (notice) => {
    setFormData({
      title: notice.title,
      content: notice.content,
      category: notice.category,
      isImportant: notice.isImportant
    });
    setEditId(notice._id);
    setIsEditing(true);
    setIsAdding(true);
    const mainArea = document.querySelector('main');
    if (mainArea) mainArea.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this notice?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/notices/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        showSuccess('Notice deleted.');
        fetchNotices();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-slate-800">News & Alerts</h2>
          <p className="text-slate-500 font-medium">Manage school announcements and notices</p>
        </div>
        <button 
          onClick={() => {
            if (isAdding) {
              setIsAdding(false);
              setIsEditing(false);
              setEditId(null);
              setFormData({ title: '', content: '', category: 'General', isImportant: false });
            } else {
              setIsAdding(true);
            }
          }}
          className="bg-primary hover:bg-primary-light text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-colors"
        >
          {isAdding ? 'Cancel' : <><Plus size={18} /> New Notice</>}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Title</label>
              <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" placeholder="e.g. Term Exams Postponed" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Category</label>
              <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20">
                <option>General</option>
                <option>Academic</option>
                <option>Holiday</option>
                <option>Sports</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Content</label>
            <textarea required rows="4" value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" placeholder="Notice details..."></textarea>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="important" checked={formData.isImportant} onChange={e => setFormData({...formData, isImportant: e.target.checked})} className="w-4 h-4 text-primary rounded border-slate-300" />
            <label htmlFor="important" className="text-sm font-bold text-slate-700">Mark as Important (Highlight)</label>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-secondary hover:bg-secondary-dark text-white px-6 py-2 rounded-xl font-bold transition-colors">
              {isEditing ? 'Save Changes' : 'Publish Notice'}
            </button>
          </div>
        </form>
      )}

      {isLoading ? (
        <div className="text-center py-12 text-slate-400 font-bold">Loading notices...</div>
      ) : notices.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm">
          <Bell size={48} className="mx-auto text-slate-300 mb-4" />
          <h3 className="text-lg font-bold text-slate-800">No notices found</h3>
          <p className="text-slate-500">Create a new notice to inform parents and students.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notices.map((notice) => (
            <div key={notice._id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${notice.isImportant ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-600'}`}>
                    {notice.category}
                  </span>
                  <span className="text-xs font-bold text-slate-400">
                    {new Date(notice.date).toLocaleDateString()}
                  </span>
                </div>
                <h4 className="font-extrabold text-slate-800 text-lg mb-2">{notice.title}</h4>
                <p className="text-slate-600 text-sm line-clamp-3 mb-4">{notice.content}</p>
              </div>
              <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
                <button onClick={() => openEditForm(notice)} className="text-blue-500 hover:text-blue-600 font-bold text-sm flex items-center gap-1 transition-colors">
                  <Edit2 size={16} /> Edit
                </button>
                <button onClick={() => handleDelete(notice._id)} className="text-rose-500 hover:text-rose-600 font-bold text-sm flex items-center gap-1 transition-colors">
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

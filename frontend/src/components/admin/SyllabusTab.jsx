import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, BookOpen, Download, FileText, X } from 'lucide-react';

export default function SyllabusTab({ token, showSuccess }) {
  const [syllabi, setSyllabi] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '', gradeLevel: 'Pre-KG', status: 'Published'
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchSyllabi();
  }, []);

  const fetchSyllabi = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/syllabus', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setSyllabi(await res.json());
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
      const url = isEditing ? `http://localhost:5000/api/syllabus/${editId}` : 'http://localhost:5000/api/syllabus';
      const method = isEditing ? 'PUT' : 'POST';

      const data = new FormData();
      data.append('title', formData.title);
      data.append('gradeLevel', formData.gradeLevel);
      data.append('status', formData.status);
      if (file) {
        data.append('pdfFile', file);
      }

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: data
      });
      
      if (res.ok) {
        showSuccess(isEditing ? 'Syllabus updated successfully!' : 'Syllabus added successfully!');
        resetForm();
        fetchSyllabi();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const resetForm = () => {
    setIsAdding(false);
    setIsEditing(false);
    setEditId(null);
    setFile(null);
    setFormData({ title: '', gradeLevel: 'Pre-KG', status: 'Published' });
  };

  const openEditForm = (syllabus) => {
    setFormData({
      title: syllabus.title,
      gradeLevel: syllabus.gradeLevel,
      status: syllabus.status
    });
    setEditId(syllabus._id);
    setIsEditing(true);
    setIsAdding(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this syllabus?')) {
      try {
        const res = await fetch(`http://localhost:5000/api/syllabus/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          showSuccess('Syllabus deleted successfully!');
          fetchSyllabi();
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const formatSize = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (isLoading) {
    return <div className="p-6 text-slate-500">Loading syllabus data...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Academic Syllabus</h2>
          <p className="text-sm text-slate-500">Manage grade-wise syllabus documents</p>
        </div>
        <button 
          onClick={() => { resetForm(); setIsAdding(true); }}
          className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-xl text-sm font-medium transition"
        >
          <Plus size={16} /> Add Syllabus
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-800">{isEditing ? 'Edit Syllabus' : 'Add New Syllabus'}</h3>
            <button onClick={resetForm} className="text-slate-400 hover:text-slate-600"><X size={20}/></button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Title</label>
                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none" placeholder="e.g. CBSE Grade 10 Syllabus 2026-27" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Grade Level</label>
                <select value={formData.gradeLevel} onChange={e => setFormData({...formData, gradeLevel: e.target.value})} className="w-full p-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none">
                  <option>Pre-KG</option>
                  <option>LKG</option>
                  <option>UKG</option>
                  <option>Grade 1-5</option>
                  <option>Grade 6-8</option>
                  <option>Grade 9-10</option>
                  <option>Grade 11-12</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Upload PDF File {isEditing && '(Leave empty to keep existing)'}</label>
                <input type="file" accept="application/pdf" onChange={e => setFile(e.target.files[0])} required={!isEditing} className="w-full p-2 border border-slate-200 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Status</label>
                <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full p-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none">
                  <option>Published</option>
                  <option>Draft</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button type="button" onClick={resetForm} className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg text-sm font-medium transition">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm font-medium transition">
                {isEditing ? 'Save Changes' : 'Upload Syllabus'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-100">
              <th className="p-4 font-semibold">Title</th>
              <th className="p-4 font-semibold">Grade Level</th>
              <th className="p-4 font-semibold">File Info</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {syllabi.length === 0 ? (
              <tr><td colSpan="5" className="p-8 text-center text-slate-500">No syllabus entries found.</td></tr>
            ) : (
              syllabi.map((item) => (
                <tr key={item._id} className="hover:bg-slate-50/50 transition">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-red-500 shrink-0">
                        <FileText size={18} />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-sm">{item.title}</p>
                        <p className="text-xs text-slate-500">Updated: {new Date(item.updatedAt || item.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs font-medium">{item.gradeLevel}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <a href={`http://localhost:5000${item.pdfUrl}`} target="_blank" rel="noreferrer" className="text-primary hover:underline text-xs flex items-center gap-1">
                        <Download size={14} /> Download PDF
                      </a>
                      <span className="text-xs text-slate-400">({formatSize(item.fileSize)})</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${item.status === 'Published' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEditForm(item)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition" title="Edit">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDelete(item._id)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

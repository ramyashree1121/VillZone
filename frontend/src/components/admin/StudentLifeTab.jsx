import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Upload, Image as ImageIcon, Video, Search, CheckCircle, XCircle, FileImage, FileVideo } from 'lucide-react';

export default function StudentLifeTab({ token, showSuccess }) {
  const [activeSubTab, setActiveSubTab] = useState('toppers'); // 'toppers', 'achievements', 'gallery'
  const [isLoading, setIsLoading] = useState(false);

  // Data
  const [toppers, setToppers] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [gallery, setGallery] = useState([]);

  // Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchData();
  }, [activeSubTab]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const endpoint =
        activeSubTab === 'toppers' ? '/api/student-life/toppers' :
          activeSubTab === 'achievements' ? '/api/student-life/achievements' :
            '/api/student-life/gallery';

      const res = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`);
      if (res.ok) {
        const data = await res.json();
        if (activeSubTab === 'toppers') setToppers(data);
        else if (activeSubTab === 'achievements') setAchievements(data);
        else setGallery(data);
      }
    } catch (err) {
      console.error('Failed to fetch data', err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setIsFormOpen(false);
    setIsEditing(false);
    setEditId(null);
    setFile(null);

    if (activeSubTab === 'toppers') {
      setFormData({ name: '', grade: '', score: '', academicYear: '', achievementDesc: '', displayOrder: 0, status: 'Published' });
    } else if (activeSubTab === 'achievements') {
      setFormData({ title: '', studentName: '', category: 'Academic', description: '', badge: '', displayOrder: 0, status: 'Published' });
    } else {
      setFormData({ title: '', description: '', category: 'Classroom Activities', eventName: '', mediaType: 'image', displayOrder: 0, status: 'Published' });
    }
  };

  const openAddForm = () => {
    resetForm();
    setIsFormOpen(true);
  };

  const openEditForm = (item) => {
    resetForm();
    setFormData({ ...item });
    setEditId(item._id);
    setIsEditing(true);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    const endpoint =
      activeSubTab === 'toppers' ? `/api/student-life/toppers/${id}` :
        activeSubTab === 'achievements' ? `/api/student-life/achievements/${id}` :
          `/api/student-life/gallery/${id}`;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        showSuccess('Item deleted successfully');
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });
    if (file) {
      data.append(activeSubTab === 'gallery' ? 'media' : 'image', file);
    }

    const endpoint =
      activeSubTab === 'toppers' ? `/api/student-life/toppers` :
        activeSubTab === 'achievements' ? `/api/student-life/achievements` :
          `/api/student-life/gallery`;

    const url = isEditing ? `${import.meta.env.VITE_API_URL}${endpoint}/${editId}` : `${import.meta.env.VITE_API_URL}${endpoint}`;
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: data
      });
      if (res.ok) {
        showSuccess(`Item ${isEditing ? 'updated' : 'added'} successfully`);
        resetForm();
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800">Student Life Management</h2>
          <p className="text-slate-500 text-sm">Manage toppers, achievements, and the student life media gallery.</p>
        </div>
        <button
          onClick={openAddForm}
          className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-colors flex items-center gap-2 shadow-sm"
        >
          <Plus size={18} /> Add New {activeSubTab === 'toppers' ? 'Topper' : activeSubTab === 'achievements' ? 'Achievement' : 'Gallery Item'}
        </button>
      </div>

      {/* Sub Tabs */}
      <div className="flex border-b border-slate-200">
        <button onClick={() => { setActiveSubTab('toppers'); setIsFormOpen(false); }} className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors ${activeSubTab === 'toppers' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Toppers</button>
        <button onClick={() => { setActiveSubTab('achievements'); setIsFormOpen(false); }} className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors ${activeSubTab === 'achievements' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Achievements</button>
        <button onClick={() => { setActiveSubTab('gallery'); setIsFormOpen(false); }} className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors ${activeSubTab === 'gallery' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Gallery</button>
      </div>

      {isFormOpen ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 animate-fadeIn">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800">{isEditing ? 'Edit' : 'Add New'} {activeSubTab === 'toppers' ? 'Topper' : activeSubTab === 'achievements' ? 'Achievement' : 'Gallery Item'}</h3>
            <button onClick={resetForm} className="text-slate-400 hover:text-slate-600"><XCircle size={24} /></button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* File Upload (Image / Video) */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Upload Media</label>
              <input type="file" onChange={(e) => setFile(e.target.files[0])} accept={activeSubTab === 'gallery' ? "image/*,video/mp4" : "image/*"} className="w-full border border-slate-200 rounded-xl p-2 text-sm" />
              {isEditing && formData.imageUrl && <p className="text-xs text-slate-500 mt-2">Current Image: {formData.imageUrl}</p>}
              {isEditing && formData.mediaUrl && <p className="text-xs text-slate-500 mt-2">Current Media: {formData.mediaUrl}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* TOPPERS FORM */}
              {activeSubTab === 'toppers' && (
                <>
                  <div><label className="block text-sm font-bold mb-2">Student Name</label><input required value={formData.name || ''} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full border p-2 rounded-xl" /></div>
                  <div><label className="block text-sm font-bold mb-2">Grade/Class</label><input required value={formData.grade || ''} onChange={e => setFormData({ ...formData, grade: e.target.value })} className="w-full border p-2 rounded-xl" placeholder="e.g. Grade 12 (CBSE Science)" /></div>
                  <div><label className="block text-sm font-bold mb-2">Score/Percentage</label><input required value={formData.score || ''} onChange={e => setFormData({ ...formData, score: e.target.value })} className="w-full border p-2 rounded-xl" placeholder="e.g. 98.6%" /></div>
                  <div><label className="block text-sm font-bold mb-2">Academic Year</label><input value={formData.academicYear || ''} onChange={e => setFormData({ ...formData, academicYear: e.target.value })} className="w-full border p-2 rounded-xl" /></div>
                </>
              )}

              {/* ACHIEVEMENTS FORM */}
              {activeSubTab === 'achievements' && (
                <>
                  <div><label className="block text-sm font-bold mb-2">Achievement Title</label><input required value={formData.title || ''} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full border p-2 rounded-xl" /></div>
                  <div><label className="block text-sm font-bold mb-2">Student/Team Name</label><input value={formData.studentName || ''} onChange={e => setFormData({ ...formData, studentName: e.target.value })} className="w-full border p-2 rounded-xl" /></div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Category</label>
                    <select value={formData.category || 'Academic'} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full border p-2 rounded-xl">
                      <option>Academic</option><option>Sports</option><option>Cultural</option><option>Competition</option><option>Olympiad</option><option>Other</option>
                    </select>
                  </div>
                  <div><label className="block text-sm font-bold mb-2">Badge Text</label><input value={formData.badge || ''} onChange={e => setFormData({ ...formData, badge: e.target.value })} className="w-full border p-2 rounded-xl" placeholder="e.g. State Rank" /></div>
                </>
              )}

              {/* GALLERY FORM */}
              {activeSubTab === 'gallery' && (
                <>
                  <div><label className="block text-sm font-bold mb-2">Media Title</label><input value={formData.title || ''} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full border p-2 rounded-xl" /></div>
                  <div><label className="block text-sm font-bold mb-2">Event Name</label><input value={formData.eventName || ''} onChange={e => setFormData({ ...formData, eventName: e.target.value })} className="w-full border p-2 rounded-xl" /></div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Category</label>
                    <select value={formData.category || 'Classroom Activities'} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full border p-2 rounded-xl">
                      <option>Classroom Activities</option><option>Sports Events</option><option>Annual Day</option><option>Cultural Events</option><option>Educational Tours</option><option>Science Exhibition</option><option>Competitions</option><option>Celebrations</option><option>Student Activities</option><option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Media Type</label>
                    <select value={formData.mediaType || 'image'} onChange={e => setFormData({ ...formData, mediaType: e.target.value })} className="w-full border p-2 rounded-xl">
                      <option value="image">Image</option><option value="video">Video (MP4)</option>
                    </select>
                  </div>
                </>
              )}
            </div>

            {/* Common Fields */}
            <div>
              <label className="block text-sm font-bold mb-2">Description / Description</label>
              <textarea value={formData.description || formData.achievementDesc || ''} onChange={e => setFormData({ ...formData, description: e.target.value, achievementDesc: e.target.value })} className="w-full border p-2 rounded-xl" rows={3}></textarea>
            </div>

            <div className="flex gap-4">
              <div>
                <label className="block text-sm font-bold mb-2">Display Order</label>
                <input type="number" value={formData.displayOrder || 0} onChange={e => setFormData({ ...formData, displayOrder: e.target.value })} className="w-full border p-2 rounded-xl" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Status</label>
                <select value={formData.status || 'Published'} onChange={e => setFormData({ ...formData, status: e.target.value })} className="w-full border p-2 rounded-xl">
                  <option value="Published">Published</option><option value="Draft">Draft</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <button type="button" onClick={resetForm} className="px-5 py-2.5 text-sm font-bold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200">Cancel</button>
              <button type="submit" className="px-5 py-2.5 text-sm font-bold text-white bg-primary rounded-xl hover:bg-primary-dark shadow-sm">Save Changes</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="p-12 text-center text-slate-500">Loading...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-slate-800 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-4">Media</th>
                    <th className="p-4">Details</th>
                    <th className="p-4">Category/Grade</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(activeSubTab === 'toppers' ? toppers : activeSubTab === 'achievements' ? achievements : gallery).length === 0 ? (
                    <tr><td colSpan="5" className="p-8 text-center text-slate-500">No records found. Add one above.</td></tr>
                  ) : (
                    (activeSubTab === 'toppers' ? toppers : activeSubTab === 'achievements' ? achievements : gallery).map((item) => (
                      <tr key={item._id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                        <td className="p-4">
                          {item.mediaType === 'video' ? (
                            <div className="w-16 h-16 bg-slate-200 rounded-lg flex items-center justify-center text-slate-400"><FileVideo size={24} /></div>
                          ) : item.imageUrl || item.mediaUrl ? (
                            <img src={`${import.meta.env.VITE_API_URL}${item.imageUrl || item.mediaUrl}`} className="w-16 h-16 object-cover rounded-lg shadow-sm" alt="Thumbnail" />
                          ) : (
                            <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400"><ImageIcon size={24} /></div>
                          )}
                        </td>
                        <td className="p-4">
                          <p className="font-bold text-slate-800 text-base">{item.name || item.title}</p>
                          <p className="text-xs text-slate-500 truncate max-w-[200px]">{item.studentName || item.badge || item.eventName}</p>
                        </td>
                        <td className="p-4">
                          <span className="inline-block px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full">
                            {item.grade || item.category}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${item.status === 'Published' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                            {item.status === 'Published' ? <CheckCircle size={12} /> : <XCircle size={12} />} {item.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button onClick={() => openEditForm(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit2 size={16} /></button>
                            <button onClick={() => handleDelete(item._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

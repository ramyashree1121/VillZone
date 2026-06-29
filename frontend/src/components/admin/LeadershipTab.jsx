import React, { useState, useEffect } from 'react';
import { User, Edit, Trash2, Plus, X, Upload } from 'lucide-react';

export default function LeadershipTab({ token, showSuccess }) {
  const [leadership, setLeadership] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    role: '',
    name: '',
    qualification: '',
    image: '',
    message: '',
    email: '',
    displayOrder: 0,
    status: 'Active'
  });

  useEffect(() => {
    fetchLeadership();
  }, []);

  const fetchLeadership = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/leadership`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setLeadership(await res.json());
      }
    } catch (err) {
      console.error('Failed to fetch leadership', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append('image', file);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formDataUpload
      });
      if (res.ok) {
        const data = await res.json();
        setFormData({ ...formData, image: `${import.meta.env.VITE_API_URL}${data.imageUrl}` });
        showSuccess('Image uploaded successfully!');
      } else {
        alert('Image upload failed');
      }
    } catch (err) {
      console.error(err);
      alert('Error uploading image');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.role) return;

    try {
      const url = isEditing ? `${import.meta.env.VITE_API_URL}/api/leadership/${editId}` : `${import.meta.env.VITE_API_URL}/api/leadership`;
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
        showSuccess(`Leadership member ${isEditing ? 'updated' : 'added'} successfully!`);
        setIsFormOpen(false);
        fetchLeadership();
      }
    } catch (err) {
      console.error('Save failed', err);
    }
  };

  const handleEdit = (member) => {
    setFormData(member);
    setEditId(member._id);
    setIsEditing(true);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this leadership member?')) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/leadership/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        showSuccess('Leadership member deleted!');
        fetchLeadership();
      }
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  const openNewForm = () => {
    setFormData({
      role: '',
      name: '',
      qualification: '',
      image: '',
      message: '',
      email: '',
      displayOrder: 0,
      status: 'Active'
    });
    setIsEditing(false);
    setIsFormOpen(true);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Leadership Management</h2>
          <p className="text-sm font-medium text-slate-500 mt-1">Manage school management and leadership profiles.</p>
        </div>
        <button
          onClick={openNewForm}
          className="bg-secondary hover:bg-secondary-dark text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-colors shadow-lg shadow-secondary/30"
        >
          <Plus size={20} /> Add Member
        </button>
      </div>

      {isFormOpen && (
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 mb-8 animate-fadeIn">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-black text-slate-800">{isEditing ? 'Edit Leadership Member' : 'Add New Leadership Member'}</h3>
            <button type="button" onClick={() => setIsFormOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
              <X size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Name *</label>
              <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" placeholder="e.g. Dr. John Doe" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Role *</label>
              <input required type="text" value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" placeholder="e.g. Principal" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Qualification</label>
              <input type="text" value={formData.qualification} onChange={e => setFormData({ ...formData, qualification: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" placeholder="e.g. M.Sc., Ph.D." />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email</label>
              <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" placeholder="contact@example.com" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Display Order</label>
              <input type="number" value={formData.displayOrder} onChange={e => setFormData({ ...formData, displayOrder: Number(e.target.value) })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" placeholder="0" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Status</label>
              <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 font-bold">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Profile Image (URL or Upload)</label>
              <div className="flex gap-2 items-center">
                <input type="text" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" placeholder="https://..." />
                <span className="text-slate-400 font-bold px-2">OR</span>
                <label className="bg-primary hover:bg-primary-light text-white px-4 py-3 rounded-xl font-bold cursor-pointer transition-colors flex items-center gap-2 whitespace-nowrap">
                  <Upload size={18} /> Upload
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>
              {formData.image && (
                <div className="mt-4">
                  <img src={formData.image?.startsWith('http') || formData.image?.startsWith('data:') ? formData.image : `${import.meta.env.VITE_API_URL}${formData.image}`} alt="Preview" className="h-24 w-24 object-cover rounded-xl border-4 border-slate-100 shadow-sm" onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/150'; }} />
                </div>
              )}
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Message</label>
              <textarea value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" placeholder="A message from the leadership member..." rows={4}></textarea>
            </div>
          </div>
          <div className="flex justify-end pt-4 mt-6 border-t border-slate-100">
            <button type="submit" className="bg-secondary hover:bg-secondary-dark text-white px-8 py-3 rounded-xl font-bold transition-colors shadow-lg shadow-secondary/20">
              {isEditing ? 'Save Changes' : 'Add Member'}
            </button>
          </div>
        </form>
      )}

      {isLoading ? (
        <div className="text-center py-12 text-slate-400 font-bold">Loading leadership...</div>
      ) : leadership.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm">
          <User size={48} className="mx-auto text-slate-300 mb-4" />
          <h3 className="text-lg font-bold text-slate-800">No Leadership Members</h3>
          <p className="text-slate-500 mt-2">Click "Add Member" to create profiles.</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200">
                  <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider w-16">Profile</th>
                  <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Name & Role</th>
                  <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {leadership.map(member => (
                  <tr key={member._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden flex items-center justify-center flex-shrink-0">
                        {member.image ? (
                          <img src={member.image?.startsWith('http') || member.image?.startsWith('data:') ? member.image : `${import.meta.env.VITE_API_URL}${member.image}`} alt={member.name} className="w-full h-full object-cover" onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/150'; }} />
                        ) : (
                          <User className="text-slate-400" size={24} />
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-bold text-slate-800">{member.name}</div>
                      <div className="text-xs font-medium text-slate-500">{member.role}</div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${member.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-3">
                        <button onClick={() => handleEdit(member)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Edit size={18} />
                        </button>
                        <button onClick={() => handleDelete(member._id)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

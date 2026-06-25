import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, User, Mail, Briefcase, GraduationCap, Clock } from 'lucide-react';

export default function FacultyTab({ token, showSuccess }) {
  const [faculty, setFaculty] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: '', role: '', dept: 'Administration', qualification: '', exp: '', email: '', image: '', message: ''
  });



  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/faculty', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setFaculty(await res.json());
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
      const url = isEditing ? `http://localhost:5000/api/faculty/${editId}` : 'http://localhost:5000/api/faculty';
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
        showSuccess(isEditing ? 'Faculty updated successfully!' : 'Faculty added successfully!');
        resetForm();
        fetchFaculty();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const openEditForm = (fac) => {
    setFormData({
      name: fac.name,
      role: fac.role,
      dept: fac.dept,
      qualification: fac.qualification || '',
      exp: fac.exp || '',
      email: fac.email || '',
      image: fac.image || '',
      message: fac.message || ''
    });
    setEditId(fac._id);
    setIsEditing(true);
    setIsAdding(true);
    const mainArea = document.querySelector('main');
    if (mainArea) mainArea.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this faculty member?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/faculty/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        showSuccess('Faculty member deleted.');
        fetchFaculty();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const resetForm = () => {
    setIsAdding(false);
    setIsEditing(false);
    setEditId(null);
    setFormData({ name: '', role: '', dept: 'Administration', qualification: '', exp: '', email: '', image: '', message: '' });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append('image', file);

    try {
      const res = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formDataUpload
      });
      if (res.ok) {
        const data = await res.json();
        setFormData({ ...formData, image: 'http://localhost:5000' + data.imageUrl });
        showSuccess('Image uploaded successfully!');
      } else {
        alert('Image upload failed');
      }
    } catch (err) {
      console.error(err);
      alert('Error uploading image');
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-slate-800">Faculty Management</h2>
          <p className="text-slate-500 font-medium">Manage school teachers and staff</p>
        </div>
        <button 
          onClick={() => {
            if (isAdding) resetForm();
            else setIsAdding(true);
          }}
          className="bg-primary hover:bg-primary-light text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-colors"
        >
          {isAdding ? 'Cancel' : <><Plus size={18} /> Add Faculty</>}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Name</label>
              <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" placeholder="e.g. Dr. Jane Doe" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Role/Designation</label>
              <input required type="text" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" placeholder="e.g. PGT Physics" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Department</label>
              <input required type="text" value={formData.dept} onChange={e => setFormData({...formData, dept: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" placeholder="e.g. Science, Arts, Languages" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Qualification</label>
              <input type="text" value={formData.qualification} onChange={e => setFormData({...formData, qualification: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" placeholder="e.g. M.Sc., B.Ed." />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Experience</label>
              <input type="text" value={formData.exp} onChange={e => setFormData({...formData, exp: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" placeholder="e.g. 10 Yrs" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
              <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" placeholder="teacher@school.edu.in" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Image URL or Upload</label>
              <div className="flex gap-2 items-center">
                <input type="url" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" placeholder="https://..." />
                <span className="text-slate-400 font-bold px-2">OR</span>
                <label className="bg-primary hover:bg-primary-light text-white px-4 py-3 rounded-xl font-bold cursor-pointer transition-colors text-center whitespace-nowrap">
                  Upload Image
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>
              {formData.image && (
                 <div className="mt-3">
                   <img src={formData.image} alt="Preview" className="h-20 w-20 object-cover rounded-xl border border-slate-200" />
                 </div>
              )}
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Management Quote / Message</label>
              <textarea value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" placeholder="Optional. Only used for Management Team profiles." rows={3}></textarea>
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <button type="submit" className="bg-secondary hover:bg-secondary-dark text-white px-6 py-2 rounded-xl font-bold transition-colors">
              {isEditing ? 'Save Changes' : 'Add Faculty'}
            </button>
          </div>
        </form>
      )}

      {isLoading ? (
        <div className="text-center py-12 text-slate-400 font-bold">Loading faculty...</div>
      ) : faculty.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm">
          <User size={48} className="mx-auto text-slate-300 mb-4" />
          <h3 className="text-lg font-bold text-slate-800">No faculty found</h3>
          <p className="text-slate-500">Add staff members to display them on the website.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {faculty.map((fac) => (
            <div key={fac._id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col group">
              <div className="h-48 relative overflow-hidden bg-slate-100">
                {fac.image ? (
                  <img src={fac.image} alt={fac.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300"><User size={48} /></div>
                )}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-primary shadow-sm uppercase">
                  {fac.dept}
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h4 className="font-bold text-slate-800 text-lg">{fac.name}</h4>
                <div className="text-sm font-semibold text-slate-500 mb-4">{fac.role}</div>
                
                <div className="space-y-2 text-xs text-slate-600 mb-6 flex-1">
                  {fac.qualification && <div className="flex items-center gap-2"><GraduationCap size={14} className="text-slate-400"/> {fac.qualification}</div>}
                  {fac.exp && <div className="flex items-center gap-2"><Clock size={14} className="text-slate-400"/> {fac.exp}</div>}
                  {fac.email && <div className="flex items-center gap-2"><Mail size={14} className="text-slate-400"/> {fac.email}</div>}
                </div>

                <div className="flex gap-2 justify-end border-t border-slate-100 pt-4">
                  <button onClick={() => openEditForm(fac)} className="text-blue-500 hover:text-blue-600 p-2 rounded-lg hover:bg-blue-50 transition-colors">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => handleDelete(fac._id)} className="text-rose-500 hover:text-rose-600 p-2 rounded-lg hover:bg-rose-50 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

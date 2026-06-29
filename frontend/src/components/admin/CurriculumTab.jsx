import React, { useState, useEffect } from 'react';
import { Target, Edit, Trash2, Plus, X, List, Layers, BookOpen } from 'lucide-react';

export default function CurriculumTab({ token, showSuccess }) {
  const [activeSubTab, setActiveSubTab] = useState('boards');
  const [boards, setBoards] = useState([]);
  const [features, setFeatures] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [boardsRes, featuresRes, categoriesRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL}/api/curriculum-boards`),
        fetch(`${import.meta.env.VITE_API_URL}/api/curriculum-features`),
        fetch(`${import.meta.env.VITE_API_URL}/api/curriculum-categories`)
      ]);
      if (boardsRes.ok) setBoards(await boardsRes.json());
      if (featuresRes.ok) setFeatures(await featuresRes.json());
      if (categoriesRes.ok) setCategories(await categoriesRes.json());
    } catch (err) {
      console.error('Error fetching curriculum data:', err);
    }
    setIsLoading(false);
  };

  const getApiUrl = () => {
    switch (activeSubTab) {
      case 'boards': return `${import.meta.env.VITE_API_URL}/api/curriculum-boards`;
      case 'features': return `${import.meta.env.VITE_API_URL}/api/curriculum-features`;
      case 'categories': return `${import.meta.env.VITE_API_URL}/api/curriculum-categories`;
      default: return '';
    }
  };

  const handleOpenModal = (item = null) => {
    setEditingItem(item);
    if (item) {
      setFormData({ ...item });
    } else {
      setFormData(activeSubTab === 'categories' ? { subjects: [] } : {});
    }
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      const res = await fetch(`${getApiUrl()}/${id}`, {
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
    try {
      const url = editingItem ? `${getApiUrl()}/${editingItem._id}` : getApiUrl();
      const method = editingItem ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        showSuccess(`Item ${editingItem ? 'updated' : 'added'} successfully`);
        setIsModalOpen(false);
        fetchData();
      } else {
        alert('Failed to save item');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const renderModalContent = () => {
    if (activeSubTab === 'boards' || activeSubTab === 'features') {
      return (
        <>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Title</label>
            <input required type="text" className="w-full px-4 py-2 border rounded-xl"
              value={formData.title || ''} onChange={e => setFormData({ ...formData, title: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Description</label>
            <textarea className="w-full px-4 py-2 border rounded-xl" rows="3"
              value={formData.description || ''} onChange={e => setFormData({ ...formData, description: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Display Order</label>
              <input type="number" className="w-full px-4 py-2 border rounded-xl"
                value={formData.displayOrder || 0} onChange={e => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })} />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Status</label>
              <select className="w-full px-4 py-2 border rounded-xl"
                value={formData.status || 'Active'} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </>
      );
    }

    if (activeSubTab === 'categories') {
      return (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">ID Name (Unique)</label>
              <input required type="text" className="w-full px-4 py-2 border rounded-xl" placeholder="e.g. Kindergarten"
                value={formData.idName || ''} onChange={e => setFormData({ ...formData, idName: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Tab Label</label>
              <input required type="text" className="w-full px-4 py-2 border rounded-xl" placeholder="e.g. Kindergarten"
                value={formData.tabLabel || ''} onChange={e => setFormData({ ...formData, tabLabel: e.target.value })} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Tags (Classes)</label>
            <input type="text" className="w-full px-4 py-2 border rounded-xl" placeholder="e.g. PRE-KG, LKG, UKG"
              value={formData.tags || ''} onChange={e => setFormData({ ...formData, tags: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Academic Objective Title</label>
            <input required type="text" className="w-full px-4 py-2 border rounded-xl" placeholder="e.g. Academic Objectives & Focus"
              value={formData.title || ''} onChange={e => setFormData({ ...formData, title: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Academic Objective Description</label>
            <textarea className="w-full px-4 py-2 border rounded-xl" rows="3"
              value={formData.description || ''} onChange={e => setFormData({ ...formData, description: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Subjects (Comma separated)</label>
            <input type="text" className="w-full px-4 py-2 border rounded-xl" placeholder="Maths, Science, English"
              value={formData.subjects?.join(', ') || ''} 
              onChange={e => setFormData({ ...formData, subjects: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Display Order</label>
              <input type="number" className="w-full px-4 py-2 border rounded-xl"
                value={formData.displayOrder || 0} onChange={e => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })} />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Status</label>
              <select className="w-full px-4 py-2 border rounded-xl"
                value={formData.status || 'Active'} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </>
      );
    }
  };

  const getListToRender = () => {
    switch (activeSubTab) {
      case 'boards': return boards;
      case 'features': return features;
      case 'categories': return categories;
      default: return [];
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800">Curriculum Management</h2>
          <p className="text-slate-500">Manage boards, features, and classes</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-200"
        >
          <Plus size={18} /> Add New {activeSubTab === 'categories' ? 'Category' : activeSubTab.slice(0, -1)}
        </button>
      </div>

      <div className="flex gap-2 mb-6 border-b border-slate-200">
        <button
          onClick={() => setActiveSubTab('boards')}
          className={`px-4 py-2 font-bold text-sm border-b-2 transition-colors ${activeSubTab === 'boards' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          <List size={16} className="inline mr-2" /> Boards
        </button>
        <button
          onClick={() => setActiveSubTab('features')}
          className={`px-4 py-2 font-bold text-sm border-b-2 transition-colors ${activeSubTab === 'features' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          <Target size={16} className="inline mr-2" /> Features
        </button>
        <button
          onClick={() => setActiveSubTab('categories')}
          className={`px-4 py-2 font-bold text-sm border-b-2 transition-colors ${activeSubTab === 'categories' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          <Layers size={16} className="inline mr-2" /> Class Categories
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="p-4 font-bold text-slate-600 text-sm">Title / Label</th>
                  <th className="p-4 font-bold text-slate-600 text-sm">Description / Details</th>
                  <th className="p-4 font-bold text-slate-600 text-sm w-24">Order</th>
                  <th className="p-4 font-bold text-slate-600 text-sm w-24">Status</th>
                  <th className="p-4 font-bold text-slate-600 text-sm w-24 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {getListToRender().map((item) => (
                  <tr key={item._id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-slate-800">{activeSubTab === 'categories' ? item.tabLabel : item.title}</div>
                      {activeSubTab === 'categories' && <div className="text-xs text-slate-500 mt-1">{item.idName}</div>}
                    </td>
                    <td className="p-4">
                      {activeSubTab === 'categories' ? (
                        <div>
                          <div className="text-xs font-bold text-blue-600 mb-1">{item.tags}</div>
                          <div className="text-sm text-slate-600 line-clamp-2 mb-1">{item.title}: {item.description}</div>
                          <div className="text-xs text-slate-400">{item.subjects?.length || 0} subjects</div>
                        </div>
                      ) : (
                        <span className="text-sm text-slate-600 line-clamp-2">{item.description}</span>
                      )}
                    </td>
                    <td className="p-4 text-sm font-medium text-slate-600">{item.displayOrder}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleOpenModal(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Edit size={16} />
                        </button>
                        <button onClick={() => handleDelete(item._id)} className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {getListToRender().length === 0 && (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-slate-500">
                      No data found. Add one to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto animate-fadeIn shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex justify-between items-center z-10">
              <h3 className="font-black text-lg text-slate-800">
                {editingItem ? 'Edit' : 'Add'} {activeSubTab === 'categories' ? 'Category' : activeSubTab.slice(0, -1)}
              </h3>
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-rose-500 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {renderModalContent()}
              
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import {
  Plus, Trash2, Image as ImageIcon, Edit2, PlayCircle, Video, Search,
  Filter, CheckSquare, Square, Eye, EyeOff, LayoutGrid, CheckCircle2,
  HardDrive, FileImage, Film
} from 'lucide-react';

export default function GalleryTab({ token, showSuccess }) {
  const [gallery, setGallery] = useState([]);
  const [stats, setStats] = useState({ totalMedia: 0, totalImages: 0, totalVideos: 0, featuredMedia: 0, storageUsage: 0 });
  const [isLoading, setIsLoading] = useState(true);

  // Modals & Forms
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    title: '', description: '', category: 'Campus', type: 'image',
    status: 'Active', isFeatured: false, seoTitle: '', metaDescription: '', altText: '', videoUrl: ''
  });
  const [mediaFile, setMediaFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  // Bulk & Filters
  const [selectedIds, setSelectedIds] = useState([]);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterType, setFilterType] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    fetchGallery();
    fetchStats();
  }, [search, filterCategory, filterType, filterStatus]);

  const fetchStats = async () => {
    try {
      const res = await fetch('${import.meta.env.VITE_API_URL}/api/gallery/stats', { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) setStats(await res.json());
    } catch (err) { console.error(err); }
  };

  const fetchGallery = async () => {
    try {
      const query = new URLSearchParams({ search, category: filterCategory, type: filterType, status: filterStatus });
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/gallery?${query.toString()}`);
      if (res.ok) {
        setGallery(await res.json());
        setSelectedIds([]); // Clear selections on refetch
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const openAddModal = () => {
    setIsEditing(false);
    setEditId(null);
    setFormData({
      title: '', description: '', category: 'Campus', type: 'image',
      status: 'Active', isFeatured: false, seoTitle: '', metaDescription: '', altText: '', videoUrl: ''
    });
    setMediaFile(null);
    setPreviewUrl('');
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setIsEditing(true);
    setEditId(item._id);
    setFormData({
      title: item.title || '',
      description: item.description || '',
      category: item.category || 'Campus',
      type: item.type || 'image',
      status: item.status || 'Active',
      isFeatured: item.isFeatured || false,
      seoTitle: item.seoTitle || '',
      metaDescription: item.metaDescription || '',
      altText: item.altText || '',
      videoUrl: item.videoUrl || ''
    });
    setMediaFile(null);
    setPreviewUrl(item.imageUrl || '');
    setIsModalOpen(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMediaFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isEditing ? `${import.meta.env.VITE_API_URL}/api/gallery/${editId}` : '${import.meta.env.VITE_API_URL}/api/gallery';
      const method = isEditing ? 'PUT' : 'POST';

      const payload = new FormData();
      Object.keys(formData).forEach(key => payload.append(key, formData[key]));
      if (mediaFile) payload.append('mediaFile', mediaFile);

      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: payload
      });
      if (res.ok) {
        showSuccess(isEditing ? 'Media updated successfully!' : 'Media added to gallery!');
        setIsModalOpen(false);
        fetchGallery();
        fetchStats();
      } else {
        const errData = await res.json();
        alert(`Error: ${errData.message}`);
      }
    } catch (err) {
      console.error(err);
      alert('Upload failed. Note: Upload limit is 50MB.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this media?')) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/gallery/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        showSuccess('Media deleted.');
        fetchGallery();
        fetchStats();
      }
    } catch (err) { console.error(err); }
  };

  const handleBulkAction = async (action, value = null) => {
    if (selectedIds.length === 0) return;
    if (action === 'delete' && !window.confirm(`Permanently delete ${selectedIds.length} items?`)) return;

    try {
      const res = await fetch('${import.meta.env.VITE_API_URL}/api/gallery/bulk', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ids: selectedIds, action, value })
      });
      if (res.ok) {
        showSuccess(`Bulk ${action} applied successfully!`);
        fetchGallery();
        fetchStats();
      }
    } catch (err) { console.error(err); }
  };

  const formatBytes = (bytes) => {
    if (!bytes || bytes === 0) return '0 B';
    const k = 1024, dm = 2, sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-slate-800">Gallery Management</h2>
          <p className="text-slate-500 font-medium">Manage images, videos, and professional portfolios</p>
        </div>
        <button onClick={openAddModal} className="bg-primary hover:bg-primary-light text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md hover:shadow-lg">
          <Plus size={18} /> Add Media
        </button>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div onClick={() => { setFilterType('All'); setFilterStatus('All'); }} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 cursor-pointer hover:border-primary hover:shadow-md transition-all">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><LayoutGrid size={24} /></div>
          <div><p className="text-sm font-bold text-slate-500">Total Media</p><h3 className="text-xl font-black text-slate-800">{stats.totalMedia}</h3></div>
        </div>
        <div onClick={() => setFilterType('image')} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 cursor-pointer hover:border-primary hover:shadow-md transition-all">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><FileImage size={24} /></div>
          <div><p className="text-sm font-bold text-slate-500">Images</p><h3 className="text-xl font-black text-slate-800">{stats.totalImages}</h3></div>
        </div>
        <div onClick={() => setFilterType('all_videos')} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 cursor-pointer hover:border-primary hover:shadow-md transition-all">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl"><Video size={24} /></div>
          <div><p className="text-sm font-bold text-slate-500">Videos</p><h3 className="text-xl font-black text-slate-800">{stats.totalVideos}</h3></div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><CheckCircle2 size={24} /></div>
          <div><p className="text-sm font-bold text-slate-500">Featured</p><h3 className="text-xl font-black text-slate-800">{stats.featuredMedia}</h3></div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-slate-50 text-slate-600 rounded-xl"><HardDrive size={24} /></div>
          <div><p className="text-sm font-bold text-slate-500">Storage Used</p><h3 className="text-xl font-black text-slate-800">{formatBytes(stats.storageUsage)}</h3></div>
        </div>
      </div>

      {/* Filters & Bulk Actions Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">

        {/* Bulk Actions (Left) */}
        <div className="flex items-center gap-3">
          {selectedIds.length > 0 ? (
            <>
              <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-lg">{selectedIds.length} Selected</span>
              <button onClick={() => handleBulkAction('delete')} className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg tooltip" title="Delete Selected"><Trash2 size={18} /></button>
              <button onClick={() => handleBulkAction('hide')} className="p-2 text-slate-600 hover:bg-slate-50 rounded-lg tooltip" title="Hide Selected"><EyeOff size={18} /></button>
              <button onClick={() => handleBulkAction('show')} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg tooltip" title="Show Selected"><Eye size={18} /></button>
              <select onChange={(e) => { if (e.target.value) handleBulkAction('category', e.target.value); e.target.value = ''; }} className="text-sm bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 outline-none">
                <option value="">Move Category...</option>
                <option value="Campus">Campus</option>
                <option value="Sports">Sports</option>
                <option value="Science">Science</option>
                <option value="Cultural">Cultural</option>
                <option value="Classroom">Classroom</option>
                <option value="Facilities">Facilities</option>
                <option value="Events">Events</option>
              </select>
            </>
          ) : (
            <span className="text-sm font-bold text-slate-400 px-2">Select items to perform bulk actions</span>
          )}
        </div>

        {/* Filters (Right) */}
        <div className="flex items-center gap-3 flex-wrap justify-end">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input type="text" placeholder="Search title..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary w-48" />
          </div>
          <select value={filterType} onChange={e => setFilterType(e.target.value)} className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-primary">
            <option value="All">All Types</option>
            <option value="image">Images</option>
            <option value="all_videos">All Videos</option>
            <option value="video">MP4 Videos Only</option>
            <option value="youtube">YouTube Links Only</option>
          </select>
          <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-primary">
            <option value="All">All Categories</option>
            <option value="Campus">Campus</option>
            <option value="Sports">Sports</option>
            <option value="Science">Science</option>
            <option value="Cultural">Cultural</option>
            <option value="Classroom">Classroom</option>
            <option value="Facilities">Facilities</option>
            <option value="Events">Events</option>
          </select>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-primary">
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Hidden">Hidden</option>
          </select>
        </div>
      </div>

      {/* Table Listing */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-bold border-b border-slate-200">
                <th className="p-4 w-12">
                  <button onClick={() => setSelectedIds(selectedIds.length === gallery.length && gallery.length > 0 ? [] : gallery.map(g => g._id))} className="text-slate-400 hover:text-primary">
                    {selectedIds.length === gallery.length && gallery.length > 0 ? <CheckSquare size={18} /> : <Square size={18} />}
                  </button>
                </th>
                <th className="p-4 w-24">Preview</th>
                <th className="p-4">Title & Details</th>
                <th className="p-4">Type</th>
                <th className="p-4">Category</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr><td colSpan="8" className="p-8 text-center text-slate-500 font-bold">Loading gallery...</td></tr>
              ) : gallery.length === 0 ? (
                <tr><td colSpan="8" className="p-12 text-center text-slate-500"><ImageIcon size={48} className="mx-auto text-slate-300 mb-3" /><p>No media found matching criteria.</p></td></tr>
              ) : (
                gallery.map(item => {
                  const isSelected = selectedIds.includes(item._id);
                  return (
                    <tr key={item._id} className={`hover:bg-slate-50 transition-colors ${isSelected ? 'bg-primary/5' : ''}`}>
                      <td className="p-4">
                        <button onClick={() => setSelectedIds(isSelected ? selectedIds.filter(id => id !== item._id) : [...selectedIds, item._id])} className={`hover:text-primary ${isSelected ? 'text-primary' : 'text-slate-300'}`}>
                          {isSelected ? <CheckSquare size={18} /> : <Square size={18} />}
                        </button>
                      </td>
                      <td className="p-4">
                        <div className="w-20 h-14 rounded-lg overflow-hidden bg-slate-100 relative border border-slate-200 flex-shrink-0">
                          {item.type === 'youtube' ? (
                            <img src={item.imageUrl || `https://img.youtube.com/vi/${item.videoUrl?.split('v=')[1]?.split('&')[0]}/default.jpg`} alt="YT Thumb" className="w-full h-full object-cover" onError={(e) => e.target.src = 'https://via.placeholder.com/80x56?text=YT'} />
                          ) : item.type === 'video' ? (
                            <div className="w-full h-full flex items-center justify-center bg-slate-800 text-white"><PlayCircle size={20} /></div>
                          ) : (
                            <img src={item.imageUrl?.startsWith('/') ? `${import.meta.env.VITE_API_URL}${item.imageUrl}` : item.imageUrl} alt="Thumbnail" className="w-full h-full object-cover" onError={(e) => e.target.src = 'https://via.placeholder.com/80x56'} />
                          )}
                          {item.isFeatured && <div className="absolute top-0 right-0 bg-amber-400 text-white p-0.5 rounded-bl-lg"><CheckCircle2 size={10} /></div>}
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="font-bold text-slate-800 text-sm line-clamp-1">{item.title}</p>
                        <p className="text-xs text-slate-500 line-clamp-1">{item.description || 'No description'}</p>
                      </td>
                      <td className="p-4">
                        <span className="flex items-center gap-1 text-xs font-bold text-slate-600">
                          {item.type === 'image' && <ImageIcon size={14} className="text-emerald-500" />}
                          {item.type === 'video' && <Video size={14} className="text-purple-500" />}
                          {item.type === 'youtube' && <Film size={14} className="text-red-500" />}
                          {item.type?.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded-md">{item.category}</span>
                      </td>
                      <td className="p-4">
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${item.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                          {item.status || 'Active'}
                        </span>
                      </td>
                      <td className="p-4 text-xs font-bold text-slate-500 whitespace-nowrap">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => openEditModal(item)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit2 size={16} /></button>
                          <button onClick={() => handleDelete(item._id)} className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-lg font-black text-slate-800">{isEditing ? 'Edit Media Details' : 'Add New Media'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold">&times; Close</button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              <form id="mediaForm" onSubmit={handleSubmit} className="space-y-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Col: Basic Info */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Title *</label>
                      <input required type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-primary" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Description</label>
                      <textarea rows="3" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-primary" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Category</label>
                        <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-primary">
                          <option value="Campus">Campus</option>
                          <option value="Sports">Sports</option>
                          <option value="Science">Science</option>
                          <option value="Cultural">Cultural</option>
                          <option value="Classroom">Classroom</option>
                          <option value="Facilities">Facilities</option>
                          <option value="Events">Events</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Status</label>
                        <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-primary">
                          <option value="Active">Active</option>
                          <option value="Hidden">Hidden</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Right Col: Media Upload & SEO */}
                  <div className="space-y-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Media Type</label>
                      <select value={formData.type} onChange={e => { setFormData({ ...formData, type: e.target.value }); setMediaFile(null); setPreviewUrl(''); }} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-primary">
                        <option value="image">Image Upload (JPG, PNG, WEBP)</option>
                        <option value="video">Video Upload (MP4)</option>
                        <option value="youtube">YouTube Link Embed</option>
                      </select>
                    </div>

                    {formData.type === 'youtube' ? (
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">YouTube URL</label>
                        <input type="url" placeholder="https://youtube.com/watch?v=..." value={formData.videoUrl} onChange={e => setFormData({ ...formData, videoUrl: e.target.value })} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-primary" />
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1 mt-3">Custom Thumbnail URL (Optional)</label>
                        <input type="url" placeholder="If empty, YouTube default used" value={formData.imageUrl} onChange={e => setFormData({ ...formData, imageUrl: e.target.value })} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-primary" />
                      </div>
                    ) : (
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">File Upload (Max 50MB)</label>
                        <input type="file" accept={formData.type === 'image' ? 'image/jpeg, image/png, image/webp' : 'video/mp4'} onChange={handleFileChange} className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-light" />
                        {previewUrl && formData.type === 'image' && (
                          <img src={previewUrl.startsWith('/') ? `${import.meta.env.VITE_API_URL}${previewUrl}` : previewUrl} alt="Preview" className="mt-3 h-24 object-cover rounded-xl border border-slate-200" />
                        )}
                        {previewUrl && formData.type === 'video' && (
                          <video src={previewUrl.startsWith('/') ? `${import.meta.env.VITE_API_URL}${previewUrl}` : previewUrl} className="mt-3 h-24 rounded-xl border border-slate-200" controls />
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Advanced Section: SEO & Featured */}
                <div className="pt-4 border-t border-slate-100">
                  <h4 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2"><Filter size={16} /> Advanced Settings (SEO & Placement)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">SEO Title</label>
                      <input type="text" value={formData.seoTitle} onChange={e => setFormData({ ...formData, seoTitle: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 outline-none focus:border-primary text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Alt Text</label>
                      <input type="text" value={formData.altText} onChange={e => setFormData({ ...formData, altText: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 outline-none focus:border-primary text-sm" />
                    </div>
                    <div className="flex items-end pb-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={formData.isFeatured} onChange={e => setFormData({ ...formData, isFeatured: e.target.checked })} className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary" />
                        <span className="text-sm font-bold text-slate-700">Mark as Featured</span>
                      </label>
                    </div>
                    <div className="md:col-span-3">
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Meta Description</label>
                      <input type="text" value={formData.metaDescription} onChange={e => setFormData({ ...formData, metaDescription: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 outline-none focus:border-primary text-sm" />
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 rounded-xl font-bold text-slate-600 hover:bg-slate-200 transition-colors">Cancel</button>
              <button type="submit" form="mediaForm" className="bg-primary hover:bg-primary-light text-white px-8 py-2.5 rounded-xl font-bold transition-colors shadow-md">
                {isEditing ? 'Save Changes' : 'Upload Media'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Calendar, MapPin, Clock, Edit2 } from 'lucide-react';

export default function EventsTab({ token, showSuccess }) {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    title: '', description: '', start: '', end: '', venue: '', type: 'Event'
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/events`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setEvents(await res.json());
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
      const url = isEditing ? `${import.meta.env.VITE_API_URL}/api/events/${editId}` : `${import.meta.env.VITE_API_URL}/api/events`;
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
        showSuccess(isEditing ? 'Event updated successfully!' : 'Event added successfully!');
        setIsAdding(false);
        setIsEditing(false);
        setEditId(null);
        setFormData({ title: '', description: '', start: '', end: '', venue: '', type: 'Event' });
        fetchEvents();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const openEditForm = (event) => {
    const formatDateTime = (dateStr) => {
      if (!dateStr) return '';
      const d = new Date(dateStr);
      const pad = (n) => n.toString().padStart(2, '0');
      return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
    };

    setFormData({
      title: event.title,
      description: event.description || '',
      start: formatDateTime(event.start),
      end: formatDateTime(event.end),
      venue: event.venue || '',
      type: event.type
    });
    setEditId(event._id);
    setIsEditing(true);
    setIsAdding(true);
    const mainArea = document.querySelector('main');
    if (mainArea) mainArea.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/events/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        showSuccess('Event deleted.');
        fetchEvents();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-slate-800">Events</h2>
          <p className="text-slate-500 font-medium">Manage school calendar and upcoming events</p>
        </div>
        <button
          onClick={() => {
            if (isAdding) {
              setIsAdding(false);
              setIsEditing(false);
              setEditId(null);
              setFormData({ title: '', description: '', start: '', end: '', venue: '', type: 'Event' });
            } else {
              setIsAdding(true);
            }
          }}
          className="bg-primary hover:bg-primary-light text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-colors"
        >
          {isAdding ? 'Cancel' : <><Plus size={18} /> New Event</>}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Event Title</label>
              <input required type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" placeholder="e.g. Annual Sports Day" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Event Type</label>
              <select value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20">
                <option>Event</option>
                <option>Holiday</option>
                <option>Exam</option>
                <option>Meeting</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Start Date & Time</label>
              <input required type="datetime-local" value={formData.start} onChange={e => setFormData({ ...formData, start: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">End Date & Time (Optional)</label>
              <input type="datetime-local" value={formData.end} onChange={e => setFormData({ ...formData, end: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Venue (Optional)</label>
              <input type="text" value={formData.venue} onChange={e => setFormData({ ...formData, venue: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" placeholder="e.g. Main Auditorium" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Description (Optional)</label>
              <textarea rows="3" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" placeholder="Event details..."></textarea>
            </div>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-secondary hover:bg-secondary-dark text-white px-6 py-2 rounded-xl font-bold transition-colors">
              {isEditing ? 'Save Changes' : 'Save Event'}
            </button>
          </div>
        </form>
      )}

      {isLoading ? (
        <div className="text-center py-12 text-slate-400 font-bold">Loading events...</div>
      ) : events.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm">
          <Calendar size={48} className="mx-auto text-slate-300 mb-4" />
          <h3 className="text-lg font-bold text-slate-800">No events found</h3>
          <p className="text-slate-500">Add an event to populate the school calendar.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="divide-y divide-slate-100">
            {events.map((event) => (
              <div key={event._id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-lg">{event.title}</h4>
                    <div className="flex flex-wrap gap-4 mt-1 text-xs font-medium text-slate-500">
                      <span className="flex items-center gap-1"><Clock size={14} /> {new Date(event.start).toLocaleString()}</span>
                      {event.venue && <span className="flex items-center gap-1"><MapPin size={14} /> {event.venue}</span>}
                      <span className="bg-slate-100 px-2 py-0.5 rounded text-[10px] uppercase font-bold">{event.type}</span>
                    </div>
                    {event.description && <p className="text-sm text-slate-600 mt-2 line-clamp-2">{event.description}</p>}
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => openEditForm(event)} className="text-blue-500 hover:text-blue-600 p-2 rounded-lg hover:bg-blue-50 transition-colors">
                    <Edit2 size={20} />
                  </button>
                  <button onClick={() => handleDelete(event._id)} className="text-rose-500 hover:text-rose-600 p-2 rounded-lg hover:bg-rose-50 transition-colors">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

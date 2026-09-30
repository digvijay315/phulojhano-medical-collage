import { useState, useEffect } from 'react';
import api from '../api';
import { Loader2, Trash2, Edit2, CalendarPlus, CalendarDays } from 'lucide-react';

export default function AcademicCalendar() {
  const [formData, setFormData] = useState({
    title: '',
    startDate: '',
    endDate: '',
    type: 'Academic',
    description: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  const [items, setItems] = useState([]);
  const [fetching, setFetching] = useState(false);
  
  const [editingId, setEditingId] = useState(null);

  const fetchItems = async () => {
    setFetching(true);
    try {
      const res = await api.get('/academic-events');
      if (res.data.success) {
        setItems(res.data.items);
      }
    } catch (error) {
      console.error("Failed to fetch events", error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.startDate) {
      setMessage('Title and Start Date are required.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      if (editingId) {
        await api.put(`/academic-events/${editingId}`, formData);
        setMessage('Event updated successfully!');
      } else {
        await api.post('/academic-events', formData);
        setMessage('Event added to calendar successfully!');
      }

      setFormData({ title: '', startDate: '', endDate: '', type: 'Academic', description: '' });
      setEditingId(null);
      fetchItems();
      
    } catch (error) {
      console.error(error);
      setMessage('Failed to process request.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await api.delete(`/academic-events/${id}`);
      fetchItems();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setFormData({
      title: item.title,
      startDate: item.startDate.split('T')[0],
      endDate: item.endDate ? item.endDate.split('T')[0] : '',
      type: item.type,
      description: item.description || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ title: '', startDate: '', endDate: '', type: 'Academic', description: '' });
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'Exam': return 'bg-red-100 text-red-700';
      case 'Holiday': return 'bg-green-100 text-green-700';
      case 'Academic': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-10">
      <div>
        <h1 className="text-3xl font-bold font-serif">Academic Calendar</h1>
        <p className="text-muted-foreground mt-1">Manage events, holidays, and exams for the academic year.</p>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-6 text-primary border-b pb-2">{editingId ? 'Edit Event' : 'Add New Event'}</h2>
        
        {message && (
          <div className={`p-4 mb-6 rounded-md ${message.includes('success') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-1 md:col-span-2">
              <label className="text-sm font-medium text-gray-700">Event Title <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder="e.g. 1st Internal Assessment"
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Start Date <span className="text-red-500">*</span></label>
              <input 
                type="date" 
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">End Date (Optional)</label>
              <input 
                type="date" 
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
            </div>

            <div className="space-y-1 md:col-span-2">
              <label className="text-sm font-medium text-gray-700">Event Type</label>
              <select 
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white"
              >
                <option value="Academic">Academic (Classes, Seminars, etc.)</option>
                <option value="Exam">Exam / Assessment</option>
                <option value="Holiday">Holiday / Vacation</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="space-y-1 md:col-span-2">
              <label className="text-sm font-medium text-gray-700">Description (Optional)</label>
              <textarea 
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
                placeholder="Add any extra details about this event..."
              />
            </div>
          </div>

          <div className="flex gap-4 pt-2">
            <button 
              type="submit" 
              disabled={loading}
              className="flex-1 flex justify-center items-center gap-2 bg-primary text-primary-foreground py-2.5 px-4 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-70"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <CalendarPlus size={20} />}
              {loading ? 'Saving...' : (editingId ? 'Update Event' : 'Add to Calendar')}
            </button>
            {editingId && (
              <button 
                type="button"
                onClick={cancelEdit}
                className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div>
        <div className="flex items-center gap-3 border-b pb-2 mb-4">
          <CalendarDays className="text-gray-800" size={24} />
          <h2 className="text-xl font-bold text-gray-800">Upcoming & Past Events</h2>
        </div>
        
        {fetching ? (
          <div className="flex justify-center p-10"><Loader2 className="animate-spin text-primary w-8 h-8" /></div>
        ) : items.length === 0 ? (
          <div className="text-center p-10 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-200">No events added to the calendar yet.</div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-gray-600 text-sm">
                  <th className="p-4 font-medium">Event Details</th>
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium">Type</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="p-4">
                      <p className="font-bold text-gray-800">{item.title}</p>
                      {item.description && <p className="text-sm text-gray-500 mt-1 line-clamp-1">{item.description}</p>}
                    </td>
                    <td className="p-4 text-sm text-gray-700 font-medium">
                      {new Date(item.startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      {item.endDate && ` - ${new Date(item.endDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`}
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getTypeColor(item.type)}`}>
                        {item.type}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleEdit(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit2 size={18} /></button>
                        <button onClick={() => handleDelete(item._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import api from '../api';
import { Loader2, Trash2, Edit2, Bell, FileText, Upload } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useConfirm } from '../context/ConfirmContext';

export default function ManageNotices() {
  const [deletingId, setDeletingId] = useState(null);
  const [items, setItems] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [file, setFile] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'General',
    date: new Date().toISOString().split('T')[0],
    isNewFlash: false
  });

  const { addToast } = useToast();
  const { confirm } = useConfirm();

  const fetchItems = async () => {
    setFetching(true);
    try {
      const res = await api.get('/notices');
      if (res.data.success) {
        setItems(res.data.items);
      }
    } catch (error) {
      console.error(error);
      addToast('Failed to fetch notices', 'error');
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title) {
      addToast('Title is required', 'warning');
      return;
    }
    
    setLoading(true);
    try {
      let pdfUrl = null;
      if (file) {
        const uploadData = new FormData();
        uploadData.append('files', file);
        const uploadRes = await api.post('/upload/upload-files', uploadData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        if (uploadRes.data.success) {
          pdfUrl = uploadRes.data.urls[0];
        }
      }

      const payload = { ...formData };
      if (pdfUrl) payload.pdfUrl = pdfUrl;

      if (editingId) {
        await api.put(`/notices/${editingId}`, payload);
        addToast('Notice updated successfully', 'success');
      } else {
        await api.post('/notices', payload);
        addToast('Notice published successfully', 'success');
      }

      cancelEdit();
      fetchItems();
    } catch (error) {
      console.error(error);
      addToast('Failed to save notice', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setFormData({
      title: item.title,
      description: item.description || '',
      category: item.category,
      date: new Date(item.date).toISOString().split('T')[0],
      isNewFlash: item.isNewFlash || false
    });
    setFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    const isConfirmed = await confirm("Delete Notice", "Are you sure you want to delete this notice? This action is irreversible.");
    if (!isConfirmed) return;
    setDeletingId(id);
    try {
      await api.delete(`/notices/${id}`);
      addToast('Notice deleted successfully', 'success');
      fetchItems();
      setDeletingId(null);
    } catch (error) {
      setDeletingId(null);
      console.error(error);
      addToast('Failed to delete', 'error');
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ title: '', description: '', category: 'General', date: new Date().toISOString().split('T')[0], isNewFlash: false });
    setFile(null);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-10">
      <div>
        <h1 className="text-3xl font-bold font-serif flex items-center gap-3">
          <Bell className="w-8 h-8 text-primary" />
          Manage Notices
        </h1>
        <p className="text-muted-foreground mt-1">Publish general announcements, recruitment drives, or stipends.</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold mb-4 text-primary border-b pb-2">{editingId ? 'Edit Notice' : 'Publish New Notice'}</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1 md:col-span-2">
            <label className="text-sm font-medium text-gray-700">Notice Title</label>
            <input 
              type="text" 
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white"
            >
              <option value="General">General</option>
              <option value="Announcements">Announcements</option>
              <option value="Recruitment">Recruitment</option>
              <option value="Stipends">Stipends</option>
              <option value="Admissions">Admissions</option>
              <option value="Tenders">Tenders</option>
              <option value="Examinations">Examinations</option>
              <option value="Events">Events</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Date</label>
            <input 
              type="date" 
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Show "New" Flash</label>
            <div className="flex items-center mt-2">
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  name="isNewFlash"
                  checked={formData.isNewFlash}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                <span className="ml-3 text-sm font-medium text-gray-700">{formData.isNewFlash ? 'Yes (Flash)' : 'No Flash'}</span>
              </label>
            </div>
          </div>
          <div className="space-y-1 md:col-span-2">
            <label className="text-sm font-medium text-gray-700">Description (Optional)</label>
            <textarea 
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
            ></textarea>
          </div>
          <div className="space-y-1 md:col-span-2">
            <label className="text-sm font-medium text-gray-700">Attachment (Optional PDF)</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-primary transition-colors bg-gray-50">
              <div className="space-y-1 text-center">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600 justify-center">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary/80 focus-within:outline-none px-2 py-1">
                    <span>{file ? file.name : 'Click to upload PDF'}</span>
                    <input type="file" className="sr-only" accept=".pdf" onChange={handleFileChange} />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-4 md:col-span-2 pt-2">
            <button 
              type="submit" 
              disabled={loading}
              className="flex-1 flex justify-center items-center gap-2 bg-primary text-primary-foreground py-2.5 px-4 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-70 font-medium"
            >
              {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <Upload className="w-5 h-5" />}
              {loading ? 'Publishing...' : (editingId ? 'Update Notice' : 'Publish Notice')}
            </button>
            {editingId && (
              <button 
                type="button"
                onClick={cancelEdit}
                className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Notice Board</h2>
        {fetching ? (
          <div className="flex justify-center p-10"><Loader2 className="animate-spin text-primary w-8 h-8" /></div>
        ) : items.length === 0 ? (
          <div className="text-center p-10 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-200">No notices published yet.</div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="p-4 font-medium text-gray-600">Date</th>
                  <th className="p-4 font-medium text-gray-600">Title & Category</th>
                  <th className="p-4 font-medium text-gray-600">Attachment</th>
                  <th className="p-4 font-medium text-gray-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {items.map(item => (
                  <tr key={item._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 whitespace-nowrap text-sm text-gray-500 font-medium">
                      {new Date(item.date).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-gray-900 flex items-center gap-2">
                        {item.title}
                        {item.isNewFlash && <span className="px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-bold rounded-full animate-pulse">NEW</span>}
                      </div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-primary mt-1">{item.category}</div>
                      {item.description && <div className="text-sm text-gray-500 mt-1 line-clamp-1">{item.description}</div>}
                    </td>
                    <td className="p-4">
                      {item.pdfUrl ? (
                        <a href={item.pdfUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                          <FileText size={16} /> View PDF
                        </a>
                      ) : (
                        <span className="text-sm text-gray-400">None</span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleEdit(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit2 size={18} /></button>
                        <button onClick={() => handleDelete(item._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">{deletingId === item._id ? <Loader2 className="animate-spin" size={18} /> : <Trash2 size={18} />}</button>
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

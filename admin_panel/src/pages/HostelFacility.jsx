import { useState, useEffect } from 'react';
import api from '../api';
import { Upload, Loader2, Trash2, Edit2 } from 'lucide-react';

export default function HostelFacility() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [fetching, setFetching] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const category = 'hostel';

  const fetchItems = async (currentPage) => {
    setFetching(true);
    try {
      const res = await api.get(`/facilities?category=${category}&page=${currentPage}&limit=10`);
      if (res.data.success) {
        setItems(res.data.items);
        setPage(res.data.currentPage);
      }
    } catch (error) { console.error(error); } finally { setFetching(false); }
  };

  useEffect(() => { fetchItems(page); }, [page]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) { setMessage('Please provide title and description.'); return; }
    setLoading(true); setMessage('');

    try {
      let imageUrl = null;
      if (file) {
        const uploadData = new FormData(); uploadData.append('files', file);
        const uploadRes = await api.post('/upload/upload-files', uploadData, { headers: { 'Content-Type': 'multipart/form-data' } });
        if (uploadRes.data.success) imageUrl = uploadRes.data.urls[0];
      }

      if (editingId) {
        const payload = { title, description }; if (imageUrl) payload.imageUrl = imageUrl;
        await api.put(`/facilities/${editingId}`, payload);
      } else {
        await api.post('/facilities', { title, description, imageUrl, category });
      }

      setTitle(''); setDescription(''); setFile(null); setEditingId(null); fetchItems(page);
      setMessage('Success!');
    } catch (error) { setMessage('Failed.'); } finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete?")) return;
    await api.delete(`/facilities/${id}`); fetchItems(page);
  };

  const handleEdit = (item) => {
    setEditingId(item._id); setTitle(item.title); setDescription(item.description); setFile(null); window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-10">
      <div>
        <h1 className="text-3xl font-bold font-serif">Hostel Facility</h1>
        <p className="text-muted-foreground mt-1">Manage hostel information blocks.</p>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-6 text-primary border-b pb-2">{editingId ? 'Edit Block' : 'Add Block'}</h2>
        {message && <div className="p-4 mb-6 rounded-md bg-green-50 text-green-700">{message}</div>}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Title / Block Name</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-2 border rounded-lg" placeholder="e.g. Boys Hostel Block A" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-4 py-2 border rounded-lg" rows="4" placeholder="Details..."></textarea>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image (Optional)</label>
            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} className="w-full" />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-primary text-white py-2 rounded-lg">{loading ? 'Saving...' : 'Save'}</button>
        </form>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Hostel Blocks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map(item => (
            <div key={item._id} className="bg-white rounded-xl shadow-sm border p-4 flex flex-col">
              {item.imageUrl && <img src={item.imageUrl} alt={item.title} className="w-full h-40 object-cover rounded-md mb-4" />}
              <h3 className="font-bold text-lg">{item.title}</h3>
              <p className="text-gray-600 text-sm mt-2 flex-1">{item.description}</p>
              <div className="flex justify-end gap-3 mt-4 pt-4 border-t">
                <button onClick={() => handleEdit(item)} className="text-blue-600 flex items-center gap-1"><Edit2 size={16}/> Edit</button>
                <button onClick={() => handleDelete(item._id)} className="text-red-600 flex items-center gap-1"><Trash2 size={16}/> Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

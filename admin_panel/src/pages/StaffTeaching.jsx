import { useState, useEffect } from 'react';
import api from '../api';
import { Upload, Loader2, Trash2, Edit2, Image as ImageIcon } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useConfirm } from '../context/ConfirmContext';

export default function StaffTeaching() {
  const [formData, setFormData] = useState({
    name: '',
    post: '',
    department: ''
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [fetching, setFetching] = useState(false);
  
  const [editingId, setEditingId] = useState(null);
  const staffType = 'teaching';
  
  const { addToast } = useToast();
  const { confirm } = useConfirm();

  const fetchItems = async (currentPage) => {
    setFetching(true);
    try {
      const res = await api.get(`/staff?type=${staffType}&page=${currentPage}&limit=12`);
      if (res.data.success) {
        setItems(res.data.items);
        setTotalPages(res.data.totalPages);
        setPage(res.data.currentPage);
      }
    } catch (error) {
      console.error("Failed to fetch staff", error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchItems(page);
  }, [page]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.post || !formData.department) {
      addToast('Name, Post, and Department are required fields.', 'error');
      return;
    }

    setLoading(true);

    try {
      let imageUrl = null;
      
      if (file) {
        const uploadData = new FormData();
        uploadData.append('files', file);

        const uploadRes = await api.post('/upload/upload-files', uploadData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        if (uploadRes.data.success) {
          imageUrl = uploadRes.data.urls[0];
        } else {
          throw new Error('Upload failed');
        }
      }

      const payload = { ...formData, type: staffType };
      if (imageUrl) payload.imageUrl = imageUrl;

      if (editingId) {
        await api.put(`/staff/${editingId}`, payload);
        addToast('Staff profile updated successfully!', 'success');
      } else {
        await api.post('/staff', payload);
        addToast('Staff profile added successfully!', 'success');
      }

      setFormData({ name: '', post: '', department: '' });
      setFile(null);
      setEditingId(null);
      fetchItems(page);
      
    } catch (error) {
      console.error(error);
      addToast('Failed to process request.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const isConfirmed = await confirm(
      "Delete Staff Member",
      "Are you sure you want to remove this staff member? This action cannot be undone."
    );
    
    if (!isConfirmed) return;
    
    try {
      await api.delete(`/staff/${id}`);
      addToast('Staff member deleted successfully.', 'success');
      fetchItems(page);
    } catch (error) {
      console.error("Delete failed", error);
      addToast('Failed to delete staff member.', 'error');
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setFormData({
      name: item.name,
      post: item.post,
      department: item.department
    });
    setFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ name: '', post: '', department: '' });
    setFile(null);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-10">
      <div>
        <h1 className="text-3xl font-bold font-serif">Teaching Staff</h1>
        <p className="text-muted-foreground mt-1">Manage profiles of professors, doctors, and academic instructors.</p>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-6 text-primary border-b pb-2">{editingId ? 'Edit Profile' : 'Add New Member'}</h2>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-1 md:col-span-2">
              <label className="text-sm font-medium text-gray-700">Full Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder="e.g. Dr. Rajesh Kumar"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Designation / Post</label>
              <input 
                type="text" 
                name="post"
                value={formData.post}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder="e.g. Professor & HOD"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Department</label>
              <input 
                type="text" 
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder="e.g. Anatomy"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Profile Photo (Optional)</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-primary transition-colors bg-gray-50">
              <div className="space-y-1 text-center">
                <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600 justify-center">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary/80 focus-within:outline-none">
                    <span>{file ? file.name : 'Click to browse image'}</span>
                    <input type="file" className="sr-only" accept="image/*" onChange={handleFileChange} />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              type="submit" 
              disabled={loading}
              className="flex-1 flex justify-center items-center gap-2 bg-primary text-primary-foreground py-2.5 px-4 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-70"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Upload size={20} />}
              {loading ? 'Saving...' : (editingId ? 'Update Profile' : 'Save Profile')}
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
        <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Teaching Staff Directory</h2>
        
        {fetching ? (
          <div className="flex justify-center p-10"><Loader2 className="animate-spin text-primary w-8 h-8" /></div>
        ) : items.length === 0 ? (
          <div className="text-center p-10 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-200">No staff members found.</div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="p-4 font-medium text-gray-600">Photo</th>
                  <th className="p-4 font-medium text-gray-600">Name</th>
                  <th className="p-4 font-medium text-gray-600">Designation</th>
                  <th className="p-4 font-medium text-gray-600">Department</th>
                  <th className="p-4 font-medium text-gray-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {items.map(item => (
                  <tr key={item._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4">
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.name} className="w-12 h-12 rounded-full object-cover border border-gray-200" />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 text-primary font-bold text-lg">
                          {item.name ? item.name.charAt(0).toUpperCase() : '?'}
                        </div>
                      )}
                    </td>
                    <td className="p-4 font-medium text-gray-800">{item.name}</td>
                    <td className="p-4 text-primary">{item.post}</td>
                    <td className="p-4 text-gray-600">{item.department}</td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleEdit(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit"><Edit2 size={18} /></button>
                        <button onClick={() => handleDelete(item._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {!fetching && totalPages > 1 && (
          <div className="flex items-center justify-between mt-6 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <span className="text-sm text-gray-600">
              Page <span className="font-medium text-gray-900">{page}</span> of <span className="font-medium text-gray-900">{totalPages}</span>
            </span>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <div className="flex gap-1 hidden sm:flex">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                      page === p 
                        ? 'bg-primary text-primary-foreground' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
              <button 
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { useToast } from '../context/ToastContext';
import { useConfirm } from '../context/ConfirmContext';
import api from '../api';
import { Upload, X, Loader2, Trash2, Edit2, ChevronLeft, ChevronRight, FileText, Download } from 'lucide-react';

export default function Tenders() {
  const [deletingId, setDeletingId] = useState(null);
  const { addToast } = useToast();
  const { confirm } = useConfirm();

  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    startDate: '',
    endDate: '',
    isNewFlash: false
  });
  const [file, setFile] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [fetching, setFetching] = useState(false);
  
  const [editingId, setEditingId] = useState(null);

  const fetchItems = async (currentPage) => {
    setFetching(true);
    try {
      const res = await api.get(`/tenders?page=${currentPage}&limit=5`);
      if (res.data.success) {
        setItems(res.data.items);
        setTotalPages(res.data.totalPages);
        setPage(res.data.currentPage);
      }
    } catch (error) {
      console.error("Failed to fetch tenders", error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchItems(page);
  }, [page]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.subject || !formData.startDate || !formData.endDate) {
      setMessage('Please fill in all text fields.');
      return;
    }
    if (!editingId && !file) {
      setMessage('Please upload a PDF document.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      let pdfUrl = null;
      
      // Upload file if selected
      if (file) {
        const uploadData = new FormData();
        uploadData.append('files', file);

        const uploadRes = await api.post('/upload/upload-files', uploadData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        if (uploadRes.data.success) {
          pdfUrl = uploadRes.data.urls[0];
        } else {
          throw new Error('Upload failed');
        }
      }

      if (editingId) {
        // Edit existing item
        const payload = { ...formData };
        if (pdfUrl) payload.pdfUrl = pdfUrl;
        await api.put(`/tenders/${editingId}`, payload);
        setMessage('Tender updated successfully!');
      } else {
        // Create new item
        await api.post('/tenders', { ...formData, pdfUrl });
        setMessage('Tender published successfully!');
      }

      // Reset form
      setFormData({ name: '', subject: '', startDate: '', endDate: '', isNewFlash: false });
      setFile(null);
      setEditingId(null);
      
      // Refresh list
      fetchItems(page);
      
    } catch (error) {
      console.error(error);
      setMessage('Failed to process request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const isConfirmed = await confirm('Confirm Delete', 'Are you sure you want to delete this tender?');
    if (!isConfirmed) return;
    setDeletingId(id);
    try {
      await api.delete(`/tenders/${id}`);
      addToast('Deleted successfully', 'success');
      fetchItems(page);
      setDeletingId(null);
    } catch (error) {
      setDeletingId(null);
      console.error("Delete failed", error);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setFormData({
      name: item.name,
      subject: item.subject,
      startDate: item.startDate.split('T')[0], // format for date input
      endDate: item.endDate.split('T')[0],
      isNewFlash: item.isNewFlash || false
    });
    setFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ name: '', subject: '', startDate: '', endDate: '', isNewFlash: false });
    setFile(null);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-10">
      {/* Standard Header */}
      <div>
        <h1 className="text-3xl font-bold font-serif">Tenders</h1>
        <p className="text-muted-foreground mt-1">Manage and publish official tenders and notices.</p>
      </div>

      {/* Upload Form */}
      <div>
        <h2 className="text-xl font-bold mb-6 text-primary border-b pb-2">{editingId ? 'Edit Tender' : 'Publish New Tender'}</h2>
        
        {message && (
          <div className={`p-4 mb-6 rounded-md ${message.includes('success') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Tender Name / Reference</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder="e.g. NIT-01/2026"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Subject</label>
              <input 
                type="text" 
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder="e.g. Supply of Medical Equipment"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Start Date</label>
              <input 
                type="date" 
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">End Date</label>
              <input 
                type="date" 
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
              <input 
                type="checkbox" 
                name="isNewFlash"
                checked={formData.isNewFlash}
                onChange={handleChange}
                className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4"
              />
              Show "NEW" flashing badge next to this tender
            </label>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload PDF Document {editingId && '(Leave blank to keep existing)'}</label>
            
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-primary transition-colors bg-gray-50">
              <div className="space-y-1 text-center">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600 justify-center">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary/80 focus-within:outline-none">
                    <span>{file ? file.name : 'Click to browse PDF'}</span>
                    <input type="file" className="sr-only" accept=".pdf" onChange={handleFileChange} />
                  </label>
                </div>
                {!file && <p className="text-xs text-gray-500">PDF up to 20MB</p>}
              </div>
            </div>
            {file && (
               <button 
                 type="button" 
                 onClick={() => setFile(null)}
                 className="text-xs text-red-500 mt-2 font-medium hover:underline"
               >
                 Remove selected file
               </button>
            )}
          </div>

          <div className="flex gap-4">
            <button 
              type="submit" 
              disabled={loading}
              className="flex-1 flex justify-center items-center gap-2 bg-primary text-primary-foreground py-2.5 px-4 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-70"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Upload size={20} />}
              {loading ? 'Saving...' : (editingId ? 'Update Tender' : 'Publish Tender')}
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

      {/* Tenders List */}
      <div>
        <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Active & Past Tenders</h2>
        
        {fetching ? (
          <div className="flex justify-center p-10"><Loader2 className="animate-spin text-primary w-8 h-8" /></div>
        ) : items.length === 0 ? (
          <div className="text-center p-10 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-200">No tenders published yet.</div>
        ) : (
          <>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-gray-600 text-sm">
                    <th className="p-4 font-medium">Tender Info</th>
                    <th className="p-4 font-medium">Dates</th>
                    <th className="p-4 font-medium">Document</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(item => (
                    <tr key={item._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="p-4">
                        <p className="font-bold text-gray-800 flex items-center gap-2">
                          {item.name}
                          {item.isNewFlash && <span className="px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-bold rounded-full animate-pulse">NEW</span>}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">{item.subject}</p>
                      </td>
                      <td className="p-4 text-sm text-gray-600">
                        <p><span className="font-medium">Start:</span> {new Date(item.startDate).toLocaleDateString()}</p>
                        <p className="mt-1"><span className="font-medium">End:</span> {new Date(item.endDate).toLocaleDateString()}</p>
                      </td>
                      <td className="p-4">
                        <a 
                          href={item.pdfUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          <Download size={16} /> View PDF
                        </a>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => handleEdit(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                            <Edit2 size={18} />
                          </button>
                          <button onClick={() => handleDelete(item._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                            {deletingId === item._id ? <Loader2 className="animate-spin" size={18} /> : <Trash2 size={18} />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-6">
                <button 
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="p-2 rounded-lg border border-gray-300 text-gray-600 disabled:opacity-50 hover:bg-gray-50 transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="text-sm font-medium text-gray-600">
                  Page {page} of {totalPages}
                </span>
                <button 
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="p-2 rounded-lg border border-gray-300 text-gray-600 disabled:opacity-50 hover:bg-gray-50 transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

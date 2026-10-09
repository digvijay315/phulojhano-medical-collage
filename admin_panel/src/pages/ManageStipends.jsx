import { useState, useEffect } from 'react';
import { useToast } from '../context/ToastContext';
import { useConfirm } from '../context/ConfirmContext';
import api from '../api';
import { Upload, Loader2, Trash2, Edit2, ChevronLeft, ChevronRight, FileText, Download, IndianRupee } from 'lucide-react';

export default function ManageStipends() {
  const [deletingId, setDeletingId] = useState(null);
  const { addToast } = useToast();
  const { confirm } = useConfirm();

  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [fetching, setFetching] = useState(false);
  
  const [editingId, setEditingId] = useState(null);
  const category = 'stipend';

  const fetchItems = async (currentPage) => {
    setFetching(true);
    try {
      const res = await api.get(`/documents?category=${category}&page=${currentPage}&limit=10`);
      if (res.data.success) {
        setItems(res.data.items);
        setTotalPages(res.data.totalPages);
        setPage(res.data.currentPage);
      }
    } catch (error) {
      console.error("Failed to fetch", error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchItems(page);
  }, [page]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      setMessage('Please provide a name/title for the stipend document.');
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
        const payload = { title };
        if (pdfUrl) payload.pdfUrl = pdfUrl;
        await api.put(`/documents/${editingId}`, payload);
        setMessage('Stipend record updated successfully!');
      } else {
        await api.post('/documents', { title, pdfUrl, category });
        setMessage('Stipend record published successfully!');
      }

      setTitle('');
      setFile(null);
      setEditingId(null);
      fetchItems(page);
      
    } catch (error) {
      console.error(error);
      setMessage('Failed to process request.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const isConfirmed = await confirm('Confirm Delete', 'Are you sure you want to delete this stipend record?');
    if (!isConfirmed) return;
    setDeletingId(id);
    try {
      await api.delete(`/documents/${id}`);
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
    setTitle(item.title);
    setFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-10">
      <div>
        <h1 className="text-3xl font-bold font-serif flex items-center gap-3">
          <IndianRupee className="w-8 h-8 text-primary" />
          Stipends
        </h1>
        <p className="text-muted-foreground mt-1">Manage and upload stipend details and records.</p>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-6 text-primary border-b pb-2">{editingId ? 'Edit Stipend Record' : 'Upload New Stipend'}</h2>
        
        {message && (
          <div className={`p-4 mb-6 rounded-md ${message.includes('success') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Stipend Name / Title</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              placeholder="e.g. Stipend Details for 2026"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload PDF Document {editingId && '(Leave blank to keep existing)'}</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-primary transition-colors bg-gray-50">
              <div className="space-y-1 text-center">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600 justify-center">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary/80 focus-within:outline-none">
                    <span>{file ? file.name : 'Click to browse PDF'}</span>
                    <input type="file" className="sr-only" accept=".pdf" onChange={(e) => setFile(e.target.files[0])} />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              type="submit" 
              disabled={loading}
              className="flex-1 flex justify-center items-center gap-2 bg-primary text-primary-foreground py-2.5 px-4 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-70 font-medium"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Upload size={20} />}
              {loading ? 'Saving...' : (editingId ? 'Update Record' : 'Upload Record')}
            </button>
            {editingId && (
              <button 
                type="button"
                onClick={() => { setEditingId(null); setTitle(''); setFile(null); }}
                className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Uploaded Stipend Records</h2>
        
        {fetching ? (
          <div className="flex justify-center p-10"><Loader2 className="animate-spin text-primary w-8 h-8" /></div>
        ) : items.length === 0 ? (
          <div className="text-center p-10 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-200">No stipend records uploaded yet.</div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-gray-600 text-sm">
                  <th className="p-4 font-medium">Stipend Title</th>
                  <th className="p-4 font-medium">Document</th>
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 font-bold text-gray-900">{item.title}</td>
                    <td className="p-4">
                      <a href={item.pdfUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                        <Download size={16} /> View PDF
                      </a>
                    </td>
                    <td className="p-4 text-sm text-gray-600 font-medium">{new Date(item.createdAt).toLocaleDateString()}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
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

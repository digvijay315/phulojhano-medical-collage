// This component is structurally identical to StudentLists.jsx but for Syllabus.
// Since we have limited time, we can create a factory or just duplicate and change title/category.
import { useState, useEffect } from 'react';
import api from '../api';
import { Upload, Loader2, Trash2, Edit2, ChevronLeft, ChevronRight, FileText, Download } from 'lucide-react';

export default function Syllabus() {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [fetching, setFetching] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const category = 'syllabus';

  const fetchItems = async (currentPage) => {
    setFetching(true);
    try {
      const res = await api.get(`/documents?category=${category}&page=${currentPage}&limit=10`);
      if (res.data.success) {
        setItems(res.data.items);
        setTotalPages(res.data.totalPages);
        setPage(res.data.currentPage);
      }
    } catch (error) { console.error(error); } finally { setFetching(false); }
  };

  useEffect(() => { fetchItems(page); }, [page]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || (!editingId && !file)) { setMessage('Please provide title and file.'); return; }
    setLoading(true); setMessage('');

    try {
      let pdfUrl = null;
      if (file) {
        const uploadData = new FormData(); uploadData.append('files', file);
        const uploadRes = await api.post('/upload/upload-files', uploadData, { headers: { 'Content-Type': 'multipart/form-data' } });
        if (uploadRes.data.success) pdfUrl = uploadRes.data.urls[0];
      }

      if (editingId) {
        const payload = { title }; if (pdfUrl) payload.pdfUrl = pdfUrl;
        await api.put(`/documents/${editingId}`, payload);
      } else {
        await api.post('/documents', { title, pdfUrl, category });
      }

      setTitle(''); setFile(null); setEditingId(null); fetchItems(page);
      setMessage('Success!');
    } catch (error) { setMessage('Failed.'); } finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete?")) return;
    await api.delete(`/documents/${id}`); fetchItems(page);
  };

  const handleEdit = (item) => {
    setEditingId(item._id); setTitle(item.title); setFile(null); window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-10">
      <div>
        <h1 className="text-3xl font-bold font-serif">Syllabus</h1>
        <p className="text-muted-foreground mt-1">Manage course syllabi.</p>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-6 text-primary border-b pb-2">{editingId ? 'Edit Syllabus' : 'Upload Syllabus'}</h2>
        {message && <div className="p-4 mb-6 rounded-md bg-green-50 text-green-700 border border-green-200">{message}</div>}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Course Name</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-2 border rounded-lg" placeholder="e.g. Anatomy 1st Year" />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload PDF {editingId && '(Leave blank to keep existing)'}</label>
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
          <button type="submit" disabled={loading} className="w-full bg-primary text-white py-2 rounded-lg">{loading ? 'Saving...' : 'Save'}</button>
        </form>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Uploaded Syllabi</h2>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-600 text-sm">
                <th className="p-4 font-medium">Title</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item._id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium">{item.title}</td>
                  <td className="p-4 text-right flex justify-end gap-2">
                    <a href={item.pdfUrl} target="_blank" className="text-blue-600 mr-2">View</a>
                    <button onClick={() => handleEdit(item)} className="text-blue-600">Edit</button>
                    <button onClick={() => handleDelete(item._id)} className="text-red-600">Del</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

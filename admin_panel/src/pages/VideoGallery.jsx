import { useState, useEffect } from 'react';
import { useToast } from '../context/ToastContext';
import { useConfirm } from '../context/ConfirmContext';
import api from '../api';
import { Upload, X, Loader2, Trash2, Edit2, ChevronLeft, ChevronRight, Video } from 'lucide-react';

export default function VideoGallery() {
  const [deletingId, setDeletingId] = useState(null);
  const { addToast } = useToast();
  const { confirm } = useConfirm();

  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [fetching, setFetching] = useState(false);
  
  const [editingId, setEditingId] = useState(null);

  const fetchItems = async (currentPage) => {
    setFetching(true);
    try {
      const res = await api.get(`/gallery?type=video&page=${currentPage}&limit=6`);
      if (res.data.success) {
        setItems(res.data.items);
        setTotalPages(res.data.totalPages);
        setPage(res.data.currentPage);
      }
    } catch (error) {
      console.error("Failed to fetch gallery items", error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchItems(page);
  }, [page]);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreviewUrl(URL.createObjectURL(selected));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      setMessage('Please provide a title.');
      return;
    }
    if (!editingId && !file) {
      setMessage('Please provide a video.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      let videoUrl = null;
      
      // If a new file is selected, upload it first
      if (file) {
        const formData = new FormData();
        formData.append('files', file);

        const uploadRes = await api.post('/upload/upload-files', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        if (uploadRes.data.success) {
          videoUrl = uploadRes.data.urls[0];
        } else {
          throw new Error('Upload failed');
        }
      }

      if (editingId) {
        // Edit existing item
        const payload = { title };
        if (videoUrl) payload.url = videoUrl;
        await api.put(`/gallery/${editingId}`, payload);
        setMessage('Video updated successfully!');
      } else {
        // Create new item
        await api.post('/gallery', { title, url: videoUrl, type: 'video' });
        setMessage('Video uploaded and saved successfully!');
      }

      // Reset form
      setTitle('');
      setFile(null);
      setPreviewUrl('');
      setEditingId(null);
      
      // Refresh list
      fetchItems(page);
      
    } catch (error) {
      console.error(error);
      setMessage('Failed to process. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const isConfirmed = await confirm('Confirm Delete', 'Are you sure you want to delete this video?');
    if (!isConfirmed) return;
    setDeletingId(id);
    try {
      await api.delete(`/gallery/${id}`);
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
    setPreviewUrl(item.url);
    setFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setTitle('');
    setPreviewUrl('');
    setFile(null);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-10">
      <div>
        <h1 className="text-3xl font-bold font-serif">Video Gallery</h1>
        <p className="text-muted-foreground mt-1">Manage and upload videos for your website.</p>
      </div>

      {/* Upload Form */}
      <div>
        <h2 className="text-xl font-bold mb-6 text-primary border-b pb-2">{editingId ? 'Edit Video' : 'Upload New Video'}</h2>
        
        {message && (
          <div className={`p-4 mb-6 rounded-md ${message.includes('success') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Video Title</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              placeholder="e.g. Campus Tour"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Video {editingId && '(Leave blank to keep existing)'}</label>
            
            {!previewUrl ? (
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-primary transition-colors">
                <div className="space-y-1 text-center">
                  <Video className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600 justify-center">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary/80 focus-within:outline-none">
                      <span>Click to browse</span>
                      <input type="file" className="sr-only" accept="video/*" onChange={handleFileChange} />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">MP4, WebM up to 50MB</p>
                </div>
              </div>
            ) : (
              <div className="relative rounded-lg overflow-hidden border border-gray-200 w-full text-center bg-black/5">
                <video src={previewUrl} controls className="max-h-64 mx-auto w-full object-contain" />
                <button 
                  type="button" 
                  onClick={() => { setFile(null); setPreviewUrl(''); }}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition z-10"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <button 
              type="submit" 
              disabled={loading}
              className="flex-1 flex justify-center items-center gap-2 bg-primary text-primary-foreground py-2.5 px-4 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-70"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Upload size={20} />}
              {loading ? 'Saving...' : (editingId ? 'Update Video' : 'Upload Video')}
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

      {/* Gallery List */}
      <div>
        <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Uploaded Videos</h2>
        
        {fetching ? (
          <div className="flex justify-center p-10"><Loader2 className="animate-spin text-primary w-8 h-8" /></div>
        ) : items.length === 0 ? (
          <div className="text-center p-10 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-200">No videos found.</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map(item => (
                <div key={item._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group flex flex-col">
                  <div className="h-48 overflow-hidden bg-black relative">
                    <video src={item.url} className="w-full h-full object-contain" preload="metadata" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <button onClick={() => handleEdit(item)} className="p-2 bg-white rounded-full text-blue-600 hover:bg-blue-50 transition-colors" title="Edit">
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => handleDelete(item._id)} className="p-2 bg-white rounded-full text-red-600 hover:bg-red-50 transition-colors" title="Delete">
                        {deletingId === item._id ? <Loader2 className="animate-spin" size={18} /> : <Trash2 size={18} />}
                      </button>
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-medium text-gray-800 line-clamp-2" title={item.title}>{item.title}</h3>
                    <p className="text-xs text-gray-500 mt-auto pt-2">{new Date(item.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-8">
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

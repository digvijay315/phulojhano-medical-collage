import { useState, useEffect } from 'react';
import api from '../api';
import { Loader2, Trash2, Edit2, MessageSquare, Plus } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useConfirm } from '../context/ConfirmContext';

export default function ManageChatbot() {
  const [items, setItems] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    keywords: ''
  });

  const { addToast } = useToast();
  const { confirm } = useConfirm();

  const fetchItems = async () => {
    setFetching(true);
    try {
      const res = await api.get('/chatbot');
      if (res.data.success) {
        setItems(res.data.items);
      }
    } catch (error) {
      console.error(error);
      addToast('Failed to fetch chatbot Q&As', 'error');
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
    if (!formData.question || !formData.answer) {
      addToast('Question and answer are required', 'warning');
      return;
    }
    setLoading(true);
    try {
      if (editingId) {
        await api.put(`/chatbot/${editingId}`, formData);
        addToast('Q&A updated successfully', 'success');
      } else {
        await api.post('/chatbot', formData);
        addToast('New Q&A added', 'success');
      }
      setFormData({ question: '', answer: '', keywords: '' });
      setEditingId(null);
      fetchItems();
    } catch (error) {
      console.error(error);
      addToast('Failed to save Q&A', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setFormData({
      question: item.question,
      answer: item.answer,
      keywords: item.keywords.join(', ')
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    const isConfirmed = await confirm("Delete Q&A", "Are you sure you want to delete this chatbot question?");
    if (!isConfirmed) return;
    try {
      await api.delete(`/chatbot/${id}`);
      addToast('Q&A deleted successfully', 'success');
      fetchItems();
    } catch (error) {
      console.error(error);
      addToast('Failed to delete', 'error');
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ question: '', answer: '', keywords: '' });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-10">
      <div>
        <h1 className="text-3xl font-bold font-serif flex items-center gap-3">
          <MessageSquare className="w-8 h-8 text-primary" />
          Chatbot Knowledge Base
        </h1>
        <p className="text-muted-foreground mt-1">Train the chatbot by providing potential questions and their answers.</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold mb-4 text-primary border-b pb-2">{editingId ? 'Edit Q&A' : 'Add New Q&A'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Question</label>
            <input 
              type="text" 
              name="question"
              value={formData.question}
              onChange={handleChange}
              placeholder="e.g. What is the admission process?"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Answer</label>
            <textarea 
              name="answer"
              value={formData.answer}
              onChange={handleChange}
              rows="4"
              placeholder="Provide the comprehensive answer here..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
            ></textarea>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Keywords (Comma separated, Optional)</label>
            <input 
              type="text" 
              name="keywords"
              value={formData.keywords}
              onChange={handleChange}
              placeholder="admission, process, entry"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
          </div>
          <div className="flex gap-4 pt-2">
            <button 
              type="submit" 
              disabled={loading}
              className="flex-1 flex justify-center items-center gap-2 bg-primary text-primary-foreground py-2.5 px-4 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-70 font-medium"
            >
              {loading ? <Loader2 className="animate-spin w-5 h-5" /> : (editingId ? <Edit2 className="w-5 h-5" /> : <Plus className="w-5 h-5" />)}
              {loading ? 'Saving...' : (editingId ? 'Update Q&A' : 'Add Q&A')}
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
        <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Existing Q&As</h2>
        {fetching ? (
          <div className="flex justify-center p-10"><Loader2 className="animate-spin text-primary w-8 h-8" /></div>
        ) : items.length === 0 ? (
          <div className="text-center p-10 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-200">No questions added yet.</div>
        ) : (
          <div className="space-y-4">
            {items.map(item => (
              <div key={item._id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start gap-4 hover:shadow-md transition-shadow">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg">Q: {item.question}</h3>
                  <p className="text-gray-600 mt-2 text-sm bg-gray-50 p-3 rounded-lg border border-gray-100">A: {item.answer}</p>
                  {item.keywords && item.keywords.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {item.keywords.map((k, i) => (
                        <span key={i} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">{k}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => handleEdit(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit2 size={18} /></button>
                  <button onClick={() => handleDelete(item._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={18} /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

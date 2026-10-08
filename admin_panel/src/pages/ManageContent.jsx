import { useState, useEffect } from 'react';
import { Save, Loader2 } from 'lucide-react';
import api from '../api';
import { useToast } from '../context/ToastContext';

export default function ManageContent() {
  const [content, setContent] = useState({
    phone: '',
    email: '',
    noticeTicker: '',
    popupEnabled: true,
    popupTitle: '',
    popupDescription: '',
    popupLinkText: '',
    popupLinkUrl: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await api.get('/content');
        if (res.data.success && res.data.item) {
          setContent(res.data.item);
        }
      } catch (error) {
        console.error(error);
        addToast('Failed to fetch site content', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, [addToast]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setContent({ ...content, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await api.put('/content', content);
      if (res.data.success) {
        setContent(res.data.item);
        addToast('Site content updated successfully', 'success');
      }
    } catch (error) {
      console.error(error);
      addToast('Failed to update site content', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-10 flex justify-center"><Loader2 className="animate-spin text-primary w-8 h-8" /></div>;

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold font-serif">Global Site Content</h1>
        <p className="text-muted-foreground mt-1">Manage global settings, running tickers, and the welcome popup.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Contact Information */}
        <div className="bg-card rounded-xl border border-border p-6 md:p-8 shadow-sm">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">Contact Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold">Contact Phone Number</label>
              <input 
                type="text" 
                name="phone"
                value={content.phone}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">Contact Email Address</label>
              <input 
                type="email" 
                name="email"
                value={content.email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* Ticker settings */}
        <div className="bg-card rounded-xl border border-border p-6 md:p-8 shadow-sm">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">Top Notice Ticker</h2>
          <div className="space-y-2">
            <label className="text-sm font-semibold">Running Notice Ticker</label>
            <textarea 
              name="noticeTicker"
              value={content.noticeTicker}
              onChange={handleChange}
              rows={2}
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
            <p className="text-xs text-muted-foreground">This text runs continuously at the very top of the landing page.</p>
          </div>
        </div>

        {/* Welcome Popup */}
        <div className="bg-card rounded-xl border border-border p-6 md:p-8 shadow-sm">
          <div className="flex justify-between items-center mb-4 border-b pb-2">
            <h2 className="text-xl font-bold">Welcome Popup</h2>
            <label className="flex items-center gap-2 cursor-pointer">
              <span className="text-sm font-semibold text-gray-700">Enable Popup</span>
              <input 
                type="checkbox"
                name="popupEnabled"
                checked={content.popupEnabled}
                onChange={handleChange}
                className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
            </label>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold">Popup Title</label>
              <input 
                type="text" 
                name="popupTitle"
                value={content.popupTitle}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g. Admission Notice 2026"
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold">Popup Description</label>
              <textarea 
                name="popupDescription"
                value={content.popupDescription}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder="e.g. The admission process for the MBBS Batch is now live..."
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold">Link Button Text</label>
              <input 
                type="text" 
                name="popupLinkText"
                value={content.popupLinkText}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g. View Guidelines"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold">Link Destination URL</label>
              <input 
                type="text" 
                name="popupLinkUrl"
                value={content.popupLinkUrl}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g. /academics or https://..."
              />
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button 
            type="submit" 
            disabled={saving}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-70"
          >
            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            {saving ? 'Saving...' : 'Save Global Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}

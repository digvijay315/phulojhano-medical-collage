import { useState } from 'react';
import { Save } from 'lucide-react';

export default function ManageContent() {
  const [content, setContent] = useState({
    phone: '06432 299 927',
    email: 'principal.pjmc@gmail.com',
    noticeTicker: 'Notice for 1st Year MBBS 2026 Batch admission will start from...'
  });

  const handleChange = (e) => {
    setContent({ ...content, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert('Content saved! (This will be connected to MongoDB soon)');
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold font-serif">Site Content</h1>
        <p className="text-muted-foreground mt-1">Manage global site settings and information.</p>
      </div>

      <div className="bg-card rounded-xl border border-border p-6 md:p-8 shadow-sm">
        <form onSubmit={handleSave} className="space-y-6">
          
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

          <div className="space-y-2">
            <label className="text-sm font-semibold">Running Notice Ticker</label>
            <textarea 
              name="noticeTicker"
              value={content.noticeTicker}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
            <p className="text-xs text-muted-foreground">This text runs continuously at the top of the landing page.</p>
          </div>

          <div className="pt-4 border-t border-border">
            <button 
              type="submit" 
              className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              <Save size={18} />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

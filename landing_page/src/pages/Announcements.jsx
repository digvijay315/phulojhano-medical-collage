import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader";
import api from "../api";

export default function Announcements() {
  const [selectedNotice, setSelectedNotice] = useState(null);

  const { data: notices = [], isLoading, isError } = useQuery({
    queryKey: ['notices_all'],
    queryFn: async () => {
      const response = await api.get('/notices?limit=200');
      if (response.data.success && response.data.items) {
        return response.data.items.sort((a, b) => new Date(b.date) - new Date(a.date));
      }
      return [];
    }
  });

  return (
    <>
      <PageHeader
        eyebrow="Academic"
        title="Announcements"
        subtitle="Latest academic notices, announcements, and circulars."
      />
      
      <section className="mx-auto max-w-7xl px-4 py-14">
        {isLoading && <p className="text-center text-muted-foreground pb-8">Loading announcements...</p>}
        {isError && <p className="text-center text-destructive pb-8">Error loading announcements.</p>}
        {!isLoading && notices.length === 0 && <p className="text-center text-muted-foreground pb-8">No announcements found.</p>}

        {!isLoading && notices.length > 0 && (
          <div className="grid gap-6">
            {notices.map((notice) => (
              <div key={notice._id} className="rounded-xl border border-border bg-card p-6 flex flex-col md:flex-row md:items-start md:justify-between gap-4 transition-all hover:border-accent hover:shadow-md">
                <div className="flex-1">
                  <p className="text-lg font-bold flex items-start gap-2 flex-wrap">
                    {notice.title}
                    {notice.isNewFlash && (
                      <span className="px-2 py-0.5 mt-1 bg-red-100 text-red-600 text-[10px] font-bold rounded-full animate-pulse shrink-0">NEW</span>
                    )}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2 font-medium">
                    {new Date(notice.date).toLocaleDateString()} &middot; {notice.category}
                  </p>
                </div>
                
                <div className="shrink-0 flex items-center gap-3">
                  {notice.pdfUrl && (
                    <a href={notice.pdfUrl} target="_blank" rel="noreferrer" className="rounded-md bg-secondary px-4 py-2 text-sm font-semibold hover:bg-accent hover:text-accent-foreground transition-colors">
                      Download PDF
                    </a>
                  )}
                  {notice.description && (
                    <button onClick={() => setSelectedNotice(notice)} className="rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold hover:bg-primary/90 transition-colors">
                      View Details
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Modal for Notice Description */}
      {selectedNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-2xl w-full shadow-xl"
          >
            <h3 className="text-2xl font-bold font-serif mb-2">{selectedNotice.title}</h3>
            <p className="text-sm text-muted-foreground mb-6">
              {new Date(selectedNotice.date).toLocaleDateString()} | {selectedNotice.category}
            </p>
            <div className="text-gray-700 whitespace-pre-wrap max-h-[60vh] overflow-y-auto pr-2 text-sm leading-relaxed">
              {selectedNotice.description}
            </div>
            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setSelectedNotice(null)}
                className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import api from "../api";

export default function WelcomePopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await api.get("/content");
        if (res.data.success && res.data.item) {
          setContent(res.data.item);
          
          if (res.data.item.popupEnabled) {
            const hasSeen = sessionStorage.getItem("hasSeenWelcomePopup");
            if (!hasSeen) {
              const timer = setTimeout(() => {
                setIsVisible(true);
                sessionStorage.setItem("hasSeenWelcomePopup", "true");
              }, 2000);
              return () => clearTimeout(timer);
            }
          }
        }
      } catch (err) {
        console.error("Failed to fetch popup content", err);
      }
    };
    
    fetchContent();
  }, []);

  if (!isVisible || !content) return null;

  const isExternalLink = content.popupLinkUrl?.startsWith('http');

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          onClick={() => setIsVisible(false)}
        />
        
        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
          className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
        >
          {/* Close button */}
          <button
            onClick={() => setIsVisible(false)}
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground"
            aria-label="Close popup"
          >
            ✕
          </button>
          
          {/* Content */}
          <div className="bg-primary px-6 py-8 text-center text-primary-foreground sm:px-10">
            <span className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent text-2xl font-bold text-accent-foreground shadow-inner">
              PJ
            </span>
            <h2 className="font-serif text-2xl font-semibold sm:text-3xl">
              {content.popupTitle || 'Notice'}
            </h2>
            <p className="mt-2 text-primary-foreground/80">
              Phulo Jhano Medical College & Hospital, Dumka
            </p>
          </div>
          
          <div className="p-6 text-center sm:px-10 sm:py-8">
            <p className="text-sm text-muted-foreground sm:text-base">
              {content.popupDescription || 'Welcome to our college.'}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              {content.popupLinkUrl && (
                isExternalLink ? (
                  <a
                    href={content.popupLinkUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setIsVisible(false)}
                    className="rounded-lg bg-accent px-6 py-2.5 text-sm font-semibold text-accent-foreground transition-transform hover:-translate-y-0.5"
                  >
                    {content.popupLinkText || 'View Details'}
                  </a>
                ) : (
                  <Link
                    to={content.popupLinkUrl}
                    onClick={() => setIsVisible(false)}
                    className="rounded-lg bg-accent px-6 py-2.5 text-sm font-semibold text-accent-foreground transition-transform hover:-translate-y-0.5"
                  >
                    {content.popupLinkText || 'View Details'}
                  </Link>
                )
              )}
              <button
                onClick={() => setIsVisible(false)}
                className="rounded-lg border border-border px-6 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

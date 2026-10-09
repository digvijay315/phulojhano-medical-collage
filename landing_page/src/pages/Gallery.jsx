import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import PageHeader from "../components/PageHeader";
import api from "../api";

export default function Gallery() {
  const [photoPage, setPhotoPage] = useState(1);
  const [videoPage, setVideoPage] = useState(1);

  const { data: photoData, isLoading: isLoadingPhotos, isError: isErrorPhotos } = useQuery({
    queryKey: ['gallery', 'photo', photoPage],
    queryFn: async () => {
      const res = await api.get(`/gallery?type=photo&limit=10&page=${photoPage}`);
      return res.data;
    }
  });

  const { data: videoData, isLoading: isLoadingVideos, isError: isErrorVideos } = useQuery({
    queryKey: ['gallery', 'video', videoPage],
    queryFn: async () => {
      const res = await api.get(`/gallery?type=video&limit=10&page=${videoPage}`);
      return res.data;
    }
  });

  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Photo Gallery"
        subtitle="Moments from the campus, hospital and college events."
      />
      <section className="mx-auto max-w-7xl px-4 py-14">
        {isLoadingPhotos && <p className="text-center text-muted-foreground pb-8">Loading photos...</p>}
        {isErrorPhotos && <p className="text-center text-destructive pb-8">Error loading photos.</p>}
        {!isLoadingPhotos && photoData?.items?.length === 0 && <p className="text-center text-muted-foreground pb-8">No photos available.</p>}
        
        {photoData?.items?.length > 0 && (
          <>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {photoData.items.map((img) => (
                <a
                  key={img._id}
                  href={img.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group overflow-hidden rounded-xl border border-border bg-card"
                >
                  <img
                    src={img.url}
                    alt={img.title}
                    loading="lazy"
                    className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <p className="px-3 py-2 text-xs text-muted-foreground truncate">{img.title}</p>
                </a>
              ))}
            </div>

            {/* Pagination Controls */}
            {photoData.totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-8">
                <button 
                  onClick={() => setPhotoPage(p => Math.max(1, p - 1))}
                  disabled={photoPage === 1}
                  className="px-3 py-1.5 rounded-lg border border-border text-sm font-medium text-foreground disabled:opacity-50 hover:bg-muted transition-colors"
                >
                  Prev
                </button>
                <span className="text-sm font-medium text-muted-foreground">
                  Page {photoPage} of {photoData.totalPages}
                </span>
                <button 
                  onClick={() => setPhotoPage(p => Math.min(photoData.totalPages, p + 1))}
                  disabled={photoPage === photoData.totalPages}
                  className="px-3 py-1.5 rounded-lg border border-border text-sm font-medium text-foreground disabled:opacity-50 hover:bg-muted transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

        <div id="video" className="mt-14 scroll-mt-32">
          <h2 className="font-serif text-2xl font-semibold">Video Gallery</h2>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            Videos of college functions, awareness campaigns and campus tours will
            be published in this section.
          </p>
          
          <div className="mt-8">
            {isLoadingVideos && <p className="text-center text-muted-foreground pb-8">Loading videos...</p>}
            {isErrorVideos && <p className="text-center text-destructive pb-8">Error loading videos.</p>}
            {!isLoadingVideos && videoData?.items?.length === 0 && <p className="text-center text-muted-foreground pb-8">No videos available.</p>}
            
            {videoData?.items?.length > 0 && (
              <>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {videoData.items.map((vid) => (
                    <div
                      key={vid._id}
                      className="group overflow-hidden rounded-xl border border-border bg-card flex flex-col"
                    >
                      <video
                        src={vid.url}
                        controls
                        className="w-full aspect-video object-cover bg-black"
                      />
                      <p className="px-4 py-3 text-sm font-medium text-foreground">{vid.title}</p>
                    </div>
                  ))}
                </div>

                {/* Pagination Controls */}
                {videoData.totalPages > 1 && (
                  <div className="flex justify-center items-center gap-4 mt-8">
                    <button 
                      onClick={() => setVideoPage(p => Math.max(1, p - 1))}
                      disabled={videoPage === 1}
                      className="px-3 py-1.5 rounded-lg border border-border text-sm font-medium text-foreground disabled:opacity-50 hover:bg-muted transition-colors"
                    >
                      Prev
                    </button>
                    <span className="text-sm font-medium text-muted-foreground">
                      Page {videoPage} of {videoData.totalPages}
                    </span>
                    <button 
                      onClick={() => setVideoPage(p => Math.min(videoData.totalPages, p + 1))}
                      disabled={videoPage === videoData.totalPages}
                      className="px-3 py-1.5 rounded-lg border border-border text-sm font-medium text-foreground disabled:opacity-50 hover:bg-muted transition-colors"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

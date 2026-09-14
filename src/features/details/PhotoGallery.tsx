import React, { useState } from 'react';
import { PropertyImage } from '../../types/listings.types';
import { Modal } from '../../components/ui/Modal';

export interface PhotoGalleryProps {
  images: PropertyImage[];
  title: string;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ images, title }) => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const fallbackImages = [
    { url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80' },
    { url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80' },
    { url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80' },
    { url: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80' },
  ];

  const displayImages = images && images.length > 0 ? images : fallbackImages;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-space-sm rounded-xl overflow-hidden shadow-sm border border-outline-variant/30">
        {/* Main large photo (8 cols) */}
        <div
          className="md:col-span-8 relative h-[320px] sm:h-[420px] cursor-pointer group overflow-hidden bg-surface-container"
          onClick={() => {
            setActiveImageIndex(0);
            setIsViewerOpen(true);
          }}
        >
          <img
            src={displayImages[0].url}
            alt={`${title} - Primary`}
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
        </div>

        {/* Side photo stack (4 cols) */}
        <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-1 gap-space-sm h-[180px] md:h-[420px]">
          <div
            className="relative h-full cursor-pointer group overflow-hidden bg-surface-container rounded-lg md:rounded-none"
            onClick={() => {
              setActiveImageIndex(1 % displayImages.length);
              setIsViewerOpen(true);
            }}
          >
            <img
              src={displayImages[1]?.url || displayImages[0].url}
              alt={`${title} - Bedroom`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div
            className="relative h-full cursor-pointer group overflow-hidden bg-surface-container rounded-lg md:rounded-none"
            onClick={() => {
              setActiveImageIndex(2 % displayImages.length);
              setIsViewerOpen(true);
            }}
          >
            <img
              src={displayImages[2]?.url || displayImages[0].url}
              alt={`${title} - Study Desk`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {/* Overlay button */}
            <div className="absolute inset-0 bg-primary/40 flex items-center justify-center text-white backdrop-blur-[2px] group-hover:bg-primary/50 transition-all">
              <span className="font-label-md text-label-md flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-full">
                <span className="material-symbols-outlined text-[18px]">photo_library</span>
                <span>View {displayImages.length} photos</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Full Photo Modal Viewer */}
      <Modal
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        title={`${title} — Photos (${activeImageIndex + 1}/${displayImages.length})`}
        maxWidth="2xl"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-full aspect-[16/10] bg-black/90 rounded-xl overflow-hidden flex items-center justify-center">
            <img
              src={displayImages[activeImageIndex].url}
              alt={`Photo ${activeImageIndex + 1}`}
              className="max-h-full max-w-full object-contain"
            />

            {/* Navigation arrows */}
            {displayImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setActiveImageIndex(
                      (prev) => (prev - 1 + displayImages.length) % displayImages.length
                    )
                  }
                  className="absolute left-3 w-10 h-10 rounded-full bg-white/30 hover:bg-white/60 text-white flex items-center justify-center backdrop-blur-md"
                >
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveImageIndex((prev) => (prev + 1) % displayImages.length)
                  }
                  className="absolute right-3 w-10 h-10 rounded-full bg-white/30 hover:bg-white/60 text-white flex items-center justify-center backdrop-blur-md"
                >
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </>
            )}
          </div>

          {/* Thumbnails row */}
          <div className="flex gap-2 overflow-x-auto max-w-full pb-2">
            {displayImages.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImageIndex(idx)}
                className={`w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                  activeImageIndex === idx
                    ? 'border-secondary scale-105'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img.url} alt="thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
};

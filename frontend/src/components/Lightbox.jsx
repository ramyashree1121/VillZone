import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Lightbox({ images, currentIndex, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  if (currentIndex === -1 || !images[currentIndex]) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/95 backdrop-blur-md">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all duration-300 z-50"
        >
          <X size={28} />
        </button>

        {/* Navigation - Prev */}
        {images.length > 1 && (
          <button
            onClick={onPrev}
            className="absolute left-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300 z-50"
          >
            <ChevronLeft size={32} />
          </button>
        )}

        {/* Media Display */}
        <div className="max-w-5xl max-h-[80vh] px-4 flex flex-col items-center">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="flex justify-center items-center max-w-full max-h-[75vh]"
          >
            {images[currentIndex].type === 'video' ? (
              <video 
                src={images[currentIndex].videoUrl?.startsWith('/') ? `http://localhost:5000${images[currentIndex].videoUrl}` : images[currentIndex].videoUrl} 
                controls 
                autoPlay 
                className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl outline-none"
              />
            ) : images[currentIndex].type === 'youtube' ? (
              <iframe 
                src={`https://www.youtube.com/embed/${images[currentIndex].videoUrl?.split('v=')[1]?.split('&')[0]}?autoplay=1`}
                title={images[currentIndex].title || 'YouTube Video'}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-[80vw] h-[60vh] max-w-5xl max-h-[75vh] rounded-lg shadow-2xl"
              />
            ) : (
              <img
                src={images[currentIndex].imageUrl || images[currentIndex]}
                alt={images[currentIndex].title || 'Campus Asset'}
                className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
              />
            )}
          </motion.div>
          {images[currentIndex].title && (
            <div className="mt-4 text-white text-center font-medium text-lg text-shadow">
              {images[currentIndex].title}
            </div>
          )}
        </div>

        {/* Navigation - Next */}
        {images.length > 1 && (
          <button
            onClick={onNext}
            className="absolute right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300 z-50"
          >
            <ChevronRight size={32} />
          </button>
        )}
      </div>
    </AnimatePresence>
  );
}

import React, { useEffect } from 'react';
import { X } from 'lucide-react';

function FullscreenImageViewer({ imageUrl, altText, isOpen, setOpen, overlayColor = "rgba(0, 0, 0, 0.5)" }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center ">
      {/* Blurred background with color overlay */}
      <div
        className="absolute inset-0 backdrop-blur-md"
        style={{ backgroundColor: overlayColor }}
      />

      {/* Close button */}
      <button
        onClick={() => setOpen(false)}
        className="absolute top-4 left-4 bg-black bg-opacity-60 text-white p-2 rounded-full hover:bg-opacity-80 transition-all duration-200 z-10"
        aria-label="Close image viewer"
      >
        <X size={24} />
      </button>

      {/* Image container */}
      <div className="w-4/5 h-4/5 relative z-10">
        <img
          src={imageUrl || "/api/placeholder/800/600"}
          alt={altText || "Fullscreen image"}
          className="w-full h-full object-contain shadow-2xl"
        />
      </div>
    </div>
  );
}

export default FullscreenImageViewer;
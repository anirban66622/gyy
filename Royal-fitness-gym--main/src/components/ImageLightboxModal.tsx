import React from 'react';
import { X } from 'lucide-react';

interface ImageLightboxModalProps {
  imageUrl: string | null;
  onClose: () => void;
}

export const ImageLightboxModal: React.FC<ImageLightboxModalProps> = ({
  imageUrl,
  onClose,
}) => {
  if (!imageUrl) return null;

  const isVideo =
    imageUrl.endsWith('.mp4') ||
    imageUrl.includes('mixkit') ||
    imageUrl.includes('video') ||
    imageUrl.includes('.mp4?');

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in cursor-zoom-out"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-5xl w-full max-h-[90vh] bg-[#0C0C0C] border-2 border-[#BBCCD7]/30 rounded-[28px] overflow-hidden p-2 sm:p-4 shadow-2xl flex flex-col items-center cursor-default"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2.5 text-zinc-300 hover:text-white rounded-full bg-neutral-900/90 border border-white/20 transition-colors cursor-pointer shadow-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {isVideo ? (
          <video
            src={imageUrl}
            autoPlay
            loop
            controls
            playsInline
            className="w-full h-auto max-h-[82vh] object-contain rounded-[20px]"
          />
        ) : (
          <img
            src={imageUrl}
            alt="Expanded Media View"
            referrerPolicy="no-referrer"
            className="w-full h-auto max-h-[82vh] object-contain rounded-[20px]"
          />
        )}
      </div>
    </div>
  );
};


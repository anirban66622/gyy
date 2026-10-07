import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ExternalLink,
  Maximize2,
  Shield,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Flame,
  Camera,
} from 'lucide-react';

import { MEDIA_ASSETS } from '../../config/mediaManager';

interface GymPicturesPageProps {
  onBack: () => void;
  onImageClick: (url: string) => void;
  onJoinClick?: () => void;
}

interface PhotoItem {
  title: string;
  url: string;
  caption?: string;
}

interface GymZoneData {
  id: number;
  title: string;
  category: string;
  desc: string;
  photos: PhotoItem[];
}

const GYM_ZONES: GymZoneData[] = MEDIA_ASSETS.gymFacilityGalleries;

// Auto-Swiping Card Component
const AutoSwipeZoneCard: React.FC<{
  zone: GymZoneData;
  index: number;
  onImageClick: (url: string) => void;
}> = ({ zone, index, onImageClick }) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Auto-swipe timer every 2 seconds (2000 ms)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % zone.photos.length);
    }, 2000);

    return () => clearInterval(timer);
  }, [isPaused, zone.photos.length]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev - 1 + zone.photos.length) % zone.photos.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev + 1) % zone.photos.length);
  };

  const currentPhoto = zone.photos[currentIdx];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group bg-neutral-900/70 rounded-2xl border border-neutral-800 overflow-hidden flex flex-col hover:border-[#B600A8]/60 transition-all duration-300 shadow-xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Image Carousel Area */}
      <div
        className="relative aspect-[4/3] overflow-hidden cursor-pointer bg-neutral-950 select-none group"
        onClick={() => onImageClick(currentPhoto.url)}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIdx}
            src={currentPhoto.url}
            alt={currentPhoto.title}
            initial={{ opacity: 0.2, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.2 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
          <div className="flex items-center gap-1.5 bg-black/75 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-neutral-800 shadow-md">
            <span className="w-2 h-2 rounded-full bg-[#B600A8] animate-ping" />
            <span>Auto 2s &bull; Photo {currentIdx + 1} of {zone.photos.length}</span>
          </div>

          <div className="bg-[#B600A8]/90 text-white text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md shadow-md">
            {zone.category}
          </div>
        </div>

        {/* Floating Expand Icon */}
        <div className="absolute top-12 right-3 bg-black/70 backdrop-blur-md p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <Maximize2 className="w-4 h-4" />
        </div>

        {/* Manual Left/Right Arrows */}
        <button
          type="button"
          onClick={handlePrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-[#B600A8] text-white p-2 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all cursor-pointer z-20 border border-neutral-700"
          title="Previous Photo"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-[#B600A8] text-white p-2 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all cursor-pointer z-20 border border-neutral-700"
          title="Next Photo"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* 5 Dot Navigation Indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full z-10 border border-neutral-800">
          {zone.photos.map((_, pIdx) => (
            <button
              key={pIdx}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIdx(pIdx);
              }}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                pIdx === currentIdx
                  ? 'w-6 bg-[#B600A8]'
                  : 'w-1.5 bg-neutral-600 hover:bg-white'
              }`}
            />
          ))}
        </div>

        {/* Current Photo Title Overlay on Image Bottom */}
        <div className="absolute bottom-10 left-3 right-3 text-left pointer-events-none">
          <span className="text-[11px] font-bold text-[#BBCCD7] uppercase tracking-wider bg-black/70 px-2 py-0.5 rounded backdrop-blur-sm">
            {currentPhoto.title}
          </span>
        </div>
      </div>

      {/* Card Info Content */}
      <div className="p-5 flex flex-col flex-1 justify-between bg-neutral-900/90">
        <div>
          <h3 className="text-lg font-bold text-white mb-1.5 group-hover:text-[#BBCCD7] transition-colors leading-snug">
            {zone.title}
          </h3>
          <p className="text-xs text-neutral-400 font-light leading-relaxed mb-3">
            {zone.desc}
          </p>
        </div>

        {/* Photo Caption & Expand Button */}
        <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs">
          <span className="text-neutral-500 text-[11px] truncate max-w-[200px]">
            📸 {currentPhoto.caption}
          </span>
          <button
            type="button"
            onClick={() => onImageClick(currentPhoto.url)}
            className="text-[#BBCCD7] hover:text-white font-medium cursor-pointer underline flex items-center gap-1 shrink-0"
          >
            Enlarge <Maximize2 className="w-3 h-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export const GymPicturesPage: React.FC<GymPicturesPageProps> = ({
  onBack,
  onImageClick,
  onJoinClick,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Strength', 'Cardio', 'Studio', 'Functional', 'VIP', 'Recovery'];

  const filteredZones =
    activeCategory === 'All'
      ? GYM_ZONES
      : GYM_ZONES.filter((z) => z.category === activeCategory);

  const handleOpenNewTab = () => {
    window.open(window.location.href, '_blank');
  };

  return (
    <div className="min-h-screen w-full bg-[#0C0C0C] text-white font-['Kanit',sans-serif] px-4 sm:px-8 py-10 flex flex-col">
      {/* Top Header Bar */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between mb-8 pb-4 border-b border-neutral-800">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors bg-neutral-900/80 px-4 py-2.5 rounded-full border border-neutral-800 text-sm font-medium cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Menu</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleOpenNewTab}
            className="hidden sm:flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors bg-neutral-900 px-3 py-2 rounded-lg border border-neutral-800 cursor-pointer"
            title="Open page in a new window"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open in New Window</span>
          </button>
          {onJoinClick && (
            <button
              onClick={onJoinClick}
              className="bg-gradient-to-r from-[#B600A8] to-[#900085] text-white px-5 py-2.5 rounded-full text-sm font-semibold tracking-wider uppercase hover:brightness-110 transition-all cursor-pointer shadow-lg shadow-[#B600A8]/20"
            >
              Join Royal Gym
            </button>
          )}
        </div>
      </div>

      {/* Main Title Banner */}
      <div className="max-w-7xl mx-auto w-full mb-10">
        <div className="flex items-center gap-2 text-[#BBCCD7] text-xs font-semibold tracking-widest uppercase mb-2">
          <Camera className="w-4 h-4 text-[#B600A8]" />
          <span>Interactive 2-Second Auto-Swipe Gallery</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4">
          Pictures of Royal Fitness Gym 👑
        </h1>
        <p className="text-neutral-400 max-w-2xl text-base sm:text-lg font-light leading-relaxed">
          Step inside our world-class facility. Each zone below features 5 distinct photographs that automatically swipe every 2 seconds. Hover over any card to pause or use the arrow controls.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mt-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Auto-Swiping Zones Grid */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {filteredZones.map((zone, index) => (
          <AutoSwipeZoneCard
            key={zone.id}
            zone={zone}
            index={index}
            onImageClick={onImageClick}
          />
        ))}
      </div>
    </div>
  );
};


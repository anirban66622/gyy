import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ExternalLink,
  Heart,
  Maximize2,
  Users,
  Play,
  Pause,
  Sparkles,
  Film,
  Volume2,
  VolumeX,
} from 'lucide-react';

import { MEDIA_ASSETS } from '../../config/mediaManager';

interface MemberPicturesPageProps {
  onBack: () => void;
  onImageClick: (url: string) => void;
  onJoinClick?: () => void;
}

export interface MemberMediaItem {
  id: number;
  type: 'video' | 'image';
  posterTitle: string;
  subtitle: string;
  name: string;
  tag: string;
  story: string;
  mediaUrl: string;
  likes: number;
  category: 'Video' | 'Transformation' | 'Powerlifting' | 'Studio';
}

const MEMBER_ITEMS: MemberMediaItem[] = MEDIA_ASSETS.memberMedia;

// Single Card Component supporting video autoplay and smooth hover interaction
const MemberPosterCard: React.FC<{
  item: MemberMediaItem;
  likes: number;
  onLike: (id: number) => void;
  onMediaClick: (url: string) => void;
}> = ({ item, likes, onLike, onMediaClick }) => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div
      className="group relative w-72 sm:w-80 h-[420px] sm:h-[460px] shrink-0 rounded-[28px] bg-neutral-900 border border-neutral-800 overflow-hidden shadow-2xl flex flex-col justify-between transition-all duration-500 hover:scale-[1.03] hover:border-[#B600A8]/80 hover:shadow-[#B600A8]/30 cursor-pointer select-none"
      onClick={() => onMediaClick(item.mediaUrl)}
    >
      {/* Background Media View */}
      <div className="absolute inset-0 bg-neutral-950 overflow-hidden">
        {item.type === 'video' ? (
          <video
            ref={videoRef}
            src={item.mediaUrl}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
          />
        ) : (
          <img
            src={item.mediaUrl}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
          />
        )}

        {/* Gradient Overlay for Motion Poster Typography */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/60 group-hover:from-black/90 transition-all pointer-events-none" />
      </div>

      {/* Top Header Tag & Controls inside Poster */}
      <div className="relative z-10 p-5 flex items-center justify-between">
        <span className="text-[10px] font-black uppercase tracking-widest text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 flex items-center gap-1.5 shadow-md">
          {item.type === 'video' ? (
            <>
              <Film className="w-3 h-3 text-[#B600A8] animate-pulse" />
              <span>MOTION VIDEO</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>{item.category}</span>
            </>
          )}
        </span>

        {item.type === 'video' && (
          <button
            type="button"
            onClick={toggleMute}
            className="p-2 rounded-full bg-black/60 hover:bg-[#B600A8] text-white backdrop-blur-md transition-colors border border-white/20 cursor-pointer"
            title={isMuted ? 'Unmute video' : 'Mute video'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        )}
      </div>

      {/* Center Motion Title Graphics (Art of Royal Style) */}
      <div className="relative z-10 text-center px-4 pointer-events-none">
        <div className="text-[10px] uppercase font-black tracking-[0.3em] text-[#BBCCD7] mb-1 drop-shadow-md">
          {item.subtitle}
        </div>
        <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter text-white drop-shadow-lg leading-none font-['Kanit']">
          {item.posterTitle}
        </h3>
      </div>

      {/* Bottom Content Area */}
      <div className="relative z-10 p-5 bg-gradient-to-t from-black/95 to-transparent">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm font-extrabold text-white group-hover:text-[#BBCCD7] transition-colors">
            {item.name}
          </span>
          <span className="text-[11px] font-bold text-[#B600A8] bg-[#B600A8]/10 px-2 py-0.5 rounded border border-[#B600A8]/30">
            {item.tag}
          </span>
        </div>

        <p className="text-xs text-neutral-300 line-clamp-2 font-light leading-snug mb-3">
          "{item.story}"
        </p>

        {/* Footer Buttons */}
        <div className="pt-2 border-t border-white/10 flex items-center justify-between">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onLike(item.id);
            }}
            className="flex items-center gap-1.5 text-xs text-neutral-300 hover:text-red-400 transition-colors cursor-pointer bg-neutral-900/80 px-2.5 py-1 rounded-full border border-white/10"
          >
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500/20" />
            <span className="font-bold">{likes}</span>
          </button>

          <span className="text-xs font-semibold text-white group-hover:text-[#BBCCD7] flex items-center gap-1">
            Enlarge <Maximize2 className="w-3 h-3" />
          </span>
        </div>
      </div>
    </div>
  );
};

export const MemberPicturesPage: React.FC<MemberPicturesPageProps> = ({
  onBack,
  onImageClick,
  onJoinClick,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isMarqueePaused, setIsMarqueePaused] = useState<boolean>(false);
  const [likesCount, setLikesCount] = useState<Record<number, number>>(
    MEMBER_ITEMS.reduce((acc, item) => ({ ...acc, [item.id]: item.likes }), {})
  );

  const handleLike = (id: number) => {
    setLikesCount((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const handleOpenNewTab = () => {
    window.open(window.location.href, '_blank');
  };

  const categories = ['All', 'Video', 'Transformation', 'Powerlifting', 'Studio'];

  const filteredItems =
    activeCategory === 'All'
      ? MEMBER_ITEMS
      : MEMBER_ITEMS.filter((item) => item.category === activeCategory);

  // Duplicate items for seamless endless scrolling loop
  const infiniteLoopItemsRow1 = [...filteredItems, ...filteredItems, ...filteredItems];
  const infiniteLoopItemsRow2 = [...filteredItems].reverse();
  const doubleLoopRow2 = [...infiniteLoopItemsRow2, ...infiniteLoopItemsRow2, ...infiniteLoopItemsRow2];

  return (
    <div className="min-h-screen w-full bg-[#0C0C0C] text-white font-['Kanit',sans-serif] py-10 flex flex-col overflow-x-hidden">
      {/* Top Header Bar */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 flex items-center justify-between mb-8 pb-4 border-b border-neutral-800">
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
              Become a Member
            </button>
          )}
        </div>
      </div>

      {/* Main Title & Banner Section */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 mb-8 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2 text-[#BBCCD7] text-xs font-semibold tracking-widest uppercase mb-2">
          <Users className="w-4 h-4 text-[#B600A8]" />
          <span>Royal Fitness Family &bull; Motion Posters 2026</span>
        </div>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white mb-4">
          Pictures & Motion Videos of Members 👑
        </h1>
        <p className="text-neutral-400 max-w-2xl text-base sm:text-lg font-light leading-relaxed">
          Explore our continuous infinite-scrolling reel of member transformations, powerlifting PRs, and live motion workout videos.
        </p>

        {/* Filter Controls & Marquee Play/Pause Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-4 border-t border-neutral-800/80">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                  activeCategory === cat
                    ? 'bg-white text-black border-white shadow-md'
                    : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:border-neutral-700'
                }`}
              >
                {cat === 'Video' ? 'Motion Videos 🎥' : cat}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsMarqueePaused(!isMarqueePaused)}
            className="flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white px-4 py-2 rounded-full border border-neutral-800 text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors"
          >
            {isMarqueePaused ? (
              <>
                <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
                <span>Resume Infinite Scroll</span>
              </>
            ) : (
              <>
                <Pause className="w-3.5 h-3.5 text-[#B600A8]" />
                <span>Pause Infinite Scroll</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* CSS Keyframe Style Injection for Smooth Seamless Infinite Motion */}
      <style>{`
        @keyframes marqueeScrollLeft {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes marqueeScrollRight {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .animate-marquee-left {
          display: flex;
          width: max-content;
          animation: marqueeScrollLeft 35s linear infinite;
          will-change: transform;
        }
        .animate-marquee-right {
          display: flex;
          width: max-content;
          animation: marqueeScrollRight 35s linear infinite;
          will-change: transform;
        }
        .marquee-paused {
          animation-play-state: paused !important;
        }
      `}</style>

      {/* STREAM 1: INFINITE SCROLLING REEL (LEFT) */}
      <div className="w-full overflow-hidden py-4 my-2 relative group">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#0C0C0C] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#0C0C0C] to-transparent z-20 pointer-events-none" />

        <div
          className={`animate-marquee-left gap-6 px-4 ${
            isMarqueePaused ? 'marquee-paused' : 'group-hover:[animation-play-state:paused]'
          }`}
        >
          {infiniteLoopItemsRow1.map((item, idx) => (
            <MemberPosterCard
              key={`row1-${item.id}-${idx}`}
              item={item}
              likes={likesCount[item.id] || item.likes}
              onLike={handleLike}
              onMediaClick={onImageClick}
            />
          ))}
        </div>
      </div>

      {/* STREAM 2: INFINITE SCROLLING REEL (RIGHT - OPPOSITE DIRECTION) */}
      <div className="w-full overflow-hidden py-4 my-2 relative group">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#0C0C0C] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#0C0C0C] to-transparent z-20 pointer-events-none" />

        <div
          className={`animate-marquee-right gap-6 px-4 ${
            isMarqueePaused ? 'marquee-paused' : 'group-hover:[animation-play-state:paused]'
          }`}
        >
          {doubleLoopRow2.map((item, idx) => (
            <MemberPosterCard
              key={`row2-${item.id}-${idx}`}
              item={item}
              likes={likesCount[item.id] || item.likes}
              onLike={handleLike}
              onMediaClick={onImageClick}
            />
          ))}
        </div>
      </div>

      {/* Static Grid View for Detailed Browsing below the Reels */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 mt-16">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#BBCCD7] block">
              Complete Spotlight Directory
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-white">
              All Member Profiles ({filteredItems.length})
            </h2>
          </div>
          <span className="text-xs text-neutral-500 hidden sm:inline-block">
            Click any video or picture to open in fullscreen
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredItems.map((item) => (
            <motion.div
              key={`grid-${item.id}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-neutral-900/80 rounded-2xl border border-neutral-800 overflow-hidden flex flex-col justify-between hover:border-[#B600A8]/60 transition-all duration-300"
            >
              <div
                className="relative aspect-video overflow-hidden cursor-pointer bg-black"
                onClick={() => onImageClick(item.mediaUrl)}
              >
                {item.type === 'video' ? (
                  <video
                    src={item.mediaUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={item.mediaUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                <div className="absolute top-3 left-3 bg-[#B600A8]/90 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow">
                  {item.tag}
                </div>

                <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md p-1.5 rounded-full text-white">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{item.name}</h3>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed">
                    "{item.story}"
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between text-xs">
                  <button
                    onClick={() => handleLike(item.id)}
                    className="flex items-center gap-1.5 text-neutral-400 hover:text-red-400 transition-colors cursor-pointer"
                  >
                    <Heart className="w-4 h-4 text-red-500 fill-red-500/20" />
                    <span>{likesCount[item.id] || item.likes} Respects</span>
                  </button>

                  <button
                    onClick={() => onImageClick(item.mediaUrl)}
                    className="text-[#BBCCD7] hover:text-white cursor-pointer font-medium underline"
                  >
                    Watch Fullscreen
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

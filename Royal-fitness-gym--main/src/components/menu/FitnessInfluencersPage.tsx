import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Instagram,
  Sparkles,
  ExternalLink,
  Award,
  Users,
  CheckCircle2,
  Flame,
  Search,
  Video,
  Play,
  X,
  Volume2,
  VolumeX,
  Eye,
  Heart,
  Film,
  Clapperboard,
} from 'lucide-react';

import { MEDIA_ASSETS } from '../../config/mediaManager';

interface FitnessInfluencerPageProps {
  onBack: () => void;
  onJoinClick?: () => void;
}

export interface Influencer {
  id: number;
  name: string;
  handle: string;
  category: string;
  followers: string;
  photoUrl: string;
  bio: string;
  igUrl: string;
  verified: boolean;
}

export interface CollabVideoItem {
  id: number;
  title: string;
  influencerName: string;
  influencerHandle: string;
  influencerPhoto: string;
  videoUrl: string;
  posterUrl: string;
  duration: string;
  views: string;
  likes: string;
  category: string;
  description: string;
  igUrl: string;
}

const INFLUENCERS: Influencer[] = MEDIA_ASSETS.influencers;
const COLLAB_VIDEOS: CollabVideoItem[] = (MEDIA_ASSETS as any).collabVideos || [];

export const FitnessInfluencersPage: React.FC<FitnessInfluencerPageProps> = ({
  onBack,
  onJoinClick,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'influencers' | 'collabs'>('influencers');
  const [activeVideoModal, setActiveVideoModal] = useState<CollabVideoItem | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const categories = ['All', 'Bodybuilding', 'Functional', 'Powerlifting', 'Calisthenics', 'Physique', 'Pilates'];

  const filteredInfluencers = INFLUENCERS.filter((item) => {
    const matchesCat =
      selectedCategory === 'All' ||
      item.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleCircleClick = (igUrl: string) => {
    window.open(igUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-white selection:bg-purple-600 selection:text-white pb-20">
      {/* Top sticky navigation bar */}
      <header className="sticky top-0 z-40 bg-[#0C0C0C]/90 backdrop-blur-xl border-b border-neutral-800/80 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/80 text-white px-4 py-2 rounded-full transition-all cursor-pointer text-xs font-bold uppercase tracking-wider group"
          >
            <ArrowLeft className="w-4 h-4 text-purple-400 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Menu</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-fuchsia-600 via-rose-500 to-amber-500 text-white shadow-lg shadow-rose-950/40">
              <Instagram className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-sm font-black uppercase tracking-tight text-white flex items-center gap-1.5">
                Our Fitness Influencer
              </h1>
              <p className="text-[10px] text-neutral-400 font-medium">Royal Gym Ambassadors & Collab Studio</p>
            </div>
          </div>

          <button
            onClick={onJoinClick}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs uppercase px-5 py-2.5 rounded-full shadow-lg shadow-purple-900/30 transition-all cursor-pointer tracking-wider hidden sm:block"
          >
            Join Royal Gym
          </button>
        </div>
      </header>

      {/* Hero Header Banner */}
      <section className="relative overflow-hidden pt-10 pb-8 px-4 sm:px-8 border-b border-neutral-800/60 bg-gradient-to-b from-purple-950/20 via-neutral-950 to-[#0C0C0C]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-fuchsia-600/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-fuchsia-950/80 to-purple-950/80 border border-fuchsia-500/40 px-4 py-1.5 rounded-full text-xs font-bold text-fuchsia-300 uppercase tracking-widest shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-fuchsia-400 animate-pulse" />
            Official Royal Gym Ambassadors & Creator Squad
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
            Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-rose-400 to-amber-300">Fitness Influencer</span> Community
          </h2>

          <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            Meet the elite athletes, strength icons, and creators training at Royal Fitness Gym.
            Explore our community profile grid or check out our exclusive <strong className="text-amber-400 font-semibold">Collab Videos & Workout Reels!</strong>
          </p>

          {/* Navigation Section Switcher Tabs */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <button
              onClick={() => setActiveTab('influencers')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'influencers'
                  ? 'bg-gradient-to-r from-fuchsia-600 to-rose-600 text-white shadow-lg shadow-fuchsia-950/60 ring-2 ring-fuchsia-500/50'
                  : 'bg-neutral-900/90 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
              }`}
            >
              <Users className="w-4 h-4 text-fuchsia-300" />
              <span>Influencer Roster ({INFLUENCERS.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('collabs')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all cursor-pointer relative ${
                activeTab === 'collabs'
                  ? 'bg-gradient-to-r from-rose-600 via-purple-600 to-amber-500 text-white shadow-lg shadow-rose-950/60 ring-2 ring-rose-500/50'
                  : 'bg-neutral-900/90 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
              }`}
            >
              <Film className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>Collab Videos ({COLLAB_VIDEOS.length})</span>
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-rose-500 to-amber-500 text-[9px] font-black px-1.5 py-0.5 rounded-full text-white uppercase tracking-tighter animate-bounce">
                HOT
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 1: COLLAB VIDEOS REELS (Shown when activeTab === 'collabs') */}
      {activeTab === 'collabs' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-rose-600 to-amber-500 text-white shadow-lg shadow-rose-950/40">
                <Clapperboard className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold uppercase tracking-tight text-white flex items-center gap-2">
                  Gym Collab Videos & Workout Reels
                </h3>
                <p className="text-xs text-neutral-400">
                  Exclusive workout showdowns, studio reels & ambassador training sessions recorded at Royal Fitness Gym.
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 bg-neutral-900 border border-neutral-800 px-3.5 py-1.5 rounded-full text-xs font-medium text-neutral-300">
              <Video className="w-3.5 h-3.5 text-rose-400" />
              <span>Click any video to play full reel</span>
            </div>
          </div>

          {/* Collab Videos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {COLLAB_VIDEOS.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onPlay={() => setActiveVideoModal(video)}
              />
            ))}
          </div>
        </section>
      )}

      {/* SECTION 2: 3x3 CIRCLE INFLUENCERS GRID (Shown when activeTab === 'influencers') */}
      {activeTab === 'influencers' && (
        <section className="max-w-6xl mx-auto px-4 sm:px-8 py-10 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-fuchsia-400" />
              <h3 className="text-lg font-bold uppercase tracking-wider text-white">
                Official Ambassadors Roster ({filteredInfluencers.length})
              </h3>
            </div>
            <span className="text-xs text-neutral-400 font-mono flex items-center gap-1.5">
              <Instagram className="w-3.5 h-3.5 text-rose-400" /> Click circle to open Instagram
            </span>
          </div>

        {/* Search and Category Filter Bar */}
        <div className="space-y-3">
          <div className="relative max-w-xl mx-auto">
            <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search influencer name, handle, or specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-900/90 border border-neutral-700/80 rounded-full pl-11 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500 transition-colors shadow-inner"
            />
          </div>

          <div className="flex items-center justify-center flex-wrap gap-2 pt-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-fuchsia-600 to-rose-600 text-white shadow-md'
                    : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3x3 Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 pt-4">
          {filteredInfluencers.map((person, idx) => (
            <motion.div
              key={person.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => handleCircleClick(person.igUrl)}
              className="group relative bg-neutral-900/60 border border-neutral-800/80 hover:border-fuchsia-500/60 rounded-3xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:bg-neutral-900/90 hover:shadow-2xl hover:shadow-fuchsia-950/50 cursor-pointer"
            >
              {/* Instagram Gradient Ring Container */}
              <div className="relative mb-5">
                {/* Rotating Instagram Gradient Border Effect */}
                <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-fuchsia-600 opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 blur-[1px] group-hover:blur-0" />

                {/* Circular Profile Image */}
                <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden border-2 border-neutral-950 bg-neutral-950 shadow-xl">
                  <img
                    src={person.photoUrl}
                    alt={person.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Dark gradient overlay on hover with Instagram icon */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <div className="p-3 rounded-full bg-gradient-to-tr from-fuchsia-600 to-rose-500 text-white shadow-lg transform group-hover:scale-110 transition-transform">
                      <Instagram className="w-6 h-6" />
                    </div>
                  </div>
                </div>

                {/* Instagram Verified / Badge Pill */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-neutral-950 border border-fuchsia-500/60 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold text-fuchsia-300 uppercase tracking-widest flex items-center gap-1 shadow-md whitespace-nowrap">
                  <Instagram className="w-3 h-3 text-rose-400" />
                  <span>IG Profile</span>
                </div>
              </div>

              {/* Influencer Info */}
              <div className="space-y-1.5 w-full">
                <div className="flex items-center justify-center gap-1.5">
                  <h4 className="text-base font-extrabold text-white group-hover:text-fuchsia-300 transition-colors">
                    {person.name}
                  </h4>
                  {person.verified && (
                    <CheckCircle2 className="w-4 h-4 text-sky-400 fill-sky-400/20 shrink-0" />
                  )}
                </div>

                <div className="text-xs font-bold text-fuchsia-400 font-mono">
                  {person.handle}
                </div>

                <div className="inline-block bg-neutral-950 border border-neutral-800 text-[11px] text-neutral-300 font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                  {person.category}
                </div>

                <div className="text-[11px] font-bold text-amber-400 flex items-center justify-center gap-1 pt-1">
                  <Flame className="w-3.5 h-3.5 text-rose-500" />
                  <span>{person.followers}</span>
                </div>

                <p className="text-xs text-neutral-400 line-clamp-2 pt-2 leading-relaxed px-2">
                  {person.bio}
                </p>
              </div>

              {/* Action Button */}
              <div className="mt-5 w-full pt-3 border-t border-neutral-800/80">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCircleClick(person.igUrl);
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-neutral-950 hover:bg-gradient-to-r hover:from-fuchsia-600 hover:to-rose-600 border border-neutral-800 group-hover:border-fuchsia-500/50 text-neutral-200 hover:text-white py-2 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm"
                >
                  <Instagram className="w-4 h-4 text-rose-400 group-hover:text-white" />
                  <span>Visit Instagram</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredInfluencers.length === 0 && (
          <div className="py-16 text-center space-y-3 bg-neutral-900/40 rounded-3xl border border-neutral-800 p-8">
            <Users className="w-12 h-12 text-neutral-600 mx-auto" />
            <h4 className="text-base font-bold text-white uppercase tracking-wider">No Influencer Found</h4>
            <p className="text-xs text-neutral-400">Try clearing your search query or selecting "All" category.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold uppercase px-4 py-2 rounded-full transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>
      )}

      {/* Footer Banner */}
      <footer className="max-w-5xl mx-auto px-4 sm:px-8 mt-12">
        <div className="bg-gradient-to-r from-purple-950/80 via-neutral-900 to-rose-950/80 border border-fuchsia-500/30 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-2xl">
          <Award className="w-10 h-10 text-amber-400 mx-auto" />
          <h3 className="text-xl font-black uppercase text-white tracking-tight">
            Are You A Fitness Influencer or Creator?
          </h3>
          <p className="text-xs text-neutral-300 max-w-xl mx-auto leading-relaxed">
            Collaborate with Royal Fitness Gym! Get exclusive VIP access to our 3D Content Studio, heavy lifting platforms, and brand sponsorship opportunities.
          </p>
          <button
            onClick={onJoinClick}
            className="bg-gradient-to-r from-fuchsia-600 via-rose-500 to-amber-500 text-white font-extrabold text-xs uppercase px-8 py-3 rounded-full shadow-xl hover:scale-105 transition-all cursor-pointer tracking-wider"
          >
            Apply for Sponsorship & Collabs
          </button>
        </div>
      </footer>

      {/* Interactive Video Modal Lightbox */}
      <AnimatePresence>
        {activeVideoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            onClick={() => setActiveVideoModal(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl shadow-purple-950/80"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveVideoModal(null)}
                className="absolute top-4 right-4 z-20 bg-black/60 hover:bg-neutral-800 text-white p-2.5 rounded-full backdrop-blur-md transition-all cursor-pointer border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Video Player Box */}
              <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden">
                <video
                  src={activeVideoModal.videoUrl}
                  poster={activeVideoModal.posterUrl}
                  autoPlay
                  controls
                  loop
                  muted={isMuted}
                  className="w-full h-full object-contain"
                />

                {/* Sound Toggle Floating Button */}
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="absolute bottom-4 left-4 z-10 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full border border-white/20 backdrop-blur-md text-xs font-bold flex items-center gap-1.5 px-3"
                >
                  {isMuted ? (
                    <>
                      <VolumeX className="w-4 h-4 text-rose-400" />
                      <span>Unmute</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4 text-emerald-400" />
                      <span>Sound On</span>
                    </>
                  )}
                </button>
              </div>

              {/* Video Info Content */}
              <div className="p-6 sm:p-8 space-y-4 bg-neutral-900">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800 pb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={activeVideoModal.influencerPhoto}
                      alt={activeVideoModal.influencerName}
                      className="w-12 h-12 rounded-full object-cover border-2 border-fuchsia-500 shadow-md"
                    />
                    <div>
                      <h4 className="text-base font-extrabold text-white">
                        {activeVideoModal.influencerName}
                      </h4>
                      <p className="text-xs font-mono text-fuchsia-400 font-semibold">
                        {activeVideoModal.influencerHandle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-bold text-neutral-300">
                    <span className="flex items-center gap-1 bg-neutral-950 px-3 py-1.5 rounded-full border border-neutral-800">
                      <Eye className="w-3.5 h-3.5 text-rose-400" />
                      {activeVideoModal.views}
                    </span>
                    <span className="flex items-center gap-1 bg-neutral-950 px-3 py-1.5 rounded-full border border-neutral-800 text-rose-300">
                      <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                      {activeVideoModal.likes}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="inline-block bg-fuchsia-950/80 border border-fuchsia-500/40 px-3 py-1 rounded-full text-[10px] font-extrabold text-fuchsia-300 uppercase tracking-wider mb-2">
                    {activeVideoModal.category}
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight">
                    {activeVideoModal.title}
                  </h3>
                  <p className="text-xs text-neutral-300 pt-2 leading-relaxed">
                    {activeVideoModal.description}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-neutral-800">
                  <span className="text-xs text-neutral-400">
                    Recorded live at Royal Fitness Gym Content Studio & Heavy Zone
                  </span>

                  <button
                    onClick={() => window.open(activeVideoModal.igUrl, '_blank', 'noopener,noreferrer')}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-fuchsia-600 via-rose-500 to-amber-500 hover:from-fuchsia-500 hover:to-amber-400 text-white px-6 py-2.5 rounded-full font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-rose-950/50 cursor-pointer"
                  >
                    <Instagram className="w-4 h-4" />
                    <span>Watch Full Reel on Instagram</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* Video Card Helper Component */
const VideoCard: React.FC<{
  video: CollabVideoItem;
  onPlay: () => void;
}> = ({ video, onPlay }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onPlay}
      className="group relative bg-neutral-900/80 border border-neutral-800 hover:border-rose-500/60 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-rose-950/40 cursor-pointer flex flex-col"
    >
      {/* Thumbnail / Video Preview Box */}
      <div className="relative aspect-video bg-neutral-950 overflow-hidden">
        {/* Video element plays muted on hover */}
        <video
          ref={videoRef}
          src={video.videoUrl}
          poster={video.posterUrl}
          muted
          loop
          playsInline
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 group-hover:opacity-60 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
          <span className="bg-black/70 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-full text-[10px] font-extrabold text-amber-300 uppercase tracking-widest flex items-center gap-1">
            <Film className="w-3 h-3 text-amber-400" />
            {video.category}
          </span>

          <span className="bg-black/70 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-full text-[10px] font-bold text-white font-mono">
            {video.duration}
          </span>
        </div>

        {/* Center Big Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="p-4 rounded-full bg-gradient-to-tr from-rose-600 to-fuchsia-600 text-white shadow-2xl shadow-rose-950/80 transform group-hover:scale-110 transition-transform duration-300 group-hover:bg-gradient-to-tr group-hover:from-fuchsia-500 group-hover:to-amber-500">
            <Play className="w-6 h-6 fill-white ml-0.5" />
          </div>
        </div>

        {/* Bottom stats bar */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10 text-[10px] font-bold text-neutral-300">
          <span className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
            <Eye className="w-3 h-3 text-rose-400" />
            {video.views}
          </span>
          <span className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-rose-300">
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
            {video.likes}
          </span>
        </div>
      </div>

      {/* Card Info Details */}
      <div className="p-5 space-y-3 flex-1 flex flex-col justify-between bg-neutral-900/90">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <img
              src={video.influencerPhoto}
              alt={video.influencerName}
              className="w-8 h-8 rounded-full object-cover border border-rose-500/80 shrink-0"
            />
            <div className="truncate">
              <span className="text-xs font-bold text-white block truncate">
                {video.influencerName}
              </span>
              <span className="text-[10px] font-mono text-fuchsia-400 block truncate">
                {video.influencerHandle}
              </span>
            </div>
          </div>

          <h4 className="text-sm font-extrabold text-white group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug">
            {video.title}
          </h4>

          <p className="text-xs text-neutral-400 line-clamp-2 pt-1.5 leading-relaxed">
            {video.description}
          </p>
        </div>

        <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-xs font-bold text-fuchsia-400 group-hover:text-rose-400 transition-colors">
          <span className="uppercase tracking-wider text-[10px]">Watch Video Reel</span>
          <Play className="w-3.5 h-3.5" />
        </div>
      </div>
    </motion.div>
  );
};

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Camera,
  Users,
  Calculator,
  Flame,
  Crown,
  ChevronRight,
  ExternalLink,
  Sparkles,
  LogIn,
  KeyRound,
  Mail,
  Instagram,
  Trophy,
} from 'lucide-react';

export type MenuCategory =
  | 'champion-competition'
  | 'gym-pictures'
  | 'member-pictures'
  | 'fitness-influencer'
  | 'body-fat-calc'
  | 'protein-calc'
  | 'membership-fees';

import { GoogleAuthButton } from '../GoogleAuthButton';
import { MEDIA_ASSETS } from '../../config/mediaManager';

interface GymMenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (category: MenuCategory) => void;
  onJoinClick?: () => void;
  onOpenEnquiries?: () => void;
}

const MENU_ITEMS = [
  {
    id: 'champion-competition' as MenuCategory,
    num: '01',
    title: 'Champion Of The Competition',
    subtitle: 'Official Winners across Powerlifting, Strength & Endurance Exercises',
    tag: 'Hall of Fame',
    icon: Trophy,
    color: 'from-amber-900/40 to-neutral-900',
    borderColor: 'hover:border-amber-500/50',
    imgUrl: MEDIA_ASSETS.menuOverlay[0].imgUrl,
  },
  {
    id: 'gym-pictures' as MenuCategory,
    num: '02',
    title: 'Pictures of the Gym',
    subtitle: 'Explore 3D Equipment, Free Weights, Cardio & Content Studio',
    tag: 'Facility Gallery',
    icon: Camera,
    color: 'from-purple-900/40 to-neutral-900',
    borderColor: 'hover:border-purple-500/50',
    imgUrl: MEDIA_ASSETS.menuOverlay[1].imgUrl,
  },
  {
    id: 'member-pictures' as MenuCategory,
    num: '03',
    title: 'Pictures of Members',
    subtitle: 'Real Transformation Champions, Group Sessions & Spotlights',
    tag: 'Royal Community',
    icon: Users,
    color: 'from-blue-900/40 to-neutral-900',
    borderColor: 'hover:border-blue-500/50',
    imgUrl: MEDIA_ASSETS.menuOverlay[2].imgUrl,
  },
  {
    id: 'fitness-influencer' as MenuCategory,
    num: '04',
    title: 'Our Fitness Influencer',
    subtitle: 'Meet Royal Gym Athletes, Creators & Instagram Influencers',
    tag: 'Ambassadors & Creators',
    icon: Instagram,
    color: 'from-fuchsia-900/40 to-neutral-900',
    borderColor: 'hover:border-fuchsia-500/50',
    imgUrl: MEDIA_ASSETS.menuOverlay[3].imgUrl,
  },
  {
    id: 'body-fat-calc' as MenuCategory,
    num: '05',
    title: 'Body Fat Calculator',
    subtitle: 'US Navy Biometric Estimation, Fat Mass & Lean Muscle Analysis',
    tag: 'Biometric Tool',
    icon: Calculator,
    color: 'from-cyan-900/40 to-neutral-900',
    borderColor: 'hover:border-cyan-500/50',
    imgUrl: MEDIA_ASSETS.menuOverlay[4].imgUrl,
  },
  {
    id: 'protein-calc' as MenuCategory,
    num: '06',
    title: 'Body Weight & Protein Calculator',
    subtitle: 'Daily Protein Target, Calories, Macros & Custom Meal Guides',
    tag: 'Performance Nutrition',
    icon: Flame,
    color: 'from-rose-900/40 to-neutral-900',
    borderColor: 'hover:border-rose-500/50',
    imgUrl: MEDIA_ASSETS.menuOverlay[5].imgUrl,
  },
  {
    id: 'membership-fees' as MenuCategory,
    num: '07',
    title: 'Memberships Fees & Plans',
    subtitle: 'Day Pass, Monthly Royal Pass, VIP Annual Elite & Coaching Bundles',
    tag: 'Rates & Benefits',
    icon: Crown,
    color: 'from-amber-900/40 to-neutral-900',
    borderColor: 'hover:border-amber-500/50',
    imgUrl: MEDIA_ASSETS.menuOverlay[6].imgUrl,
  },
];

export const GymMenuOverlay: React.FC<GymMenuOverlayProps> = ({
  isOpen,
  onClose,
  onSelectCategory,
  onJoinClick,
  onOpenEnquiries,
}) => {
  if (!isOpen) return null;

  const handleOpenNewTab = (catId: MenuCategory) => {
    const url = `${window.location.origin}${window.location.pathname}#${catId}`;
    window.open(url, '_blank');
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-[#0C0C0C]/95 backdrop-blur-xl text-white font-['Kanit',sans-serif] flex flex-col overflow-y-auto select-none"
      >
        {/* Top Header Bar */}
        <div className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-neutral-800/80">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#B600A8] animate-pulse" />
            <span className="font-bold uppercase tracking-widest text-sm text-[#BBCCD7]">
              Royal Fitness
            </span>
          </div>

          <div className="flex items-center gap-3">
            <GoogleAuthButton />
            <button
              onClick={onClose}
              className="flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white px-4 py-2 rounded-full border border-neutral-800 transition-all cursor-pointer text-xs font-semibold uppercase tracking-wider"
            >
              <span>Close</span>
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Container */}
        <div className="w-full max-w-7xl mx-auto px-6 py-10 flex-1 flex flex-col justify-center">
          <div className="mb-10">
            <div className="flex items-center gap-2 text-[#BBCCD7] text-xs font-semibold tracking-widest uppercase mb-2">
              <Sparkles className="w-4 h-4 text-[#B600A8]" />
              <span>Select Option Below</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              Royal Gym Explorer Menu
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base font-light mt-2 max-w-xl">
              Choose any option below to explore competition champions, equipment galleries, biometric calculators, and membership plans.
            </p>
          </div>

          {/* 5 Menu Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {MENU_ITEMS.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.07 }}
                  onClick={() => onSelectCategory(item.id)}
                  className={`group relative bg-neutral-900/80 rounded-2xl border border-neutral-800 p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:scale-[1.02] shadow-xl overflow-hidden ${item.borderColor}`}
                >
                  {/* Background Ambient Glow */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-30 group-hover:opacity-60 transition-opacity pointer-events-none`}
                  />

                  <div>
                    {/* Top Tag & Number */}
                    <div className="flex items-center justify-between mb-4 relative z-10">
                      <span className="text-xs font-bold text-[#BBCCD7] bg-neutral-950/80 px-3 py-1 rounded-full border border-neutral-800 uppercase tracking-wider">
                        {item.tag}
                      </span>
                      <span className="text-2xl font-black text-neutral-600 group-hover:text-white transition-colors">
                        {item.num}
                      </span>
                    </div>

                    {/* Icon & Title */}
                    <div className="relative z-10 flex items-start gap-3 mb-3">
                      <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-[#B600A8] group-hover:text-white group-hover:bg-[#B600A8] transition-all">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-extrabold text-white group-hover:text-[#BBCCD7] transition-colors leading-tight">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    <p className="relative z-10 text-xs text-neutral-400 font-light leading-relaxed mb-6">
                      {item.subtitle}
                    </p>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="relative z-10 pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs font-semibold text-white">
                    <span className="flex items-center gap-1 group-hover:text-[#BBCCD7] transition-colors uppercase tracking-wider">
                      Open Full Page <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenNewTab(item.id);
                      }}
                      className="text-neutral-500 hover:text-white p-1.5 rounded-lg bg-neutral-950 hover:bg-neutral-800 transition-colors"
                      title="Open in new window tab"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Footer Bar in Overlay */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-neutral-800 text-xs text-neutral-500">
            <span>Royal Fitness Gym &bull; Where Strength Meets Discipline 👑</span>
            {onJoinClick && (
              <button
                onClick={onJoinClick}
                className="bg-white text-black hover:bg-neutral-200 px-5 py-2.5 rounded-full font-bold uppercase tracking-wider transition-colors cursor-pointer text-xs"
              >
                Join Gym Now
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

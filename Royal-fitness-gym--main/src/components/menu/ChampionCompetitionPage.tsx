import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Trophy } from 'lucide-react';
import { MEDIA_ASSETS } from '../../config/mediaManager';

interface ChampionCompetitionPageProps {
  onBack: () => void;
  onJoinClick?: () => void;
}

export interface ChampionItem {
  id: number;
  exerciseName: string;
  personName: string;
  photoUrl: string;
}

const CHAMPIONS: ChampionItem[] = (MEDIA_ASSETS as any).competitionChampions || [];

export const ChampionCompetitionPage: React.FC<ChampionCompetitionPageProps> = ({
  onBack,
}) => {
  return (
    <div className="min-h-screen bg-[#0C0C0C] text-white selection:bg-amber-500 selection:text-black pb-20 font-['Kanit',sans-serif]">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#0C0C0C]/90 backdrop-blur-xl border-b border-neutral-800/80 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/80 text-white px-4 py-2 rounded-full transition-all cursor-pointer text-xs font-bold uppercase tracking-wider group"
          >
            <ArrowLeft className="w-4 h-4 text-amber-400 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Menu</span>
          </button>

          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-300 text-black shadow-lg shadow-amber-950/40">
              <Trophy className="w-5 h-5 fill-black" />
            </div>
            <h1 className="text-sm sm:text-base font-black uppercase tracking-tight text-white">
              Champion Of The Competition
            </h1>
          </div>

          <div className="w-20 hidden sm:block" />
        </div>
      </header>

      {/* Main Grid Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
        <div className="mb-10 text-center">
          <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white flex items-center justify-center gap-3">
            <Trophy className="w-8 h-8 text-amber-400" />
            <span>Champion Of The Competition</span>
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-2 font-light">
            Royal Fitness Gym Competition Winners
          </p>
        </div>

        {/* Champions Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {CHAMPIONS.map((champ, idx) => (
            <motion.div
              key={champ.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className="bg-neutral-900/90 border border-neutral-800 rounded-3xl overflow-hidden flex flex-col shadow-xl hover:border-amber-500/50 transition-all group"
            >
              {/* Photo Box */}
              <div className="relative aspect-[4/3] bg-neutral-950 overflow-hidden">
                <img
                  src={champ.photoUrl}
                  alt={`${champ.personName} - ${champ.exerciseName}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Minimal Info: Exercise Name & Person Name */}
              <div className="p-5 space-y-2 bg-neutral-900 text-center">
                {/* Exercise Name */}
                <div className="text-xs font-black uppercase tracking-widest text-amber-400">
                  {champ.exerciseName}
                </div>

                {/* Person Name */}
                <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                  {champ.personName}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Dumbbell, Flame, Utensils, CheckCircle, Zap, ShieldCheck } from 'lucide-react';

interface ProteinCalcPageProps {
  onBack: () => void;
  onJoinClick?: () => void;
}

export const ProteinCalcPage: React.FC<ProteinCalcPageProps> = ({
  onBack,
  onJoinClick,
}) => {
  const [weightKg, setWeightKg] = useState<number>(75);
  const [heightCm, setHeightCm] = useState<number>(175);
  const [age, setAge] = useState<number>(26);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activity, setActivity] = useState<number>(1.55); // Moderate active default
  const [goal, setGoal] = useState<'muscle' | 'fatloss' | 'maintain'>('muscle');

  // BMR (Mifflin-St Jeor)
  const bmr =
    gender === 'male'
      ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
      : 10 * weightKg + 6.25 * heightCm - 5 * age - 161;

  const tdee = Math.round(bmr * activity);

  // Target Calories based on goal
  let targetCalories = tdee;
  let proteinRatioPerKg = 2.0; // g protein per kg

  if (goal === 'muscle') {
    targetCalories = Math.round(tdee + 300); // Surplus
    proteinRatioPerKg = 2.2;
  } else if (goal === 'fatloss') {
    targetCalories = Math.round(tdee - 450); // Deficit
    proteinRatioPerKg = 2.4; // Higher protein in deficit to preserve muscle
  } else {
    targetCalories = tdee;
    proteinRatioPerKg = 1.8;
  }

  const dailyProteinGrams = Math.round(weightKg * proteinRatioPerKg);
  const proteinCalories = dailyProteinGrams * 4;

  // Fat ~ 25% of calories
  const dailyFatGrams = Math.round((targetCalories * 0.25) / 9);
  const fatCalories = dailyFatGrams * 9;

  // Remaining calories to Carbs
  const carbCalories = Math.max(0, targetCalories - proteinCalories - fatCalories);
  const dailyCarbGrams = Math.round(carbCalories / 4);

  const proteinPerMeal = Math.round(dailyProteinGrams / 4);

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
              Get Royal Nutrition Plan
            </button>
          )}
        </div>
      </div>

      {/* Main Title Banner */}
      <div className="max-w-7xl mx-auto w-full mb-10">
        <div className="flex items-center gap-2 text-[#BBCCD7] text-xs font-semibold tracking-widest uppercase mb-2">
          <Dumbbell className="w-4 h-4 text-[#B600A8]" />
          <span>Performance Nutrition Suite</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4">
          Body Weight & Protein Intake Calculator 🥩
        </h1>
        <p className="text-neutral-400 max-w-2xl text-base sm:text-lg font-light leading-relaxed">
          Calculate your target daily protein requirements, maintenance calories, macronutrient split, and per-meal intake based on your exact fitness goals.
        </p>
      </div>

      {/* Calculator Grid */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Left Inputs */}
        <div className="lg:col-span-7 bg-neutral-900/80 p-6 sm:p-8 rounded-2xl border border-neutral-800 flex flex-col gap-6">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
            <h2 className="text-lg font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#B600A8]" /> Athlete Profile & Goals
            </h2>
            <span className="text-xs text-neutral-500">Mifflin-St Jeor Engine</span>
          </div>

          {/* Goal Selector */}
          <div>
            <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2 block">
              Primary Goal
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setGoal('muscle')}
                className={`py-3 px-3 rounded-xl font-medium text-xs sm:text-sm transition-all cursor-pointer border flex flex-col items-center gap-1 ${
                  goal === 'muscle'
                    ? 'bg-white text-black font-bold border-white shadow-md'
                    : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <span>💪 Muscle Gain</span>
                <span className="text-[10px] opacity-75">Hypertrophy & Strength</span>
              </button>

              <button
                type="button"
                onClick={() => setGoal('fatloss')}
                className={`py-3 px-3 rounded-xl font-medium text-xs sm:text-sm transition-all cursor-pointer border flex flex-col items-center gap-1 ${
                  goal === 'fatloss'
                    ? 'bg-white text-black font-bold border-white shadow-md'
                    : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <span>🔥 Fat Loss</span>
                <span className="text-[10px] opacity-75">Shred & Recomposition</span>
              </button>

              <button
                type="button"
                onClick={() => setGoal('maintain')}
                className={`py-3 px-3 rounded-xl font-medium text-xs sm:text-sm transition-all cursor-pointer border flex flex-col items-center gap-1 ${
                  goal === 'maintain'
                    ? 'bg-white text-black font-bold border-white shadow-md'
                    : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <span>⚡ Maintenance</span>
                <span className="text-[10px] opacity-75">Performance & Energy</span>
              </button>
            </div>
          </div>

          {/* Input Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1 block">
                Body Weight (kg)
              </label>
              <input
                type="number"
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#BBCCD7] px-4 py-3 rounded-xl text-white font-medium focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1 block">
                Height (cm)
              </label>
              <input
                type="number"
                value={heightCm}
                onChange={(e) => setHeightCm(Number(e.target.value))}
                className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#BBCCD7] px-4 py-3 rounded-xl text-white font-medium focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1 block">
                Age
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#BBCCD7] px-4 py-3 rounded-xl text-white font-medium focus:outline-none"
              />
            </div>
          </div>

          {/* Activity Level Selector */}
          <div>
            <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2 block">
              Daily Activity Level
            </label>
            <select
              value={activity}
              onChange={(e) => setActivity(Number(e.target.value))}
              className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#BBCCD7] px-4 py-3 rounded-xl text-white font-medium focus:outline-none cursor-pointer"
            >
              <option value={1.2}>Sedentary (Desk Job, little to no exercise)</option>
              <option value={1.375}>Lightly Active (1-3 gym workouts/week)</option>
              <option value={1.55}>Moderately Active (3-5 intense gym workouts/week)</option>
              <option value={1.725}>Very Active (6-7 heavy gym sessions/week)</option>
              <option value={1.9}>Extreme Athlete (2x training/day or physical labor)</option>
            </select>
          </div>

          {/* Recommended Protein Sources */}
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/80 mt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#BBCCD7] mb-2 flex items-center gap-1.5">
              <Utensils className="w-3.5 h-3.5 text-[#B600A8]" /> Top Protein Sources
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-neutral-400">
              <div className="bg-neutral-900 p-2 rounded-lg border border-neutral-800 text-center">
                <span className="font-bold text-white block">Chicken Breast</span>
                <span className="text-[10px] text-neutral-500">31g per 100g</span>
              </div>
              <div className="bg-neutral-900 p-2 rounded-lg border border-neutral-800 text-center">
                <span className="font-bold text-white block">Whey Isolate</span>
                <span className="text-[10px] text-neutral-500">25g per scoop</span>
              </div>
              <div className="bg-neutral-900 p-2 rounded-lg border border-neutral-800 text-center">
                <span className="font-bold text-white block">Lean Beef</span>
                <span className="text-[10px] text-neutral-500">26g per 100g</span>
              </div>
              <div className="bg-neutral-900 p-2 rounded-lg border border-neutral-800 text-center">
                <span className="font-bold text-white block">Eggs / Whites</span>
                <span className="text-[10px] text-neutral-500">6g per egg</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Output Display */}
        <div className="lg:col-span-5 bg-gradient-to-b from-neutral-900 to-black p-6 sm:p-8 rounded-2xl border border-neutral-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-6">
              <span className="text-xs uppercase tracking-widest text-[#BBCCD7] font-semibold">
                Daily Target Output
              </span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-[#B600A8]/20 text-[#B600A8]">
                {proteinRatioPerKg}g / kg bodyweight
              </span>
            </div>

            {/* Big Protein Output Box */}
            <div className="text-center my-4 p-6 rounded-2xl bg-neutral-950/80 border border-neutral-800">
              <div className="text-neutral-400 text-xs font-semibold uppercase tracking-wider mb-1">
                Target Daily Protein
              </div>
              <div className="text-5xl sm:text-6xl font-black text-white tracking-tight my-2">
                {dailyProteinGrams}<span className="text-2xl font-light text-[#BBCCD7]">g</span>
              </div>
              <div className="text-xs font-semibold text-emerald-400">
                ~{proteinPerMeal}g across 4 meals / day
              </div>
            </div>

            {/* Calories & Macro Breakdown */}
            <div className="grid grid-cols-3 gap-3 my-6">
              <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 text-center">
                <span className="text-[10px] text-neutral-500 uppercase font-bold block mb-0.5">Calories</span>
                <span className="text-lg font-bold text-white">{targetCalories}</span>
                <span className="text-[9px] text-neutral-500 block">kcal/day</span>
              </div>

              <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 text-center">
                <span className="text-[10px] text-neutral-500 uppercase font-bold block mb-0.5">Carbs</span>
                <span className="text-lg font-bold text-cyan-400">{dailyCarbGrams}g</span>
                <span className="text-[9px] text-neutral-500 block">energy</span>
              </div>

              <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 text-center">
                <span className="text-[10px] text-neutral-500 uppercase font-bold block mb-0.5">Fats</span>
                <span className="text-lg font-bold text-amber-400">{dailyFatGrams}g</span>
                <span className="text-[9px] text-neutral-500 block">hormones</span>
              </div>
            </div>

            {/* Summary */}
            <div className="p-4 rounded-xl bg-neutral-900/90 border border-neutral-800 text-xs text-neutral-300 leading-relaxed">
              <div className="font-bold text-white flex items-center gap-1.5 uppercase tracking-wider text-[11px] mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Royal Hydration & Protein Bar
              </div>
              <p className="text-neutral-400">
                Royal Fitness Gym provides complimentary purified protein shakers and post-workout hydration taps for all members after heavy training sessions.
              </p>
            </div>
          </div>

          {onJoinClick && (
            <button
              onClick={onJoinClick}
              className="mt-6 w-full py-3.5 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-4 h-4" /> Start Training at Royal Gym
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

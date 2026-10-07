import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Calculator, Activity, CheckCircle, Info, Flame, ShieldAlert } from 'lucide-react';

interface BodyFatCalcPageProps {
  onBack: () => void;
  onJoinClick?: () => void;
}

export const BodyFatCalcPage: React.FC<BodyFatCalcPageProps> = ({
  onBack,
  onJoinClick,
}) => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<number>(25);
  const [heightCm, setHeightCm] = useState<number>(178);
  const [weightKg, setWeightKg] = useState<number>(78);
  const [waistCm, setWaistCm] = useState<number>(82);
  const [neckCm, setNeckCm] = useState<number>(38);
  const [hipCm, setHipCm] = useState<number>(95);

  // US Navy Formula for Body Fat %
  // Male: 86.010 * log10(waist - neck) - 70.041 * log10(height) + 36.76
  // Female: 163.205 * log10(waist + hip - neck) - 97.684 * log10(height) - 78.387
  const calculateBodyFat = () => {
    try {
      if (gender === 'male') {
        const waistMinusNeck = waistCm - neckCm;
        if (waistMinusNeck <= 0) return 15;
        const bf =
          86.01 * Math.log10(waistMinusNeck) -
          70.041 * Math.log10(heightCm) +
          36.76;
        return Math.min(Math.max(Math.round(bf * 10) / 10, 4), 50);
      } else {
        const waistHipMinusNeck = waistCm + hipCm - neckCm;
        if (waistHipMinusNeck <= 0) return 22;
        const bf =
          163.205 * Math.log10(waistHipMinusNeck) -
          97.684 * Math.log10(heightCm) -
          78.387;
        return Math.min(Math.max(Math.round(bf * 10) / 10, 8), 55);
      }
    } catch {
      return 15;
    }
  };

  const bodyFatPercent = calculateBodyFat();
  const fatMass = Math.round(((weightKg * bodyFatPercent) / 100) * 10) / 10;
  const leanMass = Math.round((weightKg - fatMass) * 10) / 10;

  const getCategory = (bf: number, g: 'male' | 'female') => {
    if (g === 'male') {
      if (bf < 6) return { title: 'Essential Fat / Competition', color: 'text-amber-400', badge: 'Ultra Lean' };
      if (bf <= 13) return { title: 'Athletic / Shredded', color: 'text-emerald-400', badge: 'Peak Fitness' };
      if (bf <= 17) return { title: 'Fit & Toned', color: 'text-cyan-400', badge: 'Optimal Health' };
      if (bf <= 24) return { title: 'Average', color: 'text-blue-400', badge: 'Good Base' };
      return { title: 'Above Average / High Fat', color: 'text-rose-400', badge: 'Action Required' };
    } else {
      if (bf < 13) return { title: 'Essential Fat / Competition', color: 'text-amber-400', badge: 'Ultra Lean' };
      if (bf <= 20) return { title: 'Athletic / Fit', color: 'text-emerald-400', badge: 'Peak Fitness' };
      if (bf <= 24) return { title: 'Toned & Healthy', color: 'text-cyan-400', badge: 'Optimal Health' };
      if (bf <= 31) return { title: 'Average', color: 'text-blue-400', badge: 'Good Base' };
      return { title: 'Above Average / High Fat', color: 'text-rose-400', badge: 'Action Required' };
    }
  };

  const catInfo = getCategory(bodyFatPercent, gender);

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
              Get Custom Coaching
            </button>
          )}
        </div>
      </div>

      {/* Main Title Banner */}
      <div className="max-w-7xl mx-auto w-full mb-10">
        <div className="flex items-center gap-2 text-[#BBCCD7] text-xs font-semibold tracking-widest uppercase mb-2">
          <Calculator className="w-4 h-4 text-[#B600A8]" />
          <span>Royal Fitness Assessment</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4">
          Body Fat Percentage Calculator 📊
        </h1>
        <p className="text-neutral-400 max-w-2xl text-base sm:text-lg font-light leading-relaxed">
          Accurately calculate your estimated body fat %, fat mass, and lean muscle mass using standard US Navy biometric formulas.
        </p>
      </div>

      {/* Calculator Grid */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Left Inputs */}
        <div className="lg:col-span-7 bg-neutral-900/80 p-6 sm:p-8 rounded-2xl border border-neutral-800 flex flex-col gap-6">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
            <h2 className="text-lg font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#B600A8]" /> Biometric Inputs
            </h2>
            <span className="text-xs text-neutral-500">US Navy Standard</span>
          </div>

          {/* Gender Selector */}
          <div>
            <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2 block">
              Gender
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setGender('male')}
                className={`py-3 rounded-xl font-medium text-sm transition-all cursor-pointer border ${
                  gender === 'male'
                    ? 'bg-white text-black font-bold border-white shadow-md'
                    : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:border-neutral-700'
                }`}
              >
                Male
              </button>
              <button
                type="button"
                onClick={() => setGender('female')}
                className={`py-3 rounded-xl font-medium text-sm transition-all cursor-pointer border ${
                  gender === 'female'
                    ? 'bg-white text-black font-bold border-white shadow-md'
                    : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:border-neutral-700'
                }`}
              >
                Female
              </button>
            </div>
          </div>

          {/* Number Inputs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1 block">
                Age (years)
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
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
                Current Weight (kg)
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
                Neck Circumference (cm)
              </label>
              <input
                type="number"
                value={neckCm}
                onChange={(e) => setNeckCm(Number(e.target.value))}
                className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#BBCCD7] px-4 py-3 rounded-xl text-white font-medium focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1 block">
                Waist Circumference (at navel, cm)
              </label>
              <input
                type="number"
                value={waistCm}
                onChange={(e) => setWaistCm(Number(e.target.value))}
                className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#BBCCD7] px-4 py-3 rounded-xl text-white font-medium focus:outline-none"
              />
            </div>

            {gender === 'female' && (
              <div>
                <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1 block">
                  Hip Circumference (widest point, cm)
                </label>
                <input
                  type="number"
                  value={hipCm}
                  onChange={(e) => setHipCm(Number(e.target.value))}
                  className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#BBCCD7] px-4 py-3 rounded-xl text-white font-medium focus:outline-none"
                />
              </div>
            )}
          </div>

          <div className="text-xs text-neutral-500 flex items-center gap-2 pt-2 border-t border-neutral-800">
            <Info className="w-4 h-4 text-neutral-400 shrink-0" />
            <span>Measure snugly around the neck and waist parallel to the floor without compressing skin.</span>
          </div>
        </div>

        {/* Right Output Display */}
        <div className="lg:col-span-5 bg-gradient-to-b from-neutral-900 to-black p-6 sm:p-8 rounded-2xl border border-neutral-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-6">
              <span className="text-xs uppercase tracking-widest text-[#BBCCD7] font-semibold">
                Calculation Output
              </span>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-md bg-neutral-800 ${catInfo.color}`}>
                {catInfo.badge}
              </span>
            </div>

            {/* Big Output Circle / Card */}
            <div className="text-center my-6 p-6 rounded-2xl bg-neutral-950/80 border border-neutral-800">
              <div className="text-neutral-400 text-xs font-semibold uppercase tracking-wider mb-1">
                Estimated Body Fat
              </div>
              <div className="text-5xl sm:text-6xl font-black text-white tracking-tight my-2">
                {bodyFatPercent}<span className="text-3xl font-light text-[#B600A8]">%</span>
              </div>
              <div className={`text-sm font-semibold ${catInfo.color}`}>
                {catInfo.title}
              </div>
            </div>

            {/* Breakdown Cards */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800/80">
                <div className="text-xs text-neutral-500 font-medium uppercase mb-1">
                  Fat Mass
                </div>
                <div className="text-xl font-bold text-white">
                  {fatMass} <span className="text-xs font-light text-neutral-400">kg</span>
                </div>
              </div>

              <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800/80">
                <div className="text-xs text-neutral-500 font-medium uppercase mb-1">
                  Lean Muscle Mass
                </div>
                <div className="text-xl font-bold text-emerald-400">
                  {leanMass} <span className="text-xs font-light text-neutral-400">kg</span>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="p-4 rounded-xl bg-neutral-900/90 border border-neutral-800 text-xs text-neutral-300 leading-relaxed flex flex-col gap-2">
              <div className="font-bold text-white flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <Flame className="w-3.5 h-3.5 text-[#B600A8]" /> Royal Gym Recommendation
              </div>
              {bodyFatPercent > 22 && gender === 'male' && (
                <p>Focus on a moderate caloric deficit with high protein (2g/kg) combined with 3-4 heavy resistance sessions/week at Royal Fitness Gym.</p>
              )}
              {bodyFatPercent <= 22 && bodyFatPercent >= 10 && gender === 'male' && (
                <p>Ideal body composition for progressive muscle hypertrophy and strength PRs. Maintain protein intake and progressive overload!</p>
              )}
              {bodyFatPercent < 10 && gender === 'male' && (
                <p>Shredded athletic physique. Ensure sufficient healthy fats and calorie support to sustain hormonal balance and high energy.</p>
              )}
              {bodyFatPercent > 30 && gender === 'female' && (
                <p>Combine strength training with functional cardio sessions at Royal Fitness Gym to accelerate fat loss while preserving lean muscle.</p>
              )}
              {bodyFatPercent <= 30 && gender === 'female' && (
                <p>Great body composition! Focus on progressive weight training and structured nutrition for optimal energy and tone.</p>
              )}
            </div>
          </div>

          {onJoinClick && (
            <button
              onClick={onJoinClick}
              className="mt-6 w-full py-3.5 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-4 h-4" /> Book Royal Personal Trainer Assessment
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

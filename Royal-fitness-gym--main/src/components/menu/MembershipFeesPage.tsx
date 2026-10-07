import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Check, Crown, Shield, Zap, Sparkles, HelpCircle } from 'lucide-react';

interface MembershipFeesPageProps {
  onBack: () => void;
  onJoinClick?: (planName?: string) => void;
}

const MEMBERSHIP_PLANS = [
  {
    id: '1month',
    name: '1 Month Membership',
    badge: 'Monthly Plan',
    price: '₹750',
    period: 'for 1 month',
    description: 'Full access to Royal Fitness unisex gym facilities, strength & cardio sections.',
    highlight: false,
    features: [
      'Full Gym Facility Access',
      'All Weight & Cardio Equipment',
      'Trainer Guidance & Support',
      'Locker & Shower Access',
      'Purified Water Station',
    ],
  },
  {
    id: '3months',
    name: '3 Months Membership',
    badge: 'Quarterly Savings',
    price: '₹2,100',
    period: 'for 3 months (₹700/mo)',
    description: 'Build consistency with 3 months of uninterrupted workout routines.',
    highlight: false,
    features: [
      'Full Gym Facility Access',
      'Save ₹150 compared to monthly',
      'All Strength & Cardio Equipment',
      'Personalised Workout Guidance',
      'Locker & Hydration Access',
      'Progress & Form Correction',
    ],
  },
  {
    id: '6months',
    name: '6 Months Membership',
    badge: '👑 Popular Choice',
    price: '₹4,000',
    period: 'for 6 months (₹667/mo)',
    description: 'Serious fitness transformation plan with maximum overall value.',
    highlight: true,
    features: [
      'Full Gym Facility Access',
      'Save ₹500 compared to monthly',
      'Complete Workout & Diet Guidance',
      'Free Locker & Hydration Access',
      'Regular Fitness Progress Check',
      'Priority Coaching Support',
    ],
  },
  {
    id: '1year',
    name: '1 Year Membership',
    badge: 'Best Value Annual',
    price: '₹7,000',
    period: 'for 12 months (₹583/mo)',
    description: 'Ultimate annual commitment with maximum savings for long-term health & fitness.',
    highlight: false,
    features: [
      'Full 12-Month Facility Access',
      'Save ₹2,000 compared to monthly',
      'Free Fitness & Nutrition Consultation',
      'Unlimited Weight & Cardio Floor Access',
      'Dedicated Trainer Guidance',
      'Locker & Hydration Access',
    ],
  },
];

export const MembershipFeesPage: React.FC<MembershipFeesPageProps> = ({
  onBack,
  onJoinClick,
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

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
              onClick={() => onJoinClick?.('Special Offer Membership')}
              className="bg-gradient-to-r from-[#B600A8] to-[#900085] text-white px-5 py-2.5 rounded-full text-sm font-semibold tracking-wider uppercase hover:brightness-110 transition-all cursor-pointer shadow-lg shadow-[#B600A8]/20"
            >
              Claim Special Offer
            </button>
          )}
        </div>
      </div>

      {/* Main Title Banner */}
      <div className="max-w-7xl mx-auto w-full mb-10 text-center">
        <div className="inline-flex items-center gap-2 text-[#BBCCD7] text-xs font-semibold tracking-widest uppercase mb-2 bg-neutral-900 px-3 py-1 rounded-full border border-neutral-800">
          <Crown className="w-4 h-4 text-[#B600A8]" />
          <span>Transparent Membership Pricing</span>
        </div>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white mb-4">
          Royal Fitness Gym Membership Fees 👑
        </h1>
        <p className="text-neutral-400 max-w-2xl mx-auto text-base sm:text-lg font-light leading-relaxed">
          No hidden fees, no complicated lock-in fine print. Choose the membership level tailored to your fitness journey.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {MEMBERSHIP_PLANS.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className={`relative rounded-2xl p-6 flex flex-col justify-between border transition-all duration-300 ${
              plan.highlight
                ? 'bg-gradient-to-b from-neutral-900 via-[#140012] to-black border-[#B600A8] shadow-2xl shadow-[#B600A8]/20 ring-1 ring-[#B600A8]/50'
                : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
            }`}
          >
            {plan.highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#B600A8] to-[#900085] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                Most Popular Choice
              </div>
            )}

            <div>
              <div className="text-xs font-bold text-[#BBCCD7] uppercase tracking-wider mb-1">
                {plan.badge}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{plan.name}</h3>

              <div className="mb-4">
                <span className="text-4xl font-black text-white tracking-tight">{plan.price}</span>
                <span className="text-xs text-neutral-400 font-light ml-1.5">{plan.period}</span>
              </div>

              <p className="text-xs text-neutral-400 font-light leading-relaxed mb-6 pb-4 border-b border-neutral-800/80">
                {plan.description}
              </p>

              {/* Features List */}
              <ul className="flex flex-col gap-2.5 mb-8">
                {plan.features.map((feat, fIdx) => (
                  <li key={fIdx} className="text-xs text-neutral-300 flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => onJoinClick?.(`${plan.name} (${plan.price})`)}
              className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                plan.highlight
                  ? 'bg-gradient-to-r from-[#B600A8] to-[#900085] text-white hover:brightness-110 shadow-lg'
                  : 'bg-white text-black hover:bg-neutral-200'
              }`}
            >
              Select {plan.name}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Guarantee & FAQ Banner */}
      <div className="max-w-7xl mx-auto w-full p-8 rounded-2xl bg-neutral-900/80 border border-neutral-800 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
        <div className="flex items-start gap-3">
          <Shield className="w-6 h-6 text-[#B600A8] shrink-0 mt-1" />
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1">
              7-Day Money Back Guarantee
            </h4>
            <p className="text-xs text-neutral-400 font-light">
              Try Royal Fitness Gym for a week. If you're not 100% satisfied, get a full refund instantly.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Zap className="w-6 h-6 text-[#BBCCD7] shrink-0 mt-1" />
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1">
              Instant 24/7 Mobile Access
            </h4>
            <p className="text-xs text-neutral-400 font-light">
              Unlock facility doors, book sauna sessions, and track workouts directly with your phone key.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Crown className="w-6 h-6 text-amber-400 shrink-0 mt-1" />
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1">
              No Hidden Fees Guarantee
            </h4>
            <p className="text-xs text-neutral-400 font-light">
              Zero initiation fees, zero cancellation penalties, and zero maintenance surcharges.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

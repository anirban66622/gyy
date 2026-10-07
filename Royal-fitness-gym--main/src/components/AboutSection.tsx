import React from 'react';
import { FadeIn } from './FadeIn';
import { AnimatedText } from './AnimatedText';
import { ContactButton } from './ContactButton';

interface AboutSectionProps {
  onContactClick?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onContactClick }) => {
  const aboutText =
    "Royal Fitness Gym\nWhere strength meets discipline. 👑\nTrain with modern equipment, expert guidance, and unstoppable motivation.\nBuild muscle, burn fat, and unlock your true potential";

  return (
    <section
      id="about"
      className="min-h-screen w-full relative flex flex-col items-center justify-center bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 overflow-hidden select-none"
    >
      {/* Main Content Area */}
      <div className="relative z-20 flex flex-col items-center max-w-4xl w-full text-center">
        {/* Heading */}
        <FadeIn delay={0} y={40} className="w-full">
          <h2 className="hero-heading font-black uppercase tracking-tight leading-none text-[clamp(2.5rem,9vw,130px)]">
            ABOUT <br /> ROYAL FITNESS
          </h2>
        </FadeIn>

        {/* Gap between heading and text: gap-10 sm:gap-14 md:gap-16 */}
        <div className="mt-10 sm:mt-14 md:mt-16 w-full">
          <AnimatedText text={aboutText} />
        </div>

        {/* Gap between text block and button: gap-16 sm:gap-20 md:gap-24 */}
        <div className="mt-16 sm:mt-20 md:mt-24">
          <FadeIn delay={0.2} y={20}>
            <ContactButton onClick={onContactClick} />
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

import React, { useEffect, useState } from 'react';
import { signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { auth, googleAuthProvider } from '../lib/firebase';
import { FadeIn } from './FadeIn';
import { ContactButton } from './ContactButton';
import { MEDIA_ASSETS } from '../config/mediaManager';

interface HeroSectionProps {
  onContactClick?: () => void;
  onNavClick?: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onContactClick,
  onNavClick,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          const idToken = await user.getIdToken();
          await fetch('/api/auth/sync', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${idToken}`,
            },
          });
        } catch (err) {
          console.error('Failed to sync auth state:', err);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleAuthClick = async () => {
    if (currentUser) {
      if (window.confirm(`Signed in as ${currentUser.displayName || currentUser.email}.\nWould you like to sign out?`)) {
        await signOut(auth);
      }
    } else {
      try {
        const result = await signInWithPopup(auth, googleAuthProvider);
        const idToken = await result.user.getIdToken();
        await fetch('/api/auth/sync', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${idToken}`,
          },
        });
      } catch (err: any) {
        if (err.code !== 'auth/popup-closed-by-user') {
          console.error('Google Sign-In Error:', err);
        }
      }
    }
  };

  const handleNav = (id: string) => {
    if (onNavClick) {
      onNavClick(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="h-screen w-full flex flex-col justify-between overflow-x-clip relative px-6 md:px-10 bg-[#0C0C0C]">
      {/* Navbar */}
      <FadeIn delay={0} y={-20} className="w-full pt-6 md:pt-8 z-20">
        <nav className="flex justify-between items-center w-full">
          <button
            onClick={() => handleNav('menu')}
            className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200 cursor-pointer"
          >
            Menu
          </button>
          <button
            onClick={handleAuthClick}
            className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200 cursor-pointer"
          >
            {currentUser ? (currentUser.displayName?.split(' ')[0] || 'Signed In') : 'Sign In'}
          </button>
          <button
            onClick={() => handleNav('projects')}
            className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200 cursor-pointer"
          >
            Explore
          </button>
          <button
            onClick={() => onContactClick ? onContactClick() : handleNav('projects')}
            className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200 cursor-pointer"
          >
            Contact
          </button>
        </nav>
      </FadeIn>

      {/* Background Image filling the hero page */}
      <div className="absolute inset-0 z-0 pointer-events-none flex justify-center items-center overflow-hidden">
        <FadeIn delay={0.25} y={0} className="w-full h-full flex items-center justify-center">
          <img
            src={MEDIA_ASSETS.hero.background.url}
            alt={MEDIA_ASSETS.hero.background.altText}
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                MEDIA_ASSETS.hero.background.fallbackUrl;
            }}
            className="w-full h-full object-cover scale-110 select-none opacity-90 drop-shadow-2xl"
          />
        </FadeIn>
      </div>

      {/* Bottom Bar */}
      <div className="w-full flex justify-between items-end pb-7 sm:pb-8 md:pb-10 z-20">
        <FadeIn delay={0.35} y={20}>
          <p
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[200px] sm:max-w-[300px] md:max-w-[380px]"
            style={{ fontSize: 'clamp(0.75rem, 1.3vw, 1.35rem)' }}
          >
            Your future self will thank you for starting today. Your transformation begins the moment you walk in...
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <ContactButton onClick={onContactClick} />
        </FadeIn>
      </div>
    </section>
  );
};

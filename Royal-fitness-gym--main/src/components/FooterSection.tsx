import React, { useEffect, useState } from 'react';
import {
  Instagram,
  Facebook,
  Twitter,
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  Sparkles,
  ArrowUpRight,
  LogIn,
  LogOut,
  User as UserIcon,
} from 'lucide-react';
import { signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { auth, googleAuthProvider } from '../lib/firebase';
import { FadeIn } from './FadeIn';

interface FooterSectionProps {
  onContactClick?: () => void;
  onNavClick?: (sectionId: string) => void;
  onOpenEnquiries?: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  onContactClick,
  onNavClick,
  onOpenEnquiries,
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

  // Contact & Social URLs
  const whatsappUrl =
    'https://wa.me/917368024982?text=Hello%20Royal%20Fitness%20Gym%2C%20I%20would%20like%20to%20inquire%20about%20membership';
  const instagramUrl =
    'https://www.instagram.com/royalfitness026?igsh=bGZvYmI0MHZnbWhx';
  const facebookUrl = 'https://www.facebook.com/share/17jU76mU6S/';
  const twitterUrl = 'https://www.twitter.com';
  const pinterestUrl = 'https://www.pinterest.com';
  const googleMapsUrl =
    'https://maps.google.com/?q=Royal+Fitness+unisex+gym+PWD+more+Adhikari+Kharibari+West+Bengal+734427';

  return (
    <footer
      id="contact"
      className="bg-[#050505] text-white pt-20 pb-12 px-5 sm:px-8 md:px-12 border-t border-neutral-900 relative z-10 font-['Kanit',sans-serif]"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-16">
        {/* Top Header & Brand */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 pb-12 border-b border-neutral-800/80">
          <FadeIn delay={0} y={30} className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#BBCCD7] mb-3">
              <Sparkles className="w-4 h-4 text-[#B600A8]" />
              <span>Royal Fitness Gym 👑</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-none">
              Where Strength <br /> Meets Discipline.
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base font-light mt-4 max-w-lg leading-relaxed">
              Step into the ultimate training environment with world-class equipment,
              certified coaches, and a community built on commitment.
            </p>
          </FadeIn>

          <FadeIn delay={0.1} y={30}>
            <button
              onClick={onContactClick}
              style={{
                background:
                  'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                boxShadow:
                  '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
                outline: '2px solid #ffffff',
                outlineOffset: '-3px',
              }}
              className="px-8 py-4 rounded-full text-white font-medium uppercase tracking-widest text-xs sm:text-sm flex items-center gap-3 cursor-pointer transition-transform hover:scale-105 active:scale-95"
            >
              <span>Get In Touch</span>
              <ArrowUpRight className="w-5 h-5" />
            </button>
          </FadeIn>
        </div>

        {/* Middle Section: Contact Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* 1. Address & Google Maps */}
          <FadeIn delay={0.15} y={20} className="bg-neutral-900/60 rounded-2xl p-6 border border-neutral-800/80 hover:border-neutral-700 transition-colors flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-[#B600A8] mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-1">
                Gym Location
              </h3>
              <p className="text-sm font-medium text-white leading-snug">
                Royal Fitness Unisex Gym
              </p>
              <p className="text-xs text-neutral-300 mt-1.5 leading-relaxed">
                PWD More, Adhikari, Kharibari, Dohaguri, West Bengal 734427, India
              </p>
            </div>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#BBCCD7] hover:text-white transition-colors cursor-pointer group"
            >
              <span>Open Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </FadeIn>

          {/* 2. Phone & WhatsApp */}
          <FadeIn delay={0.2} y={20} className="bg-neutral-900/60 rounded-2xl p-6 border border-neutral-800/80 hover:border-neutral-700 transition-colors flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-[#B600A8] mb-4">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-1">
                Phone & WhatsApp
              </h3>
              <p className="text-sm font-bold text-white leading-snug">
                +91 73680 24982
              </p>
              <p className="text-xs text-neutral-400 mt-1">
                Call or message for membership & training inquiries.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="tel:+917368024982"
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#BBCCD7] hover:text-white transition-colors cursor-pointer group"
              >
                <span>Call</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <span className="text-neutral-700">&bull;</span>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer group"
              >
                <span>WhatsApp</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </FadeIn>

          {/* 3. Email Support */}
          <FadeIn delay={0.25} y={20} className="bg-neutral-900/60 rounded-2xl p-6 border border-neutral-800/80 hover:border-neutral-700 transition-colors flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-[#B600A8] mb-4">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-1">
                Email Address
              </h3>
              <p className="text-sm font-medium text-white leading-snug break-all">
                royalfitnessworkout@gmail.com
              </p>
              <p className="text-xs text-neutral-400 mt-1">
                Drop us an email anytime for queries & feedback.
              </p>
            </div>
            <a
              href="mailto:royalfitnessworkout@gmail.com"
              className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#BBCCD7] hover:text-white transition-colors cursor-pointer group"
            >
              <span>Send Email</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </FadeIn>

          {/* 4. Operating Hours */}
          <FadeIn delay={0.3} y={20} className="bg-neutral-900/60 rounded-2xl p-6 border border-neutral-800/80 hover:border-neutral-700 transition-colors flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-[#B600A8] mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-1">
                Operating Hours
              </h3>
              <p className="text-xs font-bold text-[#BBCCD7] uppercase tracking-wider mb-2">
                Sunday &ndash; Friday
              </p>
              <p className="text-xs font-medium text-white leading-relaxed">
                <span className="text-neutral-400">Morning:</span> 5:00 AM &ndash; 11:00 AM
              </p>
              <p className="text-xs font-medium text-white leading-relaxed mt-1">
                <span className="text-neutral-400">Evening:</span> 4:00 PM &ndash; 10:00 PM
              </p>
            </div>
            <div className="mt-6 text-[10px] uppercase tracking-widest text-emerald-400 font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Open Sun &ndash; Fri (Sat Closed)</span>
            </div>
          </FadeIn>
        </div>

        {/* Bottom Social Media Bar */}
        <div className="pt-10 border-t border-neutral-900 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Social Icons Title & Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full md:w-auto">
            <span className="text-xs uppercase font-bold tracking-widest text-neutral-400">
              Connect With Us:
            </span>

            <div className="flex items-center flex-wrap gap-3">
              {/* WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Chat on WhatsApp"
                className="group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-emerald-600 text-neutral-300 hover:text-white border border-neutral-800 hover:border-emerald-600 transition-all cursor-pointer shadow-md"
              >
                <svg
                  className="w-5 h-5 fill-current text-emerald-400 group-hover:text-white transition-transform group-hover:scale-110"
                  viewBox="0 0 24 24"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                <span className="text-xs font-bold uppercase tracking-wider">WhatsApp</span>
              </a>

              {/* Instagram */}
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Follow us on Instagram"
                className="group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-[#B600A8] text-neutral-300 hover:text-white border border-neutral-800 hover:border-[#B600A8] transition-all cursor-pointer shadow-md"
              >
                <Instagram className="w-5 h-5 transition-transform group-hover:scale-110" />
                <span className="text-xs font-bold uppercase tracking-wider">Instagram</span>
              </a>

              {/* Facebook */}
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Follow us on Facebook"
                className="group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-blue-600 text-neutral-300 hover:text-white border border-neutral-800 hover:border-blue-600 transition-all cursor-pointer shadow-md"
              >
                <Facebook className="w-5 h-5 transition-transform group-hover:scale-110" />
                <span className="text-xs font-bold uppercase tracking-wider">Facebook</span>
              </a>

              {/* Twitter / X */}
              <a
                href={twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Follow us on Twitter"
                className="group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-sky-500 text-neutral-300 hover:text-white border border-neutral-800 hover:border-sky-500 transition-all cursor-pointer shadow-md"
              >
                <Twitter className="w-5 h-5 transition-transform group-hover:scale-110" />
                <span className="text-xs font-bold uppercase tracking-wider">Twitter</span>
              </a>

              {/* Pinterest */}
              <a
                href={pinterestUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Follow us on Pinterest"
                className="group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-red-600 text-neutral-300 hover:text-white border border-neutral-800 hover:border-red-600 transition-all cursor-pointer shadow-md"
              >
                {/* Custom Pinterest Icon SVG for crisp rendering */}
                <svg
                  className="w-5 h-5 fill-current transition-transform group-hover:scale-110"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                </svg>
                <span className="text-xs font-bold uppercase tracking-wider">Pinterest</span>
              </a>

              {/* Sign In Button - matching social icon style */}
              <button
                type="button"
                onClick={handleAuthClick}
                title="Sign in with Google"
                className="group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-[#B600A8] text-neutral-300 hover:text-white border border-neutral-800 hover:border-[#B600A8] transition-all cursor-pointer shadow-md"
              >
                <svg className="w-5 h-5 shrink-0 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span className="text-xs font-bold uppercase tracking-wider">
                  {currentUser ? (currentUser.displayName?.split(' ')[0] || 'Signed In') : 'Sign In'}
                </span>
              </button>

              {/* Google Maps Location */}
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="View location in Google Maps"
                className="group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-emerald-600 text-neutral-300 hover:text-white border border-neutral-800 hover:border-emerald-600 transition-all cursor-pointer shadow-md"
              >
                <MapPin className="w-5 h-5 transition-transform group-hover:scale-110" />
                <span className="text-xs font-bold uppercase tracking-wider">Location Maps</span>
              </a>
            </div>
          </div>

          {/* Quick Nav & Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-xs text-neutral-500">
            <div className="flex items-center gap-4 uppercase tracking-wider text-neutral-400 font-medium">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Royal Fitness
              </button>
              <span>&bull;</span>
              <button
                onClick={() => onNavClick?.('services')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Services
              </button>
              <span>&bull;</span>
              <button
                onClick={() => onNavClick?.('projects')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Explore
              </button>
            </div>
            <span>&copy; {new Date().getFullYear()} Royal Fitness Gym. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

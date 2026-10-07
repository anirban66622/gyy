import React, { useState, useEffect } from 'react';
import {
  X,
  Copy,
  Check,
  Send,
  Sparkles,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  MapPin,
  Phone,
  Crown,
} from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan?: string | null;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  selectedPlan,
}) => {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activePlan, setActivePlan] = useState<string | null>(selectedPlan || null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Gym Membership Plans',
    message: '',
  });

  useEffect(() => {
    if (selectedPlan) {
      setActivePlan(selectedPlan);
      setFormData((prev) => ({
        ...prev,
        service: 'Gym Membership Plans',
        message: `Hi Royal Fitness Gym, I am interested in inquiring about the ${selectedPlan}. Please share payment details and registration procedure.`,
      }));
    }
  }, [selectedPlan]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const whatsappUrl =
    'https://wa.me/917368024982?text=Hello%20Royal%20Fitness%20Gym%2C%20I%20would%20like%20to%20inquire%20about%20membership';
  const instagramUrl =
    'https://www.instagram.com/royalfitness026?igsh=bGZvYmI0MHZnbWhx';
  const facebookUrl = 'https://www.facebook.com/share/17jU76mU6S/';
  const twitterUrl = 'https://www.twitter.com';
  const pinterestUrl = 'https://www.pinterest.com';
  const googleMapsUrl =
    'https://maps.google.com/?q=Royal+Fitness+unisex+gym+PWD+more+Adhikari+Kharibari+West+Bengal+734427';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('royalfitnessworkout@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    try {
      await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    } catch (err) {
      console.error('Failed to post enquiry:', err);
    }

    setSubmitted(true);
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-[#0C0C0C] border-2 border-[#D7E2EA]/30 rounded-[30px] max-w-lg w-full p-6 sm:p-8 space-y-6 text-white shadow-2xl my-8 cursor-default"
      >
        {/* Prominent Top-Right Cross/Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Enquiry Modal"
          title="Close (Esc)"
          className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900 hover:bg-red-600 border border-neutral-700 hover:border-red-500 text-neutral-300 hover:text-white transition-all cursor-pointer shadow-lg group"
        >
          <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200 text-red-400 group-hover:text-white" />
          <span className="text-[11px] font-bold uppercase tracking-widest hidden sm:inline">Close</span>
        </button>

        {/* Modal Header */}
        <div className="space-y-2 pr-16">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[#BBCCD7]">
            <Sparkles className="w-4 h-4 text-[#B600A8]" />
            <span>Royal Fitness Gym 👑</span>
          </div>
          <h3 className="hero-heading text-3xl sm:text-4xl font-black uppercase tracking-tight">
            Connect With Us
          </h3>
          <p className="text-xs sm:text-sm text-[#D7E2EA]/70 font-light leading-relaxed">
            Have questions about memberships, personal coaching, or facilities? Contact us directly.
          </p>
        </div>

        {/* Selected Plan Banner if chosen */}
        {activePlan && (
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-purple-950/80 to-neutral-900 border border-[#B600A8]/60 text-xs sm:text-sm text-white shadow-md">
            <div className="flex items-center gap-2.5">
              <Crown className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-bold text-purple-300 block tracking-wider">
                  Selected Price Plan:
                </span>
                <span className="font-extrabold text-white">{activePlan}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setActivePlan(null)}
              className="p-1 rounded-lg text-purple-300 hover:text-white hover:bg-purple-900/60 transition-colors cursor-pointer"
              title="Clear plan selection"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Quick Contacts Box */}
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 rounded-2xl bg-neutral-900 border border-neutral-800 text-xs sm:text-sm text-[#D7E2EA]">
            <div className="flex items-center gap-2.5 truncate">
              <Mail className="w-4 h-4 text-[#BBCCD7] shrink-0" />
              <span className="font-mono truncate">royalfitnessworkout@gmail.com</span>
            </div>
            <button
              onClick={handleCopyEmail}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs text-white transition-colors cursor-pointer shrink-0"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-medium">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-neutral-900 border border-neutral-800 text-xs sm:text-sm text-[#D7E2EA]">
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#BBCCD7] shrink-0" />
              <span className="font-mono">+91 73680 24982</span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="tel:+917368024982"
                className="px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white transition-colors cursor-pointer"
              >
                Call
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Social Media Shortcuts */}
        <div className="pt-2">
          <p className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 mb-2">
            Follow & Locate Us:
          </p>
          <div className="flex items-center flex-wrap gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-emerald-600 text-xs font-medium text-neutral-300 hover:text-white border border-neutral-800 transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current text-emerald-400 group-hover:text-white" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              <span>WhatsApp</span>
            </a>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-[#B600A8] text-xs font-medium text-neutral-300 hover:text-white border border-neutral-800 transition-colors"
            >
              <Instagram className="w-3.5 h-3.5 text-pink-400 group-hover:text-white" />
              <span>Instagram</span>
            </a>
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-blue-600 text-xs font-medium text-neutral-300 hover:text-white border border-neutral-800 transition-colors"
            >
              <Facebook className="w-3.5 h-3.5 text-blue-400 group-hover:text-white" />
              <span>Facebook</span>
            </a>
            <a
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-sky-500 text-xs font-medium text-neutral-300 hover:text-white border border-neutral-800 transition-colors"
            >
              <Twitter className="w-3.5 h-3.5 text-sky-400 group-hover:text-white" />
              <span>Twitter</span>
            </a>
            <a
              href={pinterestUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-red-600 text-xs font-medium text-neutral-300 hover:text-white border border-neutral-800 transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current text-red-400" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
              </svg>
              <span>Pinterest</span>
            </a>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-emerald-600 text-xs font-medium text-neutral-300 hover:text-white border border-neutral-800 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-400 group-hover:text-white" />
              <span>Google Maps</span>
            </a>
          </div>
        </div>

        {/* Contact Form */}
        {submitted ? (
          <div className="p-6 rounded-2xl bg-purple-950/40 border border-purple-500/30 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-purple-600/20 border border-purple-500/40 flex items-center justify-center mx-auto text-purple-300">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white uppercase tracking-wider">
              Message Received!
            </h4>
            <p className="text-xs text-[#D7E2EA]/80 leading-relaxed">
              Thanks {formData.name}, the Royal Fitness team will review your inquiry and reach out shortly.
            </p>
            <button
              onClick={onClose}
              className="mt-2 px-6 py-2.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-xs uppercase font-medium tracking-widest text-white transition-colors cursor-pointer"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#D7E2EA]/80 font-medium mb-1.5">
                Your Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Alex Morgan"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-800 focus:border-[#BBCCD7] px-4 py-2.5 rounded-xl text-sm text-white focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#D7E2EA]/80 font-medium mb-1.5">
                Your Email
              </label>
              <input
                type="email"
                required
                placeholder="alex@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-800 focus:border-[#BBCCD7] px-4 py-2.5 rounded-xl text-sm text-white focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#D7E2EA]/80 font-medium mb-1.5">
                Inquiry Topic
              </label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-800 focus:border-[#BBCCD7] px-4 py-2.5 rounded-xl text-sm text-white focus:outline-none transition-colors cursor-pointer"
              >
                <option value="Gym Membership Plans">01 -- Gym Membership Plans</option>
                <option value="Personal Coaching & Training">02 -- Personal Coaching & Training</option>
                <option value="Gym Facilities & Equipment">03 -- Gym Facilities & Equipment</option>
                <option value="General Questions">04 -- General Questions</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#D7E2EA]/80 font-medium mb-1.5">
                Message
              </label>
              <textarea
                required
                rows={3}
                placeholder="How can Royal Fitness Gym help you reach your goals?"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-800 focus:border-[#BBCCD7] px-4 py-2.5 rounded-xl text-sm text-white focus:outline-none transition-colors resize-none"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3.5 rounded-full bg-neutral-900 hover:bg-red-600/90 border border-neutral-700 hover:border-red-500 text-neutral-300 hover:text-white font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md group"
              >
                <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200 text-red-400 group-hover:text-white" />
                <span>Close</span>
              </button>

              <button
                type="submit"
                style={{
                  background:
                    'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                  boxShadow:
                    '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
                  outline: '2px solid #ffffff',
                  outlineOffset: '-3px',
                }}
                className="flex-[2] py-3.5 rounded-full text-white font-bold uppercase tracking-widest text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <Send className="w-4 h-4" />
                <span>Send Inquiry</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};


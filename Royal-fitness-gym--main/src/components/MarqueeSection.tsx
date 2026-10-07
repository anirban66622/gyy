import React, { useRef, useState, useEffect } from 'react';
import { MEDIA_ASSETS } from '../config/mediaManager';

const BASE_GIFS = MEDIA_ASSETS.marquee.gifs;

// Build row sequences that cleanly loop through BASE_GIFS (length 5) without adjacent duplicates
// 2 full cycles of 5 items = 10 items per row unit
const row1Base = [...BASE_GIFS, ...BASE_GIFS];
// Offset row 2 by 2 positions for a staggered visual layout
const row2Base = [
  ...BASE_GIFS.slice(2),
  ...BASE_GIFS,
  ...BASE_GIFS.slice(0, 2),
];

// Tripled lists for seamless wide-screen infinite scroll
const row1Tripled = [...row1Base, ...row1Base, ...row1Base];
const row2Tripled = [...row2Base, ...row2Base, ...row2Base];

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const calcOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setOffset(calcOffset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
    item: (typeof BASE_GIFS)[0]
  ) => {
    const img = e.currentTarget;
    if (img.dataset.hasFailed) return;
    img.dataset.hasFailed = 'true';
    if (item.backupUrl) {
      img.src = item.backupUrl;
    }
  };

  return (
    <section
      ref={sectionRef}
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden w-full select-none"
    >
      <div className="flex flex-col gap-3 w-full">
        {/* Row 1: Moves RIGHT on scroll */}
        <div
          className="flex gap-3 w-max transition-transform ease-out duration-75"
          style={{
            transform: `translateX(${offset - 200}px)`,
            willChange: 'transform',
          }}
        >
          {row1Tripled.map((item, idx) => (
            <div
              key={`row1-${idx}`}
              className="w-[300px] h-[190px] sm:w-[360px] sm:h-[230px] md:w-[420px] md:h-[270px] shrink-0 rounded-2xl overflow-hidden bg-neutral-900 shadow-lg border border-neutral-800/50"
            >
              <img
                src={item.url}
                alt={item.altText || `Portfolio showcase ${idx + 1}`}
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={(e) => handleImageError(e, item)}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Row 2: Moves LEFT on scroll */}
        <div
          className="flex gap-3 w-max transition-transform ease-out duration-75"
          style={{
            transform: `translateX(${-(offset - 200)}px)`,
            willChange: 'transform',
          }}
        >
          {row2Tripled.map((item, idx) => (
            <div
              key={`row2-${idx}`}
              className="w-[300px] h-[190px] sm:w-[360px] sm:h-[230px] md:w-[420px] md:h-[270px] shrink-0 rounded-2xl overflow-hidden bg-neutral-900 shadow-lg border border-neutral-800/50"
            >
              <img
                src={item.url}
                alt={item.altText || `Portfolio showcase ${idx + 12}`}
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={(e) => handleImageError(e, item)}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

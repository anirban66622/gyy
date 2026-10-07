import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { LiveProjectButton } from './LiveProjectButton';
import { MEDIA_ASSETS } from '../config/mediaManager';

export interface ProjectData {
  number: string;
  name: string;
  category: string;
  col1Img1: string;
  col1Img2: string;
  col2Img: string;
  col1Aspect?: string;
  col2Aspect?: string;
}

const PROJECTS_DATA: ProjectData[] = MEDIA_ASSETS.projects;

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  totalCards: number;
  progress: MotionValue<number>;
  onLiveProjectClick: (project: ProjectData) => void;
  onImageClick: (url: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  totalCards,
  progress,
  onLiveProjectClick,
  onImageClick,
}) => {
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  // Calculate range for scale based on card index
  const rangeStart = index * (1 / totalCards);
  const rangeEnd = 1;
  const scale = useTransform(progress, [rangeStart, rangeEnd], [1, targetScale]);

  return (
    <div
      className="sticky top-20 md:top-28 flex items-center justify-center mb-16 sm:mb-24"
      style={{ top: `calc(80px + ${index * 28}px)` }}
    >
      <motion.div
        style={{
          scale,
          transformOrigin: 'top center',
        }}
        className="w-full max-w-6xl rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 shadow-2xl flex flex-col gap-6 transition-shadow hover:shadow-[0_0_30px_rgba(187,204,215,0.15)]"
      >
        {/* Top Row Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D7E2EA]/20 pb-4 md:pb-6">
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Number */}
            <span className="font-black text-[#D7E2EA] text-[clamp(2.5rem,7vw,100px)] leading-none shrink-0">
              {project.number}
            </span>
            {/* Category & Name */}
            <div className="flex flex-col gap-1">
              <span className="text-[#D7E2EA]/70 font-light uppercase tracking-widest text-xs sm:text-sm">
                {project.category}
              </span>
              <h3 className="text-[#D7E2EA] font-medium uppercase text-lg sm:text-2xl md:text-3xl">
                {project.name}
              </h3>
            </div>
          </div>

          {/* Live Project Button */}
          <div className="self-start sm:self-center">
            <LiveProjectButton onClick={() => onLiveProjectClick(project)} />
          </div>
        </div>

        {/* Bottom Row Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 w-full items-stretch">
          {/* Left Column (40% width = 5 cols) */}
          <div className="md:col-span-5 flex flex-col gap-4 sm:gap-6 justify-between">
            {/* Left Top Image */}
            <div
              onClick={() => onImageClick(project.col1Img1)}
              className={`rounded-[30px] sm:rounded-[40px] md:rounded-[48px] overflow-hidden w-full ${project.col1Aspect || 'aspect-video'} bg-neutral-900 border border-neutral-800 cursor-pointer group relative`}
            >
              <img
                src={project.col1Img1}
                alt={`${project.name} preview 1`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs font-medium text-white tracking-widest uppercase bg-black/40 backdrop-blur-xs">
                Expand View
              </div>
            </div>

            {/* Left Bottom Image */}
            <div
              onClick={() => onImageClick(project.col1Img2)}
              className={`rounded-[30px] sm:rounded-[40px] md:rounded-[48px] overflow-hidden w-full ${project.col1Aspect || 'aspect-video'} bg-neutral-900 border border-neutral-800 cursor-pointer group relative`}
            >
              <img
                src={project.col1Img2}
                alt={`${project.name} preview 2`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs font-medium text-white tracking-widest uppercase bg-black/40 backdrop-blur-xs">
                Expand View
              </div>
            </div>
          </div>

          {/* Right Column (60% width = 7 cols) */}
          <div className="md:col-span-7 flex">
            <div
              onClick={() => onImageClick(project.col2Img)}
              className={`rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden w-full h-full ${project.col2Aspect || 'aspect-[4/3] md:aspect-auto'} min-h-[280px] sm:min-h-[350px] md:min-h-[420px] bg-neutral-900 border border-neutral-800 cursor-pointer group relative`}
            >
              <img
                src={project.col2Img}
                alt={`${project.name} main showcase`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs font-medium text-white tracking-widest uppercase bg-black/40 backdrop-blur-xs">
                Expand View
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

interface ProjectsSectionProps {
  onLiveProjectClick: (project: ProjectData) => void;
  onImageClick: (url: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onLiveProjectClick,
  onImageClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      id="projects"
      ref={containerRef}
      className="bg-[#0C0C0C] text-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 relative px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 w-full"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Heading */}
        <FadeIn delay={0} y={40} className="w-full text-center mb-16 sm:mb-20">
          <h2 className="hero-heading font-black uppercase tracking-tight leading-none text-[clamp(3rem,12vw,160px)]">
            Explore
          </h2>
        </FadeIn>

        {/* Cards Stacking Stack */}
        <div className="relative w-full">
          {PROJECTS_DATA.map((project, index) => (
            <ProjectCard
              key={project.number}
              project={project}
              index={index}
              totalCards={PROJECTS_DATA.length}
              progress={scrollYProgress}
              onLiveProjectClick={onLiveProjectClick}
              onImageClick={onImageClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { X, ExternalLink, Sparkles, Layers, CheckCircle2 } from 'lucide-react';
import { ProjectData } from './ProjectsSection';

interface ProjectLiveModalProps {
  project: ProjectData | null;
  onClose: () => void;
  onImageClick: (url: string) => void;
}

export const ProjectLiveModal: React.FC<ProjectLiveModalProps> = ({
  project,
  onClose,
  onImageClick,
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative bg-[#0C0C0C] border-2 border-[#D7E2EA]/40 rounded-[35px] max-w-3xl w-full p-6 sm:p-8 space-y-6 text-white shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-zinc-400 hover:text-white rounded-full bg-neutral-900 border border-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="font-black text-[#D7E2EA] text-2xl sm:text-3xl">
              {project.number}
            </span>
            <span className="px-3 py-1 rounded-full bg-neutral-800 border border-neutral-700 text-[#D7E2EA]/80 font-mono text-xs uppercase tracking-widest">
              {project.category}
            </span>
          </div>
          <h3 className="hero-heading text-3xl sm:text-4xl font-black uppercase tracking-tight">
            {project.name}
          </h3>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-[#D7E2EA]/80 font-light leading-relaxed">
          Detailed 3D creative direction, environment modeling, motion graphic branding, and WebGL asset integration crafted by Jack.
        </p>

        {/* Tech Stack & Deliverables */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-neutral-950 p-4 rounded-2xl border border-neutral-800">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-medium text-[#BBCCD7] uppercase tracking-wider">
              <Layers className="w-4 h-4 text-[#B600A8]" />
              <span>3D Tools Used</span>
            </div>
            <div className="flex flex-wrap gap-1.5 text-xs text-neutral-300">
              <span className="px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800">Blender 4.2</span>
              <span className="px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800">Octane Render</span>
              <span className="px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800">Cinema 4D</span>
              <span className="px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800">Substance 3D</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-medium text-[#BBCCD7] uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#B600A8]" />
              <span>Deliverables</span>
            </div>
            <div className="space-y-1 text-xs text-neutral-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                <span>4K Ultra-HD Photorealistic Renders</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                <span>60FPS Loop Motion Animations</span>
              </div>
            </div>
          </div>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-3 gap-3">
          {[project.col1Img1, project.col1Img2, project.col2Img].map((url, idx) => (
            <div
              key={idx}
              onClick={() => onImageClick(url)}
              className="rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 h-24 sm:h-32 cursor-pointer group relative"
            >
              <img
                src={url}
                alt={`${project.name} thumbnail ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
          <button
            onClick={() => {
              alert(`Opening interactive WebGL 3D preview for ${project.name}`);
            }}
            className="px-6 py-2.5 rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest text-xs hover:bg-[#D7E2EA]/10 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <span>Launch WebGL Demo</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white font-medium uppercase tracking-widest text-xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

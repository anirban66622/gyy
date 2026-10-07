import React, { useState, useEffect } from 'react';
import { HeroSection } from './components/HeroSection';
import { MarqueeSection } from './components/MarqueeSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection, ProjectData } from './components/ProjectsSection';
import { FooterSection } from './components/FooterSection';
import { ContactModal } from './components/ContactModal';
import { ProjectLiveModal } from './components/ProjectLiveModal';
import { ImageLightboxModal } from './components/ImageLightboxModal';
import { AdminEnquiriesModal } from './components/AdminEnquiriesModal';

import { GymMenuOverlay, MenuCategory } from './components/menu/GymMenuOverlay';
import { ChampionCompetitionPage } from './components/menu/ChampionCompetitionPage';
import { GymPicturesPage } from './components/menu/GymPicturesPage';
import { MemberPicturesPage } from './components/menu/MemberPicturesPage';
import { FitnessInfluencersPage } from './components/menu/FitnessInfluencersPage';
import { BodyFatCalcPage } from './components/menu/BodyFatCalcPage';
import { ProteinCalcPage } from './components/menu/ProteinCalcPage';
import { MembershipFeesPage } from './components/menu/MembershipFeesPage';

export type ActivePageType = null | 'menu' | MenuCategory;

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAdminEnquiriesOpen, setIsAdminEnquiriesOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeMenuPage, setActiveMenuPage] = useState<ActivePageType>(null);

  const handleOpenContact = (planName?: string) => {
    if (typeof planName === 'string') {
      setSelectedPlan(planName);
    } else {
      setSelectedPlan(null);
    }
    setIsContactOpen(true);
  };

  // Sync state with URL hashtag on mount & popstate
  useEffect(() => {
    const handleHashChange = (isInitialLoad = false) => {
      const hash = window.location.hash.replace('#', '');
      // If someone opens/loads the website with #menu in the URL, clear #menu on initial load so they see the main page first
      if (isInitialLoad && hash === 'menu') {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
        setActiveMenuPage(null);
        return;
      }

      if (
        hash === 'menu' ||
        hash === 'champion-competition' ||
        hash === 'gym-pictures' ||
        hash === 'member-pictures' ||
        hash === 'fitness-influencer' ||
        hash === 'body-fat-calc' ||
        hash === 'protein-calc' ||
        hash === 'membership-fees'
      ) {
        setActiveMenuPage(hash as ActivePageType);
      } else {
        setActiveMenuPage(null);
      }
    };

    handleHashChange(true);
    const onHash = () => handleHashChange(false);
    window.addEventListener('popstate', onHash);
    window.addEventListener('hashchange', onHash);

    return () => {
      window.removeEventListener('popstate', onHash);
      window.removeEventListener('hashchange', onHash);
    };
  }, []);

  const handleSetPage = (page: ActivePageType) => {
    setActiveMenuPage(page);
    if (page) {
      window.history.pushState(null, '', `#${page}`);
    } else {
      window.history.pushState(null, '', window.location.pathname);
    }
  };

  const handleNavClick = (sectionId: string) => {
    if (sectionId === 'menu') {
      handleSetPage('menu');
      return;
    }
    handleSetPage(null);
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Render standalone menu sub-pages if active
  if (activeMenuPage === 'champion-competition') {
    return (
      <div className="min-h-screen bg-[#0C0C0C] text-white">
        <ChampionCompetitionPage
          onBack={() => handleSetPage('menu')}
          onJoinClick={handleOpenContact}
        />
        <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} selectedPlan={selectedPlan} />
      </div>
    );
  }

  if (activeMenuPage === 'gym-pictures') {
    return (
      <div className="min-h-screen bg-[#0C0C0C] text-white">
        <GymPicturesPage
          onBack={() => handleSetPage('menu')}
          onImageClick={(url) => setSelectedImage(url)}
          onJoinClick={handleOpenContact}
        />
        <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} selectedPlan={selectedPlan} />
        <ImageLightboxModal imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />
      </div>
    );
  }

  if (activeMenuPage === 'member-pictures') {
    return (
      <div className="min-h-screen bg-[#0C0C0C] text-white">
        <MemberPicturesPage
          onBack={() => handleSetPage('menu')}
          onImageClick={(url) => setSelectedImage(url)}
          onJoinClick={handleOpenContact}
        />
        <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} selectedPlan={selectedPlan} />
        <ImageLightboxModal imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />
      </div>
    );
  }

  if (activeMenuPage === 'fitness-influencer') {
    return (
      <div className="min-h-screen bg-[#0C0C0C] text-white">
        <FitnessInfluencersPage
          onBack={() => handleSetPage('menu')}
          onJoinClick={handleOpenContact}
        />
        <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} selectedPlan={selectedPlan} />
      </div>
    );
  }

  if (activeMenuPage === 'body-fat-calc') {
    return (
      <div className="min-h-screen bg-[#0C0C0C] text-white">
        <BodyFatCalcPage
          onBack={() => handleSetPage('menu')}
          onJoinClick={handleOpenContact}
        />
        <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} selectedPlan={selectedPlan} />
      </div>
    );
  }

  if (activeMenuPage === 'protein-calc') {
    return (
      <div className="min-h-screen bg-[#0C0C0C] text-white">
        <ProteinCalcPage
          onBack={() => handleSetPage('menu')}
          onJoinClick={handleOpenContact}
        />
        <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} selectedPlan={selectedPlan} />
      </div>
    );
  }

  if (activeMenuPage === 'membership-fees') {
    return (
      <div className="min-h-screen bg-[#0C0C0C] text-white">
        <MembershipFeesPage
          onBack={() => handleSetPage('menu')}
          onJoinClick={handleOpenContact}
        />
        <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} selectedPlan={selectedPlan} />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-[#0C0C0C] text-white font-['Kanit',sans-serif] antialiased selection:bg-[#B600A8] selection:text-white"
      style={{ overflowX: 'clip' }}
    >
      <main className="w-full flex flex-col" style={{ overflowX: 'clip' }}>
        {/* 1. HERO SECTION */}
        <HeroSection
          onContactClick={() => setIsContactOpen(true)}
          onNavClick={handleNavClick}
        />

        {/* 2. MARQUEE SECTION */}
        <MarqueeSection />

        {/* 3. ABOUT SECTION */}
        <AboutSection
          onContactClick={() => setIsContactOpen(true)}
        />

        {/* 4. SERVICES SECTION */}
        <ServicesSection />

        {/* 5. PROJECTS SECTION */}
        <ProjectsSection
          onLiveProjectClick={(project) => setSelectedProject(project)}
          onImageClick={(url) => setSelectedImage(url)}
        />

        {/* 6. FOOTER & CONTACT SECTION */}
        <FooterSection
          onContactClick={() => setIsContactOpen(true)}
          onNavClick={handleNavClick}
          onOpenEnquiries={() => setIsAdminEnquiriesOpen(true)}
        />
      </main>

      {/* Menu Overlay Hub */}
      <GymMenuOverlay
        isOpen={activeMenuPage === 'menu'}
        onClose={() => handleSetPage(null)}
        onSelectCategory={(cat) => handleSetPage(cat)}
        onJoinClick={handleOpenContact}
        onOpenEnquiries={() => setIsAdminEnquiriesOpen(true)}
      />

      {/* Interactive Contact Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        selectedPlan={selectedPlan}
      />

      {/* Gym Enquiries Inbox Modal */}
      <AdminEnquiriesModal
        isOpen={isAdminEnquiriesOpen}
        onClose={() => setIsAdminEnquiriesOpen(false)}
      />

      {/* Project Details Modal */}
      <ProjectLiveModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onImageClick={(url) => setSelectedImage(url)}
      />

      {/* Fullscreen Image Lightbox Modal */}
      <ImageLightboxModal
        imageUrl={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
}

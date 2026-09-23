import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { ProjectsGrid } from "./components/ProjectsGrid";
import { SkillsSection } from "./components/SkillsSection";
import { Footer } from "./components/Footer";

export default function App() {
  const [activeTab, setActiveTab] = useState("overview");

  // Automatically update active nav link when scrolling through sections
  useEffect(() => {
    const sectionIds = ["overview", "projects", "skills"];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 200; // Offset for navbar height

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveTab(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    if (id === "overview") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0d12] text-[#e8eaef] relative selection:bg-rose-500/30 selection:text-rose-200">
      {/* Spider-Verse Halftone & Mesh Background Layers */}
      <div className="fixed inset-0 halftone-dots opacity-40 pointer-events-none z-0" />
      <div className="fixed inset-0 bg-comic-grid opacity-50 pointer-events-none z-0" />

      {/* Main Content Layout */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar activeTab={activeTab} setActiveTab={handleNavClick} />
        
        <main className="flex-1">
          <HeroSection onExploreProjects={() => handleNavClick("projects")} />
          <ProjectsGrid />
          <SkillsSection />
        </main>

        <Footer onNavClick={handleNavClick} />
      </div>
    </div>
  );
}

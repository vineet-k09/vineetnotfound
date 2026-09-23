import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { ProjectsGrid } from "./components/ProjectsGrid";
import { SkillsSection } from "./components/SkillsSection";
import { SystemConsole } from "./components/SystemConsole";
import { Footer } from "./components/Footer";

export default function App() {
  const [activeTab, setActiveTab] = useState("overview");

  const scrollToProjects = () => {
    setActiveTab("projects");
    const el = document.getElementById("projects");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0d12] text-[#e8eaef] relative selection:bg-rose-500/30 selection:text-rose-200">
      {/* Spider-Verse Halftone & Mesh Background Layers */}
      <div className="fixed inset-0 halftone-dots opacity-40 pointer-events-none z-0" />
      <div className="fixed inset-0 bg-comic-grid opacity-50 pointer-events-none z-0" />

      {/* Main Content Layout */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="flex-1">
          <HeroSection onExploreProjects={scrollToProjects} />
          <ProjectsGrid />
          <SkillsSection />
          <SystemConsole />
        </main>

        <Footer />
      </div>
    </div>
  );
}

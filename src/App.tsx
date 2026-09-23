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
    <div className="min-h-screen bg-[#0b0c0e] text-[#e6e8ec] relative selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* Subtle Noise Texture Overlay */}
      <div className="noise-overlay" />
      
      {/* Background Engineering Grid */}
      <div className="fixed inset-0 bg-grid opacity-40 pointer-events-none z-0" />

      {/* Main Content Wrapper */}
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

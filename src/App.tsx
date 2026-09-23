import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { ProjectsGrid } from "./components/ProjectsGrid";
import { SkillsSection } from "./components/SkillsSection";
import { Footer } from "./components/Footer";

export default function App() {
  const [activeTab, setActiveTab] = useState("overview");
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

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
    <div
      className={`min-h-screen transition-colors duration-500 relative ${
        theme === "dark"
          ? "bg-[#0c0d12] text-[#e8eaef] selection:bg-rose-500/30 selection:text-rose-200"
          : "bg-[#f8f9fa] text-[#0f172a] selection:bg-rose-200 selection:text-rose-900"
      }`}
    >
      {/* Spider-Verse Halftone & Mesh Background Layers */}
      <div
        className={`fixed inset-0 halftone-dots pointer-events-none z-0 ${
          theme === "dark" ? "opacity-40" : "opacity-25"
        }`}
      />
      <div
        className={`fixed inset-0 pointer-events-none z-0 ${
          theme === "dark" ? "bg-comic-grid-dark opacity-50" : "bg-comic-grid-light opacity-60"
        }`}
      />

      {/* Main Content Layout */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar
          activeTab={activeTab}
          setActiveTab={handleNavClick}
          theme={theme}
          toggleTheme={toggleTheme}
        />
        
        <main className="flex-1">
          <HeroSection onExploreProjects={() => handleNavClick("projects")} theme={theme} />
          <ProjectsGrid theme={theme} />
          <SkillsSection theme={theme} />
        </main>

        <Footer onNavClick={handleNavClick} theme={theme} />
      </div>
    </div>
  );
}

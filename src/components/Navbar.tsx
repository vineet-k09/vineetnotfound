import React from "react";
import { motion } from "framer-motion";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const sections = [
    { id: "overview", label: "OVERVIEW" },
    { id: "projects", label: "ENGINEERING" },
    { id: "skills", label: "STACK" },
    { id: "console", label: "SHELL" },
  ];

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
    <header className="sticky top-0 z-50 w-full bg-transparent py-5 px-6 sm:px-12 transition-all">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* Minimal Dandy Brand Logo */}
        <button
          onClick={() => handleNavClick("overview")}
          className="group flex items-center gap-2 font-nav text-xs tracking-[0.25em] font-light text-neutral-300 hover:text-white transition-colors cursor-pointer"
        >
          <span className="font-semibold text-white">VINEET</span> KUSHWAHA
        </button>

        {/* Minimalist Uppercase Section Links */}
        <nav className="flex items-center gap-6 sm:gap-10">
          {sections.map((sec) => {
            const isActive = activeTab === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => handleNavClick(sec.id)}
                className={`relative font-nav text-xs tracking-[0.2em] font-light transition-all cursor-pointer py-1 ${
                  isActive
                    ? "text-white font-medium"
                    : "text-neutral-400 hover:text-rose-300"
                }`}
              >
                {sec.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute left-0 right-0 -bottom-0.5 h-[1.5px] bg-gradient-to-r from-rose-500 to-amber-500"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

      </div>
    </header>
  );
};

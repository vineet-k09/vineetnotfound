import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  theme: "dark" | "light";
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  theme,
  toggleTheme,
}) => {
  const sections = [
    { id: "overview", label: "OVERVIEW" },
    { id: "projects", label: "ENGINEERING" },
    { id: "skills", label: "STACK" },
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
          className={`group flex items-center gap-2 font-nav text-xs tracking-[0.25em] font-light transition-colors cursor-pointer ${
            theme === "dark" ? "text-neutral-300 hover:text-white" : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <span className={theme === "dark" ? "font-semibold text-white" : "font-bold text-slate-900"}>VINEET</span> KUSHWAHA
        </button>

        {/* Minimalist Uppercase Section Links + Sleek Animated Sun/Moon Switcher */}
        <nav className="flex items-center gap-5 sm:gap-8">
          {sections.map((sec) => {
            const isActive = activeTab === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => handleNavClick(sec.id)}
                className={`relative font-nav text-xs tracking-[0.2em] transition-all cursor-pointer py-1 ${
                  isActive
                    ? theme === "dark" ? "text-white font-medium" : "text-slate-900 font-bold"
                    : theme === "dark" ? "text-neutral-400 hover:text-rose-300 font-light" : "text-slate-600 hover:text-rose-600 font-medium"
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

          {/* ☀️/🌙 Sleek Animated Theme Switcher Button right after STACK */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Light / Dark Mode"
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            className="p-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer focus:outline-none flex items-center justify-center ml-1 sm:ml-2"
          >
            <AnimatePresence mode="wait" initial={false}>
              {theme === "dark" ? (
                <motion.div
                  key="moon"
                  initial={{ rotate: -90, scale: 0.6, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: 90, scale: 0.6, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  <Moon className="w-4 h-4 stroke-[1.5] text-neutral-300 hover:text-rose-300" />
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, scale: 0.6, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: 90, scale: 0.6, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  <Sun className="w-4 h-4 stroke-[1.5] text-slate-800 hover:text-amber-600" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </nav>

      </div>
    </header>
  );
};

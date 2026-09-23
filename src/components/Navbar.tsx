import React from "react";
import { motion } from "framer-motion";
import { Terminal, Cpu, Layers, GitBranch, ArrowUpRight } from "lucide-react";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "overview", label: "Overview", icon: Cpu },
    { id: "projects", label: "Engineering", icon: Layers },
    { id: "skills", label: "Stack & Infra", icon: Terminal },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#0b0c0e]/80 border-b border-white/[0.06] transition-all">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Brand Identity */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-mono text-xs font-bold">
            VK
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-sm text-white tracking-wide">
              vineetnotfound
            </span>
            <span className="text-[10px] font-mono text-neutral-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              v2.0 &bull; Vite + React + TS
            </span>
          </div>
        </div>

        {/* Tab Selector with Smooth Spring Indicator */}
        <nav className="hidden sm:flex items-center gap-1 p-1 bg-white/[0.03] border border-white/[0.06] rounded-xl">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-2 ${
                  isActive ? "text-white font-semibold" : "text-neutral-400 hover:text-neutral-200"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="navbar-active-pill"
                    className="absolute inset-0 bg-white/[0.08] rounded-lg border border-white/10"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <Icon className={`w-3.5 h-3.5 relative z-10 ${isActive ? "text-cyan-400" : "text-neutral-400"}`} />
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* External Link */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/vineet-k09"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-neutral-400 hover:text-white flex items-center gap-1 px-3 py-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] transition-all"
          >
            <GitBranch className="w-3.5 h-3.5 text-cyan-400" />
            <span>GitHub</span>
            <ArrowUpRight className="w-3 h-3 opacity-60" />
          </a>
        </div>
      </div>
    </header>
  );
};

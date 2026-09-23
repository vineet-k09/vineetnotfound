import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import profileData from "@data/profile.json";

interface HeroSectionProps {
  onExploreProjects: () => void;
  theme: "dark" | "light";
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreProjects, theme }) => {
  const isDark = theme === "dark";

  const animateVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section
      id="overview"
      className={`relative pt-12 sm:pt-16 pb-20 sm:pb-24 overflow-hidden border-b ${
        isDark ? "border-white/[0.06]" : "border-slate-200"
      }`}
    >
      {/* Red Glow Orbs */}
      <div
        className={`absolute top-10 right-1/4 w-[450px] h-[450px] rounded-full blur-[110px] pointer-events-none ${
          isDark ? "bg-rose-600/10" : "bg-rose-400/15"
        }`}
      />
      <div
        className={`absolute -bottom-10 left-10 w-[350px] h-[350px] rounded-full blur-[90px] pointer-events-none ${
          isDark ? "bg-rose-700/10" : "bg-rose-300/20"
        }`}
      />

      <div className="max-w-6xl mx-auto px-6 sm:px-12 flex flex-col gap-10 relative z-10">
        
        {/* Tag Badge */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-60px" }}
          variants={animateVariants}
          className="flex items-center gap-3"
        >
          <div className="spider-badge-cut bg-gradient-to-r from-rose-600 to-rose-500 p-[1px]">
            <div
              className={`px-4 py-1.5 flex items-center gap-2 ${
                isDark ? "bg-[#0c0d12]" : "bg-rose-50 border border-rose-200"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
              <span
                className={`font-mono text-xs font-bold tracking-wider uppercase ${
                  isDark ? "text-rose-400" : "text-rose-700"
                }`}
              >
                SOFTWARE & DATA ENGINEER
              </span>
            </div>
          </div>
          <span
            className={`font-mono text-xs tracking-wider hidden sm:inline ${
              isDark ? "text-neutral-500" : "text-slate-500 font-medium"
            }`}
          >
            [BENGALURU, IN]
          </span>
        </motion.div>

        {/* Headline Typography */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-60px" }}
          variants={animateVariants}
          className="flex flex-col gap-6 max-w-5xl"
        >
          <h1
            className={`font-display text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.05] ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            BUILDING{" "}
            <span className="text-rose-600 dark:text-rose-500 font-black">
              HIGH-IMPACT
            </span>{" "}
            SYSTEMS & PIPELINES.
          </h1>

          <p
            className={`text-base sm:text-lg font-normal leading-relaxed max-w-2xl font-body ${
              isDark ? "text-neutral-300" : "text-slate-700"
            }`}
          >
            {profileData.developer.philosophy}
          </p>
        </motion.div>

        {/* Action Buttons with Slow Sweep Fill */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-60px" }}
          variants={animateVariants}
          className="flex flex-wrap items-center gap-5 pt-2"
        >
          <button
            onClick={onExploreProjects}
            className="spider-cut slow-fill-btn bg-rose-600 hover:bg-rose-700 text-white font-display font-bold text-sm px-7 py-3.5 flex items-center gap-3 transition-all transform hover:-translate-y-0.5 pop-shadow-rose cursor-pointer"
          >
            <span className="tracking-wider uppercase relative z-10">Explore Engineering Work</span>
            <ArrowUpRight className="w-4 h-4 stroke-[3] relative z-10" />
          </button>

          <a
            href={`mailto:${profileData.developer.email}`}
            className={`spider-cut font-mono text-xs px-6 py-3.5 transition-all flex items-center gap-2 border ${
              isDark
                ? "bg-[#141620] hover:bg-[#1c1f2d] border-white/10 text-neutral-200"
                : "bg-white hover:bg-slate-50 border-slate-300 text-slate-800 font-semibold"
            }`}
          >
            <span>{profileData.developer.email}</span>
          </a>
        </motion.div>

      </div>
    </section>
  );
};

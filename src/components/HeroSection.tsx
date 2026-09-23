import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Zap, Terminal, Shield, Layers } from "lucide-react";
import profileData from "@data/profile.json";

interface HeroSectionProps {
  onExploreProjects: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreProjects }) => {
  const animateVariants = {
    hidden: { opacity: 0, y: 32, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 240,
        damping: 24,
      },
    },
  };

  return (
    <section className="relative pt-10 sm:pt-10 pb-16 sm:pb-16 overflow-hidden border-b border-white/[0.05]">
      
      {/* Spider-Verse Color Blending Glow Orbs (Resisting Blue) */}
      <div className="absolute top-10 right-1/4 w-[450px] h-[450px] bg-gradient-to-br from-rose-600/15 via-purple-600/10 to-amber-500/10 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-[350px] h-[350px] bg-gradient-to-tr from-rose-700/10 via-amber-600/10 to-transparent rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-12 flex flex-col gap-12 relative z-10">
        
        {/* Cartoon Edge-Cut Tag Badge */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={animateVariants}
          className="flex items-center gap-3"
        >
          <div className="spider-badge-cut bg-gradient-to-r from-rose-600 to-amber-500 p-[1px]">
            <div className="bg-[#0c0d12] px-4 py-1.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span className="font-mono text-xs font-bold text-rose-400 tracking-wider uppercase">
                SOFTWARE & DATA ENGINEER
              </span>
            </div>
          </div>
          <span className="font-mono text-xs text-neutral-500 hidden sm:inline tracking-wider">
            [BENGALURU, IN]
          </span>
        </motion.div>

        {/* Big Size Words & Comic Typography */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={animateVariants}
          className="flex flex-col gap-6 max-w-5xl"
        >
          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.05]">
            BUILDING{" "}
            <span className="bg-gradient-to-r from-rose-500 via-purple-400 to-amber-400 bg-clip-text text-transparent">
              HIGH-IMPACT
            </span>{" "}
            SYSTEMS & PIPELINES.
          </h1>

          <p className="text-neutral-300 text-lg sm:text-xl font-normal leading-relaxed max-w-2xl font-body">
            {profileData.developer.philosophy}
          </p>
        </motion.div>

        {/* Action Button with Spider Edge Cut & Pop Shadow */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={animateVariants}
          className="flex flex-wrap items-center gap-5"
        >
          <button
            onClick={onExploreProjects}
            className="spider-cut bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-display font-bold text-sm px-7 py-3.5 flex items-center gap-3 transition-all transform hover:-translate-y-0.5 pop-shadow-rose cursor-pointer"
          >
            <span className="tracking-wider uppercase">Explore Engineering Work</span>
            <ArrowUpRight className="w-4 h-4 stroke-[3]" />
          </button>

          <a
            href={`mailto:${profileData.developer.email}`}
            className="spider-cut bg-[#141620] hover:bg-[#1c1f2d] border border-white/10 text-neutral-200 font-mono text-xs px-6 py-3.5 transition-all flex items-center gap-2"
          >
            <span>{profileData.developer.email}</span>
          </a>
        </motion.div>

        {/* 4 Edge-Cut Cartoon System Highlight Blocks */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-4"
        >
          {[
            {
              icon: Zap,
              title: "Cloud Microservices",
              desc: "Containerized Node & FastAPI on GCP Cloud Run with zero-downtime routing.",
              accent: "from-rose-500/20 to-rose-600/5",
              borderColor: "border-rose-500/30",
            },
            {
              icon: Layers,
              title: "High Throughput Data",
              desc: "Automated multi-market data ingestion processing 400K+ records with BigQuery.",
              accent: "from-amber-500/20 to-amber-600/5",
              borderColor: "border-amber-500/30",
            },
            {
              icon: Terminal,
              title: "CLI & Desktop Tools",
              desc: "Sub-2ms NVMe partition inspection in Rust & zero-bloat desktop mail widgets.",
              accent: "from-purple-500/20 to-purple-600/5",
              borderColor: "border-purple-500/30",
            },
            {
              icon: Shield,
              title: "Enterprise Systems",
              desc: "Custom React postMessage widgets replacing $500K proprietary solutions.",
              accent: "from-rose-500/20 to-amber-500/5",
              borderColor: "border-rose-500/30",
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                variants={animateVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`spider-cut bg-[#12141c] p-6 border ${item.borderColor} flex flex-col justify-between gap-4 group pop-shadow-dark transition-all`}
              >
                <div className={`w-10 h-10 spider-cut-sm bg-gradient-to-br ${item.accent} border border-white/10 flex items-center justify-center text-rose-400 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-white text-base mb-1 group-hover:text-rose-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed font-body">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};

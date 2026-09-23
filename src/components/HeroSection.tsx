import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Server, Database, Code, ShieldCheck } from "lucide-react";
import profileData from "@data/profile.json";

interface HeroSectionProps {
  onExploreProjects: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreProjects }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 260, damping: 24 },
    },
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="py-16 md:py-24 border-b border-white/[0.06] relative overflow-hidden"
    >
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 flex flex-col gap-10">
        
        {/* Status Pill */}
        <motion.div variants={itemVariants} className="flex items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-medium">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            SOFTWARE & DATA ENGINEER // BENGALURU
          </div>
          <span className="text-xs font-mono text-neutral-500 hidden sm:inline">
            [SYS_STATUS: ONLINE]
          </span>
        </motion.div>

        {/* Big Impact Headline */}
        <motion.div variants={itemVariants} className="flex flex-col gap-4 max-w-4xl">
          <h1 className="font-display text-5xl sm:text-7xl font-extrabold text-white tracking-tight leading-[1.05]">
            Engineering Systems, Microservices & Data Infra.
          </h1>
          <p className="text-neutral-400 text-lg sm:text-xl font-normal leading-relaxed max-w-2xl">
            {profileData.developer.philosophy}
          </p>
        </motion.div>

        {/* Action Controls & Callout */}
        <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
          <button
            onClick={onExploreProjects}
            className="px-6 py-3 rounded-xl bg-cyan-500 text-black font-semibold text-sm hover:bg-cyan-400 transition-all flex items-center gap-2 group cursor-pointer shadow-lg shadow-cyan-500/10"
          >
            <span>Explore Engineering Work</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <a
            href={`mailto:${profileData.developer.email}`}
            className="px-6 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white font-medium text-sm transition-all flex items-center gap-2"
          >
            <span>{profileData.developer.email}</span>
          </a>
        </motion.div>

        {/* Key System Highlights Matrix (No image requirement) */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6"
        >
          {[
            {
              icon: Server,
              title: "Cloud Microservices",
              detail: "Node.js & FastAPI containerized on GCP Cloud Run with zero-downtime routing.",
            },
            {
              icon: Database,
              title: "High Throughput Data",
              detail: "Automated pipelines ingesting 400K+ records with BigQuery telemetry.",
            },
            {
              icon: Code,
              title: "CLI & System Utilities",
              detail: "Sub-2ms NVMe disk audit in Rust & zero-bloat desktop tools.",
            },
            {
              icon: ShieldCheck,
              title: "Enterprise Systems",
              detail: "Custom postMessage React widgets replacing $500K proprietary platforms.",
            },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/15 transition-all flex flex-col justify-between gap-3 group"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-base mb-1">
                    {stat.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {stat.detail}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </motion.section>
  );
};

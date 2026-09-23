import React from "react";
import { motion } from "framer-motion";
import { Zap, Layers, Terminal, Shield, MapPin, GraduationCap, Award } from "lucide-react";

interface AboutSectionProps {
  theme: "dark" | "light";
}

export const AboutSection: React.FC<AboutSectionProps> = ({ theme }) => {
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
      id="about"
      className={`py-20 border-b relative ${
        isDark ? "border-white/[0.06]" : "border-slate-200"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-12 flex flex-col gap-12">
        
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-60px" }}
          variants={animateVariants}
          className="flex flex-col gap-2"
        >
          <span className="font-mono text-xs font-bold text-rose-600 dark:text-rose-500 uppercase tracking-widest">
            01 // BACKGROUND & PROFILE
          </span>
          <h2
            className={`font-display text-4xl sm:text-5xl font-black tracking-tight ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            Engineering Profile
          </h2>
        </motion.div>

        {/* Face & Description Box Layout */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-60px" }}
          variants={animateVariants}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch"
        >
          {/* Developer Photo / Avatar Box (4 Cols) */}
          <div className="md:col-span-4 flex flex-col">
            <div
              className={`spider-cut relative p-2 border flex flex-col items-center justify-center overflow-hidden h-full ${
                isDark
                  ? "bg-[#12141c] border-white/10 pop-shadow-dark"
                  : "bg-white border-slate-200 pop-shadow-light"
              }`}
            >
              <div className="spider-cut overflow-hidden w-full h-72 sm:h-80 md:h-full min-h-[260px] relative bg-slate-900">
                <img
                  src="/photos/hero.jpg"
                  alt="Vineet Kushwaha"
                  className="w-full h-full object-cover object-center filter grayscale hover:grayscale-0 transition-all duration-500 scale-105 hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="font-display text-sm font-bold text-white tracking-wider">
                    VINEET KUSHWAHA
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Description & Systems Box (8 Cols) */}
          <div className="md:col-span-8 flex flex-col justify-between">
            <div
              className={`spider-cut p-6 sm:p-8 border flex flex-col justify-between gap-6 h-full ${
                isDark
                  ? "bg-[#12141c] border-white/10 pop-shadow-dark"
                  : "bg-white border-slate-200 pop-shadow-light"
              }`}
            >
              <div className="flex flex-col gap-4">
                <div className="border-b pb-4 border-white/5 dark:border-white/5 light:border-slate-100">
                  <h3
                    className={`font-display text-2xl font-extrabold tracking-tight ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}
                  >
                    Software & Data Systems Engineer
                  </h3>
                </div>

                <p
                  className={`text-sm leading-relaxed font-body ${
                    isDark ? "text-neutral-300" : "text-slate-700"
                  }`}
                >
                  I construct scalable backend architecture, containerized Cloud Run microservices, and automated multi-market data pipelines. From processing 400K+ monthly analytics records at Vodafone Intelligent Solutions to building sub-2ms disk inspection utilities in Rust, I focus on clean API design, memory efficiency, and real-world system craft.
                </p>

                <p
                  className={`text-xs leading-relaxed font-body ${
                    isDark ? "text-neutral-400" : "text-slate-500"
                  }`}
                >
                  Beyond full-stack APIs, I lead content and technical direction as Content Head for the Innovation & Entrepreneurship Development Cell (IEDC), bridging machine learning pipelines with high-throughput cloud delivery.
                </p>
              </div>

              {/* Quick Specs Tags */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-white/5 dark:border-white/5 light:border-slate-100 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  <span className={isDark ? "text-neutral-300" : "text-slate-700"}>Bengaluru, IN</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-3.5 h-3.5 text-rose-500" />
                  <span className={isDark ? "text-neutral-300" : "text-slate-700"}>Grad: Jun 2026</span>
                </div>
                <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                  <Award className="w-3.5 h-3.5 text-rose-500" />
                  <span className={isDark ? "text-neutral-300" : "text-slate-700"}>IEDC Lead</span>
                </div>
              </div>

            </div>
          </div>
        </motion.div>

        {/* 4 System Highlight Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-60px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.08 },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-2"
        >
          {[
            {
              icon: Zap,
              title: "Cloud Microservices",
              desc: "Containerized Node & FastAPI on GCP Cloud Run with zero-downtime routing.",
            },
            {
              icon: Layers,
              title: "High Throughput Data",
              desc: "Automated multi-market data ingestion processing 400K+ records with BigQuery.",
            },
            {
              icon: Terminal,
              title: "CLI & Desktop Tools",
              desc: "Sub-2ms NVMe partition inspection in Rust & zero-bloat desktop mail widgets.",
            },
            {
              icon: Shield,
              title: "Enterprise Systems",
              desc: "Custom React postMessage widgets replacing $500K proprietary solutions.",
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                variants={animateVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`spider-cut p-6 border flex flex-col justify-between gap-4 group transition-all ${
                  isDark
                    ? "bg-[#12141c] border-white/10 hover:border-rose-500/40 pop-shadow-dark"
                    : "bg-white border-slate-200 hover:border-rose-400 pop-shadow-light"
                }`}
              >
                <div
                  className={`w-10 h-10 spider-cut-sm flex items-center justify-center border ${
                    isDark
                      ? "bg-rose-500/10 border-rose-500/20 text-rose-400"
                      : "bg-rose-100 border-rose-300 text-rose-700"
                  }`}
                >
                  <Icon className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h3
                    className={`font-display font-bold text-base mb-1 transition-colors ${
                      isDark ? "text-white group-hover:text-rose-300" : "text-slate-900 group-hover:text-rose-700"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p className={`text-xs leading-relaxed font-body ${isDark ? "text-neutral-400" : "text-slate-600"}`}>
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

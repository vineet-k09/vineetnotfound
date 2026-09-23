import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import projectsData from "@data/projects.json";

interface Project {
  title: string;
  github?: string;
  figma?: string;
  live?: string;
  description: string;
  stack: string[];
  image?: string[];
}

export const ProjectsGrid: React.FC = () => {
  const [filter, setFilter] = useState<"all" | "main" | "lab">("all");

  const categories = [
    { id: "all" as const, label: "ALL SYSTEMS" },
    { id: "main" as const, label: "PLATFORMS & APPS" },
    { id: "lab" as const, label: "CLI & UTILITIES" },
  ];

  const filteredProjects: { project: Project; category: string }[] = [];

  if (filter === "all" || filter === "main") {
    projectsData.mainProjects.forEach((p) =>
      filteredProjects.push({ project: p, category: "Platform" })
    );
  }
  if (filter === "all" || filter === "lab") {
    projectsData.labProjects.forEach((p) =>
      filteredProjects.push({ project: p, category: "CLI Utility" })
    );
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 240,
        damping: 24,
      },
    },
  };

  return (
    <section id="projects" className="py-20 border-b border-white/[0.05] relative">
      <div className="max-w-6xl mx-auto px-6 sm:px-12 flex flex-col gap-10">
        
        {/* Section Header with Scroll Animation */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.25 }}
          variants={containerVariants}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs font-bold text-rose-500 uppercase tracking-widest">
              01 // CORE ENGINEERING
            </span>
            <h2 className="font-display text-4xl sm:text-6xl font-black text-white tracking-tight">
              Systems & Repositories
            </h2>
          </div>

          {/* Minimalist Uppercase Category Selector */}
          <div className="flex items-center gap-2 self-start md:self-auto flex-wrap">
            {categories.map((cat) => {
              const isActive = filter === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id)}
                  className={`spider-cut-sm font-nav text-xs tracking-[0.15em] font-medium px-4 py-2 transition-all cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-rose-600 to-amber-500 text-white font-semibold pop-shadow-rose"
                      : "bg-[#13151d] text-neutral-400 hover:text-white border border-white/5"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Projects Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map(({ project, category }, idx) => (
              <motion.div
                key={project.title}
                layout
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={containerVariants}
                exit={{ opacity: 0, scale: 0.95, y: 16 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="spider-cut group bg-[#12141c] border border-white/10 hover:border-rose-500/40 p-6 flex flex-col justify-between gap-6 transition-all pop-shadow-dark"
              >
                <div className="flex flex-col gap-4">
                  
                  {/* Category Tag & Links */}
                  <div className="flex items-center justify-between">
                    <span className="spider-badge-cut text-[10px] font-mono font-bold uppercase tracking-wider text-rose-400 px-3 py-1 bg-rose-500/10 border border-rose-500/20">
                      {category}
                    </span>
                    
                    <div className="flex items-center gap-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-md text-neutral-400 hover:text-white hover:bg-white/10 transition-all"
                          title="View Repository"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-md text-neutral-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
                          title="Live Preview"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="font-display text-xl font-bold text-white group-hover:text-rose-300 transition-colors mb-2">
                      {project.title}
                    </h3>
                    <p className="text-xs text-neutral-300 leading-relaxed font-body">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Tech Stack Matrix Tags */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                  {project.stack.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="spider-cut-sm text-[11px] font-mono text-neutral-300 bg-[#181a24] px-2.5 py-0.5 border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};

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

interface ProjectsGridProps {
  theme: "dark" | "light";
}

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({ theme }) => {
  const isDark = theme === "dark";
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
    <section
      id="projects"
      className={`py-20 border-b relative ${
        isDark ? "border-white/[0.06]" : "border-slate-200"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-12 flex flex-col gap-10">
        
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.25 }}
          variants={containerVariants}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs font-bold text-rose-600 dark:text-rose-500 uppercase tracking-widest">
              01 // CORE ENGINEERING
            </span>
            <h2
              className={`font-display text-4xl sm:text-5xl font-black tracking-tight ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Systems & Repositories
            </h2>
          </div>

          {/* Category Selector */}
          <div className="flex items-center gap-2 self-start md:self-auto flex-wrap">
            {categories.map((cat) => {
              const isActive = filter === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id)}
                  className={`spider-cut-sm font-nav text-xs tracking-[0.15em] font-medium px-4 py-2 transition-all cursor-pointer ${
                    isActive
                      ? "bg-rose-600 text-white font-semibold pop-shadow-rose"
                      : isDark
                      ? "bg-[#13151d] text-neutral-400 hover:text-white border border-white/5"
                      : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
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
            {filteredProjects.map(({ project, category }) => (
              <motion.div
                key={project.title}
                layout
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={containerVariants}
                exit={{ opacity: 0, scale: 0.95, y: 16 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`spider-cut group p-6 flex flex-col justify-between gap-6 transition-all border ${
                  isDark
                    ? "bg-[#12141c] border-white/10 hover:border-rose-500/40 pop-shadow-dark"
                    : "bg-white border-slate-200 hover:border-rose-400 pop-shadow-light"
                }`}
              >
                <div className="flex flex-col gap-4">
                  
                  {/* Category Tag & Links */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`spider-badge-cut text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 border ${
                        isDark
                          ? "bg-rose-500/10 border-rose-500/20 text-rose-400"
                          : "bg-rose-50 border-rose-200 text-rose-600"
                      }`}
                    >
                      {category}
                    </span>
                    
                    <div className="flex items-center gap-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-1.5 rounded-md transition-all ${
                            isDark
                              ? "text-neutral-400 hover:text-white hover:bg-white/10"
                              : "text-slate-400 hover:text-slate-900 hover:bg-slate-100"
                          }`}
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
                          className={`p-1.5 rounded-md transition-all ${
                            isDark
                              ? "text-neutral-400 hover:text-rose-400 hover:bg-rose-500/10"
                              : "text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                          }`}
                          title="Live Preview"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3
                      className={`font-display text-xl font-bold transition-colors mb-2 ${
                        isDark
                          ? "text-white group-hover:text-rose-300"
                          : "text-slate-900 group-hover:text-rose-600"
                      }`}
                    >
                      {project.title}
                    </h3>
                    <p
                      className={`text-xs leading-relaxed font-body ${
                        isDark ? "text-neutral-300" : "text-slate-600"
                      }`}
                    >
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Tech Stack Tags */}
                <div
                  className={`flex flex-wrap gap-1.5 pt-4 border-t ${
                    isDark ? "border-white/5" : "border-slate-100"
                  }`}
                >
                  {project.stack.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className={`spider-cut-sm text-[11px] font-mono px-2.5 py-0.5 border ${
                        isDark
                          ? "text-neutral-300 bg-[#181a24] border-white/5"
                          : "text-slate-700 bg-slate-100 border-slate-200"
                      }`}
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

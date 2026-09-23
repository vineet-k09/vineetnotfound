import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Terminal, Cpu, CheckCircle2 } from "lucide-react";
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
    { id: "all" as const, label: "All Systems" },
    { id: "main" as const, label: "Applications & Platforms" },
    { id: "lab" as const, label: "CLI & Developer Tools" },
  ];

  const filteredProjects: { project: Project; category: string }[] = [];

  if (filter === "all" || filter === "main") {
    projectsData.mainProjects.forEach((p) =>
      filteredProjects.push({ project: p, category: "Platform" })
    );
  }
  if (filter === "all" || filter === "lab") {
    projectsData.labProjects.forEach((p) =>
      filteredProjects.push({ project: p, category: "Developer Utility" })
    );
  }

  return (
    <section id="projects" className="py-20 border-b border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6 flex flex-col gap-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-widest">
              01 // ENGINEERING REPOSITORY
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              Core Systems & Projects
            </h2>
          </div>

          {/* Category Filter Pills with Spring Animation */}
          <div className="flex items-center gap-1.5 p-1 bg-white/[0.03] border border-white/[0.06] rounded-xl self-start md:self-auto">
            {categories.map((cat) => {
              const isActive = filter === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id)}
                  className={`relative px-4 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    isActive ? "text-white font-semibold" : "text-neutral-400 hover:text-neutral-200"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="project-category-pill"
                      className="absolute inset-0 bg-cyan-500/15 border border-cyan-500/30 rounded-lg"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

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
                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 12 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-cyan-500/30 p-6 flex flex-col justify-between gap-6 transition-all shadow-lg hover:shadow-cyan-500/5"
              >
                <div className="flex flex-col gap-4">
                  
                  {/* Category & Links */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-cyan-400 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                      {category}
                    </span>
                    
                    <div className="flex items-center gap-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-all"
                          title="Source Repository"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg text-neutral-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all"
                          title="Live Deployment"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Project Title & Architecture Details */}
                  <div>
                    <h3 className="font-display text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                      {project.title}
                    </h3>
                    <p className="text-xs text-neutral-300 leading-relaxed font-normal">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Tech Stack Matrix Tags */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.06]">
                  {project.stack.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[11px] font-mono text-neutral-400 bg-white/[0.03] border border-white/[0.06] px-2 py-0.5 rounded"
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

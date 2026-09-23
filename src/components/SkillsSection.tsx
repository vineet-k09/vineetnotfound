import React from "react";
import { motion } from "framer-motion";
import { Code2, Server, Wrench } from "lucide-react";
import skillsData from "@data/skills.json";

export const SkillsSection: React.FC = () => {
  const categories = [
    {
      title: "Languages & Frontend",
      icon: Code2,
      skills: skillsData.languagesAndFrontend,
      color: "cyan",
    },
    {
      title: "Backend & Databases",
      icon: Server,
      skills: skillsData.backendAndDatabases,
      color: "blue",
    },
    {
      title: "DevOps, Infra & Systems",
      icon: Wrench,
      skills: skillsData.devopsAndTools,
      color: "amber",
    },
  ];

  return (
    <section id="skills" className="py-20 border-b border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6 flex flex-col gap-10">
        
        {/* Section Header */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-widest">
            02 // STACK & INFRASTRUCTURE
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Technical Competencies
          </h2>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="rounded-2xl bg-white/[0.02] border border-white/[0.06] p-6 flex flex-col justify-between gap-6"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-cyan-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-white">
                      {cat.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill, sIdx) => (
                      <a
                        key={sIdx}
                        href={skill.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group text-xs font-mono px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:border-cyan-500/30 hover:bg-cyan-500/10 hover:text-cyan-300 transition-all flex items-center gap-2"
                      >
                        <i className={`${skill.className} text-xs text-neutral-400 group-hover:text-cyan-300 transition-colors`} />
                        <span>{skill.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

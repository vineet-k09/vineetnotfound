import React from "react";
import { motion } from "framer-motion";
import { Code2, Server, Cpu } from "lucide-react";
import skillsData from "@data/skills.json";

interface SkillsSectionProps {
  theme: "dark" | "light";
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ theme }) => {
  const isDark = theme === "dark";

  const categories = [
    {
      title: "LANGUAGES & FRONTEND",
      icon: Code2,
      skills: skillsData.languagesAndFrontend,
    },
    {
      title: "BACKEND & DATABASES",
      icon: Server,
      skills: skillsData.backendAndDatabases,
    },
    {
      title: "DEVOPS & SYSTEMS INFRA",
      icon: Cpu,
      skills: skillsData.devopsAndTools,
    },
  ];

  const animateVariants = {
    hidden: { opacity: 0, y: 28 },
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
      id="skills"
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
          variants={animateVariants}
          className="flex flex-col gap-2"
        >
          <span className="font-mono text-xs font-bold text-rose-600 dark:text-rose-500 uppercase tracking-widest">
            02 // TECH MATRIX
          </span>
          <h2
            className={`font-display text-4xl sm:text-5xl font-black tracking-tight ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            Stack & Infrastructure
          </h2>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={animateVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`spider-cut p-6 border flex flex-col justify-between gap-6 transition-all ${
                  isDark
                    ? "bg-[#12141c] border-white/10 hover:border-rose-500/40 pop-shadow-dark"
                    : "bg-white border-slate-200 hover:border-rose-400 pop-shadow-light"
                }`}
              >
                <div>
                  <div
                    className={`flex items-center gap-3 mb-5 pb-3 border-b ${
                      isDark ? "border-white/5" : "border-slate-100"
                    }`}
                  >
                    <div
                      className={`w-9 h-9 spider-cut-sm flex items-center justify-center border ${
                        isDark
                          ? "bg-rose-500/10 border-rose-500/20 text-rose-400"
                          : "bg-rose-50 border-rose-200 text-rose-600"
                      }`}
                    >
                      <Icon className="w-4 h-4 stroke-[2.5]" />
                    </div>
                    <h3
                      className={`font-nav text-xs font-bold tracking-[0.15em] ${
                        isDark ? "text-white" : "text-slate-900"
                      }`}
                    >
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
                        className={`spider-cut-sm group text-xs font-mono px-3 py-1.5 border transition-all flex items-center gap-2 ${
                          isDark
                            ? "bg-[#181a24] border-white/5 hover:border-rose-500/40 hover:bg-rose-500/10 hover:text-rose-300 text-neutral-300"
                            : "bg-slate-100 border-slate-200 hover:border-rose-400 hover:bg-rose-50 hover:text-rose-600 text-slate-700"
                        }`}
                      >
                        <i
                          className={`${skill.className} text-xs transition-colors ${
                            isDark
                              ? "text-neutral-400 group-hover:text-rose-400"
                              : "text-slate-500 group-hover:text-rose-600"
                          }`}
                        />
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

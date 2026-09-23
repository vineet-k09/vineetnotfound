import React from "react";
import { motion } from "framer-motion";
import { Code2, Server, Cpu } from "lucide-react";
import skillsData from "@data/skills.json";

export const SkillsSection: React.FC = () => {
  const categories = [
    {
      title: "LANGUAGES & FRONTEND",
      icon: Code2,
      skills: skillsData.languagesAndFrontend,
      color: "from-rose-500/20 to-rose-600/5",
      borderColor: "border-rose-500/30",
    },
    {
      title: "BACKEND & DATABASES",
      icon: Server,
      skills: skillsData.backendAndDatabases,
      color: "from-purple-500/20 to-purple-600/5",
      borderColor: "border-purple-500/30",
    },
    {
      title: "DEVOPS & SYSTEMS INFRA",
      icon: Cpu,
      skills: skillsData.devopsAndTools,
      color: "from-amber-500/20 to-amber-600/5",
      borderColor: "border-amber-500/30",
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
    <section id="skills" className="py-20 border-b border-white/[0.05] relative">
      <div className="max-w-6xl mx-auto px-6 sm:px-12 flex flex-col gap-10">
        
        {/* Section Header with Scroll Animation */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.25 }}
          variants={animateVariants}
          className="flex flex-col gap-2"
        >
          <span className="font-mono text-xs font-bold text-amber-500 uppercase tracking-widest">
            02 // TECH MATRIX
          </span>
          <h2 className="font-display text-4xl sm:text-6xl font-black text-white tracking-tight">
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
                className={`spider-cut bg-[#12141c] border ${cat.borderColor} p-6 flex flex-col justify-between gap-6 pop-shadow-dark`}
              >
                <div>
                  <div className="flex items-center gap-3 mb-5 pb-3 border-b border-white/5">
                    <div className={`w-9 h-9 spider-cut-sm bg-gradient-to-br ${cat.color} border border-white/10 flex items-center justify-center text-rose-400`}>
                      <Icon className="w-4 h-4 stroke-[2.5]" />
                    </div>
                    <h3 className="font-nav text-xs font-bold tracking-[0.15em] text-white">
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
                        className="spider-cut-sm group text-xs font-mono px-3 py-1.5 bg-[#181a24] border border-white/5 hover:border-rose-500/40 hover:bg-rose-500/10 hover:text-rose-300 transition-all flex items-center gap-2"
                      >
                        <i className={`${skill.className} text-xs text-neutral-400 group-hover:text-rose-400 transition-colors`} />
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

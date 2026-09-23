import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import profileData from "@data/profile.json";

export const SystemConsole: React.FC = () => {
  const [history, setHistory] = useState<Array<{ command: string; output: string }>>([
    {
      command: "welcome",
      output: "System initialized. Welcome to Vineet's console.\nType 'help' or click shortcuts below to explore system records.",
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmdStr: string) => {
    const raw = cmdStr.trim().toLowerCase();
    if (!raw) return;

    let output = "";
    switch (raw) {
      case "help":
        output = `Available system queries:
  bio        - Engineer bio & core summary
  education  - Degree, college, CGPA & roles
  contact    - Developer channels & social links
  projects   - Summary of core engineering highlights
  clear      - Clear console output`;
        break;
      case "bio":
        output = profileData.mockFiles["bio.txt"];
        break;
      case "education":
        output = profileData.mockFiles["education.txt"];
        break;
      case "contact":
        output = profileData.mockFiles["contact.txt"];
        break;
      case "projects":
        output = profileData.mockFiles["projects.md"];
        break;
      case "clear":
        setHistory([]);
        setInputVal("");
        return;
      default:
        output = `Command not recognized: '${raw}'. Type 'help' for available queries.`;
    }

    setHistory((prev) => [...prev, { command: raw, output }]);
    setInputVal("");
  };

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
    <section id="console" className="py-20 border-b border-white/[0.05] relative">
      <div className="max-w-6xl mx-auto px-6 sm:px-12 flex flex-col gap-8">
        
        {/* Header with Scroll Animation */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.25 }}
          variants={animateVariants}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs font-bold text-rose-500 uppercase tracking-widest">
              03 // INTERACTIVE CLI
            </span>
            <h2 className="font-display text-4xl sm:text-6xl font-black text-white tracking-tight">
              Developer Console
            </h2>
          </div>

          {/* All-Caps Shortcut Buttons */}
          <div className="flex flex-wrap gap-2">
            {["bio", "education", "contact", "projects", "clear"].map((cmd) => (
              <button
                key={cmd}
                onClick={() => handleCommand(cmd)}
                className="spider-cut-sm font-nav text-xs tracking-[0.15em] font-medium uppercase px-3 py-1.5 bg-[#141620] border border-white/10 hover:border-rose-500/40 hover:text-rose-300 text-neutral-300 transition-all cursor-pointer"
              >
                ${cmd}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Cartoon Edge-Cut Terminal Window */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={animateVariants}
          className="spider-cut bg-[#0e1017] border border-white/10 pop-shadow-dark overflow-hidden"
        >
          <div className="px-5 py-3 bg-[#141620] border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500" />
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="ml-2 font-mono text-xs text-neutral-400 font-medium">
                vineetnotfound: ~/shell
              </span>
            </div>
            <span className="font-mono text-[10px] text-neutral-500">zsh 5.9</span>
          </div>

          <div
            ref={terminalRef}
            className="p-6 h-72 overflow-y-auto font-mono text-xs text-neutral-300 flex flex-col gap-4 select-text"
          >
            {history.map((item, index) => (
              <div key={index} className="flex flex-col gap-1">
                {item.command !== "welcome" && (
                  <div className="flex items-center gap-2 text-rose-400">
                    <span>visitor@vineetnotfound:~$</span>
                    <span className="text-white font-semibold">{item.command}</span>
                  </div>
                )}
                <pre className="text-neutral-300 whitespace-pre-wrap font-mono leading-relaxed opacity-90">
                  {item.output}
                </pre>
              </div>
            ))}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCommand(inputVal);
              }}
              className="flex items-center gap-2 pt-2"
            >
              <span className="text-rose-400">visitor@vineetnotfound:~$</span>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Type 'help'..."
                className="flex-1 bg-transparent border-none outline-none text-white font-mono text-xs placeholder:text-neutral-600"
              />
            </form>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

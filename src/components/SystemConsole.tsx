import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal as TerminalIcon, Play, Trash2 } from "lucide-react";
import profileData from "@data/profile.json";

export const SystemConsole: React.FC = () => {
  const [history, setHistory] = useState<Array<{ command: string; output: string }>>([
    {
      command: "welcome",
      output: "System initialized. Welcome to Vineet's developer console.\nType 'help' or click shortcuts below to explore system records.",
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
  bio        - Engineer bio & core specialization summary
  education  - Degree, college, CGPA, leadership
  contact    - Developer links, email & social handles
  projects   - Summary of high-impact engineering highlights
  clear      - Clear terminal window logs`;
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

  return (
    <section className="py-20 border-b border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6 flex flex-col gap-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-widest">
              03 // INTERACTIVE CLI
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              Developer Shell Console
            </h2>
          </div>

          {/* Quick Buttons */}
          <div className="flex flex-wrap gap-2">
            {["bio", "education", "contact", "projects", "clear"].map((cmd) => (
              <button
                key={cmd}
                onClick={() => handleCommand(cmd)}
                className="px-3 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:border-cyan-500/30 hover:text-cyan-300 font-mono text-xs text-neutral-300 transition-all cursor-pointer"
              >
                ${cmd}
              </button>
            ))}
          </div>
        </div>

        {/* Terminal Window */}
        <div className="rounded-2xl border border-white/10 bg-[#0d0e12] overflow-hidden shadow-2xl">
          <div className="px-4 py-3 bg-white/[0.03] border-b border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 font-mono text-xs text-neutral-400 font-medium">
                vineetnotfound: ~/sys-shell
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
                  <div className="flex items-center gap-2 text-cyan-400">
                    <span>visitor@vineetnotfound:~$</span>
                    <span className="text-white">{item.command}</span>
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
              <span className="text-cyan-400">visitor@vineetnotfound:~$</span>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Type 'help'..."
                className="flex-1 bg-transparent border-none outline-none text-white font-mono text-xs placeholder:text-neutral-600"
              />
            </form>
          </div>
        </div>

      </div>
    </section>
  );
};

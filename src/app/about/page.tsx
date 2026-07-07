"use client";

import React, { useState, useEffect, useRef } from "react";
import "../page.css";
import PageWrapper from "../components/utility/pageWrapper";

interface TerminalHistoryItem {
	command: string;
	output: string;
}

// Dragon ASCII Art for welcome animation
const dragonASCII = `
                       /           /
                      /' .,,,,  ./         
                     /';'     ,/           
                    / /   ,,//,\`'\`         
                   ( ,, '_,  ,,,' \`\`      
                   |    /@  ,,, ;" \`      
                  /    .   ,''/' \`,\`\`     
                 /   .     ./, \`,, \` ;    
              ,./  .   ,-,',\` ,,/''\\\\,\`    
             |   /; ./,,'\`,,'' |   |      
             |     /   ','    /    |      
              \\___/'   '     |     |
`;

// Penguin ASCII Art for secret animation
const penguinASCII = `
         .--.
        |o_o |
        |:_/ |
       //   \\\\ \\\\
      (|     | )
     /'\\\\_   _/\`\\\\
     \\\\___)=(___/
`;

// Shared AudioContext to prevent browser thread exhaustion
let sharedAudioCtx: AudioContext | null = null;

const getAudioContext = (): AudioContext | null => {
	if (typeof window === "undefined") return null;
	const AudioContextClass =
		window.AudioContext ||
		(window as Window & { webkitAudioContext?: typeof AudioContext })
			.webkitAudioContext;
	if (!AudioContextClass) return null;

	if (!sharedAudioCtx) {
		try {
			sharedAudioCtx = new AudioContextClass();
		} catch {
			return null;
		}
	}

	// Resume context if suspended
	if (sharedAudioCtx && sharedAudioCtx.state === "suspended") {
		sharedAudioCtx.resume().catch(() => {});
	}

	return sharedAudioCtx;
};

// Audio click sound generation using Web Audio API (mechanical keyboard clicks)
const playKeySound = () => {
	const ctx = getAudioContext();
	if (!ctx) return;

	try {
		// High frequency transient (the tick)
		const oscTick = ctx.createOscillator();
		const gainTick = ctx.createGain();
		oscTick.type = "sine";
		oscTick.frequency.setValueAtTime(
			1300 + Math.random() * 400,
			ctx.currentTime,
		);
		gainTick.gain.setValueAtTime(0.012, ctx.currentTime);
		gainTick.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.015);
		oscTick.connect(gainTick);
		gainTick.connect(ctx.destination);

		// Low frequency thump (the key bottom-out)
		const oscThump = ctx.createOscillator();
		const gainThump = ctx.createGain();
		oscThump.type = "triangle";
		oscThump.frequency.setValueAtTime(
			140 + Math.random() * 60,
			ctx.currentTime,
		);
		gainThump.gain.setValueAtTime(0.009, ctx.currentTime);
		gainThump.gain.exponentialRampToValueAtTime(
			0.0001,
			ctx.currentTime + 0.035,
		);
		oscThump.connect(gainThump);
		gainThump.connect(ctx.destination);

		oscTick.start();
		oscTick.stop(ctx.currentTime + 0.02);

		oscThump.start();
		oscThump.stop(ctx.currentTime + 0.04);
	} catch {}
};

const playEnterSound = () => {
	const ctx = getAudioContext();
	if (!ctx) return;

	try {
		// Pitch it down and make it longer for Enter bottom-out
		const oscTick = ctx.createOscillator();
		const gainTick = ctx.createGain();
		oscTick.type = "sine";
		oscTick.frequency.setValueAtTime(
			750 + Math.random() * 100,
			ctx.currentTime,
		);
		gainTick.gain.setValueAtTime(0.02, ctx.currentTime);
		gainTick.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.035);
		oscTick.connect(gainTick);
		gainTick.connect(ctx.destination);

		const oscThump = ctx.createOscillator();
		const gainThump = ctx.createGain();
		oscThump.type = "triangle";
		oscThump.frequency.setValueAtTime(90 + Math.random() * 30, ctx.currentTime);
		gainThump.gain.setValueAtTime(0.018, ctx.currentTime);
		gainThump.gain.exponentialRampToValueAtTime(
			0.0001,
			ctx.currentTime + 0.065,
		);
		oscThump.connect(gainThump);
		gainThump.connect(ctx.destination);

		oscTick.start();
		oscTick.stop(ctx.currentTime + 0.04);

		oscThump.start();
		oscThump.stop(ctx.currentTime + 0.07);
	} catch {}
};

// Mock files directory structure
const mockFiles: Record<string, string> = {
	"bio.txt": `VINEET KUSHWAHA
----------------
Role:             Full-Stack Developer & Data Science Student
Core Philosophy:  "Between pixels and Python, I’ve learned that building things—apps, ideas, futures—isn’t just about logic, it’s about heart."
Status:           Learning, breaking, and rebuilding daily.`,

	"education.txt": `ACADEMICS
---------
Degree:   B.E. CSE (Data Science)
College:  Acharya Institute of Technology
Date:     June 2026 (CGPA: 8.7)
Activity: Content Head: Innovation and Entrepreneurship Development Cells (IEDC) Acharya Institute of Technology`,

	"contact.txt": `SOCIAL HANDLES
--------------
GitHub:    https://github.com/vineet-k09
LinkedIn:  https://linkedin.com/in/vineet-kushwaha-2666b5257/
Email:     vineetkushwaha6325@gmail.com
Instagram: https://instagram.com/vineetwhy`,

	"projects.md": `SELECTED PROJECTS
-----------------
* SAC Commenting: Context-Aware Analytics Collaboration Tool. Embedded React widget utilizing SAP Analytics Cloud postMessage events, Express.js, and Vertex AI.
* iConnect 2.0: AI-Powered Enterprise Learning Platform. Node.js/Express gateway and FastAPI AI inference agent on GCP Cloud Run.
* Real-Time Hand Gesture MIDI Synthesizer: Rule-based coordinate geometry classifier using MediaPipe and multi-threaded Web Workers.
(You can navigate to /projects to view them with rich visual designs!)`,

	"secrets.sh": `#!/bin/bash
# TOP SECRET Sudo Script
echo "🤖 Sudo Hack Initialized..."
echo "Accessing mainframe..."
echo "100% Complete."
echo '"Reality is just a compilation of code. Make sure your runtime has good memory." - Secret Agent'`,
};

export default function About() {
	// Terminal States
	const [history, setHistory] = useState<TerminalHistoryItem[]>([]);
	const [inputValue, setInputValue] = useState("");
	const [animationFrame, setAnimationFrame] = useState("");
	const [isAnimating, setIsAnimating] = useState(true);

	const [animationQueue, setAnimationQueue] = useState<string[]>([]);
	const [animationIndex, setAnimationIndex] = useState(0);
	const [animationCallback, setAnimationCallback] = useState<
		(() => void) | null
	>(null);
	const [animationDelay, setAnimationDelay] = useState(15);

	const terminalBodyRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	// Progressive frame generation helper for skull drawing and erasing
	const getDrawFrames = (text: string): string[] => {
		const frames: string[] = [];
		for (let i = 1; i <= text.length; i++) {
			frames.push(text.substring(0, i));
		}
		for (let p = 0; p < 15; p++) {
			frames.push(text);
		}
		for (let i = text.length - 1; i >= 0; i--) {
			frames.push(text.substring(0, i));
		}
		return frames;
	};

	const getSecretFrames = (): string[] => {
		const base = `Running secrets.sh...\n`;
		const frames: string[] = [];

		frames.push(base + `.`);
		frames.push(base + `..`);
		frames.push(base + `...`);

		const bars = [
			`[ACCESSING MAINFRAME] [==>                  ] 10%`,
			`[ACCESSING MAINFRAME] [=====>               ] 25%`,
			`[ACCESSING MAINFRAME] [=========>           ] 45%`,
			`[ACCESSING MAINFRAME] [==============>      ] 70%`,
			`[ACCESSING MAINFRAME] [===================> ] 90%`,
			`[ACCESSING MAINFRAME] [====================>] 100%`,
		];
		for (const b of bars) {
			frames.push(base + b);
			frames.push(base + b);
		}

		const fullBar =
			base + `[ACCESSING MAINFRAME] [====================>] 100%\n\n`;

		for (let i = 1; i <= penguinASCII.length; i++) {
			frames.push(fullBar + penguinASCII.substring(0, i));
		}

		const eyesFlash1 =
			fullBar +
			`
          .--.
        |*_* |
        |:_/ |
       //   \\\\ \\\\
      (|     | )
     /'\\\\_   _/\`\\\\
     \\\\___)=(___/
`;
		const eyesFlash2 =
			fullBar +
			`
          .--.
        |o_o |
        |:_/ |
       //   \\\\ \\\\
      (|     | )
     /'\\\\_   _/\`\\\\
     \\\\___)=(___/
`;
		const eyesFlash3 =
			fullBar +
			`
          .--.
        |x_x |
        |:_/ |
       //   \\\\ \\\\
      (|     | )
     /'\\\\_   _/\`\\\\
     \\\\___)=(___/
`;

		for (let j = 0; j < 3; j++) {
			frames.push(eyesFlash1);
			frames.push(eyesFlash2);
			frames.push(eyesFlash3);
		}

		for (let i = penguinASCII.length - 1; i >= 0; i--) {
			frames.push(fullBar + penguinASCII.substring(0, i));
		}

		const secretMsg = `"Reality is just a compilation of code. Make sure your runtime has good memory." - Secret Agent`;

		for (let i = 1; i <= secretMsg.length; i++) {
			frames.push(fullBar + secretMsg.substring(0, i));
		}

		return frames;
	};

	// Animation queue frame runner
	useEffect(() => {
		if (animationQueue.length === 0) return;

		let active = true;
		let timer: NodeJS.Timeout;

		const nextFrame = (idx: number) => {
			if (!active) return;

			if (idx < animationQueue.length) {
				setAnimationFrame(animationQueue[idx]);
				setAnimationIndex(idx);
				if (idx % 2 === 0) {
					playKeySound();
				}
				timer = setTimeout(() => nextFrame(idx + 1), animationDelay);
			} else {
				setAnimationFrame("");
				setAnimationQueue([]);
				setAnimationIndex(0);
				if (animationCallback) {
					animationCallback();
				}
			}
		};

		nextFrame(animationIndex);

		return () => {
			active = false;
			clearTimeout(timer);
		};
	}, [animationQueue, animationIndex, animationDelay, animationCallback]);

	// Initial state set on client only to prevent hydration mismatch
	useEffect(() => {
		const welcomeFrames = getDrawFrames(dragonASCII);
		setAnimationDelay(15);
		setAnimationCallback(() => () => {
			setIsAnimating(false);
			setHistory([
				{
					command: "welcome",
					output:
						"System initialized. Welcome to Vineet's developer console.\nType 'help' to view available commands.",
				},
			]);
		});
		setAnimationQueue(welcomeFrames);
	}, []);

	// Focus terminal input
	const focusTerminal = () => {
		if (!isAnimating && inputRef.current) {
			inputRef.current.focus();
		}
	};

	// Scroll to bottom on history change or animation progress
	useEffect(() => {
		if (terminalBodyRef.current) {
			terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
		}
	}, [history, animationFrame]);

	// Synthesize a retro mechanical keyboard click
	const playTick = () => {
		const audioCtx = getAudioContext();
		if (!audioCtx) return;

		try {
			const osc = audioCtx.createOscillator();
			const gain = audioCtx.createGain();

			osc.connect(gain);
			gain.connect(audioCtx.destination);

			osc.type = "sine";
			// Click frequency structure
			osc.frequency.setValueAtTime(1000, audioCtx.currentTime);
			osc.frequency.exponentialRampToValueAtTime(
				120,
				audioCtx.currentTime + 0.04,
			);

			gain.gain.setValueAtTime(0.015, audioCtx.currentTime); // very quiet, satisfying tick
			gain.gain.exponentialRampToValueAtTime(
				0.0001,
				audioCtx.currentTime + 0.04,
			);

			osc.start();
			osc.stop(audioCtx.currentTime + 0.04);
		} catch {
			// AudioContext block fallback
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		playTick();
		if (e.key === "Enter") {
			playEnterSound();
			const command = inputValue.trim();
			if (!command) return;

			const parts = command.split(/\s+/);
			const cmd = parts[0].toLowerCase();
			const arg = parts.slice(1).join(" ");
			let output = "";

			switch (cmd) {
				case "help":
					output = `Available commands:
  ls          - List available files
  cat [file]  - Display file contents
  bio         - Display my personal bio
  education   - Print academic studies and timeline
  contact     - Print links to social media and email
  date        - Show current date & time
  whoami      - Show current user
  clear       - Clear terminal logs
  secret      - Execute easter egg command`;
					break;
				case "ls":
					output = Object.keys(mockFiles).join("    ");
					break;
				case "cat":
					if (!arg) {
						output = `Usage: cat [filename]\nAvailable files:\n  ${Object.keys(mockFiles).join("\n  ")}`;
					} else {
						const foundKey = Object.keys(mockFiles).find(
							(k) => k.toLowerCase() === arg.toLowerCase(),
						);
						if (foundKey) {
							output = mockFiles[foundKey];
						} else {
							output = `cat: ${arg}: No such file or directory.`;
						}
					}
					break;
				case "bio":
					output = mockFiles["bio.txt"];
					break;
				case "education":
					output = mockFiles["education.txt"];
					break;
				case "contact":
					output = mockFiles["contact.txt"];
					break;
				case "date":
					output = new Date().toString();
					break;
				case "whoami":
					output = "visitor";
					break;
				case "secret":
				case "./secrets.sh":
				case "secrets.sh":
				case "sh secrets.sh":
					// Trigger the secrets animation!
					setHistory([]); // Clear history immediately
					setIsAnimating(true);
					setAnimationDelay(30);
					setAnimationCallback(() => () => {
						setIsAnimating(false);
						setHistory([
							{
								command: command,
								output: `secrets.sh run complete.`,
							},
						]);
					});
					setAnimationQueue(getSecretFrames());
					setInputValue("");
					return;
				case "clear":
					setHistory([]);
					setInputValue("");
					return;
				default:
					output = `Command not found: '${command}'. Type 'help' to see valid operations.`;
			}

			setHistory((prev) => [...prev, { command, output }]);
			setInputValue("");
		} else {
			// Play keyclick sound on printable keys and backspace
			if (e.key.length === 1 || e.key === "Backspace") {
				playKeySound();
			}
		}
	};

	return (
		<PageWrapper>
			<div className="grid-layout">
				<div className="content-area sm:px-10 flex flex-col justify-center my-10 w-full">
					{/* Title Header */}
					<div className="text-center max-w-2xl mx-auto mb-12">
						<h2 className="text-4xl font-extrabold tracking-tight mb-4 text-center">
							About Vineet
						</h2>
						<p className="text-sm opacity-80 leading-relaxed">
							Full-Stack engineer by training, Data Science student by choice,
							and visual artist by passion.
						</p>
					</div>

					{/* Interactive CLI Terminal Widget */}
					<section className="mb-14">
						<div
							className="terminal-window cursor-text"
							onClick={focusTerminal}>
							<div className="terminal-header">
								<div className="terminal-dots">
									<span className="terminal-dot red" />
									<span className="terminal-dot yellow" />
									<span className="terminal-dot green" />
								</div>
								<span className="terminal-title">visitor@vineet: ~</span>
								<div className="w-12" /> {/* spacer */}
							</div>

							<div ref={terminalBodyRef} className="terminal-body">
								{isAnimating && (
									<div className="terminal-output text-[var(--accent)] font-mono whitespace-pre opacity-80 animate-pulse">
										{animationFrame}
									</div>
								)}

								{history.map((item, idx) => (
									<div key={idx}>
										{item.command !== "welcome" && (
											<div className="flex items-center">
												<span className="terminal-prompt">
													visitor@vineet:~$
												</span>
												<span className="text-[#e0af68] ml-2">
													{item.command}
												</span>
											</div>
										)}
										<div className="terminal-output mt-1 whitespace-pre-wrap">
											{item.output}
										</div>
									</div>
								))}

								{!isAnimating && (
									<div className="terminal-input-wrapper flex items-center">
										<span className="terminal-prompt">visitor@vineet:~$</span>
										<input
											ref={inputRef}
											type="text"
											value={inputValue}
											onChange={(e) => setInputValue(e.target.value)}
											onKeyDown={handleKeyDown}
											className="terminal-input"
											autoFocus
											placeholder="Type 'help' to start..."
											aria-label="Terminal input"
										/>
									</div>
								)}
							</div>
						</div>
					</section>

					{/* Creative Storytelling Panel (Chapters) */}
					<section className="mb-14">
						<h2 className="text-2xl font-bold mb-6 border-b border-[var(--text)] border-opacity-10 pb-3">
							My Chapters
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							<div className="inverted-theme-card p-6 rounded-2xl flex flex-col justify-between">
								<div>
									<div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-2xl inverted-tag">
										<i
											className="fa-solid fa-code"
											style={{ fontSize: "20px" }}
										/>
									</div>
									<h3 className="text-lg font-bold mb-2">01. The Code</h3>
									<p className="text-sm leading-relaxed">
										Building solid, functional, and responsive applications.
										Striving to write intention-driven code that bridges
										interface styling with scalable backend endpoints.
									</p>
								</div>
								<div className="text-xs font-mono opacity-60 mt-4">
									React, Node.js, Express
								</div>
							</div>

							<div className="inverted-theme-card p-6 rounded-2xl flex flex-col justify-between">
								<div>
									<div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-2xl inverted-tag">
										<i
											className="fa-solid fa-chart-line"
											style={{ fontSize: "20px" }}
										/>
									</div>
									<h3 className="text-lg font-bold mb-2">02. The Data</h3>
									<p className="text-sm leading-relaxed">
										Peering behind the pixels to structure the underlying
										patterns. Currently studying CSE (Data Science) to automate
										analysis, classify imagery, and extract insights.
									</p>
								</div>
								<div className="text-xs font-mono opacity-60 mt-4">
									Python, SQL, PySpark
								</div>
							</div>

							<div className="inverted-theme-card p-6 rounded-2xl flex flex-col justify-between">
								<div>
									<div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-2xl inverted-tag">
										<i
											className="fa-solid fa-camera"
											style={{ fontSize: "20px" }}
										/>
									</div>
									<h3 className="text-lg font-bold mb-2">03. The Lens</h3>
									<p className="text-sm leading-relaxed">
										Capturing architecture details, long light trails in
										Bengaluru, and minimal geometric shapes. Translating spatial
										aesthetics into clean UI templates.
									</p>
								</div>
								<div className="text-xs font-mono opacity-60 mt-4">
									DSLR, Figma, Illustrator
								</div>
							</div>
						</div>
					</section>

					{/* Creative Toolbox / Gear */}
					<section className="mb-14">
						<h2 className="text-2xl font-bold mb-6 border-b border-[var(--text)] border-opacity-10 pb-3">
							My Workspace Gear
						</h2>
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
							{[
								{
									title: "Primary Editor",
									detail: "VS Code",
									icon: "fa-solid fa-terminal",
								},
								{
									title: "Developer Playground",
									detail: "Fedora & Bash",
									icon: "fa-solid fa-pen-nib",
								},
								{
									title: "Capture Gear",
									detail: "Just my phone",
									icon: "fa-solid fa-camera-retro",
								},
								{
									title: "Data Stack",
									detail: "Python & Excel",
									icon: "fa-solid fa-database",
								},
							].map((item, idx) => (
								<div
									key={idx}
									className="inverted-theme-card p-4 rounded-xl flex items-center gap-3">
									<i
										className={`${item.icon} text-[var(--accent)]`}
										style={{ fontSize: "20px" }}
									/>
									<div>
										<h4 className="text-xs font-mono opacity-50 text-[var(--accent)] mb-0.5">
											{item.title}
										</h4>
										<span className="text-sm text-[var(--text)] font-semibold">
											{item.detail}
										</span>
									</div>
								</div>
							))}
						</div>
					</section>

					{/* Contact Details */}
					<section>
						<h2 className="text-2xl font-bold mb-6 border-b border-[var(--text)] border-opacity-10 pb-3">
							Connect
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							<a
								href="https://github.com/vineet-k09"
								target="_blank"
								rel="noopener noreferrer"
								className="border border-[var(--text)] border-opacity-10 p-5 rounded-2xl flex items-center justify-between hover:border-[var(--accent)] hover:-translate-y-1 hover:bg-[var(--accent)] hover:bg-opacity-[0.03] hover:shadow-md transition-all duration-300 group no-underline text-inherit">
								<div className="flex items-center gap-3">
									<i
										className="devicon-github-original text-2xl opacity-70 group-hover:opacity-100 duration-300"
										style={{ fontSize: "26px" }}
									/>
									<div>
										<h4 className="text-sm font-bold m-0">GitHub</h4>
										<span className="text-xs opacity-60">@vineet-k09</span>
									</div>
								</div>
								<i className="fa-solid fa-arrow-up-right-from-square text-xs opacity-40 group-hover:opacity-100 duration-300" />
							</a>

							<a
								href="https://www.linkedin.com/in/vineet-kushwaha-2666b5257/"
								target="_blank"
								rel="noopener noreferrer"
								className="border border-[var(--text)] border-opacity-10 p-5 rounded-2xl flex items-center justify-between hover:border-[var(--accent)] hover:-translate-y-1 hover:bg-[var(--accent)] hover:bg-opacity-[0.03] hover:shadow-md transition-all duration-300 group no-underline text-inherit">
								<div className="flex items-center gap-3">
									<i
										className="devicon devicon-linkedin-plain text-2xl opacity-70 group-hover:opacity-100 duration-300"
										style={{ fontSize: "26px" }}
									/>
									<div>
										<h4 className="text-sm font-bold m-0">LinkedIn</h4>
										<span className="text-xs opacity-60">Vineet Kushwaha</span>
									</div>
								</div>
								<i className="fa-solid fa-arrow-up-right-from-square text-xs opacity-40 group-hover:opacity-100 duration-300" />
							</a>

							<a
								href="mailTo:vineetkushwaha6325@gmail.com"
								className="border border-[var(--text)] border-opacity-10 p-5 rounded-2xl flex items-center justify-between hover:border-[var(--accent)] hover:-translate-y-1 hover:bg-[var(--accent)] hover:bg-opacity-[0.03] hover:shadow-md transition-all duration-300 group no-underline text-inherit">
								<div className="flex items-center gap-3">
									<i
										className="fa-solid fa-envelope text-2xl opacity-70 group-hover:opacity-100 duration-300"
										style={{ fontSize: "24px" }}
									/>
									<div>
										<h4 className="text-sm font-bold m-0">Email</h4>
										<span className="text-xs opacity-60">
											vineetkushwaha6325...
										</span>
									</div>
								</div>
								<i className="fa-solid fa-arrow-up-right-from-square text-xs opacity-40 group-hover:opacity-100 duration-300" />
							</a>
						</div>
					</section>
				</div>
			</div>
		</PageWrapper>
	);
}

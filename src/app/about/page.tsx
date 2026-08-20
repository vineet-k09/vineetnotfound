"use client";

import React, { useState, useEffect, useRef } from "react";
import "../page.css";
import PageWrapper from "../components/utility/pageWrapper";
import TextPretextCanvas from "../components/render/TextPretextCanvas";

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
		const oscTick = ctx.createOscillator();
		const gainTick = ctx.createGain();
		oscTick.type = "sine";
		oscTick.frequency.setValueAtTime(
			1300 + Math.random() * 400,
			ctx.currentTime
		);
		gainTick.gain.setValueAtTime(0.012, ctx.currentTime);
		gainTick.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.015);
		oscTick.connect(gainTick);
		gainTick.connect(ctx.destination);

		const oscThump = ctx.createOscillator();
		const gainThump = ctx.createGain();
		oscThump.type = "triangle";
		oscThump.frequency.setValueAtTime(
			140 + Math.random() * 60,
			ctx.currentTime
		);
		gainThump.gain.setValueAtTime(0.009, ctx.currentTime);
		gainThump.gain.exponentialRampToValueAtTime(
			0.0001,
			ctx.currentTime + 0.035
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
		const oscTick = ctx.createOscillator();
		const gainTick = ctx.createGain();
		oscTick.type = "sine";
		oscTick.frequency.setValueAtTime(
			750 + Math.random() * 100,
			ctx.currentTime
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
			ctx.currentTime + 0.065
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
Role:             Software Engineer & CSE (Data Science)
Specialization:   Scalable Node/Express APIs, Cloud Run Microservices, BigQuery Data Pipelines & Generative AI Integration.
Core Philosophy:  "Between pixels and Python, building things isn't just about logic—it's about craft, performance, and memory."
Status:           Engineering, optimizing, and deploying daily.`,

	"education.txt": `ACADEMICS & ROLES
----------------
Degree:   B.E. Computer Science Engineering (Data Science)
College:  Acharya Institute of Technology, Bengaluru
Date:     Nov 2022 - Jun 2026 (CGPA: 8.7 / 10)
Activity: Content Head: Innovation and Entrepreneurship Development Cell (IEDC)`,

	"contact.txt": `DEVELOPER CHANNELS
------------------
GitHub:    https://github.com/vineet-k09
LinkedIn:  https://linkedin.com/in/vineet-k09
Email:     vineetkushwaha6325@gmail.com
Web:       https://vineetnotfound.vercel.app`,

	"projects.md": `ENGINEERING HIGHLIGHTS
--------------------
* SAC Commenting: Context-aware analytics collaboration tool replacing $500K proprietary writeback solution (React, Express, GCP KMS, Vertex AI, Puppeteer).
* iConnect 2.0: AI-powered enterprise learning platform with Node.js/Express gateway & FastAPI inference agent on Cloud Run (cached model invocations saving 35% token overhead).
* Real-Time Hand Gesture MIDI Synth: Rule-based landmark vector classifier with zero ML execution overhead, 60 FPS frame skipping & Web Worker audio synthesis.`,

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
	const [copiedEmail, setCopiedEmail] = useState(false);

	const terminalBodyRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

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
		setAnimationDelay(5);
		setAnimationCallback(() => () => {
			setIsAnimating(false);
			setHistory([
				{
					command: "welcome",
					output:
						"System initialized. Welcome to Vineet's developer console.\nType 'help' or click command shortcuts below.",
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

	const executeCommandStr = (rawCmd: string) => {
		const command = rawCmd.trim();
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
  bio         - Display personal engineer summary
  education   - Print academic background
  contact     - Print social handles and contact info
  projects    - Summary of core engineering projects
  date        - Show current system date & time
  whoami      - Show active session user
  clear       - Clear terminal logs
  secret      - Trigger easter egg execution`;
				break;
			case "ls":
				output = Object.keys(mockFiles).join("    ");
				break;
			case "cat":
				if (!arg) {
					output = `Usage: cat [filename]\nAvailable files:\n  ${Object.keys(mockFiles).join("\n  ")}`;
				} else {
					const foundKey = Object.keys(mockFiles).find(
						(k) => k.toLowerCase() === arg.toLowerCase()
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
			case "projects":
				output = mockFiles["projects.md"];
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
				setHistory([]);
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
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		playKeySound();
		if (e.key === "Enter") {
			playEnterSound();
			executeCommandStr(inputValue);
		}
	};

	const handleCopyEmail = () => {
		navigator.clipboard.writeText("vineetkushwaha6325@gmail.com");
		setCopiedEmail(true);
		setTimeout(() => setCopiedEmail(false), 2000);
	};

	return (
		<PageWrapper>
			<div className="grid-layout">
				<div className="content-area sm:px-4 my-6 w-full flex flex-col gap-12">
					
					{/* 🚀 Hero Section - Dynamic Asymmetric Developer Profile */}
					<section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
						<div className="lg:col-span-8 flex flex-col items-start gap-4">
							<div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--accent)] border-opacity-30 bg-[var(--accent)] bg-opacity-10 text-black text-xs font-mono font-semibold tracking-wide">
								SOFTWARE & DATA ENGINEER // BENGALURU
							</div>

							<h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight text-[var(--text)] m-0">
								Engineering Scalable APIs & AI Pipelines
							</h1>

							<p className="text-base sm:text-lg opacity-85 leading-relaxed font-normal text-[var(--text)] max-w-2xl">
								Backend-focused software engineer specialized in designing containerized microservices, high-throughput data ingestion pipelines, and integrating generative AI workflows across GCP and client applications.
							</p>
						</div>

						{/* Quick Developer Identity Card */}
						<div className="lg:col-span-4 inverted-theme-card p-6 rounded-2xl flex flex-col justify-between gap-5 relative overflow-hidden">
							<div className="flex items-center justify-between border-b border-[var(--text)] border-opacity-10 pb-4">
								<div className="flex items-center gap-3">
									<div className="w-10 h-10 rounded-full bg-[var(--accent)] bg-opacity-15 flex items-center justify-center font-mono font-bold text-[var(--accent)]">
										VK
									</div>
									<div>
										<h3 className="text-base font-bold m-0 text-[var(--text)]">Vineet Kushwaha</h3>
										<span className="text-xs opacity-60 font-mono">vineetnotfound</span>
									</div>
								</div>
								<span className="w-2.5 h-2.5 rounded-full bg-emerald-500" title="Active developer session" />
							</div>

							<div className="space-y-2 text-xs font-mono">
								<div className="flex justify-between">
									<span className="opacity-50">Location:</span>
									<span className="font-semibold">Bengaluru, IN</span>
								</div>
								<div className="flex justify-between">
									<span className="opacity-50">Primary Stack:</span>
									<span className="font-semibold">Node, Python, GCP</span>
								</div>
								<div className="flex justify-between">
									<span className="opacity-50">Status:</span>
									<span className="font-semibold text-emerald-400">Available for projects</span>
								</div>
							</div>

							<div className="pt-2 flex items-center gap-3">
								<button
									onClick={handleCopyEmail}
									className="flex-1 py-2 px-3 rounded-xl bg-[var(--accent)] text-[var(--bg)] font-mono text-xs font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer">
									<i className="fa-solid fa-copy" />
									{copiedEmail ? "Copied to Clipboard!" : "Copy Email"}
								</button>
								<a
									href="https://github.com/vineet-k09"
									target="_blank"
									rel="noopener noreferrer"
									aria-label="GitHub Profile"
									className="p-2 px-3 rounded-xl border border-[var(--text)] border-opacity-15 text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all flex items-center justify-center">
									<i className="fa-brands fa-github text-xl" />
								</a>
							</div>
						</div>
					</section>

					{/* 💻 Developer Shell Console (Moved to top of About page) */}
					<section className="flex flex-col gap-4">
						<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
							<div>
								<h2 className="text-2xl font-bold tracking-tight m-0 text-[var(--text)]">
									You can ask about me here ~
								</h2>
							</div>

							{/* Quick Executable Command Buttons */}
							<div className="flex flex-wrap gap-2">
								{["bio", "education", "projects", "contact", "secret", "clear"].map((cmd) => (
									<button
										key={cmd}
										onClick={() => executeCommandStr(cmd)}
										className="px-2.5 py-1 rounded-lg border border-[var(--text)] border-opacity-15 bg-[var(--card-bg)] text-xs font-mono text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all cursor-pointer">
										${cmd}
									</button>
								))}
							</div>
						</div>

						<div
							className="terminal-window cursor-text"
							onClick={focusTerminal}>
							<div className="terminal-header">
								<div className="terminal-dots">
									<span className="terminal-dot red" />
									<span className="terminal-dot yellow" />
									<span className="terminal-dot green" />
								</div>
								<span className="terminal-title">vineetnotfound</span>
								<span className="text-[10px] font-mono opacity-40">bash 5.2</span>
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
													shh@vineetnotfound:~$
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
											placeholder="Type 'help'"
											aria-label="Terminal input"
										/>
									</div>
								)}
							</div>
						</div>
					</section>

					{/* 🧱 Asymmetric Engineering Bento Grid */}
					<section className="flex flex-col gap-6">
						<h2 className="text-2xl font-bold border-b border-[var(--text)] border-opacity-10 pb-3 m-0 text-[var(--text)]">
							Focus
						</h2>

						<div className="grid grid-cols-1 md:grid-cols-12 gap-6">
							
							{/* Card 1: Microservice & Data Ingestion Mesh */}
							<div className="md:col-span-7 inverted-theme-card p-6 rounded-2xl flex flex-col justify-between gap-4">
								<div>
									<div className="flex items-center gap-3 mb-3">
										<div className="w-10 h-10 rounded-xl inverted-tag flex items-center justify-center text-lg text-[var(--accent)]">
											<i className="fa-solid fa-server" />
										</div>
										<div>
											<span className="text-xs font-mono font-semibold text-[var(--accent)] uppercase tracking-wider">
												01. Microservices & Data Infra
											</span>
											<h3 className="text-xl font-bold m-0 text-[var(--text)]">
												Containerized Services & Cloud Pipelines
											</h3>
										</div>
									</div>
									<p className="text-sm opacity-85 leading-relaxed mb-4">
										Architecting secure server-to-server microservices on GCP Cloud Run with IAM service account authentication. Experienced in query performance tuning and automating massive multi-market data pipelines.
									</p>
									<ul className="space-y-2 text-xs opacity-80 pl-0 list-none">
										<li className="flex items-start gap-2">
											<span className="text-[var(--accent)] font-bold">›</span>
											<span><strong>Automated Ingestion Pipeline:</strong> Processed 400K+ monthly multi-market records at Vodafone Intelligent Solutions, reducing manual intervention by 90%.</span>
										</li>
										<li className="flex items-start gap-2">
											<span className="text-[var(--accent)] font-bold">›</span>
											<span><strong>Vertex AI & Gemini Stream:</strong> Built streaming Express APIs feeding BigQuery engagement telemetry and persisting recommendations to save 35% model invocation token overhead.</span>
										</li>
									</ul>
								</div>
								<div className="flex flex-wrap gap-2 pt-3 border-t border-[var(--text)] border-opacity-10 text-[11px] font-mono opacity-70">
									<span>Node.js</span> • <span>Express</span> • <span>FastAPI</span> • <span>GCP Cloud Run</span> • <span>BigQuery</span> • <span>Vertex AI</span>
								</div>
							</div>

							{/* Card 2: Real-Time Audio & Vision Systems */}
							<div className="md:col-span-5 inverted-theme-card p-6 rounded-2xl flex flex-col justify-between gap-4">
								<div>
									<div className="flex items-center gap-3 mb-3">
										<div className="w-10 h-10 rounded-xl inverted-tag flex items-center justify-center text-lg text-[var(--accent)]">
											<i className="fa-solid fa-bolt" />
										</div>
										<div>
											<span className="text-xs font-mono font-semibold text-[var(--accent)] uppercase tracking-wider">
												02. Real-Time Vision & Audio
											</span>
											<h3 className="text-xl font-bold m-0 text-[var(--text)]">
												Zero-ML MIDI Synthesizer
											</h3>
										</div>
									</div>
									<p className="text-sm opacity-85 leading-relaxed mb-4">
										Designed a rule-based coordinate geometry classifier using MediaPipe hand landmark vectors to recognize gestures with zero machine learning runtime overhead.
									</p>
									<ul className="space-y-2 text-xs opacity-80 pl-0 list-none">
										<li className="flex items-start gap-2">
											<span className="text-[var(--accent)] font-bold">›</span>
											<span><strong>60 FPS Browser Execution:</strong> Achieved fluid frame rates with canvas frame skipping.</span>
										</li>
										<li className="flex items-start gap-2">
											<span className="text-[var(--accent)] font-bold">›</span>
											<span><strong>Web Worker Synthesis:</strong> Offloaded audio generation to Web Workers for ~12 ms latency.</span>
										</li>
									</ul>
								</div>
								<div className="flex flex-wrap gap-2 pt-3 border-t border-[var(--text)] border-opacity-10 text-[11px] font-mono opacity-70">
									<span>MediaPipe</span> • <span>Web Workers</span> • <span>Web Audio API</span> • <span>Canvas 2D</span>
								</div>
							</div>

							{/* Card 3: Context-Aware Analytics & Security */}
							<div className="md:col-span-5 inverted-theme-card p-6 rounded-2xl flex flex-col justify-between gap-4">
								<div>
									<div className="flex items-center gap-3 mb-3">
										<div className="w-10 h-10 rounded-xl inverted-tag flex items-center justify-center text-lg text-[var(--accent)]">
											<i className="fa-solid fa-lock" />
										</div>
										<div>
											<span className="text-xs font-mono font-semibold text-[var(--accent)] uppercase tracking-wider">
												03. Enterprise Analytics & Security
											</span>
											<h3 className="text-xl font-bold m-0 text-[var(--text)]">
												SAC Commenting Collaboration
											</h3>
										</div>
									</div>
									<p className="text-sm opacity-85 leading-relaxed mb-4">
										Engineered a custom React writeback tool replacing a $500K proprietary solution for SAP Analytics Cloud. Integrated GCP KMS encryption mapped to filter state C4 class data, Puppeteer snapshot automation, and Vertex AI comment summarization.
									</p>
								</div>
								<div className="flex flex-wrap gap-2 pt-3 border-t border-[var(--text)] border-opacity-10 text-[11px] font-mono opacity-70">
									<span>React</span> • <span>GCP KMS</span> • <span>Puppeteer</span> • <span>JWT & Zod</span>
								</div>
							</div>

							{/* Card 4: Academic & Leadership Background */}
							<div className="md:col-span-7 inverted-theme-card p-6 rounded-2xl flex flex-col justify-between gap-4">
								<div>
									<div className="flex items-center gap-3 mb-3">
										<div className="w-10 h-10 rounded-xl inverted-tag flex items-center justify-center text-lg text-[var(--accent)]">
											<i className="fa-solid fa-graduation-cap" />
										</div>
										<div>
											<span className="text-xs font-mono font-semibold text-[var(--accent)] uppercase tracking-wider">
												04. Academics & Leadership
											</span>
											<h3 className="text-xl font-bold m-0 text-[var(--text)]">
												B.E. CSE (Data Science) @ Acharya Institute of Tech
											</h3>
										</div>
									</div>
									<p className="text-sm opacity-85 leading-relaxed mb-3">
										Studying Data Science with a <strong>8.7 / 10 CGPA</strong> (Graduating June 2026). Active leadership as Content Head for the Innovation and Entrepreneurship Development Cell (IEDC).
									</p>
									<p className="text-sm opacity-85 leading-relaxed">
										Combining rigorous computer science fundamentals—data structures, database architecture, network security, and machine learning—with real-world project execution.
									</p>
								</div>
								<div className="flex flex-wrap gap-2 pt-3 border-t border-[var(--text)] border-opacity-10 text-[11px] font-mono opacity-70">
									<span>Data Science</span> • <span>Algorithms</span> • <span>PostgreSQL</span> • <span>IEDC Content Head</span>
								</div>
							</div>

						</div>

						{/* Subtle Embedded Text Pretext Physics Easter Egg */}
						<div className="inverted-theme-card p-5 rounded-2xl gap-3 my-2">
							<TextPretextCanvas
								initialText="Between pixels and Python, building things—apps, ideas, systems—isn't just about logic, it's about craft, precision, and memory."
								height={140}
								fontSize={20}
								lineHeight={30}
								repelRadius={100}
								showControls={false}
							/>
						</div>
					</section>
				</div>
			</div>
		</PageWrapper>
	);
}

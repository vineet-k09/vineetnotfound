'use client'

import React, { useState, useEffect, useRef } from 'react';
import '../page.css';
import PageWrapper from '../components/utility/pageWrapper';

interface TerminalHistoryItem {
    command: string;
    output: string;
}

export default function About() {
    
    // Terminal States
    const [history, setHistory] = useState<TerminalHistoryItem[]>([
        { command: 'welcome', output: "System initialized. Welcome to Vineet's developer console.\nType 'help' to view available commands." }
    ]);
    const [inputValue, setInputValue] = useState('');
    const terminalBodyRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Focus terminal input
    const focusTerminal = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    // Scroll to bottom on history change
    useEffect(() => {
        if (terminalBodyRef.current) {
            terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
        }
    }, [history]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const command = inputValue.trim();
            if (!command) return;

            const lowerCmd = command.toLowerCase();
            let output = '';

            switch (lowerCmd) {
                case 'help':
                    output = `Available commands:
  bio       - Display my personal bio
  education - Print academic studies and timeline
  contact   - Print links to social media and email
  clear     - Clear terminal logs
  secret    - Execute easter egg command`;
                    break;
                case 'bio':
                    output = `VINEET KUSHWAHA
----------------
Role: Full-Stack Developer & Data Science Student
Core Philosophy: "Between pixels and Python, I’ve learned that building things—apps, ideas, futures—isn’t just about logic, it’s about heart."
Status: Learning, breaking, and rebuilding daily.`;
                    break;
                case 'education':
                    output = `ACADEMICS
---------
Degree:   Bachelor of Engineering - CSE (Data Science)
College:  Acharya Institute of Technology
Location: Bengaluru, India
Timeline: Expected graduation 2026`;
                    break;
                case 'contact':
                    output = `SOCIAL HANDLES
--------------
GitHub:    https://github.com/vineet-k09
LinkedIn:  https://linkedin.com/in/vineet-kushwaha-2666b5257/
Email:     vineetkushwaha6325@gmail.com
Instagram: https://instagram.com/vineetwhy`;
                    break;
                case 'secret':
                    output = `🤖 Sudo Hack Initialized...
Accessing mainframe...
[====================================>] 100%
"Reality is just a compilation of code. Make sure your runtime has good memory." - Secret Agent`;
                    break;
                case 'clear':
                    setHistory([]);
                    setInputValue('');
                    return;
                default:
                    output = `Command not found: '${command}'. Type 'help' to see valid operations.`;
            }

            setHistory(prev => [...prev, { command, output }]);
            setInputValue('');
        }
    };

    return (
        <PageWrapper>
            <div className="grid-layout">
                <div className="content-area sm:px-10 flex flex-col justify-center my-10 w-full">
                    
                    {/* Title Header */}
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent)] font-semibold mb-1 block">identity board</span>
                        <h2 className="text-4xl font-extrabold tracking-tight mb-4 text-center">About Vineet</h2>
                        <p className="text-sm opacity-80 leading-relaxed">
                            Full-Stack engineer by training, Data Science student by choice, and visual artist by passion.
                        </p>
                    </div>

                    {/* Interactive CLI Terminal Widget */}
                    <section className="mb-14">
                        <div 
                            className="terminal-window cursor-text"
                            onClick={focusTerminal}
                        >
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
                                {history.map((item, idx) => (
                                    <div key={idx}>
                                        {item.command !== 'welcome' && (
                                            <div className="flex items-center">
                                                <span className="terminal-prompt">visitor@vineet:~$</span>
                                                <span className="text-[#e0af68] ml-2">{item.command}</span>
                                            </div>
                                        )}
                                        <div className="terminal-output mt-1 whitespace-pre-wrap">{item.output}</div>
                                    </div>
                                ))}
                                
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
                                        aria-label="Terminal input"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Creative Storytelling Panel (Chapters) */}
                    <section className="mb-14">
                        <h2 className="text-2xl font-bold mb-6 border-b border-[var(--text)] border-opacity-10 pb-3">My Chapters</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            
                            <div className="inverted-theme-card p-6 rounded-2xl flex flex-col justify-between">
                                <div>
                                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-2xl inverted-tag">
                                        <i className="fa-solid fa-code" style={{ fontSize: '20px' }} />
                                    </div>
                                    <h3 className="text-lg font-bold mb-2">01. The Code</h3>
                                    <p className="text-sm leading-relaxed">
                                        Building solid, functional, and responsive applications. Striving to write intention-driven code that bridges interface styling with scalable backend endpoints.
                                    </p>
                                </div>
                                <div className="text-xs font-mono opacity-60 mt-4">React, Node.js, Express</div>
                            </div>

                            <div className="inverted-theme-card p-6 rounded-2xl flex flex-col justify-between">
                                <div>
                                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-2xl inverted-tag">
                                        <i className="fa-solid fa-chart-line" style={{ fontSize: '20px' }} />
                                    </div>
                                    <h3 className="text-lg font-bold mb-2">02. The Data</h3>
                                    <p className="text-sm leading-relaxed">
                                        Peering behind the pixels to structure the underlying patterns. Currently studying CSE (Data Science) to automate analysis, classify imagery, and extract insights.
                                    </p>
                                </div>
                                <div className="text-xs font-mono opacity-60 mt-4">Python, SQL, PySpark</div>
                            </div>

                            <div className="inverted-theme-card p-6 rounded-2xl flex flex-col justify-between">
                                <div>
                                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-2xl inverted-tag">
                                        <i className="fa-solid fa-camera" style={{ fontSize: '20px' }} />
                                    </div>
                                    <h3 className="text-lg font-bold mb-2">03. The Lens</h3>
                                    <p className="text-sm leading-relaxed">
                                        Capturing architecture details, long light trails in Bengaluru, and minimal geometric shapes. Translating spatial aesthetics into clean UI templates.
                                    </p>
                                </div>
                                <div className="text-xs font-mono opacity-60 mt-4">DSLR, Figma, Illustrator</div>
                            </div>

                        </div>
                    </section>

                    {/* Creative Toolbox / Gear */}
                    <section className="mb-14">
                        <h2 className="text-2xl font-bold mb-6 border-b border-[var(--text)] border-opacity-10 pb-3">My Workspace Gear</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { title: "Primary Editor", detail: "VS Code", icon: "fa-solid fa-terminal" },
                                { title: "Developer Playground", detail: "Fedora & Bash", icon: "fa-solid fa-pen-nib" },
                                { title: "Capture Gear", detail: "Just my phone", icon: "fa-solid fa-camera-retro" },
                                { title: "Data Stack", detail: "Python & Excel", icon: "fa-solid fa-database" }
                            ].map((item, idx) => (
                                <div key={idx} className="border border-[var(--text)] border-opacity-10 p-4 rounded-xl bg-[var(--text)] bg-opacity-[0.02] flex items-center gap-3">
                                    <i className={`${item.icon} text-[var(--accent)]`} style={{ fontSize: '20px' }} />
                                    <div>
                                        <h4 className="text-xs font-mono opacity-50 text-[var(--accent)] mb-0.5">{item.title}</h4>
                                        <span className="text-sm text-[var(--bg)] font-semibold">{item.detail}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Contact Details */}
                    <section>
                        <h2 className="text-2xl font-bold mb-6 border-b border-[var(--text)] border-opacity-10 pb-3">Connect</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            
                            <a 
                                href="https://github.com/vineet-k09" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="border border-[var(--text)] border-opacity-10 p-5 rounded-2xl flex items-center justify-between hover:border-[var(--accent)] transition-all duration-300 group no-underline text-inherit"
                            >
                                <div className="flex items-center gap-3">
                                    <i className="devicon-github-original text-2xl group-hover:text-[var(--accent)] duration-300" style={{ fontSize: '26px' }} />
                                    <div>
                                        <h4 className="text-sm font-bold m-0">GitHub</h4>
                                        <span className="text-xs opacity-60">@vineet-k09</span>
                                    </div>
                                </div>
                                <i className="fa-solid fa-arrow-up-right-from-square text-xs opacity-40 group-hover:opacity-100 group-hover:text-[var(--accent)] duration-300" />
                            </a>

                            <a 
                                href="https://www.linkedin.com/in/vineet-kushwaha-2666b5257/" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="border border-[var(--text)] border-opacity-10 p-5 rounded-2xl flex items-center justify-between hover:border-[var(--accent)] transition-all duration-300 group no-underline text-inherit"
                            >
                                <div className="flex items-center gap-3">
                                    <i className="devicon devicon-linkedin-plain text-2xl group-hover:text-[var(--accent)] duration-300" style={{ fontSize: '26px' }} />
                                    <div>
                                        <h4 className="text-sm font-bold m-0">LinkedIn</h4>
                                        <span className="text-xs opacity-60">Vineet Kushwaha</span>
                                    </div>
                                </div>
                                <i className="fa-solid fa-arrow-up-right-from-square text-xs opacity-40 group-hover:opacity-100 group-hover:text-[var(--accent)] duration-300" />
                            </a>

                            <a 
                                href="mailTo:vineetkushwaha6325@gmail.com" 
                                className="border border-[var(--text)] border-opacity-10 p-5 rounded-2xl flex items-center justify-between hover:border-[var(--accent)] transition-all duration-300 group no-underline text-inherit"
                            >
                                <div className="flex items-center gap-3">
                                    <i className="fa-solid fa-envelope text-2xl group-hover:text-[var(--accent)] duration-300" style={{ fontSize: '24px' }} />
                                    <div>
                                        <h4 className="text-sm font-bold m-0">Email</h4>
                                        <span className="text-xs opacity-60">vineetkushwaha6325...</span>
                                    </div>
                                </div>
                                <i className="fa-solid fa-arrow-up-right-from-square text-xs opacity-40 group-hover:opacity-100 group-hover:text-[var(--accent)] duration-300" />
                            </a>

                        </div>
                    </section>

                </div>
            </div>
        </PageWrapper>
    );
}
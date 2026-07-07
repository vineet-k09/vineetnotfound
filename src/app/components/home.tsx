"use client";

import { useLangContext } from "../../hooks/useLang";
import Navbar from "./navbar";
import { useAudio } from "@/context/AudioContext";
// import { useTheme } from '@/context/ThemeContext';
import {
	languagesAndFrontend,
	backendAndDatabases,
	devopsAndTools,
} from "./utility/skills";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

import Link from "next/link";
import Image from "next/image";

type ThemeType =
	| "theme-charcoal"
	| "theme-sunlight"
	| "theme-crimson"
	| "theme-neon";

function TypedName({ name }: { name: string }) {
	const parts = name.split(" ");
	const firstName = parts[0] || "";
	const lastName = parts.slice(1).join(" ") || "";

	const [text, setText] = useState("");
	const [isDeleting, setIsDeleting] = useState(false);
	const [cursorVisible, setCursorVisible] = useState(true);

	useEffect(() => {
		setText("");
		setIsDeleting(false);
	}, [lastName]);

	useEffect(() => {
		if (!lastName) return;
		const cursorInterval = setInterval(() => {
			setCursorVisible((prev) => !prev);
		}, 530);
		return () => clearInterval(cursorInterval);
	}, [lastName]);

	useEffect(() => {
		if (!lastName) return;

		let timer: NodeJS.Timeout;
		if (isDeleting) {
			timer = setTimeout(() => {
				setText((prev) => prev.slice(0, -1));
			}, 80);
		} else {
			timer = setTimeout(() => {
				setText(lastName.slice(0, text.length + 1));
			}, 100);
		}

		if (!isDeleting && text === lastName) {
			timer = setTimeout(() => {
				setIsDeleting(true);
			}, 2000);
		} else if (isDeleting && text === "") {
			setIsDeleting(false);
		}

		return () => clearTimeout(timer);
	}, [text, isDeleting, lastName]);

	return (
		<span className="inline-flex items-baseline">
			<span>{firstName}&nbsp;</span>
			<span
				style={{ WebkitTextStroke: "1.5px var(--text)", color: "transparent" }}>
				{text}
			</span>
			<span
				className="transition-opacity duration-100"
				style={{ color: "var(--accent)", opacity: cursorVisible ? 1 : 0 }}>
				.
			</span>
		</span>
	);
}

interface TiltCardProps {
	children: React.ReactNode;
	className: string;
	href: string;
	isExternal: boolean;
	onMouseEnter?: () => void;
	onMouseLeave?: () => void;
	onClick?: () => void;
}

function TiltCard({
	children,
	className,
	href,
	isExternal,
	onMouseEnter,
	onMouseLeave,
	onClick,
}: TiltCardProps) {
	const cardRef = useRef<HTMLDivElement>(null);
	const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});

	const handleMouseMove = (e: React.MouseEvent) => {
		if (!cardRef.current) return;
		const card = cardRef.current;
		const rect = card.getBoundingClientRect();

		// Find cursor coordinates inside card
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		// Convert to percentage (-0.5 to 0.5)
		const xc = x / rect.width - 0.5;
		const yc = y / rect.height - 0.5;

		// Calculate rotations (max 8 degrees rotation for a smooth feel)
		const rotX = -yc * 8;
		const rotY = xc * 8;

		setTiltStyle({
			transform: `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`,
			transition: "transform 0.05s ease",
			zIndex: 10,
		});
	};

	const handleMouseLeaveLocal = () => {
		setTiltStyle({
			transform:
				"perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
			transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
		});
		if (onMouseLeave) onMouseLeave();
	};

	const cardContent = (
		<div
			ref={cardRef}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeaveLocal}
			onMouseEnter={onMouseEnter}
			onClick={onClick}
			style={tiltStyle}
			className={className}>
			{children}
		</div>
	);

	if (isExternal) {
		return (
			<a
				href={href}
				target="_blank"
				rel="noopener noreferrer"
				className="no-underline block h-full">
				{cardContent}
			</a>
		);
	}

	return (
		<Link href={href} className="no-underline block h-full">
			{cardContent}
		</Link>
	);
}

const brandColors: Record<string, { bg: string; text: string }> = {
	"Python": { bg: "#3776AB", text: "#FFFFFF" },
	"JavaScript": { bg: "#F7DF1E", text: "#000000" },
	"TypeScript": { bg: "#3178C6", text: "#FFFFFF" },
	"Java": { bg: "#ED8B00", text: "#FFFFFF" },
	"ReactJS": { bg: "#61DAFB", text: "#20232A" },
	"NextJS": { bg: "#000000", text: "#FFFFFF" },
	"Angular": { bg: "#DD0031", text: "#FFFFFF" },
	"Vite": { bg: "#646CFF", text: "#FFFFFF" },
	"Node.js": { bg: "#339933", text: "#FFFFFF" },
	"Express.js": { bg: "#F7DF1E", text: "#000000" },
	"Django": { bg: "#092E20", text: "#FFFFFF" },
	"FastAPI": { bg: "#009688", text: "#FFFFFF" },
	"REST APIs": { bg: "#0EA5E9", text: "#FFFFFF" },
	"JWT Authentication": { bg: "#D63AFF", text: "#FFFFFF" },
	"Prisma": { bg: "#2D3748", text: "#FFFFFF" },
	"Microservices": { bg: "#7C3AED", text: "#FFFFFF" },
	"PostgreSQL": { bg: "#336791", text: "#FFFFFF" },
	"MongoDB": { bg: "#47A248", text: "#FFFFFF" },
	"Redis": { bg: "#DC382D", text: "#FFFFFF" },
	"MySQL": { bg: "#4479A1", text: "#FFFFFF" },
	"BigQuery": { bg: "#4285F4", text: "#FFFFFF" },
	"GCP": { bg: "#4285F4", text: "#FFFFFF" },
	"Docker": { bg: "#2496ED", text: "#FFFFFF" },
	"CI/CD (GitHub Actions)": { bg: "#2088FF", text: "#FFFFFF" },
	"Git": { bg: "#F05032", text: "#FFFFFF" },
	"GitHub": { bg: "#181717", text: "#FFFFFF" },
	"Linux (Fedora)": { bg: "#294172", text: "#FFFFFF" },
};

function ScrollSkillTag({
	label,
	className,
	link,
}: {
	label: string;
	className: string;
	link: string;
}) {
	const ref = useRef<HTMLAnchorElement>(null);
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			if (!ref.current) return;
			const rect = ref.current.getBoundingClientRect();
			const windowHeight = window.innerHeight;

			// Start filling when the top of the element enters the bottom 95% of viewport
			// Full fill when the top is at the bottom 45% of viewport (fully colored earlier)
			const start = windowHeight * 0.95;
			const end = windowHeight * 0.45;

			let p = (start - rect.top) / (start - end);
			p = Math.max(0, Math.min(1, p));
			
			// Round to nearest 0.01 to avoid microscopic state updates
			const roundedP = Math.round(p * 100) / 100;
			setProgress((prev) => (prev !== roundedP ? roundedP : prev));
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		window.addEventListener("resize", handleScroll);

		// Initial check
		handleScroll();

		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", handleScroll);
		};
	}, []);

	const brand = brandColors[label] || { bg: "var(--accent)", text: "var(--bg)" };
	const clipPercent = 100 - progress * 100;

	return (
		<a
			ref={ref}
			href={link}
			target="_blank"
			rel="noopener noreferrer"
			className="inverted-tag flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm no-underline font-medium hover:scale-103 transition-transform duration-200 relative overflow-hidden whitespace-nowrap"
			style={{ position: "relative" }}
		>
			<i className={`${className}`} style={{ fontSize: "14px" }} />
			<span>{label}</span>

			{/* Brand colored overlay, clipped top-to-bottom based on scroll */}
			<span
				className="absolute inset-0 flex items-center gap-2 px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-all duration-75"
				style={{
					backgroundColor: brand.bg,
					color: brand.text,
					clipPath: `inset(${clipPercent}% 0 0 0)`,
					pointerEvents: "none",
					borderRadius: "inherit",
					border: `1px solid ${brand.bg}`,
					boxSizing: "border-box",
				}}
			>
				<i className={`${className}`} style={{ fontSize: "14px", color: brand.text }} />
				<span style={{ color: brand.text }}>{label}</span>
			</span>
		</a>
	);
}


const revealVariants = {
	hidden: { opacity: 0, y: 35 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.6, ease: "easeOut" as const },
	},
};

function DirectionalHoverButton({ href, children }: { href: string; children: React.ReactNode }) {
	const [overlayStyle, setOverlayStyle] = useState<React.CSSProperties>({
		transform: "translate(-100%, -100%)",
		transition: "none",
	});

	const getDirection = (e: React.MouseEvent<HTMLAnchorElement>) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const x = e.clientX - rect.left - rect.width / 2;
		const y = e.clientY - rect.top - rect.height / 2;
		return Math.round(Math.atan2(y, x) / (Math.PI / 2) + 4) % 4;
	};

	const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
		const dir = getDirection(e);
		let startTransform = "";

		switch (dir) {
			case 0:
				startTransform = "translate(0, -100%)";
				break;
			case 1:
				startTransform = "translate(100%, 0)";
				break;
			case 2:
				startTransform = "translate(0, 100%)";
				break;
			case 3:
				startTransform = "translate(-100%, 0)";
				break;
		}

		setOverlayStyle({
			transform: startTransform,
			transition: "none",
		});

		requestAnimationFrame(() => {
			setOverlayStyle({
				transform: "translate(0, 0)",
				transition: "transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)",
			});
		});
	};

	const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
		const dir = getDirection(e);
		let endTransform = "";

		switch (dir) {
			case 0:
				endTransform = "translate(0, -100%)";
				break;
			case 1:
				endTransform = "translate(100%, 0)";
				break;
			case 2:
				endTransform = "translate(0, 100%)";
				break;
			case 3:
				endTransform = "translate(-100%, 0)";
				break;
		}

		setOverlayStyle({
			transform: endTransform,
			transition: "transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)",
		});
	};

	return (
		<Link
			href={href}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			className="relative overflow-hidden w-full flex items-center justify-center gap-2 py-4 border border-[var(--text)] border-opacity-15 font-semibold text-sm no-underline transition-all duration-300 hover:scale-[1.01] rounded-[4px] cursor-pointer group"
			style={{
				backgroundColor: "rgba(var(--text-rgb), 0.02)",
				color: "var(--text)",
			}}
		>
			<div
				className="absolute inset-0 z-0 bg-[var(--accent)] pointer-events-none"
				style={overlayStyle}
			/>
			<span className="relative z-10 flex items-center gap-2 group-hover:text-[var(--bg)] transition-colors duration-300">
				{children}
			</span>
		</Link>
	);
}

export default function Home() {
	const { visibleText } = useLangContext();
	const { toggleAudio, isPlaying } = useAudio();
	// const { theme, setTheme } = useTheme();

	// const [savedTheme, setSavedTheme] = useState<ThemeType>('theme-charcoal');
	// const [hoveredTheme, setHoveredTheme] = useState<ThemeType | null>(null);

	// Keep savedTheme in sync with the global theme when not hovering
	// useEffect(() => {
	//     if (!hoveredTheme) {
	//         setSavedTheme(theme as ThemeType);
	//     }
	// }, [theme, hoveredTheme]);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const handleMouseEnter = (cardTheme: ThemeType) => {
		// setHoveredTheme(cardTheme);
		// setTheme(cardTheme);
	};

	const handleMouseLeave = () => {
		// setHoveredTheme(null);
		// setTheme(savedTheme);
	};

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const handleCardClick = (cardTheme: ThemeType) => {
		// setSavedTheme(cardTheme);
		// setTheme(cardTheme);
	};

	const homeCards = visibleText.homeCards || {
		github: {
			title: "Codebase & GitHub",
			stats: "70+ Repositories",
			desc: "Check out my open-source work, scripts, notebooks, and automation tools.",
		},
		projects: {
			title: "Projects & Labs",
			stats: "7+ Featured Works",
			desc: "Explore web platforms, AI scheme recommenders, and database solutions.",
		},
		art: {
			title: "Photography & Design",
			stats: "UI/UX & Visuals",
			desc: "Browse branding projects, graphic layouts, and captured moments.",
		},
		about: {
			title: "Life & Philosophy",
			stats: "CSE Student (DS)",
			desc: "Read about my background, learning process, and what drives me.",
		},
	};

	const cards = [
		{
			key: "github",
			theme: "theme-charcoal" as const,
			title: homeCards.github.title,
			stats: homeCards.github.stats,
			desc: homeCards.github.desc,
			icon: "devicon-github-original",
			link: "https://github.com/vineet-k09",
			isExternal: true,
		},
		{
			key: "projects",
			theme: "theme-sunlight" as const,
			title: homeCards.projects.title,
			stats: homeCards.projects.stats,
			desc: homeCards.projects.desc,
			icon: "fa-regular fa-folder-open",
			link: "/projects",
			isExternal: false,
		},
		{
			key: "about",
			theme: "theme-neon" as const,
			title: homeCards.about.title,
			stats: homeCards.about.stats,
			desc: homeCards.about.desc,
			icon: "fa-solid fa-circle-info",
			link: "/about",
			isExternal: false,
		},
		{
			key: "art",
			theme: "theme-crimson" as const,
			title: homeCards.art.title,
			stats: homeCards.art.stats,
			desc: homeCards.art.desc,
			icon: "fa-solid fa-palette",
			link: "/creative",
			isExternal: false,
		},
	];

	return (
		<>
			<Navbar />
			<div className="container mt-10">
				<div className="grid-layout">
					<div className="content-area sm:px-10">
						{/* 🧍 Hero Section */}
						<motion.section
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, margin: "-100px" }}
							variants={revealVariants}
							className="hero-header my-16">
							<div className="flex flex-col md:flex-row justify-between items-center gap-10 mb-8">
								<div className="flex-1">
									<h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-2 transition-all duration-500">
										<TypedName name={visibleText.name} />
									</h1>
									<p className="text-lg md:text-xl opacity-80 font-medium transition-all duration-500 mb-6">
										{visibleText.role}
									</p>
									<p className="text-lg opacity-90 max-w-2xl mb-6 leading-relaxed font-normal">
										I&apos;m a{" "}
										<span className="text-[var(--accent)] font-semibold">
											{visibleText["aboutme13"]}
										</span>{" "}
										with a strong grip on React, Node.js, and data analytics.
										Below is a mix-and-match interactive playground of my
										domains — hover to explore each theme.
									</p>
									<div className="flex items-center gap-4 h-12 mt-4">
										<div className="reactOut flex gap-3 items-center h-full">
											<a
												href="https://github.com/vineet-k09"
												target="_blank"
												aria-label="GitHub"
												className="flex items-center justify-center">
												<i
													className="devicon devicon-github-original hover:text-[var(--accent)] border-2 p-1.5 border-transparent hover:border-[var(--accent)] rounded-full duration-250 flex items-center justify-center"
													style={{ fontSize: "16px" }}></i>
											</a>
											<a
												href="https://www.linkedin.com/in/vineet-kushwaha-2666b5257/"
												target="_blank"
												aria-label="LinkedIn"
												className="flex items-center justify-center">
												<i
													className="devicon devicon-linkedin-plain hover:text-[var(--accent)] border-2 p-1.5 border-transparent hover:border-[var(--accent)] rounded-xl duration-250 flex items-center justify-center"
													style={{ fontSize: "16px" }}></i>
											</a>
											<a
												href="mailTo:vineetkushwaha6325@gmail.com"
												aria-label="Email"
												className="flex items-center justify-center">
												<i
													className="fa-regular fa-envelope hover:text-[var(--accent)] border-2 p-1.5 border-transparent hover:border-[var(--accent)] rounded-xl duration-250 flex items-center justify-center"
													style={{ fontSize: "16px" }}></i>
											</a>
											<button
												style={{
													color: isPlaying ? "var(--accent)" : "var(--bg)",
												}}
												onClick={toggleAudio}
												className="hover:scale-120 hover:bg-[var(--accent)] 
                                                border-2 
                                                hover:border-[var(--text)]
                                                transition-all h-9 w-12 flex items-center justify-center rounded-2xl boxShadow 
                                                bg-[var(--text)]
                                                duration-250
                                                cursor-pointer
                                                font-semibold
                                                text-lg
                                                "
												aria-label="Toggle music">
												♫
											</button>
										</div>
									</div>
								</div>
								<div className="flex-shrink-0 flex items-center justify-center">
									<div className="morphing-blob-container">
										<div className="morphing-blob-glow" />
										<div
											className="morphing-blob"
											style={{ backgroundImage: "url('/photos/hero.jpg')" }}
										/>
									</div>
								</div>
							</div>

							{/* Theme Mix and Match Cards */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
								{cards.map((card) => (
									<TiltCard
										key={card.key}
										href={card.link}
										isExternal={card.isExternal}
										onMouseEnter={() => handleMouseEnter(card.theme)}
										onMouseLeave={handleMouseLeave}
										onClick={() => handleCardClick(card.theme)}
										className={`horizontal-bento-card ${card.theme} no-underline`}>
										<div className="horizontal-bento-card-inner">
											<div className="card-icon-wrapper">
												<i
													className={`${card.icon}`}
													style={{ fontSize: "18px" }}
												/>
											</div>
											<div className="card-content-wrapper">
												<span className="card-tag">{card.stats}</span>
												<h3 className="card-title">{card.title}</h3>
												<p className="card-desc">{card.desc}</p>
											</div>
											<div className="card-arrow">
												<i className="fa-solid fa-arrow-right text-lg" />
											</div>
										</div>
									</TiltCard>
								))}
							</div>
						</motion.section>

						<motion.section
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, margin: "-100px" }}
							variants={revealVariants}
							className="w-full my-20 flex flex-col items-center">
							<h2 className="text-3xl font-extrabold tracking-tight mb-16 text-center w-full text-[var(--text)] border-b border-[var(--text)] border-opacity-5 pb-4">
								{visibleText.experience?.title}
							</h2>

							<div className="relative w-full max-w-5xl mx-auto flex flex-col">
								{/* Vertical Central Git Main Track */}
								<div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-[2px] bg-[var(--text)] bg-opacity-10 hidden md:block" />

								{visibleText.experience?.list.map((exp, idx) => {
									const isLeft = idx % 2 === 1;
									return (
										<div
											key={idx}
											className={`flex flex-col md:flex-row items-stretch w-full mb-16 relative ${isLeft ? "md:flex-row-reverse" : ""}`}>
											{/* Branch Checkout Card Column */}
											<div className="w-full md:w-1/2 flex flex-col justify-center order-1 px-4 md:px-8">
												<div
													className="inverted-theme-card flex flex-col gap-2.5 p-5 border rounded-2xl relative overflow-hidden transition-all duration-300"
													style={{
														borderColor: `${exp.color}45`,
														boxShadow: `0 4px 30px -10px ${exp.color}15`,
														borderLeftWidth: "6px",
														borderLeftColor: exp.color,
													}}>
													{/* Git switch command header */}
													<div className="flex items-center justify-between flex-wrap gap-2 border-b border-[var(--text)] border-opacity-10 pb-2 text-[var(--text)]">
														<div className="flex items-center gap-1.5">
															<span className="text-xs font-mono text-emerald-600 dark:text-emerald-500 font-bold">
																$
															</span>
															<span className="text-xs font-mono opacity-80 text-[var(--text)]">
																git switch
															</span>
															<span
																className="text-xs font-mono px-2 py-0.5 rounded font-bold border"
																style={{
																	backgroundColor: "#16161a",
																	color: exp.color,
																	borderColor: `${exp.color}35`,
																}}>
																{exp.branch}
															</span>
														</div>
													</div>

													{/* Role & Company Metadata */}
													<div className="text-[var(--bg)]">
														<h3
															className="text-lg font-extrabold"
															style={{ color: exp.color }}>
															{exp.role}
														</h3>
														<div className="flex justify-between items-baseline mt-1 flex-wrap gap-1 text-[var(--text)]">
															<span className="text-sm font-bold opacity-90 text-[var(--text)]">
																{exp.company}
															</span>
															<span className="text-[11px] font-mono opacity-70 font-semibold text-[var(--text)]">
																{exp.duration}
															</span>
														</div>
														<div className="text-[10px] font-mono opacity-50 mt-1 text-[var(--bg)]">
															{exp.timeline}
														</div>
													</div>
												</div>
											</div>

											{/* Center Axis Switch Node (only visible on desktop) */}
											<div className="hidden md:flex w-16 justify-center items-center relative order-2 z-10">
												{/* Straight Vertical axis line */}
												<div className="absolute top-0 bottom-0 w-[2px] bg-[var(--text)] bg-opacity-15" />

												{/* Node Circle */}
												<div
													className="w-4 h-4 rounded-full bg-[var(--bg)] border-[3.5px] z-20 transition-all duration-300 hover:scale-125"
													style={{
														borderColor: exp.color,
														boxShadow: `0 0 10px ${exp.color}`,
													}}
												/>
											</div>

											{/* Commit Log Details Column */}
											<div className="w-full md:w-1/2 flex flex-col justify-center order-3 px-4 md:px-8 mt-4 md:mt-0">
												<div
													className="relative pl-6 border-l-2 py-2"
													style={{
														borderColor: `${exp.color}25`,
													}}>
													{exp.commits.map((commit, commitIdx) => (
														<div
															key={commitIdx}
															className="relative group/commit mb-6 last:mb-0">
															{/* Commit node dot */}
															<div
																className="absolute -left-[30px] top-1.5 w-2 h-2 rounded-full bg-[var(--bg)] border-2 transition-all duration-200 group-hover/commit:scale-125"
																style={{
																	borderColor: exp.color,
																}}
															/>

															<div>
																<div className="flex flex-wrap items-baseline gap-2">
																	<span
																		className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded"
																		style={{
																			backgroundColor: `${exp.color}10`,
																			color: exp.color,
																			border: `1px solid ${exp.color}20`,
																		}}>
																		{commit.hash}
																	</span>
																	<h4 className="text-sm font-extrabold text-[var(--text)] transition-colors duration-250 group-hover/commit:text-[var(--accent)]">
																		{commit.msg}
																	</h4>
																</div>

																{/* Fixed description contrast */}
																<p className="text-xs text-[var(--text)] opacity-90 mt-1.5 font-normal leading-relaxed max-w-md">
																	{commit.desc}
																</p>
															</div>
														</div>
													))}
												</div>
											</div>
										</div>
									);
								})}
							</div>
						</motion.section>

						<motion.section
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, margin: "-100px" }}
							variants={revealVariants}
							className="mb-16 w-full">
							<h2 className="text-3xl font-extrabold mb-8 border-b border-opacity-10 border-[var(--text)] pb-3">
								Skills
							</h2>
							<div className="inverted-theme-card p-6 md:p-8 rounded-2xl w-full">
								{[
									{ title: "Languages & Frontend", list: languagesAndFrontend },
									{ title: "Backend & Databases", list: backendAndDatabases },
									{ title: "DevOps & Tools", list: devopsAndTools },
								].map((cat, idx) => (
									<div
										key={idx}
										className="flex flex-col md:flex-row md:items-start gap-4 py-5 border-b border-opacity-10 border-[var(--text)] last:border-b-0 last:pb-0 first:pt-0"
									>
										<div className="md:w-1/4 flex-shrink-0 md:pt-1">
											<h3 className="text-sm md:text-base font-extrabold text-[var(--accent)] uppercase tracking-wider font-mono">
												{cat.title}
											</h3>
										</div>
										<div className="md:w-3/4 w-full">
											<ul className="flex flex-wrap gap-3 list-none p-0 m-0">
												{cat.list.map(({ className, label, link }) => (
													<li key={label} className="list-none">
														<ScrollSkillTag
															label={label}
															className={className}
															link={link}
														/>
													</li>
												))}
											</ul>
										</div>
									</div>
								))}
							</div>
						</motion.section>

						<motion.section
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, margin: "-100px" }}
							variants={revealVariants}
							className="section">
							{/* 🚀 Projects Section */}
							<h2 className="col-span-1">{visibleText.projects?.title}</h2>
							<div className="col-span-1"></div>
							<div className="col-span-5 flex flex-col gap-8">
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
									{visibleText.projects?.list
										?.slice(0, 2)
										.map((project, idx) => (
											<div
												key={idx}
												className="inverted-theme-card overflow-hidden rounded-2xl flex flex-col justify-between hover:border-[var(--accent)] hover:shadow-lg transition-all duration-300">
												{/* Project Image Cover */}
												{project.image && project.image.length > 0 && (
													<div className="w-full h-48 overflow-hidden relative bg-neutral-900 border-b border-[var(--text)] border-opacity-10">
														<Image
															src={project.image[0]}
															alt={project.title}
															fill
															sizes="(max-width: 640px) 100vw, 50vw"
															className="object-cover hover:scale-105 transition-transform duration-500"
														/>
													</div>
												)}
												<div className="p-6 flex-grow flex flex-col justify-between">
													<div>
														<div className="flex justify-between items-start mb-3">
															<h3 className="text-xl font-bold">
																{project.title}
															</h3>
															<div className="flex gap-2">
																{project.github && (
																	<a
																		href={project.github}
																		target="_blank"
																		rel="noreferrer"
																		className="hover:text-[var(--accent)] transition-colors duration-200"
																		aria-label="GitHub repo">
																		<i
																			className="devicon-github-original"
																			style={{ fontSize: "20px" }}
																		/>
																	</a>
																)}
																{project.live && (
																	<a
																		href={project.live}
																		target="_blank"
																		rel="noreferrer"
																		className="hover:text-[var(--accent)] transition-colors duration-200"
																		aria-label="Live demo">
																		<i
																			className="fa-solid fa-arrow-up-right-from-square"
																			style={{ fontSize: "18px" }}
																		/>
																	</a>
																)}
															</div>
														</div>
														<p className="text-sm mb-4 leading-relaxed opacity-80">
															{project.description}
														</p>
													</div>
													<div className="flex flex-wrap gap-2 mt-2">
														{project.stack?.map((tech, i) => (
															<span
																key={i}
																className="inverted-tag text-xs px-2 py-1 rounded font-mono">
																{tech}
															</span>
														))}
													</div>
												</div>
											</div>
										))}
								</div>

								{/* View More Projects Button */}
								<DirectionalHoverButton href="/projects">
									<span>View More Projects</span>
									<i
										className="fa-solid fa-arrow-right"
										style={{ fontSize: "12px" }}
									/>
								</DirectionalHoverButton>
							</div>
						</motion.section>
					</div>
				</div>
			</div>
		</>
	);
}

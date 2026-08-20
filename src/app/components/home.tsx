"use client";

import Navbar from "./navbar";
import { useAudio } from "@/context/AudioContext";
import { useState, useRef } from "react";
import { motion } from "framer-motion";

import Link from "next/link";
import Image from "next/image";

const experiencesData = [
	{
		company: "Vodafone Intelligent Solutions (VOIS)",
		role: "Data Analyst",
		duration: "6 months",
		timeline: "Jan 2026 - July 2026",
		branch: "feat/vois-data-analyst",
		color: "#a855f7",
		commits: [
			{
				hash: "d8b5a3c",
				msg: "Automated Ingestion Pipeline",
				desc: "Engineered automated validation pipeline processing 400K+ monthly multi-market records, replacing manual workflows and reducing intervention by 90%.",
			},
			{
				hash: "e9f2b1d",
				msg: "Containerized Cloud Run Mesh",
				desc: "Designed and deployed containerized Node/Express microservice on GCP Cloud Run with secure IAM service account mesh communication.",
			},
			{
				hash: "f3a7c6e",
				msg: "Vertex AI Engagement Stream",
				desc: "Integrated Gemini 2.5 Flash Lite features to design Express API streaming interaction metadata into BigQuery for real-time engagement analytics.",
			},
		],
	},
	{
		company: "Infosys Springboard",
		role: "Full Stack Developer Intern",
		duration: "3 months",
		timeline: "Oct 2025 - Dec 2025",
		branch: "feat/infosys-fullstack",
		color: "#a855f7",
		commits: [
			{
				hash: "a1b2c3d",
				msg: "Stateful JWT REST APIs",
				desc: "Developed secure REST endpoints with HttpOnly cookies, bcrypt hashing, and schema-level validation using Zod.",
			},
			{
				hash: "b4d5e6f",
				msg: "Dev Team Leadership",
				desc: "Led team of 4 developers driving technical decisions, task allocation, project planning, and frontend/backend feature delivery.",
			},
			{
				hash: "c5e6f7a",
				msg: "Full-Stack Feature Delivery",
				desc: "Designed and integrated full-stack features using React, Node, Express, and MongoDB collaborating across the lifecycle.",
			},
		],
	},
	{
		company: "Curiosense Innovations Pvt. Ltd.",
		role: "Graphic Design Intern",
		duration: "6 months",
		timeline: "Apr 2025 - Sep 2025",
		branch: "design/brand-identity",
		color: "#a855f7",
		commits: [
			{
				hash: "c7e8f9a",
				msg: "design: UI/UX Wireframes & Branding",
				desc: "Created mockups, social designs, and brand style guides using Figma and Adobe Suite.",
			},
		],
	},
	{
		company: "Acharya Institute of Technology",
		role: "Bachelor of Engineering - CSE (Data Science)",
		duration: "4 years",
		timeline: "Nov 2022 - June 2026",
		branch: "edu/acharya-cse",
		color: "#a855f7",
		commits: [
			{
				hash: "edu2026",
				msg: "CSE - Data Science Degree",
				desc: "Studying algorithms, data structures, machine learning models, and database engineering.",
			},
			{
				hash: "iedc01",
				msg: "IED Cell Content Head",
				desc: "Led content operations, copywriting, and marketing materials for the Innovation and Entrepreneurship Development Cell.",
			},
		],
	},
];

const featuredProjects = [
	{
		title: "Endxiety",
		github: "https://github.com/vineet-k09/Endxiety",
		description:
			"An AI-assisted mental wellness platform featuring anonymous chat, emotion tracking, and journaling. Focused on privacy-aware design, state management, and integrating LLM-based insights into user workflows.",
		live: "",
		stack: ["React", "MongoDB", "Vite", "OpenAI API"],
		image: ["/projects/endxiety/1.png"],
	},
	{
		title: "BiblioVerse",
		github: "https://github.com/vineet-k09/E-Book-Recommendation",
		description:
			"An AI-driven ebook recommendation system combining big-data filtering with a modern web interface. Implemented data pipelines using Hadoop and PySpark, and integrated recommendations into a full-stack Next.js application.",
		stack: ["NextJs", "MongoDB", "Node.js", "Hadoop", "PySpark"],
		figma:
			"https://www.figma.com/board/LqTWwlRKuz1x7wg0yX0gpk/Ebook-Recommendation?node-id=0-1&t=Kq1JFQZV9aFP1RLp-1",
		live: "",
		image: [
			"/projects/biblioverse/1.png",
			"/projects/biblioverse/2.png",
			"/projects/biblioverse/3.png",
			"/projects/biblioverse/4.png",
		],
	},
];


function TypedName({ name }: { name: string }) {
	const parts = name.split(" ");
	const firstName = parts[0] || "";
	const lastName = parts.slice(1).join(" ") || "";

	return (
		<span className="flex flex-col sm:inline-flex sm:flex-row items-start sm:items-baseline">
			<span className="select-none">{firstName}</span>
			<span className="inline-flex items-baseline sm:ml-3 min-w-[6ch] min-h-[1.2em]">
				<span
					style={{
						WebkitTextStroke: "1.5px var(--text)",
						color: "transparent",
					}}>
					{lastName}
				</span>
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
	const { toggleAudio, isPlaying } = useAudio();

	const cards = [
		{
			key: "github",
			theme: "theme-charcoal" as const,
			title: "Codebase & GitHub",
			stats: "50+ Repositories",
			desc: "Check out my open-source work, scripts, notebooks, and automation tools.",
			icon: "fa-brands fa-github",
			link: "https://github.com/vineet-k09",
			isExternal: true,
		},
		{
			key: "projects",
			theme: "theme-sunlight" as const,
			title: "Projects & Labs",
			stats: "7+ Featured Works",
			desc: "Explore web platforms, AI scheme recommenders, and database solutions.",
			icon: "fa-regular fa-folder-open",
			link: "/projects",
			isExternal: false,
		},
		{
			key: "about",
			theme: "theme-neon" as const,
			title: "Life & Philosophy",
			stats: "CSE Student (DS)",
			desc: "Read about my background, learning process, and what drives me.",
			icon: "fa-solid fa-circle-info",
			link: "/about",
			isExternal: false,
		},
		{
			key: "art",
			theme: "theme-crimson" as const,
			title: "Creative Sandbox",
			stats: "Designs & UI/UX",
			desc: "Browse visual layouts, UI/UX mockups, graphics, and interactive shaders.",
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
										<TypedName name="Vineet Kushwaha" />
									</h1>
									<p className="text-lg md:text-xl opacity-80 font-medium transition-all duration-500 mb-6">
										Software & Data Engineer
									</p>
									<p className="text-lg opacity-90 max-w-2xl mb-6 leading-relaxed font-normal">
										I build things, break them, and occasionally figure out why
										they broke. I&apos;m Vineet — an engineer interested in
										software, data, and everything in between.
									</p>
									<div className="flex items-center gap-4 h-12 mt-4">
										<div className="reactOut flex gap-3 items-center h-full">
											<a
												href="https://github.com/vineet-k09"
												target="_blank"
												aria-label="GitHub"
												className="flex items-center justify-center">
												<i
													className="fa-brands fa-github hover:text-[var(--accent)] border-2 p-1.5 border-transparent hover:border-[var(--accent)] rounded-xl duration-250 flex items-center justify-center text-[var(--text)]"
													style={{ fontSize: "18px" }}></i>
											</a>
											<a
												href="https://www.linkedin.com/in/vineet-k09/"
												target="_blank"
												aria-label="LinkedIn"
												className="flex items-center justify-center">
												<i
													className="fa-brands fa-linkedin hover:text-[var(--accent)] border-2 p-1.5 border-transparent hover:border-[var(--accent)] rounded-xl duration-250 flex items-center justify-center text-[var(--text)]"
													style={{ fontSize: "18px" }}></i>
											</a>
											<a
												href="mailto:vineetkushwaha6325@gmail.com"
												aria-label="Email"
												className="flex items-center justify-center">
												<i
													className="fa-regular fa-envelope hover:text-[var(--accent)] border-2 p-1.5 border-transparent hover:border-[var(--accent)] rounded-xl duration-250 flex items-center justify-center text-[var(--text)]"
													style={{ fontSize: "18px" }}></i>
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
								Work Experience
							</h2>

							<div className="relative w-full max-w-5xl mx-auto flex flex-col">
								{/* Vertical Central Git Main Track */}
								<div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-[2px] bg-[var(--text)] bg-opacity-10 hidden md:block">
								</div>

								{experiencesData.map((exp, idx) => {
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
													<div className="flex items-center justify-between flex-wrap gap-2 border-b border-[var(--text)] border-opacity-10 pb-5 text-[var(--text)]">
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

											{/* Commit Log Details Column */}
											<div className="w-full md:w-1/2 flex flex-col justify-center order-3 px-4 md:px-8 mt-4 md:mt-0">
												<div
													className="relative pl-6 border-l-2 py-2"
													style={{
														borderColor: `${exp.color}`
													}}>
													{exp.commits.map((commit, commitIdx) => (
														<div
															key={commitIdx}
															className="relative group/commit mb-6 last:mb-0">
															{/* Commit node dot */}
															<div
																className="absolute -left-[29px] top-1.5 w-2 h-2 rounded-full bg-[var(--bg)] border-2 transition-all duration-200 group-hover/commit:scale-125"
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
							className="section">
							{/* 🚀 Projects Section */}
							<h2 className="col-span-1">Projects</h2>
							<div className="col-span-1"></div>
							<div className="col-span-5 flex flex-col gap-8">
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
									{featuredProjects.map((project, idx) => (
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

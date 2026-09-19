"use client";

import ProjectCarousel from "../components/render/carousel";
import "../page.css";
import PageWrapper from "../components/utility/pageWrapper";

interface Project {
	title: string;
	github?: string;
	figma?: string;
	live?: string;
	description: string;
	stack: string[];
	image?: string[];
}

const mainProjects: Project[] = [
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
	{
		title: "AirNotes",
		github: "https://github.com/vineet-k09/airnotes",
		description:
			"Real-time computer vision and audio gesture music synthesizer. Tracks hand landmarks using MediaPipe to convert finger combinations and motion into live notes, volume pinch controls, rolling staff notation, and session recording across Qt desktop and Web Audio API.",
		stack: [
			"Python",
			"PySide6",
			"MediaPipe",
			"Web Audio API",
			"FastAPI",
			"WebSockets",
		],
		image: ["/projects/airnotes/anotes.png"],
	},
	{
		title: "Saarthi AI",
		github: "https://github.com/Sarthi-AI/saarthi-ai",
		description:
			"Multilingual scheme recommender using AI, accessible via voice and text.",
		stack: ["React", "TypeScript", "ToughTongue", "ChatBaseAPI"],
		live: "",
		image: [
			"/projects/saarthi/1.png",
			"/projects/saarthi/2.png",
			"/projects/saarthi/3.png",
		],
	},
	{
		title: "SkillMatrix",
		github: "https://github.com/SkillMatrix-io/skillmatrix",
		description:
			"A full-stack learning platform supporting role-based access, course creation, and multimedia content delivery (text, PDFs, video). Designed backend APIs and database schema to handle user roles, enrollments, and content management.",
		stack: ["React", "MySQL", "Django"],
		live: "",
		image: ["/projects/skillmatrix/1.png", "/projects/skillmatrix/2.png"],
	},
	{
		title: "DB Notes",
		github: "https://github.com/vineet-k09/db-notes",
		description:
			"A Notion clone and high-productivity system for daily activity and progress tracking. Automatically handles dynamic schema relationships, sub-activity rollups, pre-generated calendar tracking, and PostgreSQL JSONB schema flexibility.",
		stack: ["Next.js", "React", "TypeScript", "Prisma", "PostgreSQL", "TailwindCSS"],
		image: [],
	},
	{
		title: "SAC Commenting",
		description:
			"Developed an embedded React widget consuming SAP Analytics Cloud postMessage events to capture dashboard context. Built Express.js APIs for comment storage, integrated Vertex AI for contextual JSON summaries, and implemented Puppeteer for automated snapshot generation.",
		stack: [
			"React",
			"Express.js",
			"Vertex AI",
			"Puppeteer",
			"SAP Analytics Cloud",
		],
		image: [],
	},
	{
		title: "iConnect 2.0",
		description:
			"Architected a microservice topology separating a Node.js/Express gateway from a FastAPI AI inference agent containerized on GCP Cloud Run. Secured inter-service OAuth 2.0 communication, designed BigQuery generation engines, and implemented transactional caching to reduce redundant Vertex AI invocations by 35%.",
		stack: [
			"React",
			"Node.js",
			"FastAPI",
			"GCP Cloud Run",
			"BigQuery",
			"Redis",
		],
		image: [],
	},
];

const labProjects: Project[] = [
	{
		title: "ViewBlk",
		github: "https://github.com/vineet-k09/viewblk",
		description:
			"An ultra-fast, lightweight (~840KB) CLI utility in Rust that renders a human-friendly breakdown of drives and partitions with visual disk usage progress bars and instant NVMe/HDD detection in under 2ms.",
		stack: ["Rust", "CLI", "Linux System API"],
		image: [],
	},
	{
		title: "GitHub Repo Curator",
		github: "https://github.com/vineet-k09/github-repo-curator",
		description:
			"A privacy-first, zero-backend Web Dashboard and CLI toolkit to audit, filter, organize, and bulk-manage GitHub repositories (visibility toggle, bulk tagging, MIT license/README generation, and repository deletion).",
		stack: ["Python", "JavaScript", "GitHub REST API", "Vercel"],
		image: [],
	},
	{
		title: "Readit",
		github: "https://github.com/vineet-k09/readit",
		description:
			"Instant, zero-bloat Markdown & README viewer for Linux with sub-200ms cold boot. Features live hot-reloading, relative local asset resolution, GitHub visual styling, KaTeX math rendering, and desktop MIME integration.",
		stack: ["Python", "JavaScript", "Markdown", "Linux Desktop API"],
		image: ["/projects/readit/1.jpg", "/projects/readit/2.jpg"],
	},
	{
		title: "Gmail Desktop Widget",
		github: "https://github.com/vineet-k09/mail-widget",
		description:
			"A lightweight, zero-latency desktop mail widget for Linux desktop environments (GNOME/KDE). Built with PySide6, QtWebEngine, and SQLite local caching to eliminate browser startup overhead and operate at ~30-50MB RAM.",
		stack: ["Python", "PySide6", "QtWebEngine", "SQLite", "Gmail API"],
		image: [],
	},
];

function ProjectCard({ project, idx }: { project: Project; idx: number }) {
	return (
		<div
			id={idx.toString()}
			className="inverted-theme-card rounded-2xl overflow-hidden flex flex-col justify-between">
			{/* Screenshot Carousel Area */}
			{project.image && project.image.length > 0 && (
				<div className="w-full relative bg-neutral-900 border-b border-black border-opacity-10">
					<ProjectCarousel images={project.image} />
				</div>
			)}

			{/* Content Details */}
			<div className="p-6 flex-grow flex flex-col justify-between">
				<div>
					<div className="flex items-center justify-between mb-2">
						<h3 className="text-2xl font-bold">{project.title}</h3>
						<div className="flex items-center gap-3">
							{project.github && (
								<a
									href={project.github}
									target="_blank"
									rel="noreferrer"
									className="text-lg opacity-70 hover:opacity-100 transition-opacity"
									title="View Repository">
									<i className="fa-brands fa-github" />
								</a>
							)}
							{project.figma && (
								<a
									href={project.figma}
									target="_blank"
									rel="noreferrer"
									className="text-lg opacity-70 hover:opacity-100 transition-opacity"
									title="View Figma">
									<i className="fa-brands fa-figma" />
								</a>
							)}
							{project.live && (
								<a
									href={project.live}
									target="_blank"
									rel="noreferrer"
									className="text-lg opacity-70 hover:opacity-100 transition-opacity"
									title="Live Preview">
									<i className="fa-solid fa-arrow-up-right-from-square" />
								</a>
							)}
						</div>
					</div>
					<p className="text-sm leading-relaxed mb-4">
						{project.description}
					</p>
				</div>

				<div>
					{/* Tech Stack Tags */}
					<div className="flex flex-wrap gap-2 mb-4">
						{project.stack?.map((tech, i) => (
							<span
								key={i}
								className="inverted-tag text-xs px-2.5 py-1 rounded font-mono font-medium">
								{tech}
							</span>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default function Projects() {
	return (
		<PageWrapper>
			<div className="grid-layout">
				<div className="content-area sm:px-10 flex flex-col items-center my-10 w-full">
					{/* Header */}
					<div className="text-center max-w-2xl mb-12">
						<span className="text-xs font-mono uppercase tracking-wider text-[var(--accent)] font-semibold mb-1 block">
							development labs
						</span>
						<h2 className="text-4xl font-extrabold tracking-tight mb-4 text-center">
							Projects
						</h2>
						<p className="text-sm opacity-80 leading-relaxed">
							A showcase of web applications, AI models, data pipelines,
							interactive developer tools, and desktop utilities. Click icons to explore codebase or
							live deployments.
						</p>
					</div>

					{/* Section 1: Applications & Platforms */}
					<div className="w-full mb-14">
						<div className="flex items-center gap-3 mb-6 pb-2 border-b border-neutral-700/30">
							<span className="text-xs font-mono uppercase tracking-wider text-[var(--accent)] font-semibold">
								01 // Applications & Platforms
							</span>
						</div>
						<div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
							{mainProjects.map((project, idx) => (
								<ProjectCard key={idx} project={project} idx={idx} />
							))}
						</div>
					</div>

					{/* Section 2: Developer Tools & Desktop Utilities */}
					<div className="w-full">
						<div className="flex items-center gap-3 mb-6 pb-2 border-b border-neutral-700/30">
							<span className="text-xs font-mono uppercase tracking-wider text-[var(--accent)] font-semibold">
								02 // Developer Tools & Desktop Utilities
							</span>
						</div>
						<div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
							{labProjects.map((project, idx) => (
								<ProjectCard key={idx + mainProjects.length} project={project} idx={idx + mainProjects.length} />
							))}
						</div>
					</div>
				</div>
			</div>
		</PageWrapper>
	);
}

"use client";

import ProjectCarousel from "../components/render/carousel";
import "../page.css";
import PageWrapper from "../components/utility/pageWrapper";

const projectsData = [
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
		title: "Real-Time Hand Gesture MIDI Synthesizer",
		github:
			"https://github.com/shyamkrishnabnair/hand-gesture-recognition-mediapipe-main",
		description:
			"Developed a rule-based coordinate geometry classifier using MediaPipe landmark vectors to recognize 10 finger-count gestures with zero ML execution overhead. Optimized browser execution to achieve 60 FPS via frame skipping and offloaded synthesis to Web Workers, minimizing audio latency to ~12 ms.",
		stack: [
			"OpenCV",
			"MediaPipe",
			"Web Workers",
			"Web Audio API",
			"CustomTKinter",
		],
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
							A showcase of web applications, AI models, data pipelines, and
							interactive developer tools. Click icons to explore codebase or
							live deployments.
						</p>
					</div>

					{/* 3-Column Grid */}
					<div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
						{projectsData.map((project, idx) => (
							<div
								key={idx}
								id={idx.toString()}
								className="inverted-theme-card rounded-2xl overflow-hidden flex flex-col justify-between">
								{/* Screenshot Carousel Area */}
								<div className="w-full relative bg-neutral-900 border-b border-black border-opacity-10">
									<ProjectCarousel images={project?.image} />
								</div>

								{/* Content Details */}
								<div className="p-6 flex-grow flex flex-col justify-between">
									<div>
										<h3 className="text-2xl font-bold mb-2">{project.title}</h3>
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
						))}
					</div>
				</div>
			</div>
		</PageWrapper>
	);
}

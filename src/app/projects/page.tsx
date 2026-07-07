"use client";

import ProjectCarousel from "../components/render/carousel";
import "../page.css";
import PageWrapper from "../components/utility/pageWrapper";
import { useLangContext } from "@/hooks/useLang";

export default function Projects() {
	const { visibleText } = useLangContext();

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
							{visibleText.projects?.title || "Projects"}
						</h2>
						<p className="text-sm opacity-80 leading-relaxed">
							A showcase of web applications, AI models, data pipelines, and
							interactive developer tools. Click icons to explore codebase or
							live deployments.
						</p>
					</div>

					{/* 3-Column Grid */}
					<div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
						{visibleText.projects?.list?.map((project, idx) => (
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

										{/* Action Links */}
										<div className="flex items-center gap-4 border-t border-black border-opacity-5 pt-4">
											{project.github && (
												<a
													href={project.github}
													target="_blank"
													rel="noreferrer"
													className="flex items-center gap-1.5 text-sm font-semibold hover:text-[var(--accent)] transition-colors duration-200">
													<i className="devicon-github-original text-xl" />
													<span>Repository</span>
												</a>
											)}
											{project.live && (
												<a
													href={project.live}
													target="_blank"
													rel="noreferrer"
													className="flex items-center gap-1.5 text-sm font-semibold hover:text-[var(--accent)] transition-colors duration-200 ml-2">
													<i className="fa-solid fa-arrow-up-right-from-square text-sm" />
													<span>Live Demo</span>
												</a>
											)}
											{project.figma && (
												<a
													href={project.figma}
													target="_blank"
													rel="noreferrer"
													className="flex items-center gap-1.5 text-sm font-semibold hover:text-[var(--accent)] transition-colors duration-200 ml-2">
													<i className="devicon-figma-plain text-base" />
													<span>Design</span>
												</a>
											)}
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

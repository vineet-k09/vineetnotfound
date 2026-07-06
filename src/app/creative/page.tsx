"use client";

import React, { useState } from "react";
import Image from "next/image";
import PageWrapper from "../components/utility/pageWrapper";
import TextPressure from "./scripts/TextPressure";
import "../page.css";

interface GalleryItem {
	id: number | string;
	title: string;
	category: "uiux" | "graphics";
	categoryLabel: string;
	src: string;
	description: string;
	locationOrTool: string;
	width: number;
	height: number;
	figma?: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
	{
		id: 1,
		title: "VOIS Landing Page Mockup",
		category: "uiux",
		categoryLabel: "UI/UX Design",
		src: "/creative/uiux/vois_mockup_front.png",
		description:
			"A modern landing page concept created for a VOIS-themed web experience, emphasizing clean layouts and intuitive navigation.",
		locationOrTool: "Figma",
		width: 1916,
		height: 937,
		figma: "https://www.figma.com"
	},
	{
		id: 2,
		title: "VOIS About Us Page",
		category: "uiux",
		categoryLabel: "UI/UX Design",
		src: "/creative/uiux/vois_mockup_aboutus_page.png",
		description:
			"An About Us page mockup designed to present company information with clarity, visual consistency, and strong information hierarchy.",
		locationOrTool: "Figma",
		width: 1916,
		height: 937,
		figma: "https://www.figma.com"
	},
	{
		id: 3,
		title: "VOIS Contact Page",
		category: "uiux",
		categoryLabel: "UI/UX Design",
		src: "/creative/uiux/vois_mockup_contact_us_page.png",
		description:
			"A responsive contact page concept focused on accessibility, user-friendly forms, and a polished visual identity.",
		locationOrTool: "Figma",
		width: 1916,
		height: 937,
		figma: "https://www.figma.com"
	},
	{
		id: 4,
		title: "Murder Mystery Competition Poster",
		category: "graphics",
		categoryLabel: "Poster Design",
		src: "/creative/designs/murdermysterycompetetion.png",
		description:
			"A promotional poster designed for a murder mystery competition, focusing on suspenseful visuals and bold typography.",
		locationOrTool: "Adobe Photoshop",
		width: 1080,
		height: 1350,
	},
	{
		id: 5,
		title: "Short Film Competition Poster",
		category: "graphics",
		categoryLabel: "Poster Design",
		src: "/creative/designs/short movie making competition.png",
		description:
			"A creative event poster designed to promote a short movie making competition with a cinematic visual style.",
		locationOrTool: "Adobe Photoshop",
		width: 1414,
		height: 2000,
	}
];

export default function Creative() {
	const [filter, setFilter] = useState<"all" | "uiux" | "graphics">("all");
	const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

	const filteredItems = GALLERY_ITEMS.filter((item) => {
		if (filter === "all") return true;
		return item.category === filter;
	});

	const openLightbox = (item: GalleryItem) => {
		setLightboxItem(item);
	};

	const closeLightbox = () => {
		setLightboxItem(null);
	};

	return (
		<PageWrapper>
			<div className="w-full flex flex-col items-center my-6">
				
				{/* Interactive Title Banner */}
				<div className="w-full relative h-[140px] md:h-[180px] mb-8 select-none overflow-hidden">
					<TextPressure
						text="SANDBOX"
						flex={true}
						alpha={false}
						stroke={false}
						width={true}
						weight={true}
						italic={true}
						textColor="var(--accent)"
						strokeColor="transparent"
						minFontSize={60}
					/>
				</div>

				{/* Header Info */}
				<div className="text-center max-w-2xl mb-10">
					<p className="text-sm opacity-80 leading-relaxed text-center">
						A curated collection of my visual outputs. Exploring the synergy between design systems and code through interface mockups, graphics, layouts, and typography.
					</p>
				</div>

				{/* Filter Buttons */}
				<div className="flex flex-wrap justify-center gap-2 mb-10 border-b border-[var(--text)] border-opacity-10 pb-6 w-full">
					{[
						{ id: "all" as const, label: "All Works" },
						{ id: "uiux" as const, label: "UI/UX Mockups" },
						{ id: "graphics" as const, label: "Graphic Design" },
					].map((btn) => (
						<button
							key={btn.id}
							onClick={() => setFilter(btn.id)}
							style={{
								borderColor:
									filter === btn.id ? "var(--accent)" : "transparent",
								backgroundColor:
									filter === btn.id
										? "rgba(var(--accent-rgb), 0.1)"
										: "transparent",
								color: filter === btn.id ? "var(--accent)" : "var(--text)",
							}}
							className="px-4 py-2 text-sm font-semibold rounded-full border hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:bg-opacity-5 transition-all duration-300 cursor-pointer">
							{btn.label}
						</button>
					))}
				</div>

				{/* Masonry Gallery Grid */}
				<div className="masonry-grid w-full">
					{filteredItems.map((item, index) => (
						<div
							key={item.id}
							onClick={() => openLightbox(item)}
							className="masonry-item group border border-[var(--text)] border-opacity-10 rounded-2xl overflow-hidden bg-[var(--text)] bg-opacity-[0.02] hover:border-[var(--accent)] hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer">
							{/* Image Container */}
							<div className="w-full overflow-hidden relative bg-neutral-900 flex items-center justify-center">
								<Image
									src={item.src}
									alt={item.title}
									width={item.width}
									height={item.height}
									className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-103"
									sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
									priority={index < 3}
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
									<span className="text-white text-xs font-mono">
										{item.locationOrTool}
									</span>
								</div>
							</div>

							{/* Details Container */}
							<div className="p-5 flex-grow flex flex-col justify-between">
								<div>
									<span className="text-[10px] font-mono text-[var(--accent)] uppercase tracking-wider font-bold block mb-1">
										{item.categoryLabel}
									</span>
									<h3 className="text-base font-bold leading-tight group-hover:text-[var(--accent)] transition-colors duration-200">
										{item.title}
									</h3>
									<p className="text-xs opacity-75 mt-2 mb-0">
										{item.description}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Empty State */}
				{filteredItems.length === 0 && (
					<div className="text-center py-20">
						<p className="text-lg opacity-70">
							No sandbox items found in this category.
						</p>
					</div>
				)}
			</div>

			{/* Lightbox Modal */}
			{lightboxItem && (
				<div
					onClick={closeLightbox}
					className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 transition-opacity duration-300">
					{/* Close Button */}
					<button
						onClick={closeLightbox}
						className="absolute top-6 right-6 text-white hover:text-[var(--accent)] text-4xl p-2 cursor-pointer transition-colors duration-200 font-normal"
						aria-label="Close lightbox">
						&times;
					</button>

					{/* Image & Details Container */}
					<div
						onClick={(e) => e.stopPropagation()}
						className="max-w-4xl w-full flex flex-col md:flex-row bg-[#121214] border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl">
						{/* Image */}
						<div className="flex-grow max-h-[70vh] bg-black flex items-center justify-center md:w-2/3 relative">
							<Image
								src={lightboxItem.src}
								alt={lightboxItem.title}
								width={lightboxItem.width}
								height={lightboxItem.height}
								className="max-w-full max-h-[70vh] object-contain w-auto h-auto"
								priority
							/>
						</div>

						{/* Details */}
						<div className="p-6 md:w-1/3 flex flex-col justify-between bg-[#161619] text-white border-t md:border-t-0 md:border-l border-neutral-800">
							<div>
								<span className="text-xs font-mono text-[var(--accent)] uppercase tracking-wider font-bold block mb-1">
									{lightboxItem.categoryLabel}
								</span>
								<h3 className="text-2xl font-bold leading-tight mb-3">
									{lightboxItem.title}
								</h3>
								<p className="text-sm opacity-80 leading-relaxed">
									{lightboxItem.description}
								</p>
							</div>
							<div className="mt-6 pt-4 border-t border-neutral-800 text-xs font-mono opacity-60">
								<div>Workspace Tool:</div>
								<div className="text-white mt-1">
									{lightboxItem.locationOrTool}
								</div>
								{lightboxItem.figma && (
									<div className="mt-4">
										<a
											href={lightboxItem.figma}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent)] hover:underline"
										>
											<i className="devicon-figma-plain text-xs" />
											<span>Open Figma Workspace</span>
										</a>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			)}
		</PageWrapper>
	);
}
"use client";

import React, { useState } from "react";
import Image from "next/image";
import PageWrapper from "../components/utility/pageWrapper";
import "../page.css";

interface GalleryItem {
	id: number | string;
	title: string;
	category: "photography" | "uiux" | "graphics";
	categoryLabel: string;
	src: string;
	description: string;
	locationOrTool: string;
	width: number;
	height: number;
	rotate?: boolean;
}

const GALLERY_ITEMS: GalleryItem[] = [
	{
		id: 1,
		title: "Bengaluru's Curious Cat",
		category: "photography",
		categoryLabel: "Street Photography",
		src: "/creative/photography/blr_cat.jpg",
		description:
			"A quiet moment with one of Bengaluru's many street cats, captured in its own little world.",
		locationOrTool: "Bengaluru • Mobile",
		width: 2000,
		height: 1125,
	},
	{
		id: 2,
		title: "A Second Glance",
		category: "photography",
		categoryLabel: "Street Photography",
		src: "/creative/photography/blr_cat.2.jpg",
		description:
			"Another candid frame of a city cat, highlighting everyday life hidden in plain sight.",
		locationOrTool: "Bengaluru • Mobile",
		width: 1125,
		height: 2000,
	},
	{
		id: 3,
		title: "The Silent Observer",
		category: "photography",
		categoryLabel: "Street Photography",
		src: "/creative/photography/blr_cat3.jpg",
		description:
			"A calm portrait capturing the quiet confidence and curiosity of an urban feline.",
		locationOrTool: "Bengaluru • Mobile",
		width: 2000,
		height: 1125,
	},
	{
		id: 4,
		title: "Campus Green",
		category: "photography",
		categoryLabel: "Nature Photography",
		src: "/creative/photography/clg_greenery.jpg",
		description:
			"A glimpse of lush greenery around campus, where everyday pathways meet unexpected calm.",
		locationOrTool: "Acharya Campus • Mobile",
		width: 1500,
		height: 2000,
	},
	{
		id: 5,
		title: "Lamp in the Evening",
		category: "photography",
		categoryLabel: "Urban Photography",
		src: "/creative/photography/clg_lightlamp.jpg",
		description:
			"A simple composition focused on light, atmosphere, and the quiet mood of campus evenings.",
		locationOrTool: "Acharya Campus • Mobile",
		width: 1125,
		height: 2000,
	},
	{
		id: 6,
		title: "Ancient Stonework",
		category: "photography",
		categoryLabel: "Architecture Photography",
		src: "/creative/photography/hampi_archi.jpg",
		description:
			"Exploring the timeless architectural beauty and intricate stone craftsmanship of Hampi.",
		locationOrTool: "Hampi • Mobile",
		width: 1125,
		height: 2000,
	},
	{
		id: 7,
		title: "Shoreline Escape",
		category: "photography",
		categoryLabel: "Landscape Photography",
		src: "/creative/photography/hampi_beach.jpg",
		description:
			"A peaceful landscape capturing open skies, water, and the serenity of nature.",
		locationOrTool: "Hampi • Mobile",
		width: 1125,
		height: 2000,
	},
	{
		id: 8,
		title: "Shared Memories",
		category: "photography",
		categoryLabel: "Travel Photography",
		src: "/creative/photography/hampi_grouppic.jpg",
		description:
			"A travel memory preserved with friends against the backdrop of a memorable journey.",
		locationOrTool: "Hampi • Mobile",
		width: 2000,
		height: 1500,
	},
	{
		id: 9,
		title: "Stone Deity",
		category: "photography",
		categoryLabel: "Heritage Photography",
		src: "/creative/photography/hampi_murti.jpg",
		description:
			"Capturing the artistic beauty and cultural significance of an ancient stone sculpture.",
		locationOrTool: "Hampi • Mobile",
		width: 1125,
		height: 2000,
	},
	{
		id: 10,
		title: "Above Hampi",
		category: "photography",
		categoryLabel: "Landscape Photography",
		src: "/creative/photography/hampi_top.jpg",
		description:
			"A panoramic perspective showcasing Hampi's iconic rocky terrain and expansive vistas.",
		locationOrTool: "Hampi • Mobile",
		width: 2000,
		height: 1457,
	},
	{
		id: 11,
		title: "Morning on the Water",
		category: "photography",
		categoryLabel: "Travel Photography",
		src: "/creative/photography/kolkata_boating.jpg",
		description:
			"A peaceful boating experience framed through soft light and gentle reflections.",
		locationOrTool: "Kolkata • Mobile",
		width: 1125,
		height: 2000,
	},
	{
		id: 12,
		title: "Journey Begins",
		category: "photography",
		categoryLabel: "Travel Photography",
		src: "/creative/photography/kolkata_otw_airport.jpg",
		description:
			"The excitement of departure captured somewhere between anticipation and adventure.",
		locationOrTool: "Kolkata Airport • Mobile",
		width: 1125,
		height: 2000,
	},
	{
		id: 13,
		title: "Waiting at the Platform",
		category: "photography",
		categoryLabel: "Street Photography",
		src: "/creative/photography/kolkata_otw_station.jpg",
		description:
			"A travel frame reflecting movement, stories, and the rhythm of railway stations.",
		locationOrTool: "Kolkata • Mobile",
		width: 2000,
		height: 1125,
	},
	{
		id: 14,
		title: "City Rhythms",
		category: "photography",
		categoryLabel: "Street Photography",
		src: "/creative/photography/kolkata_streets.jpg",
		description:
			"A candid slice of Kolkata's vibrant streets filled with everyday life and motion.",
		locationOrTool: "Kolkata • Mobile",
		width: 1500,
		height: 2000,
	},
	{
		id: 15,
		title: "Miles Ahead",
		category: "photography",
		categoryLabel: "Travel Photography",
		src: "/creative/photography/mumbai_otw.jpg",
		description:
			"A travel photograph capturing the feeling of being somewhere between destinations.",
		locationOrTool: "Mumbai • Mobile",
		width: 2000,
		height: 1125,
	},
	{
		id: 16,
		title: "Highway Horizons",
		category: "photography",
		categoryLabel: "Travel Photography",
		src: "/creative/photography/mumbai_otw_highway.jpg",
		description:
			"Long roads, changing skies, and the quiet beauty found through a highway window.",
		locationOrTool: "Mumbai • Mobile",
		width: 2000,
		height: 1125,
	},
	{
		id: 17,
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
		id: 18,
		title: "Short Film Competition Poster",
		category: "graphics",
		categoryLabel: "Poster Design",
		src: "/creative/designs/short movie making competition.png",
		description:
			"A creative event poster designed to promote a short movie making competition with a cinematic visual style.",
		locationOrTool: "Adobe Photoshop",
		width: 1414,
		height: 2000,
	},
	{
		id: 19,
		title: "VOIS Landing Page Mockup",
		category: "uiux",
		categoryLabel: "UI/UX Design",
		src: "/creative/uiux/vois_mockup_front.png",
		description:
			"A modern landing page concept created for a VOIS-themed web experience, emphasizing clean layouts and intuitive navigation.",
		locationOrTool: "Figma",
		width: 1916,
		height: 937,
	},
	{
		id: 20,
		title: "VOIS About Us Page",
		category: "uiux",
		categoryLabel: "UI/UX Design",
		src: "/creative/uiux/vois_mockup_aboutus_page.png",
		description:
			"An About Us page mockup designed to present company information with clarity, visual consistency, and strong information hierarchy.",
		locationOrTool: "Figma",
		width: 1916,
		height: 937,
	},
	{
		id: 21,
		title: "VOIS Contact Page",
		category: "uiux",
		categoryLabel: "UI/UX Design",
		src: "/creative/uiux/vois_mockup_contact_us_page.png",
		description:
			"A responsive contact page concept focused on accessibility, user-friendly forms, and a polished visual identity.",
		locationOrTool: "Figma",
		width: 1916,
		height: 937,
	}
];

const ARCHIVE_ITEMS: GalleryItem[] = [
	{ id: "a1", title: "Archive Frame #1", category: "photography", categoryLabel: "Archive", src: "/photos/1.jpg", description: "A daily frame from the personal visual archive collection.", locationOrTool: "Archive Collection", width: 800, height: 600 },
	{ id: "a4", title: "Archive Frame #4", category: "photography", categoryLabel: "Archive", src: "/photos/4.jpg", description: "A daily frame from the personal visual archive collection.", locationOrTool: "Archive Collection", width: 600, height: 800 },
	{ id: "a5", title: "Archive Frame #5", category: "photography", categoryLabel: "Archive", src: "/photos/5.jpg", description: "A daily frame from the personal visual archive collection.", locationOrTool: "Archive Collection", width: 600, height: 800 },
	{ id: "a6", title: "Archive Frame #6", category: "photography", categoryLabel: "Archive", src: "/photos/6.jpg", description: "A daily frame from the personal visual archive collection.", locationOrTool: "Archive Collection", width: 600, height: 800 },
	{ id: "a7", title: "Archive Frame #7", category: "photography", categoryLabel: "Archive", src: "/photos/7.jpg", description: "A daily frame from the personal visual archive collection.", locationOrTool: "Archive Collection", width: 600, height: 800 },
	{ id: "a8", title: "Archive Frame #8", category: "photography", categoryLabel: "Archive", src: "/photos/8.jpg", description: "A daily frame from the personal visual archive collection.", locationOrTool: "Archive Collection", width: 800, height: 600 },
	{ id: "a9", title: "Archive Frame #9", category: "photography", categoryLabel: "Archive", src: "/photos/9.jpg", description: "A daily frame from the personal visual archive collection.", locationOrTool: "Archive Collection", width: 600, height: 800 },
	{ id: "a10", title: "Archive Frame #10", category: "photography", categoryLabel: "Archive", src: "/photos/10.jpg", description: "A daily frame from the personal visual archive collection.", locationOrTool: "Archive Collection", width: 600, height: 800 },
	{ id: "a12", title: "Archive Frame #12", category: "photography", categoryLabel: "Archive", src: "/photos/12.jpg", description: "A daily frame from the personal visual archive collection.", locationOrTool: "Archive Collection", width: 600, height: 800 },
	{ id: "a13", title: "Archive Frame #13", category: "photography", categoryLabel: "Archive", src: "/photos/13.jpg", description: "A daily frame from the personal visual archive collection.", locationOrTool: "Archive Collection", width: 800, height: 600 },
	{ id: "a16", title: "Archive Frame #16", category: "photography", categoryLabel: "Archive", src: "/photos/16.jpg", description: "A daily frame from the personal visual archive collection.", locationOrTool: "Archive Collection", width: 600, height: 800 },
	{ id: "a17", title: "Archive Frame #17", category: "photography", categoryLabel: "Archive", src: "/photos/17.jpg", description: "A daily frame from the personal visual archive collection.", locationOrTool: "Archive Collection", width: 600, height: 800 },
	{ id: "a18", title: "Archive Frame #18", category: "photography", categoryLabel: "Archive", src: "/photos/18.jpg", description: "A daily frame from the personal visual archive collection.", locationOrTool: "Archive Collection", width: 800, height: 600 },
	{ id: "a20", title: "Archive Frame #20", category: "photography", categoryLabel: "Archive", src: "/photos/20.jpg", description: "A daily frame from the personal visual archive collection.", locationOrTool: "Archive Collection", width: 600, height: 800 },
	{ id: "a21", title: "Archive Frame #21", category: "photography", categoryLabel: "Archive", src: "/photos/21.jpg", description: "A daily frame from the personal visual archive collection.", locationOrTool: "Archive Collection", width: 600, height: 800 },
	{ id: "a22", title: "Archive Frame #22", category: "photography", categoryLabel: "Archive", src: "/photos/22.jpg", description: "A daily frame from the personal visual archive collection.", locationOrTool: "Archive Collection", width: 600, height: 800 },
	{ id: "a23", title: "Archive Frame #23", category: "photography", categoryLabel: "Archive", src: "/photos/23.jpg", description: "A daily frame from the personal visual archive collection.", locationOrTool: "Archive Collection", width: 600, height: 800, rotate: true },
	{ id: "a24", title: "Archive Frame #24", category: "photography", categoryLabel: "Archive", src: "/photos/24.jpg", description: "A daily frame from the personal visual archive collection.", locationOrTool: "Archive Collection", width: 600, height: 800 },
	{ id: "a25", title: "Archive Frame #25", category: "photography", categoryLabel: "Archive", src: "/photos/25.jpg", description: "A daily frame from the personal visual archive collection.", locationOrTool: "Archive Collection", width: 600, height: 800 },
	{ id: "a26", title: "Archive Frame #26", category: "photography", categoryLabel: "Archive", src: "/photos/26.jpg", description: "A daily frame from the personal visual archive collection.", locationOrTool: "Archive Collection", width: 600, height: 800 },
	{ id: "a27", title: "Archive Frame #27", category: "photography", categoryLabel: "Archive", src: "/photos/27.jpg", description: "A daily frame from the personal visual archive collection.", locationOrTool: "Archive Collection", width: 600, height: 800 },
	{ id: "a28", title: "Archive Frame #28", category: "photography", categoryLabel: "Archive", src: "/photos/28.jpg", description: "A daily frame from the personal visual archive collection.", locationOrTool: "Archive Collection", width: 600, height: 800 },
	{ id: "a29", title: "Archive Frame #29", category: "photography", categoryLabel: "Archive", src: "/photos/29.jpg", description: "A daily frame from the personal visual archive collection.", locationOrTool: "Archive Collection", width: 800, height: 600 },
	{ id: "a30", title: "Archive Frame #30", category: "photography", categoryLabel: "Archive", src: "/photos/30.jpg", description: "A daily frame from the personal visual archive collection.", locationOrTool: "Archive Collection", width: 600, height: 800 },
	{ id: "a31", title: "Archive Frame #31", category: "photography", categoryLabel: "Archive", src: "/photos/31.jpg", description: "A daily frame from the personal visual archive collection.", locationOrTool: "Archive Collection", width: 600, height: 800 },
	{ id: "a32", title: "Archive Frame #32", category: "photography", categoryLabel: "Archive", src: "/photos/32.jpg", description: "A daily frame from the personal visual archive collection.", locationOrTool: "Archive Collection", width: 600, height: 800 },
	{ id: "a33", title: "Archive Frame #33", category: "photography", categoryLabel: "Archive", src: "/photos/33.jpg", description: "A daily frame from the personal visual archive collection.", locationOrTool: "Archive Collection", width: 800, height: 600 },
	{ id: "a34", title: "Archive Frame #34", category: "photography", categoryLabel: "Archive", src: "/photos/34.jpg", description: "A daily frame from the personal visual archive collection.", locationOrTool: "Archive Collection", width: 600, height: 800 },
	{ id: "a35", title: "Archive Frame #35", category: "photography", categoryLabel: "Archive", src: "/photos/35.jpg", description: "A daily frame from the personal visual archive collection.", locationOrTool: "Archive Collection", width: 800, height: 600 },
	{ id: "a36", title: "Archive Frame #36", category: "photography", categoryLabel: "Archive", src: "/photos/36.jpg", description: "A daily frame from the personal visual archive collection.", locationOrTool: "Archive Collection", width: 600, height: 800 },
	{ id: "a37", title: "Archive Frame #37", category: "photography", categoryLabel: "Archive", src: "/photos/37.jpg", description: "A daily frame from the personal visual archive collection.", locationOrTool: "Archive Collection", width: 600, height: 800 },
	{ id: "a38", title: "Archive Frame #38", category: "photography", categoryLabel: "Archive", src: "/photos/38.jpg", description: "A daily frame from the personal visual archive collection.", locationOrTool: "Archive Collection", width: 800, height: 600 },
	{ id: "a39", title: "Archive Frame #39", category: "photography", categoryLabel: "Archive", src: "/photos/39.jpg", description: "A daily frame from the personal visual archive collection.", locationOrTool: "Archive Collection", width: 800, height: 600 },
	{ id: "a40", title: "Archive Frame #40", category: "photography", categoryLabel: "Archive", src: "/photos/40.jpg", description: "A daily frame from the personal visual archive collection.", locationOrTool: "Archive Collection", width: 800, height: 600 },
	{ id: "a41", title: "Archive Frame #41", category: "photography", categoryLabel: "Archive", src: "/photos/41.jpg", description: "A daily frame from the personal visual archive collection.", locationOrTool: "Archive Collection", width: 600, height: 800 },
	{ id: "a42", title: "Archive Frame #42", category: "photography", categoryLabel: "Archive", src: "/photos/42.png", description: "A daily frame from the personal visual archive collection.", locationOrTool: "Archive Collection", width: 800, height: 600 }
];

export default function Photography() {
	const [filter, setFilter] = useState<
		"all" | "photography" | "uiux" | "graphics"
	>("all");
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

	// Split archive items into 3 columns
	const col1 = ARCHIVE_ITEMS.filter((_, idx) => idx % 3 === 0);
	const col2 = ARCHIVE_ITEMS.filter((_, idx) => idx % 3 === 1);
	const col3 = ARCHIVE_ITEMS.filter((_, idx) => idx % 3 === 2);

	return (
		<PageWrapper>
			<div className="w-full px-4 sm:px-8 md:px-12 flex flex-col items-center my-10">
				{/* Header */}
				<div className="text-center max-w-2xl mb-10">
					<span className="text-xs font-mono uppercase tracking-wider text-[var(--accent)] font-semibold mb-1 block">
						creative gallery
					</span>
					<h2 className="text-4xl font-extrabold tracking-tight mb-4 text-center">
						Photography & Designs
					</h2>
					<p className="text-sm opacity-80 leading-relaxed text-center">
						A curation of my creative outlet. From street frames capturing
						life around Bengaluru to digital graphic layouts, branding, and
						interactive UI/UX interfaces.
					</p>
				</div>

				{/* Filter Buttons */}
				<div className="flex flex-wrap justify-center gap-2 mb-10 border-b border-[var(--text)] border-opacity-10 pb-6 w-full">
					{[
						{ id: "all" as const, label: "All Works" },
						{ id: "photography" as const, label: "Photography" },
						{ id: "graphics" as const, label: "Designs" },
						{ id: "uiux" as const, label: "UI/UX Mockups" },
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
									className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
									sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
									priority={index < 4}
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
									<span className="text-white text-xs font-mono">
										{item.locationOrTool}
									</span>
								</div>
							</div>

							{/* Details Container */}
							<div className="p-4 flex-grow flex flex-col justify-between">
								<div>
									<span className="text-[10px] font-mono text-[var(--accent)] uppercase tracking-wider font-bold block mb-1">
										{item.categoryLabel}
									</span>
									<h3 className="text-base font-bold leading-tight group-hover:text-[var(--accent)] transition-colors duration-200">
										{item.title}
									</h3>
								</div>
								<p className="text-xs opacity-75 mt-2 text-[var(--bg)]">
									{item.description}
								</p>
							</div>
						</div>
					))}
				</div>

				{/* Empty State */}
				{filteredItems.length === 0 && (
					<div className="text-center py-20">
						<p className="text-lg opacity-70">
							No items found in this category.
						</p>
					</div>
				)}

				{/* Personal Archive Grid Section */}
				{(filter === "all" || filter === "photography") && (
					<div className="w-full mt-20 flex flex-col items-center">
						{/* Section Header */}
						<div className="text-center max-w-2xl mx-auto mb-10">
							<span className="text-xs font-mono uppercase tracking-wider text-[var(--accent)] font-semibold mb-1 block">
								personal archives
							</span>
							<h2 className="text-3xl font-extrabold tracking-tight mb-4 text-center">
								Captured Moments
							</h2>
							<p className="text-sm opacity-80 leading-relaxed text-center">
								A continuous stream of daily frames, street snapshots, and travel chronicles.
							</p>
						</div>

						{/* The Grid Container */}
						<div className="relative z-10 w-full archive-grid">
							{/* Column 1 */}
							<div className="archive-col">
								{col1.map((item) => (
									<div 
										key={item.id} 
										onClick={() => openLightbox(item)}
										className="archive-item group relative overflow-hidden rounded-xl cursor-pointer"
									>
										<Image
											src={item.src}
											alt={item.title}
											width={item.width}
											height={item.height}
											className="archive-item-img"
											sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
										/>
									</div>
								))}
							</div>

							{/* Column 2 */}
							<div className="archive-col">
								{col2.map((item) => (
									<div 
										key={item.id} 
										onClick={() => openLightbox(item)}
										className="archive-item group relative overflow-hidden rounded-xl cursor-pointer"
									>
										<Image
											src={item.src}
											alt={item.title}
											width={item.width}
											height={item.height}
											style={{ transform: item.rotate ? "rotate(180deg)" : undefined }}
											className="archive-item-img"
											sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
										/>
									</div>
								))}
							</div>

							{/* Column 3 */}
							<div className="archive-col">
								{col3.map((item) => (
									<div 
										key={item.id} 
										onClick={() => openLightbox(item)}
										className="archive-item group relative overflow-hidden rounded-xl cursor-pointer"
									>
										<Image
											src={item.src}
											alt={item.title}
											width={item.width}
											height={item.height}
											className="archive-item-img"
											sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
										/>
									</div>
								))}
							</div>
						</div>
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
						className="absolute top-6 right-6 text-white hover:text-[var(--accent)] text-4xl p-2 cursor-pointer transition-colors duration-200"
						aria-label="Close lightbox">
						&times;
					</button>

					{/* Image & Details Container */}
					<div
						onClick={(e) => e.stopPropagation()}
						className="max-w-4xl w-full flex flex-col md:flex-row bg-[#121212] border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl">
						{/* Image */}
						<div className="flex-grow max-h-[70vh] bg-black flex items-center justify-center md:w-2/3 relative">
							<Image
								src={lightboxItem.src}
								alt={lightboxItem.title}
								width={lightboxItem.width}
								height={lightboxItem.height}
								style={{ transform: lightboxItem.rotate ? "rotate(180deg)" : undefined }}
								className="max-w-full max-h-[70vh] object-contain w-auto h-auto"
								priority
							/>
						</div>

						{/* Details */}
						<div className="p-6 md:w-1/3 flex flex-col justify-between bg-[#161616] text-white border-t md:border-t-0 md:border-l border-neutral-800">
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
								<div>Source / Gear:</div>
								<div className="text-white mt-1">
									{lightboxItem.locationOrTool}
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</PageWrapper>
	);
}

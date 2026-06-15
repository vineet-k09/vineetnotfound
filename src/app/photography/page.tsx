'use client'

import React, { useState } from 'react';
import PageWrapper from '../components/utility/pageWrapper';
import '../page.css';

interface GalleryItem {
    id: number;
    title: string;
    category: 'photography' | 'graphics' | 'uiux';
    categoryLabel: string;
    src: string;
    description: string;
    locationOrTool: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
    {
        id: 1,
        title: "Chasing Bengaluru Lights",
        category: "photography",
        categoryLabel: "Street Photography",
        src: "/creative/photography/street.jpg",
        description: "Capturing the evening light trail and neon silhouettes in the busy streets of Bengaluru.",
        locationOrTool: "Bengaluru, DSLR • 50mm"
    },
    {
        id: 2,
        title: "Minimalist Geometry",
        category: "graphics",
        categoryLabel: "Graphic Design",
        src: "/creative/designs/geometric.jpg",
        description: "An exploration of abstract composition, flat colors, and geometric depth.",
        locationOrTool: "Adobe Illustrator"
    },
    {
        id: 3,
        title: "Shadows of Concrete",
        category: "photography",
        categoryLabel: "Architecture Photography",
        src: "/creative/photography/concrete.jpg",
        description: "Focusing on sharp architectural angles, brutalist lines, and deep shadow contrast.",
        locationOrTool: "Acharya Campus, Mobile"
    },
    {
        id: 4,
        title: "Modern Dashboard UI/UX",
        category: "uiux",
        categoryLabel: "UI/UX Design",
        src: "/creative/uiux/dashboard.jpg",
        description: "A clean, dark-mode data analytics dashboard optimized for widgets and readability.",
        locationOrTool: "Figma"
    },
    {
        id: 5,
        title: "Sleek Branding Layout",
        category: "graphics",
        categoryLabel: "Graphic Design",
        src: "/creative/designs/branding.jpg",
        description: "Visual identity guidelines featuring gold accents, organic curves, and rich palettes.",
        locationOrTool: "Illustrator & Photoshop"
    },
    {
        id: 6,
        title: "Mobile Wallet Concept",
        category: "uiux",
        categoryLabel: "UI/UX Design",
        src: "/creative/uiux/mobile_wallet.jpg",
        description: "A fintech mobile app design highlighting glassmorphism cards and micro-interactions.",
        locationOrTool: "Figma & After Effects"
    },
    {
        id: 7,
        title: "Golden Hour Glow",
        category: "photography",
        categoryLabel: "Fine Art Photography",
        src: "/creative/photography/golden_hour.jpg",
        description: "Capturing light refraction through glass elements during sunset, creating warm gradients.",
        locationOrTool: "Bengaluru, 85mm"
    },
    {
        id: 8,
        title: "Poster Series - Cyberpunk Vibe",
        category: "graphics",
        categoryLabel: "Poster Design",
        src: "/creative/designs/cyberpunk_poster.jpg",
        description: "Experimental typography layout mixing bold kanji, neon outlines, and textured paper effects.",
        locationOrTool: "Photoshop & InDesign"
    }
];

export default function Photography() {
    const [filter, setFilter] = useState<'all' | 'photography' | 'graphics' | 'uiux'>('all');
    const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

    const filteredItems = GALLERY_ITEMS.filter(item => {
        if (filter === 'all') return true;
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
            <div className="grid-layout">
                <div className="content-area sm:px-10 flex flex-col items-center my-10 w-full">
                    
                    {/* Header */}
                    <div className="text-center max-w-2xl mb-10">
                        <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent)] font-semibold mb-1 block">creative gallery</span>
                        <h2 className="text-4xl font-extrabold tracking-tight mb-4 text-center">
                            Photography & Designs
                        </h2>
                        <p className="text-sm opacity-80 leading-relaxed">
                            A curation of my creative outlet. From street frames capturing life around Bengaluru to digital graphic layouts, branding, and interactive UI/UX interfaces.
                        </p>
                    </div>

                    {/* Filter Buttons */}
                    <div className="flex flex-wrap justify-center gap-2 mb-10 border-b border-[var(--text)] border-opacity-10 pb-6 w-full">
                        {[
                            { id: 'all' as const, label: 'All Works' },
                            { id: 'photography' as const, label: 'Photography' },
                            { id: 'graphics' as const, label: 'Branding & Graphics' },
                            { id: 'uiux' as const, label: 'UI/UX Mockups' }
                        ].map((btn) => (
                            <button
                                key={btn.id}
                                onClick={() => setFilter(btn.id)}
                                style={{
                                    borderColor: filter === btn.id ? 'var(--accent)' : 'transparent',
                                    backgroundColor: filter === btn.id ? 'rgba(var(--accent-rgb), 0.1)' : 'transparent',
                                    color: filter === btn.id ? 'var(--accent)' : 'var(--text)'
                                }}
                                className="px-4 py-2 text-sm font-semibold rounded-full border hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:bg-opacity-5 transition-all duration-300 cursor-pointer"
                            >
                                {btn.label}
                            </button>
                        ))}
                    </div>

                    {/* Masonry Gallery Grid */}
                    <div className="masonry-grid w-full">
                        {filteredItems.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => openLightbox(item)}
                                className="masonry-item group border border-[var(--text)] border-opacity-10 rounded-2xl overflow-hidden bg-[var(--text)] bg-opacity-[0.02] hover:border-[var(--accent)] hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer"
                            >
                                {/* Image Container */}
                                <div className="w-full overflow-hidden relative bg-neutral-900 flex items-center justify-center">
                                    <img 
                                        src={item.src}
                                        alt={item.title}
                                        className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                        <span className="text-white text-xs font-mono">{item.locationOrTool}</span>
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
                                    <p className="text-xs opacity-75 mt-2">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredItems.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-lg opacity-70">No items found in this category.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Lightbox Modal */}
            {lightboxItem && (
                <div
                    onClick={closeLightbox}
                    className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 transition-opacity duration-300"
                >
                    {/* Close Button */}
                    <button
                        onClick={closeLightbox}
                        className="absolute top-6 right-6 text-white hover:text-[var(--accent)] text-4xl p-2 cursor-pointer transition-colors duration-200"
                        aria-label="Close lightbox"
                    >
                        &times;
                    </button>

                    {/* Image & Details Container */}
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="max-w-4xl w-full flex flex-col md:flex-row bg-[#121212] border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl"
                    >
                        {/* Image */}
                        <div className="flex-grow max-h-[70vh] bg-black flex items-center justify-center md:w-2/3">
                            <img
                                src={lightboxItem.src}
                                alt={lightboxItem.title}
                                className="max-w-full max-h-[70vh] object-contain"
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
                                <div className="text-white mt-1">{lightboxItem.locationOrTool}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </PageWrapper>
    );
}

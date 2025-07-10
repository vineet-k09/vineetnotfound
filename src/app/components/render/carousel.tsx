'use client'
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function ProjectCarousel({ images = [] }: { images: string[] }) {
    const [current, setCurrent] = useState(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const IMAGE_WIDTH = 500; // px
    const GAP = 24; // px between images
    const VISIBLE_PART = 150; // px of second image visible

    useEffect(() => {
        const nextSlide = () => {
            setCurrent(prev => (prev + 1) % images.length);
        };
        timeoutRef.current = setTimeout(nextSlide, 5500);
        return () => clearTimeout(timeoutRef.current as NodeJS.Timeout);
    }, [current, images.length]);

    if (!images.length) return (
        <></>
    )
    return (
        <div className="overflow-hidden relative" style={{ width: IMAGE_WIDTH + VISIBLE_PART }}>
            <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{
                    transform: `translateX(-${current * (IMAGE_WIDTH + GAP)}px)`,
                    gap: `${GAP}px`,
                }}
            >
                {images.concat(images[0]).map((src, i) => (
                    <div
                        key={i}
                        id= {i.toString()}
                        className="relative shrink-0 rounded-xl overflow-hidden"
                        style={{
                            width: IMAGE_WIDTH,
                            height: 300,
                            flex: `0 0 ${IMAGE_WIDTH}px`,
                            // objectFit: 'cover',
                        }}
                    >
                        <Image
                            src={src}
                            alt={`Screenshot ${i + 1}`}
                            layout="fill"
                            className="rounded-xl object-cover "
                            quality={99}
                        />
                    </div>
                ))}
            </div>

            {/* Fade on right */}
            <div className="pointer-events-none absolute top-0 right-0 h-full w-[80px] bg-gradient-to-l from-[var(--text)] to-transparent z-10" />
        </div>
    );
}

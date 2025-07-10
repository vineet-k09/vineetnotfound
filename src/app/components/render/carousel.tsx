'use client'
import '../../page.css'
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
                        className="relative shrink-0 rounded-xl overflow-hidden w-[80vw] sm:w-[30vw] h-[300px] md:h-[300px] sm:h-[350px] flex-none"
                    >
                        <Image
                            src={src}
                            alt={`Screenshot ${i + 1}`}
                            layout="fill"
                            className="rounded-xl sm:object-cover"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

"use client";
import "../../page.css";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function ProjectCarousel({ images = [] }: { images: string[] }) {
	const [current, setCurrent] = useState(0);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		const nextSlide = () => {
			setCurrent((prev) => (prev + 1) % images.length);
		};
		timeoutRef.current = setTimeout(nextSlide, 5500);
		return () => clearTimeout(timeoutRef.current as NodeJS.Timeout);
	}, [current, images.length]);

	if (!images.length) return <></>;
	return (
		<div className="overflow-hidden relative w-full h-[300px] md:h-[300px] sm:h-[350px]">
			<div
				className="flex transition-transform duration-700 ease-in-out h-full"
				style={{
					transform: `translateX(-${current * 100}%)`,
				}}>
				{images.map((src, i) => (
					<div
						key={i}
						className="relative w-full h-full shrink-0">
						<Image
							src={src}
							alt={`Screenshot ${i + 1}`}
							fill
							sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
							className="object-cover"
						/>
					</div>
				))}
			</div>
		</div>
	);
}

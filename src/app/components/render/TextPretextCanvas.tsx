"use client";

import React, { useEffect, useRef, useState } from "react";

interface Word {
	text: string;
	x: number;
	y: number;
	baseX: number;
	baseY: number;
	vx: number;
	vy: number;
	width: number;
}

interface TextPretextCanvasProps {
	initialText?: string;
	height?: number;
	fontSize?: number;
	lineHeight?: number;
	repelRadius?: number;
	showControls?: boolean;
	className?: string;
}

const DEFAULT_PRESETS = [
	`Mike had the rest of his life to figure things out, though he didn’t know it yet. For now, he just kept walking, like most people do. Not because he had a plan, but because stopping felt worse.`,
	`Engineering scalable APIs, containerized microservices, and generative AI pipelines. Peering behind pixels to build intention-driven backend infrastructure and zero-latency real-time systems.`,
	`Between pixels and Python, building things—apps, ideas, systems—isn't just about logic, it's about craft, precision, and performance.`,
];

export default function TextPretextCanvas({
	initialText = DEFAULT_PRESETS[1],
	height = 260,
	fontSize = 20,
	lineHeight = 34,
	repelRadius = 110,
	showControls = true,
	className = "",
}: TextPretextCanvasProps) {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const containerRef = useRef<HTMLDivElement | null>(null);
	const [text, setText] = useState<string>(initialText);
	const [presetIndex, setPresetIndex] = useState<number>(1);
	const [isHovered, setIsHovered] = useState<boolean>(false);
	const [mousePos, setMousePos] = useState<{ x: number; y: number }>({
		x: -9999,
		y: -9999,
	});

	const wordsRef = useRef<Word[]>([]);
	const animationFrameRef = useRef<number | null>(null);
	const mouseRef = useRef<{ x: number; y: number }>({ x: -9999, y: -9999 });

	// Compute word positions on resize or text change
	const recalculateWordPositions = React.useCallback(() => {
		const canvas = canvasRef.current;
		const container = containerRef.current;
		if (!canvas || !container) return;

		const rect = container.getBoundingClientRect();
		const dpr = window.devicePixelRatio || 1;
		const width = rect.width;

		canvas.width = width * dpr;
		canvas.height = height * dpr;
		canvas.style.width = `${width}px`;
		canvas.style.height = `${height}px`;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		ctx.scale(dpr, dpr);
		ctx.font = `600 ${fontSize}px var(--font-geist-mono), system-ui, -apple-system, sans-serif`;

		const rawWords = text.split(/\s+/).filter(Boolean);
		const newWords: Word[] = [];

		const paddingX = 24;
		const paddingY = 40;
		const maxWidth = width - paddingX * 2;

		let curX = paddingX;
		let curY = paddingY;

		const spaceWidth = ctx.measureText(" ").width;

		rawWords.forEach((w) => {
			const metrics = ctx.measureText(w);
			const wordW = metrics.width;

			if (curX + wordW > paddingX + maxWidth && curX > paddingX) {
				curX = paddingX;
				curY += lineHeight;
			}

			newWords.push({
				text: w,
				x: curX,
				y: curY,
				baseX: curX,
				baseY: curY,
				vx: 0,
				vy: 0,
				width: wordW,
			});

			curX += wordW + spaceWidth * 1.1;
		});

		wordsRef.current = newWords;
	}, [text, height, fontSize, lineHeight]);

	// Mouse / Touch handlers
	useEffect(() => {
		mouseRef.current = mousePos;
	}, [mousePos]);

	useEffect(() => {
		recalculateWordPositions();
		const handleResize = () => recalculateWordPositions();
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [recalculateWordPositions]);

	// Animation Loop
	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const dpr = window.devicePixelRatio || 1;

		let active = true;

		const render = () => {
			if (!active) return;

			ctx.save();
			ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

			// Read current accent / text color from CSS
			const computedStyle = getComputedStyle(document.documentElement);
			const accentColor = computedStyle.getPropertyValue("--accent").trim() || "#3b82f6";
			const textColor = computedStyle.getPropertyValue("--text").trim() || "#e5e7eb";

			ctx.font = `600 ${fontSize}px var(--font-geist-mono), system-ui, -apple-system, sans-serif`;
			ctx.textBaseline = "alphabetic";

			const mouse = mouseRef.current;
			const words = wordsRef.current;

			words.forEach((word) => {
				// Spring back to base position
				const dx = word.baseX - word.x;
				const dy = word.baseY - word.y;

				word.vx += dx * 0.035;
				word.vy += dy * 0.035;

				// Repel from mouse
				const mx = word.x + word.width / 2 - mouse.x;
				const my = word.y - fontSize / 3 - mouse.y;
				const dist = Math.sqrt(mx * mx + my * my);

				if (dist < repelRadius && dist > 0) {
					const force = (repelRadius - dist) / repelRadius;
					const pushX = (mx / dist) * force * 4.5;
					const pushY = (my / dist) * force * 4.5;

					word.vx += pushX;
					word.vy += pushY;
				}

				// Damping friction
				word.vx *= 0.86;
				word.vy *= 0.86;

				word.x += word.vx;
				word.y += word.vy;

				// Compute highlight color when word is disturbed
				const displacement = Math.sqrt(
					(word.x - word.baseX) ** 2 + (word.y - word.baseY) ** 2
				);

				if (displacement > 4) {
					ctx.fillStyle = accentColor;
				} else {
					ctx.fillStyle = textColor;
				}

				ctx.fillText(word.text, word.x, word.y);
			});

			ctx.restore();
			animationFrameRef.current = requestAnimationFrame(render);
		};

		render();

		return () => {
			active = false;
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current);
			}
		};
	}, [fontSize, repelRadius]);

	const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const rect = canvas.getBoundingClientRect();
		setMousePos({
			x: e.clientX - rect.left,
			y: e.clientY - rect.top,
		});
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setMousePos({ x: -9999, y: -9999 });
		setIsHovered(false);
	};

	const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
		const canvas = canvasRef.current;
		if (!canvas || e.touches.length === 0) return;
		const rect = canvas.getBoundingClientRect();
		setMousePos({
			x: e.touches[0].clientX - rect.left,
			y: e.touches[0].clientY - rect.top,
		});
		setIsHovered(true);
	};

	const cyclePreset = () => {
		const nextIdx = (presetIndex + 1) % DEFAULT_PRESETS.length;
		setPresetIndex(nextIdx);
		setText(DEFAULT_PRESETS[nextIdx]);
	};

	if (!showControls) {
		return (
			<div ref={containerRef} className={`relative w-full overflow-hidden ${className}`}>
				<canvas
					ref={canvasRef}
					onMouseMove={handleMouseMove}
					onMouseLeave={handleMouseLeave}
					onTouchMove={handleTouchMove}
					onTouchEnd={handleMouseLeave}
					className="block w-full cursor-pointer touch-none select-none"
				/>
			</div>
		);
	}

	return (
		<div
			ref={containerRef}
			className={`relative w-full rounded-2xl overflow-hidden border border-[var(--text)] border-opacity-10 bg-[var(--card-bg)] transition-all duration-300 ${className}`}>
			{/* Canvas Top Bar / Info */}
			<div className="flex items-center justify-between px-5 py-3 border-b border-[var(--text)] border-opacity-10 bg-[var(--bg)] bg-opacity-40">
				<div className="flex items-center gap-2">
					<span className="inline-block w-2.5 h-2.5 rounded-full bg-[var(--accent)] animate-pulse" />
					<span className="text-xs font-mono font-bold tracking-wider uppercase text-[var(--accent)]">
						TEXT-PRETEXT // CANVAS PHYSICS
					</span>
				</div>
				<div className="flex items-center gap-3">
					<button
						onClick={cyclePreset}
						className="text-xs font-mono px-2.5 py-1 rounded-lg border border-[var(--accent)] border-opacity-30 text-[var(--text)] hover:bg-[var(--accent)] hover:text-[var(--bg)] transition-all duration-200 cursor-pointer">
						Switch Preset ↻
					</button>
				</div>
			</div>

			{/* Canvas Surface */}
			<div className="relative">
				<canvas
					ref={canvasRef}
					onMouseMove={handleMouseMove}
					onMouseLeave={handleMouseLeave}
					onTouchMove={handleTouchMove}
					onTouchEnd={handleMouseLeave}
					className="block w-full cursor-crosshair touch-none select-none"
				/>

				{!isHovered && (
					<div className="absolute bottom-3 right-4 pointer-events-none text-[10px] font-mono text-[var(--accent)] opacity-60">
						✦ Hover or drag cursor over text
					</div>
				)}
			</div>
		</div>
	);
}

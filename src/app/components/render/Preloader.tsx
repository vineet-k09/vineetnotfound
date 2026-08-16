"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface PreloaderProps {
	onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
	const [text, setText] = useState("");
	const [isFinished, setIsFinished] = useState(false);
	const [destroyPreloader, setDestroyPreloader] = useState(false);

	useEffect(() => {
		let isMounted = true;

		// Ultra-fast, fluid sequence (~2.2s text sequence + 0.4s reveal = ~2.6s total)
		const steps = [
			{ text: "vineet kushwaha", typeSpeed: 25, hold: 200, eraseSpeed: 10, pause: 80 },
			{ text: "loading awesomeness", typeSpeed: 20, hold: 240, eraseSpeed: 10, pause: 80 },
		];

		const runSequence = async () => {
			for (const step of steps) {
				const str = step.text;
				// Type
				for (let i = 0; i <= str.length; i++) {
					if (!isMounted) return;
					setText(str.substring(0, i));
					await new Promise((r) => setTimeout(r, step.typeSpeed));
				}
				// Hold
				await new Promise((r) => setTimeout(r, step.hold));
				// Erase
				for (let i = str.length; i >= 0; i--) {
					if (!isMounted) return;
					setText(str.substring(0, i));
					await new Promise((r) => setTimeout(r, step.eraseSpeed));
				}
				// Pause
				await new Promise((r) => setTimeout(r, step.pause));
			}

			if (isMounted) {
				setIsFinished(true);
			}
		};

		runSequence();

		return () => {
			isMounted = false;
		};
	}, []);

	// Lock scroll when preloader is active
	useEffect(() => {
		if (!destroyPreloader) {
			document.body.style.overflow = "hidden";
			window.scrollTo(0, 0);
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [destroyPreloader]);

	if (destroyPreloader) return null;

	return (
		<motion.div
			className="fixed inset-0 z-[9999] bg-black flex items-center justify-center pointer-events-auto select-none overflow-hidden"
			initial={{ clipPath: "circle(150% at 50% 50%)" }}
			animate={isFinished ? { clipPath: "circle(0% at 50% 50%)" } : { clipPath: "circle(150% at 50% 50%)" }}
			transition={{
				duration: 0.45,
				ease: [0.76, 0, 0.24, 1],
			}}
			onAnimationComplete={() => {
				if (isFinished) {
					setDestroyPreloader(true);
					if (onComplete) onComplete();
				}
			}}
		>
			{/* Terminal Text Center (Only visible when not finished) */}
			{!isFinished && (
				<div className="relative z-[10000] font-pixelated text-neutral-100 text-3xl sm:text-4xl md:text-6xl tracking-wider text-center px-4 flex items-center justify-center">
					<span className="opacity-40 text-neutral-400 mr-2 sm:mr-3 select-none">
						$
					</span>
					<span>{text}</span>
					<span className="inline-block w-3.5 h-8 sm:w-4.5 sm:h-11 md:w-5 md:h-14 bg-neutral-100 ml-1.5 align-middle animate-preloader-blink shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
				</div>
			)}
		</motion.div>
	);
}

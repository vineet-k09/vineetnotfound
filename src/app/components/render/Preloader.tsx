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

		// Typing and erasing sequence optimized for readability and a total of ~3 seconds
		const runSequence = async () => {
			// 1. "vineet kushwaha"
			const text1 = "vineet kushwaha";
			for (let i = 0; i <= text1.length; i++) {
				if (!isMounted) return;
				setText(text1.substring(0, i));
				await new Promise((r) => setTimeout(r, 45));
			}
			await new Promise((r) => setTimeout(r, 450));
			for (let i = text1.length; i >= 0; i--) {
				if (!isMounted) return;
				setText(text1.substring(0, i));
				await new Promise((r) => setTimeout(r, 20));
			}
			await new Promise((r) => setTimeout(r, 200));

			// 2. "loading awesomeness"
			const text2 = "loading awesomeness";
			for (let i = 0; i <= text2.length; i++) {
				if (!isMounted) return;
				setText(text2.substring(0, i));
				await new Promise((r) => setTimeout(r, 40));
			}
			await new Promise((r) => setTimeout(r, 450));
			for (let i = text2.length; i >= 0; i--) {
				if (!isMounted) return;
				setText(text2.substring(0, i));
				await new Promise((r) => setTimeout(r, 15));
			}
			await new Promise((r) => setTimeout(r, 250));

			if (isMounted) {
				setIsFinished(true);
			}
		};

		runSequence();

		return () => {
			isMounted = false;
		};
	}, []);

	// Prevent scroll when preloader is active
	useEffect(() => {
		if (!destroyPreloader) {
			document.body.style.overflow = "hidden";
			// Force scroll to top during loading
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
		<div className="fixed inset-0 z-[9999] flex items-center justify-center bg-transparent pointer-events-none select-none">
			{/* Inject VT323 font and blink keyframes style dynamically */}
			<style
				dangerouslySetInnerHTML={{
					__html: `
        @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');
        @keyframes preloaderBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-preloader-blink {
          animation: preloaderBlink 0.8s step-end infinite;
        }
        .font-pixelated {
          font-family: 'VT323', monospace;
          text-shadow: 0 0 6px rgba(255, 255, 255, 0.4);
        }
      `,
				}}
			/>

			{/* SVG Mask Container */}
			<svg className="absolute inset-0 w-full h-full pointer-events-auto">
				<defs>
					<mask id="preloader-mask">
						{/* White parts of mask are visible */}
						<rect x="0" y="0" width="100%" height="100%" fill="white" />
						{/* Black circle cuts a hole in the mask */}
						<motion.circle
							cx="50%"
							cy="50%"
							initial={{ r: "0%" }}
							animate={isFinished ? { r: "150%" } : { r: "0%" }}
							transition={{
								duration: 0.7,
								ease: [0.76, 0, 0.24, 1],
							}}
							onAnimationComplete={() => {
								if (isFinished) {
									setDestroyPreloader(true);
									if (onComplete) onComplete();
								}
							}}
							fill="black"
						/>
					</mask>
				</defs>
				{/* The solid black screen using the mask */}
				<rect
					x="0"
					y="0"
					width="100%"
					height="100%"
					fill="black"
					mask="url(#preloader-mask)"
				/>
			</svg>

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
		</div>
	);
}

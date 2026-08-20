"use client";
import { useAudio } from "@/context/AudioContext";

export default function Theme() {
	const { toggleAudio } = useAudio();

	return (
		<div className="wrapper fixed bottom-5 right-5 z-50 flex flex-col gap-1">
			<button
				onClick={toggleAudio}
				className="transition-theme bg-[var(--accent)] text-[var(--bg)] hover:scale-120 rounded-full transition-all h-12 w-12 text-center justify-center">
				♫
			</button>
		</div>
	);
}

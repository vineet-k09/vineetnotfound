"use client";
import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import "./cursor.css";

export default function CustomCursor() {
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);

	const circleX = useSpring(mouseX, { damping: 20, stiffness: 100 });
	const circleY = useSpring(mouseY, { damping: 20, stiffness: 100 });

	const squareX = useSpring(mouseX, { damping: 15, stiffness: 100 });
	const squareY = useSpring(mouseY, { damping: 15, stiffness: 100 });

	useEffect(() => {
		const moveCursor = (e: MouseEvent) => {
			mouseX.set(e.clientX);
			mouseY.set(e.clientY);
		};
		window.addEventListener("mousemove", moveCursor);
		return () => window.removeEventListener("mousemove", moveCursor);
	});

	return (
		<>
			{/* Lasso Circle */}
			<motion.div
				className="lasso hidden sm:block"
				style={{
					x: circleX,
					y: circleY,
				}}
			/>

			{/* Square */}
			<motion.div
				className="square hidden sm:block"
				style={{
					x: squareX,
					y: squareY,
				}}
			/>

		</>
	);
}

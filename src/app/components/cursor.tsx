'use client';
import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import './cursor.css'

export default function CustomCursor() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const circleX = useSpring(mouseX, { damping: 20, stiffness: 100 });
    const circleY = useSpring(mouseY, { damping: 20, stiffness: 100 });

    const squareX = useSpring(mouseX, { damping: 15, stiffness: 100 });
    const squareY = useSpring(mouseY, { damping: 15, stiffness: 100 });

    const vertY = useSpring(mouseY, { damping: 20, stiffness: 100 });
    const horX = useSpring(mouseX, { damping: 20, stiffness: 100 });

    // Apply a spring to the values for smoothing
    const smoothX = useSpring(mouseX, { damping: 20, stiffness: 150 });
    const smoothY = useSpring(mouseY, { damping: 20, stiffness: 150 });

    // Transform to fixed decimals
    const visibleX = useTransform(smoothX, (v) => (v / 3.325).toFixed(2));
    const visibleY = useTransform(smoothY, (v) => (v / 1.425).toFixed(2));

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);

        };
        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    });

    return (
        <>
            <motion.div className='z-[9999] hidden sm:block fixed bottom-4 left-20 font-mono text-sm'>{visibleX}</motion.div>
            <motion.div className='z-[9999] hidden sm:block fixed top-60 rotate-90 font-mono text-sm'>{visibleY}</motion.div>
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

            {/* Vertical Line on Left */}
            <motion.div
                className="vertical-follower"
                style={{
                    y: vertY,
                }}
            />

            {/* Horizontal Line at Bottom */}
            <motion.div
                className="horizontal-follower"
                style={{
                    x: horX,
                }}
            />
        </>
    );
}

import { useMotionValue, useSpring, motion } from "framer-motion"
import { useEffect } from "react";

export default function Background() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const bgX = useSpring(mouseX, { damping: 20, stiffness: 10 });
    const bgY = useSpring(mouseY, { damping: 20, stiffness: 10 });

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        }
        window.addEventListener('mousemove', moveCursor);
        return () => {
            window.removeEventListener('mousemove', moveCursor)
        }
    })
    return (
            <motion.div className="bg-circle hidden fixed rounded-full"
                style={{
                    background: "var(--glint-bg)",
                    x: bgX,
                    y: bgY,
                    width: "100vw",
                    height: "100vw",
                    top: "-100%",
                    left: "-50%",
                    zIndex: "-999",
                    transition: "background 0.3s ease",
                    filter: "blur(50px)",
                    animation: "pulse 10s ease-in-out infinite"
                }} />
    )
}
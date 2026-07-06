"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sparkles } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

function FloatingShape() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [accentColor, setAccentColor] = useState("#38bdf8");

  // Read accent color from CSS variables dynamically
  useEffect(() => {
    const updateColor = () => {
      const color = getComputedStyle(document.documentElement)
        .getPropertyValue("--accent")
        .trim();
      if (color) {
        setAccentColor(color);
      }
    };

    updateColor();

    // Set up a mutation observer on html/body to watch for theme class changes
    const observer = new MutationObserver(updateColor);
    observer.observe(document.documentElement, { attributes: true });
    observer.observe(document.body, { attributes: true });

    return () => observer.disconnect();
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Smooth auto-rotation
    meshRef.current.rotation.x = time * 0.12;
    meshRef.current.rotation.y = time * 0.18;

    // Fluid mouse inertia reaction
    const targetX = state.pointer.x * 0.8;
    const targetY = state.pointer.y * 0.8;
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.08);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.08);
  });

  return (
    <group>
      <mesh ref={meshRef} scale={1.65}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color={accentColor}
          distort={0.35}
          speed={1.6}
          roughness={0.15}
          metalness={0.2}
          clearcoat={0.8}
          clearcoatRoughness={0.2}
        />
      </mesh>
      <Sparkles
        count={45}
        scale={3.5}
        size={2.5}
        speed={0.5}
        color={accentColor}
      />
    </group>
  );
}

export default function HeroThreeCanvas() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] rounded-full bg-neutral-900 animate-pulse" />
    );
  }

  return (
    <div className="w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] relative">
      <Canvas camera={{ position: [0, 0, 3.5], fov: 65 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[2, 3, 2]} intensity={2} />
        <pointLight position={[-3, -3, -2]} intensity={1.5} />
        <FloatingShape />
      </Canvas>
    </div>
  );
}

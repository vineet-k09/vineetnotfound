"use client";
import { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { gsap } from "gsap";
import * as THREE from "three";
import { vertexShader, fragmentShaderText } from "./shaders/LiquidShader";

function LiquidText() {
    const shaderMatRef = useRef();

    const shaderMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader: fragmentShaderText,
            uniforms: {
                uTime: { value: 0 },
                uOpacity: { value: 1.0 },
            },
            transparent: true,
        });
    }, []);

    useFrame((_, delta) => {
        if (shaderMatRef.current) {
            shaderMatRef.current.uniforms.uTime.value += delta;
        }
    });

    return (
        <Text
            fontSize={0.6}
            position={[0, 0, 0]}
            fillOpacity={1}
            color="white"
            strokeColor="white"
            strokeWidth={0.01}
            fontWeight="bold"
            material={shaderMaterial}
            overflowWrap="break-word"
            ref={(ref) => {
                if (ref && ref.material) {
                    shaderMatRef.current = ref.material;
                }
            }}
        >
            VineetNotFound
        </Text>
    );
}

export default function LiquidSplash({ onFinish }) {
    return (
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 9999,
            width: "100vw",
            height: "100vh",
            background: "black"
        }}>
            <Canvas camera={{ position: [0, 0, 2] }}>
                <mesh>
                    <planeGeometry args={[3, 2]} />
                    <shaderMaterial
                        vertexShader={vertexShader}
                        fragmentShader={fragmentShaderText}
                        uniforms={{ uTime: { value: 0 }, uOpacity: { value: 1 } }}
                        transparent
                    />
                </mesh>
                <LiquidText />
            </Canvas>
        </div>
    );
}
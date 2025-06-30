"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { vertexShader, fragmentShaderText } from "./shaders/LiquidShader";



// Define the uniforms' types
interface LiquidUniforms {
    uTime: { value: number };
    uOpacity: { value: number };
}

function LiquidText() {
    const shaderMatRef = useRef<THREE.ShaderMaterial | null>(null); 
    const { viewport } = useThree();
    const fontSize = viewport.width < 4 ? 0.2 : 0.4;
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
            (shaderMatRef.current.uniforms as unknown as LiquidUniforms).uTime.value += delta;
        }
    });

    return (
        <Text
            fontSize={fontSize}
            maxWidth={viewport.width < 4 ? 1 : 5}
            overflowWrap="break-word" 
            position={[0, 0, 0]}
            anchorX="center"
            anchorY="middle"
            color="white"
            strokeColor="white"
            strokeWidth={0.0}
            fontWeight="bold"
            material={shaderMaterial}
            ref={(ref) => {
                if (ref && ref.material) {
                    shaderMatRef.current = ref.material as THREE.ShaderMaterial;
                }
            }}
        >
            Vineet Not Found
        </Text>

    );
}

export default function NotFound() {
    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 9999,
                width: "100vw",
                height: "100vh",
                background: "black",
            }}
        >
            <h1>Error: 404 looks like your lost</h1>
            {/* <Canvas camera={{ position: [0, 0, 2] }}>
                <LiquidText />
            </Canvas> */}
            <h1>Its okay sometimes we all are</h1>
        </div>
    );
}

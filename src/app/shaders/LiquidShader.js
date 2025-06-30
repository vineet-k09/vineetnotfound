// src/components/shaders/LiquidShader.js

// gives uv coords of pixel
export const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;


export const fragmentShaderText = `
varying vec2 vUv;
uniform float uTime;
uniform float uOpacity;

void main() {
    // Base wave fill
    float wave = sin(vUv.y * 10.0 + uTime * 0.005) * 0.1;
    float mask = smoothstep(0.0, 0.5, vUv.y + wave);

    vec3 liquidColor = vec3(0.0, 0.5, 1.0) * mask;

    // Glitter
    vec2 glitterUV = vUv;
    glitterUV.y -= uTime * 0.0001;
    float glitter = step(0.9888, fract(sin(dot(glitterUV * 50.0, vec2(12.9898, 78.233))) * 43758.5453));
    liquidColor += glitter * vec3(0.6);

    gl_FragColor = vec4(liquidColor, uOpacity * mask);
}
`;
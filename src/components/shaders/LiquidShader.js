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
    float wave = sin(vUv.y * 10.0 + uTime * 0.5) * 0.1;
    float mask = smoothstep(0.0, 0.5, vUv.y + wave);

    vec3 liquidColor = vec3(0.0, 0.5, 1.0) * mask;

    // Glitter
    vec2 glitterUV = vUv;
    glitterUV.y -= uTime * 0.0001;
    float glitter = step(0.9888, fract(sin(dot(glitterUV * 50.0, vec2(12.9898, 78.233))) * 43758.5453));
    liquidColor += glitter * vec3(0.6);

    // ---- DRIP EFFECT START ----
    float dripX = fract(sin(uTime * 0.2) * 1234.567); // pseudo-random X offset
    float dripY = mod(1.0 - fract(uTime * 0.3), 1.0);  // falling position

    float dripWidth = 0.02;
    float dripHeight = 0.1;

    float xMatch = smoothstep(dripX - dripWidth, dripX, vUv.x) *
                   (1.0 - smoothstep(dripX, dripX + dripWidth, vUv.x));
    float yMatch = smoothstep(dripY - dripHeight, dripY, vUv.y);

    float drip = xMatch * yMatch;
    liquidColor += vec3(0.3, 0.6, 1.0) * drip;

    // Optional shine on drip
    float shine = smoothstep(0.0, 0.1, abs(sin(uTime * 5.0 + vUv.y * 10.0)));
    liquidColor += vec3(1.0) * shine * drip * 0.2;

    // ---- DRIP EFFECT END ----

    gl_FragColor = vec4(liquidColor, uOpacity * mask);
}
`;
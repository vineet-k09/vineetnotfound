| Effect                                              | Why shaders are the only way                 |
| --------------------------------------------------- | -------------------------------------------- |
| 🔥 Real-time fire / lava / smoke (no textures)      | You need math-generated chaos (noise + time) |
| 🌊 Stylized water that actually flows               | Mesh deformation + screen-space refraction   |
| 🧊 Glass refraction / chromatic dispersion          | Ray bending needs pixel-level math           |
| 🌈 Rainbow holograms / Fresnel                      | Based on view angle (`dot(normal, viewDir)`) |
| ✨ Volumetric light shafts                           | Only possible with raymarching tricks        |
| 🌌 Starfields with parallax / twinkle               | Math-generated pseudo-random noise           |
| 🧬 Trippy visualizers / sound-reactive effects      | Shader reacts to time or music input         |
| 📸 Real-time post-processing (glow, blur, outlines) | Needs screen-space pixel control             |
| 🌀 Portals / mirrors / recursive scenes             | You control pixel *logic*, not just geometry |
| 👁️ Stylized anime outlines / toon shading          | Needs normals + light math in shader         |


🔥 You do need a shader to make your own custom dynamic water
Waves that change based on audio?

Water that morphs to a heart when clicked?

A ripple that spreads when your name appears?

That’s when shaders go:

“Hello, mortal. You rang?”
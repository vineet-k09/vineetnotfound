# vineetnotfound

```bash
 npm install ogl gsap framer-motion
```

/components
  └── LiquidSplash.jsx
  └── shaders/
      └── liquid.frag
      └── vertex.vert

So starting with the preloader i am thinking of(chatgpt is not me)
| Layer         | Tool            | Install Command                 |
| ------------- | --------------- | ------------------------------- |
| Rendering     | `ogl`           | `npm install ogl`               |
| Animation     | `gsap`          | `npm install gsap`              |
| Text Masking  | `msdf-bmfont`   | CLI tool to generate font atlas |
| React Utility | `framer-motion` | `npm install framer-motion`     |
| Shader Dev    | Shadertoy refs  | Use as starter logic for GLSL   |

| Layer                     | Recommendation              | Why                                                                                                                     |
| ------------------------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **Fallback UI Animation** | `Framer Motion`             | If you want to fade in your site after the preloader cleanly within React.                                              |
| **Shader FX**             | Custom GLSL fragment shader | For the glassy texture, wave animation, overflow drip.                                                                  |
| **Texture Tooling**       | `twgl.js` (optional)        | If you don’t wanna deal with texture/image loading logic.                                                               |

---

i dont remember what i was doing lol

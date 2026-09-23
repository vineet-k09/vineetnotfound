
# ðŸŒ€ vineetnotfound â€” Portfolio Reimagined

> "Not just a portfolio â€” a full-stack, shader-slick, multilingual personality flex."

Welcome to my personal website â€” built not just to *showcase*, but to **perform**.  
This isnâ€™t your average Next.js starter kit. This is a full-on **audio-reactive**, **shader-infused**, **theme-switching**, **context-powered** digital playground.  

![banner](https://raw.githubusercontent.com/vineet-k09/vineetnotfound/main/public/projects/screenshot.png)

---

## ðŸš€ Live Preview  
ðŸ”— [vineetnotfound.vercel.app](https://vineetnotfound.vercel.app)

---

## ðŸ§  Whatâ€™s Under the Hood?

| Layer         | Tech Stack                                               |
|--------------|-----------------------------------------------------------|
| Framework     | [Next.js](https://nextjs.org/) (App Router + SSR)        |
| Language      | TypeScript (strict mode, modular components)             |
| Styling       | Tailwind CSS + PostCSS                                   |
| State         | React Context (Audio, Theme, Location)                   |
| Routing       | File-based routing (App Router)                          |
| API           | Internal API routes (e.g., `/api/location`)              |
| Shader Magic  | WebGL Custom Shader (Liquid effect)                      |
| Localization  | JSON-based i18n (en, hi, kn) with `useLang()` hook       |
| Audio         | Auto-play + context-aware playback system                |

---

## ðŸ”§ Features That Make It Breathe

- ðŸŽ¨ **Live Theme Switching** â€“ From moody dark to kindergarten chaos.
- ðŸŒ **i18n Support** â€“ Currently rocking English, Hindi, and Kannada.
- ðŸŒ **Location-aware Greeting** â€“ Internal `/api/location` grabs GeoIP and vibes accordingly.
- ðŸ”Š **Ambient Audio** â€“ Smooth study/lo-fi sounds looping in the background (optional toggle).
- ðŸ§  **Context Driven Everything** â€“ Modular, scalable state handling with React Context API.
- ðŸ”® **WebGL Shader** â€“ Liquid-text loading screen flex using raw WebGL shader code.
- ðŸ“ **Minimal Backend** â€“ Built into the Next.js API layer, no extra servers needed.
- ðŸ–¼ï¸ **Public Asset Driven** â€“ Easy drop-in support for JSON-based projects, images, and audio.

---

## ðŸ“ File Structure Breakdown

```
â”œâ”€â”€ public/
â”‚   â”œâ”€â”€ audio/              # Background music
â”‚   â”œâ”€â”€ projects/           # Project images and metadata
â”‚   â””â”€â”€ name/               # Dynamic name data (JSON)
â”œâ”€â”€ src/
â”‚   â”œâ”€â”€ app/
â”‚   â”‚   â”œâ”€â”€ page.tsx        # Home page
â”‚   â”‚   â”œâ”€â”€ contact/        # Contact page
â”‚   â”‚   â”œâ”€â”€ creative/       # Art & Misc
â”‚   â”‚   â”œâ”€â”€ projects/       # Project showcase
â”‚   â”‚   â”œâ”€â”€ layout.tsx      # Global layout
â”‚   â”‚   â”œâ”€â”€ globals.css     # Global styles
â”‚   â”‚   â””â”€â”€ api/location/   # Location API (GeoIP handler)
â”‚   â”œâ”€â”€ components/
â”‚   â”‚   â”œâ”€â”€ navbar.tsx, footer.tsx, home.tsx
â”‚   â”‚   â”œâ”€â”€ render/         # Background, carousel, cursor
â”‚   â”‚   â””â”€â”€ utility/        # FadeText, ThemeSwitch, etc.
â”‚   â”œâ”€â”€ context/            # React context providers
â”‚   â”œâ”€â”€ hooks/              # useLang() + friends
â”‚   â”œâ”€â”€ locales/            # JSON files for i18n
â”‚   â””â”€â”€ shaders/            # LiquidShader.js
â”œâ”€â”€ next.config.ts          # Next.js config
â”œâ”€â”€ tailwind.config.ts      # Tailwind setup
â”œâ”€â”€ postcss.config.mjs      # PostCSS plugins
â”œâ”€â”€ tsconfig.json           # TypeScript config
â””â”€â”€ package.json            # Dependencies
```

---

## ðŸ§ª Development

```bash
# install dependencies
npm install

# start the dev server
npm run dev

# build for production
npm run build && npm run start
```

---

## ðŸ¤ Contributions

This is a **personal project** â€” but forks, stars, feedback, and light roasting are all welcome.  
If you want to contribute a new theme or shader variation, feel free to open a PR or drop a message.

---

## ðŸ§¾ Credits

- Background Music: [lukrembo - Study & Relax](https://www.youtube.com/watch?v=FqI9cM6fczU)
- Shader reference inspired by GLSL & [The Book of Shaders](https://thebookofshaders.com/)
- Location API may use a 3rd-party GeoIP tool (optional).
- Built with tears, chai, and way too many dark-mode toggles.

---

## ðŸ’¬ Say Hi

Got feedback, job offers, or just want to vibe?  
ðŸ“® [Contact me](https://vineetnotfound.vercel.app/contact) â€” or drop a star if you enjoyed the setup.

---

> "A portfolio shouldn't just show *what* you do â€” it should feel like *who* you are."
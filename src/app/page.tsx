'use client'
import { useState, useEffect } from "react"
import './page.css'

export default function Home() {
  const [theme, setTheme] = useState('theme-charcoal')
  const [themeVar, setThemeVar] = useState('𐰁')

  useEffect(() => {
    document.documentElement.className = theme
  }, [theme])
  const cycleTheme = () => {
    setTheme(prev =>
      prev === 'theme-charcoal' ? 'theme-sunlight' :
        prev === 'theme-sunlight' ? 'theme-crimson' :
          prev === 'theme-crimson' ? 'theme-neon' : 'theme-charcoal'
    )
    setThemeVar(prev =>
      prev === '𐰁' ? '☽' :
        prev == '☽' ? '☁︎' :
          prev == '☁︎' ? 'ᯓ' : '𐰁'
    )
  }

  return (
    <main className="transition-theme duration-1500">
      <nav className="w-full Text-center justify-center border-b border-gray-300 dark:border-gray-700 py-4">
        <div className="container flex justify-between items-center">
          <h1 className="text-xl font-bold">MySite</h1>
          <ul className="flex gap-4 text-sm">
            <li><a href="#">Home</a></li>
            <li><a href="#">Projects</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
      </nav>

      <div className="container mx-auto bg-pink-700 justify-center  mt-10">
        <div className="grid-layout">
          <div className="content-area">
            <h1>Welcome to My Super Resilient Page</h1>
            <p>This page uses Tailwind grid system and utility-first CSS to stay rock solid no matter the content.</p>

            <h2>Tables? Sure.</h2>
            <table>
              <thead>
                <tr><th>Name</th><th>Role</th></tr>
              </thead>
              <tbody>
                <tr><td>Vineet</td><td>Developer</td></tr>
                <tr><td>GPT</td><td>Sidekick</td></tr>
              </tbody>
            </table>

            <h2>Code Snippet</h2>
            <pre><code>const hello = world;</code></pre>

            <h2>List of Awesomeness</h2>
            <ul>
              <li>Responsive as hell</li>
              <li>Grid-powered layout</li>
              <li>Dark mode friendly</li>
            </ul>
          </div>
        </div>
      </div>





      <button
        onClick={cycleTheme}
        className="transition-theme fixed shadow bottom-5 right-5 z-50 rounded-full bg-[var(--accent)] text-[var(--bg)] hover:scale-120 transition-all h-12 w-12 text-center justify-center">
        {themeVar}
      </button>
    </main>
  );
}

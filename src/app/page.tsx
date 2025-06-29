'use client'
import { useState, useEffect } from "react"
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
    setThemeVar( prev=>
      prev === '𐰁' ? '☽':
        prev == '☽' ? '☁︎' : 
          prev == '☁︎' ? 'ᯓ' : '𐰁'
    )
  }

  return (
    <main className="transition-theme duration-1500">
      
        <button
        onClick={cycleTheme}
        className="transition-theme fixed shadow bottom-5 right-5 z-50 rounded-full bg-[var(--accent)] text-[var(--bg)] hover:scale-120 transition-all h-12 w-12 text-center justify-center">
        {themeVar}
        </button>
    </main>
  );
}

'use client'
import { useState, useEffect } from "react"
import './page.css'

import Home from './pages/home'
import Navbar from './components/narbar'
import { useLangContext } from '../hooks/useLang';

export default function Page() {
  const [theme, setTheme] = useState('theme-charcoal')
  const [themeVar, setThemeVar] = useState('𐰁')
  const {visibleText, changeLang} = useLangContext();

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
        <Navbar />
        <Home />     
      <div className="wrapper fixed bottom-5 right-5 z-50 flex flex-col gap-1">
        <button 
        onClick={changeLang}
          className="hover:scale-120 transition-all h-12 w-12 text-center justify-center rounded-full shadow bg-[var(--accent)] text-[var(--bg)]">
          {visibleText.toggleLangBtn ?? "Change Language"}
        </button>
        <button
        onClick={cycleTheme}
        className="transition-theme shadow bg-[var(--accent)] text-[var(--bg)] hover:scale-120 rounded-full transition-all h-12 w-12 text-center justify-center">
        {themeVar}
      </button></div>  
      </main>
  );
}

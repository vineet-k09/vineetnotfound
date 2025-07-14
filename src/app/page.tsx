'use client'
import './page.css'

import Home from './components/home'
import Navbar from './components/navbar'
import Footer from './components/footer'
import { useTheme } from '@/context/ThemeContext'
import { useLangContext } from '@/hooks/useLang'
// import Background from "./components/background"

export default function Page() {
  const { themeVar, cycleTheme } = useTheme()
  const {changeLang, visibleText} = useLangContext()
  return (
    <main className="transition-theme duration-1500">
      {/* <Background /> */}
      <Navbar />
      <Home />
      <div className="wrapper fixed bottom-5 right-5 z-50 flex flex-col gap-1">
        <button
          onClick={cycleTheme}
          style={{ boxShadow: '0px 0px 30px 2px rgba(var(--accent-rgb), 0.3)' }}
          className="transition-theme boxShadow bg-[var(--accent)] text-[var(--bg)] hover:scale-120 rounded-full transition-all h-12 w-12 text-center justify-center"
        >
          {themeVar}
        </button>
        <button
          onClick={changeLang}
          style={{ boxShadow: '0px 0px 30px 2px rgba(var(--accent-rgb), 0.3)' }}
          className="transition-theme boxShadow bg-[var(--accent)] text-[var(--bg)] hover:scale-120 rounded-full transition-all h-12 w-12 text-center justify-center"
        >
          {visibleText.toggleLangBtn}
        </button>
      </div>
      <Footer />
    </main>
  );
}

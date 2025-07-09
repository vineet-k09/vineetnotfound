'use client'
import { useTheme } from '@/context/ThemeContext'
import { useAudio } from '@/context/AudioContext';

export default function Theme() {
    const { themeVar, cycleTheme } = useTheme()
    const { toggleAudio } = useAudio();

    return (
        <div className="wrapper fixed bottom-5 right-5 z-50 flex flex-col gap-1">
            <button
                onClick={toggleAudio}
                style={{
                    boxShadow: '0px 0px 30px 2px rgba(var(--accent-rgb), 0.3)'
                }}
                className="transition-theme boxShadow bg-[var(--accent)] text-[var(--bg)] hover:scale-120 rounded-full transition-all h-12 w-12 text-center justify-center"
            >♫</button>

            <button
                onClick={cycleTheme}
                style={{ boxShadow: '0px 0px 30px 2px rgba(var(--accent-rgb), 0.3)' }}
                className="transition-theme boxShadow bg-[var(--accent)] text-[var(--bg)] hover:scale-120 rounded-full transition-all h-12 w-12 text-center justify-center">
                {themeVar}
            </button>
        </div>
    )
}


// 'use client'
// import { useState, useEffect } from "react"
// export default function Theme() {
//     return (
//         <div className="wrapper fixed bottom-5 right-5 z-50 flex flex-col gap-1">
//         <button
//     onClick={changeLang}
//       className="hover:scale-120 transition-all h-12 w-12 text-center justify-center rounded-full shadow bg-[var(--accent)] text-[var(--bg)]">
//       {visibleText.toggleLangBtn ?? "Change Language"}
//     </button>
//             </div>)
// }
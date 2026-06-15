'use client'
import { useTheme } from '@/context/ThemeContext'
import { useAudio } from '@/context/AudioContext';
import { useLangContext } from '@/hooks/useLang';

export default function Theme() {
    const { themeVar, cycleTheme } = useTheme()
    const { toggleAudio } = useAudio();
    const { changeLang, visibleText } = useLangContext();

    return (
        <div className="wrapper fixed bottom-5 right-5 z-50 flex flex-col gap-1">
            <button
                onClick={toggleAudio}
                className="transition-theme bg-[var(--accent)] text-[var(--bg)] hover:scale-120 rounded-full transition-all h-12 w-12 text-center justify-center"
            >♫</button>

            <button
                onClick={cycleTheme}
                className="transition-theme bg-[var(--accent)] text-[var(--bg)] hover:scale-120 rounded-full transition-all h-12 w-12 text-center justify-center">
                {themeVar}
            </button>

            <button
                onClick={changeLang}
                className="transition-theme bg-[var(--accent)] text-[var(--bg)] hover:scale-120 rounded-full transition-all h-12 w-12 text-center justify-center"
            >
                {visibleText.toggleLangBtn}
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
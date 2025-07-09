'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type ThemeType = 'theme-charcoal' | 'theme-sunlight' | 'theme-crimson' | 'theme-neon'
type ThemeVarType = '𐰁' | '☽' | '☁︎' | 'ᯓ'

interface ThemeContextType {
    theme: ThemeType
    themeVar: ThemeVarType
    cycleTheme: () => void
    setTheme: (theme: ThemeType) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<ThemeType>('theme-charcoal')
    const [themeVar, setThemeVar] = useState<ThemeVarType>('𐰁')

    useEffect(() => {
        document.documentElement.className = theme
    }, [theme])

    const cycleTheme = () => {
        setTheme(prev =>
            prev === 'theme-charcoal' ? 'theme-sunlight' :
                prev === 'theme-sunlight' ? 'theme-crimson' :
                    prev === 'theme-crimson' ? 'theme-neon' :
                        'theme-charcoal'
        )
        setThemeVar(prev =>
            prev === '𐰁' ? '☽' :
                prev === '☽' ? '☁︎' :
                    prev === '☁︎' ? 'ᯓ' :
                        '𐰁'
        )
    }

    return (
        <ThemeContext.Provider value={{ theme, themeVar, cycleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext)
    if (!context) throw new Error('useTheme must be used within a ThemeProvider')
    return context
}

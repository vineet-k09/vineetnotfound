// src/hooks/useLang.tsx
'use client'
import { useState, createContext, useContext } from 'react';
import en from '../locales/en.json';
import hi from '../locales/hi.json';

export const translations: Translations = {
    en,
    hi,
};

export type LangKey = keyof typeof translations;
type Language = 'en' | 'hi';

interface TranslationContent {
    name: string;
    role: string;
    navbar: string[][];
    aboutme11: string;
    aboutme12: string;
    aboutme13: string;
    aboutme121: string;
    aboutme14: string;
    aboutme15: string;
    aboutme16: string;
    aboutme17: string;
    projects?: {
        title: string;
        list: {
            title: string;
            description: string;
            github: string;
            stack: string[]
            live: string
            image: string[]
            figma?: string
        }[];
    };
    experience?: {
        title: string;
        list: {
            title: string;
            company: string;
            duration: string;
            description: string;
        }[];
    };
    education?: {
        title: string;
        list: {
            degree: string;
            institute: string;
            duration: string;
            location: string;
        }[];
    };
    footer: string;
    toggleLangBtn: string;
}

type Translations = {
    [key in Language]: TranslationContent;
};

const LangContext = createContext<ReturnType<typeof useLang> | null>(null);

export const LangProvider = ({ children }: { children: React.ReactNode }) => {
    const langData = useLang();
    return <LangContext.Provider value={langData}>{children}</LangContext.Provider>;
};

export const useLangContext = () => {
    const ctx = useContext(LangContext);
    if (!ctx) throw new Error('useLangContext must be used within LangProvider');
    return ctx;
};

export function useLang() {
    const [lang, setLang] = useState<Language>('en');
    const [visibleText, setVisibleText] = useState<TranslationContent>(translations[lang]);

    const changeLang = () => {
        const newLang = lang === 'en' ? 'hi' : 'en';
        setTimeout(() => {
            setLang(newLang);
            setVisibleText(translations[newLang]);
        }, 300); // Just 300ms delay, no drama
    };

    return {
        lang,
        visibleText,
        changeLang,
    };
}

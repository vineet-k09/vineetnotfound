// src/hooks/useLang.ts
import { useEffect, useState } from 'react';
import { translations } from '../app/components/lang';

export function useLang() {
    const [lang, setLang] = useState<'en' | 'hi' | 'kn'>('en');
    const [visibleText, setVisibleText] = useState(translations[lang]);
    const [fadeKeys, setFadeKeys] = useState<string[]>([]);

    useEffect(() => {
        const keys = Object.keys(translations[lang]);
        setFadeKeys(keys);
    }, [lang]);

    const fadeClass = (key: string) =>
        fadeKeys.includes(key) ? 'fade-in show' : 'fade-in';

    const changeLang = () => {
        switchLang({
            lang,
            setLang,
            setVisibleText,
            setFadeKeys,
            translations
        });
    };

    return {
        lang,
        visibleText,
        fadeClass,
        changeLang,
    };
}

type Language = 'en' | 'hi' | 'kn';

interface TranslationContent {
    name: string;
    role: string;
    skills: string;
    projects: {
        mainLabel: string;
        list: {
            title: string;
            description: string;
        }[];
    };
    experience: {
        mainLabel: string;
        list: {
            title: string;
            company: string;
            duration: string;
            description: string;
        }[];
    };
    education: {
        mainLabel: string;
        list: {
            degree: string;
            institute: string;
            duration: string;
            location: string;
            cgpa: string;
            courses: string[];
        }[];
    };
    toggleLangBtn: string;
}

type Translations = {
    [key in Language]: TranslationContent;
};

type Props = {
    translations: Translations;
    lang: Language;
    setFadeKeys: React.Dispatch<React.SetStateAction<string[]>>;
    setVisibleText: React.Dispatch<React.SetStateAction<TranslationContent>>;
    setLang: React.Dispatch<React.SetStateAction<Language>>;
};

function switchLang({
    lang,
    setLang,
    setVisibleText,
    setFadeKeys,
    translations,
}: Props) {
    const newLang = lang === 'en' ? 'hi' :
        lang == 'hi' ? 'kn' : 'en';
    const keys = Object.keys(translations[lang]) as (keyof typeof translations['en'])[];

    keys.forEach((key, index) => {
        setTimeout(() => {
            setFadeKeys(prev => prev.filter(k => k !== key));

            setTimeout(() => {
                setVisibleText(prev => ({
                    ...prev,
                    [key]: translations[newLang][key],
                }));

                setFadeKeys(prev => [...prev, key as string]);
            }, 200);
        }, index * 300);
    });

    setLang(newLang);
}

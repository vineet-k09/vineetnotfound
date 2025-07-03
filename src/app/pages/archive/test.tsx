import { useState } from "react";
import { translations } from "../../components/lang";
import { motion } from "framer-motion"

type LangKey = keyof typeof translations;
type TransKey = keyof typeof translations['en'];
const langCycle: LangKey[] = ['en', 'hi'];

export default function Test() {
    const [lang, setLang] = useState<LangKey>('en')
    const [visibleText, setVisibleText] = useState(translations[lang])

    const changeLang = () => {
        const newLang = langCycle[(langCycle.indexOf(lang) + 1) % langCycle.length];

        const keys = Object.keys(translations[lang]) as TransKey[];

        keys.forEach((key, index) => {
            setTimeout(() => {
                setVisibleText(prev => ({
                    ...prev,
                    [key]: '...' as string,
                }));

                setTimeout(() => {
                    setVisibleText(prev => ({
                        ...prev,
                        [key]: translations[newLang][key],
                    }));
                }, 300);
            }, index * 500);
        });

        setLang(newLang);
    };

    return (
        <>
            <h1 className="bg-black text-2xl text-white">{visibleText.name}</h1>
            <h1 className="bg-black text-2xl text-white">{visibleText.role}</h1>
            <h1 className="bg-black text-2xl text-white">{visibleText.skills}</h1>
            <h1 className="bg-black text-2xl text-white">{visibleText.projects}</h1>
            <motion.h1
                key={visibleText.name} // key triggers animation on change
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                {visibleText.projects}
            </motion.h1>
            <button onClick={changeLang} className="button transition-theme shadow bg-[var(--accent)] text-[var(--bg)] hover:scale-120 transition-all text-center justify-center px-2 text-2xl">Change Lang</button>
        </>
    )
}

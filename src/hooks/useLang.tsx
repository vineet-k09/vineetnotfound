// src/hooks/useLang.tsx
"use client";
import { useState, createContext, useContext } from "react";
import en from "../locales/en.json";
import hi from "../locales/hi.json";
import kn from "../locales/kn.json";

export const translations: Translations = {
	en,
	hi,
	kn,
};

export type LangKey = keyof typeof translations;
type Language = "en" | "hi" | "kn";

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
	homeCards?: {
		github: { title: string; stats: string; desc: string };
		projects: { title: string; stats: string; desc: string };
		art: { title: string; stats: string; desc: string };
		about: { title: string; stats: string; desc: string };
	};
	projects?: {
		title: string;
		list: {
			title: string;
			description: string;
			github: string;
			stack: string[];
			live: string;
			image: string[];
			figma?: string;
		}[];
	};
	experience?: {
		title: string;
		list: {
			company: string;
			role: string;
			duration: string;
			timeline: string;
			branch: string;
			color: string;
			commits: {
				hash: string;
				msg: string;
				desc: string;
			}[];
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
	intro11: string;
	intro12: string;
	intro13: string;
	intro121: string;
	intro14: string;
	intro21: string;
	intro22: string;
	intro23: string;
	intro31: string;
	intro32: string;
	intro33: string;
}

type Translations = {
	[key in Language]: TranslationContent;
};

const LangContext = createContext<ReturnType<typeof useLang> | null>(null);

export const LangProvider = ({ children }: { children: React.ReactNode }) => {
	const langData = useLang();
	return (
		<LangContext.Provider value={langData}>{children}</LangContext.Provider>
	);
};

export const useLangContext = () => {
	const ctx = useContext(LangContext);
	if (!ctx) throw new Error("useLangContext must be used within LangProvider");
	return ctx;
};

export function useLang() {
	const [lang, setLang] = useState<Language>("en");
	const [visibleText, setVisibleText] = useState<TranslationContent>(
		translations[lang],
	);

	const changeLang = () => {
		// const newLang =
		//     lang === 'en' ? 'hi' :
		//         lang === 'kn' ? 'en' :
		//             'hi';

		const newLang = lang === "en" ? "hi" : lang === "hi" ? "kn" : "en";
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

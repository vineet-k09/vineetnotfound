'use client'

import { useLangContext } from '../../hooks/useLang';
import Navbar from './navbar';
import { useAudio } from '@/context/AudioContext';
// import { useTheme } from '@/context/ThemeContext';
import { languagesAndFrontend, backendAndDatabases, devopsAndTools } from './utility/skills';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import Link from 'next/link';

type ThemeType = 'theme-charcoal' | 'theme-sunlight' | 'theme-crimson' | 'theme-neon';

function TypedName({ name }: { name: string }) {
    const parts = name.split(' ');
    const firstName = parts[0] || '';
    const lastName = parts.slice(1).join(' ') || '';

    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [cursorVisible, setCursorVisible] = useState(true);

    useEffect(() => {
        setText('');
        setIsDeleting(false);
    }, [lastName]);

    useEffect(() => {
        if (!lastName) return;
        const cursorInterval = setInterval(() => {
            setCursorVisible(prev => !prev);
        }, 530);
        return () => clearInterval(cursorInterval);
    }, [lastName]);

    useEffect(() => {
        if (!lastName) return;

        let timer: NodeJS.Timeout;
        if (isDeleting) {
            timer = setTimeout(() => {
                setText(prev => prev.slice(0, -1));
            }, 80);
        } else {
            timer = setTimeout(() => {
                setText(lastName.slice(0, text.length + 1));
            }, 100);
        }

        if (!isDeleting && text === lastName) {
            timer = setTimeout(() => {
                setIsDeleting(true);
            }, 2000);
        } else if (isDeleting && text === '') {
            setIsDeleting(false);
        }

        return () => clearTimeout(timer);
    }, [text, isDeleting, lastName]);

    return (
        <span className="inline-flex items-baseline">
            <span>{firstName}&nbsp;</span>
            <span style={{ WebkitTextStroke: '1.5px var(--text)', color: 'transparent' }}>
                {text}
            </span>
            <span className="transition-opacity duration-100" style={{ color: 'var(--accent)', opacity: cursorVisible ? 1 : 0 }}>.</span>
        </span>
    );
}

const revealVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" as const }
    }
};

export default function Home() {
    const { visibleText } = useLangContext();
    const { toggleAudio, isPlaying } = useAudio();
    // const { theme, setTheme } = useTheme();

    // const [savedTheme, setSavedTheme] = useState<ThemeType>('theme-charcoal');
    // const [hoveredTheme, setHoveredTheme] = useState<ThemeType | null>(null);

    // Keep savedTheme in sync with the global theme when not hovering
    // useEffect(() => {
    //     if (!hoveredTheme) {
    //         setSavedTheme(theme as ThemeType);
    //     }
    // }, [theme, hoveredTheme]);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleMouseEnter = (cardTheme: ThemeType) => {
        // setHoveredTheme(cardTheme);
        // setTheme(cardTheme);
    };

    const handleMouseLeave = () => {
        // setHoveredTheme(null);
        // setTheme(savedTheme);
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleCardClick = (cardTheme: ThemeType) => {
        // setSavedTheme(cardTheme);
        // setTheme(cardTheme);
    };

    const homeCards = visibleText.homeCards || {
        github: { title: "Codebase & GitHub", stats: "70+ Repositories", desc: "Check out my open-source work, scripts, notebooks, and automation tools." },
        projects: { title: "Projects & Labs", stats: "7+ Featured Works", desc: "Explore web platforms, AI scheme recommenders, and database solutions." },
        art: { title: "Photography & Design", stats: "UI/UX & Visuals", desc: "Browse branding projects, graphic layouts, and captured moments." },
        about: { title: "Life & Philosophy", stats: "CSE Student (DS)", desc: "Read about my background, learning process, and what drives me." }
    };

    const cards = [
        {
            key: 'github',
            theme: 'theme-charcoal' as const,
            title: homeCards.github.title,
            stats: homeCards.github.stats,
            desc: homeCards.github.desc,
            icon: 'devicon-github-original',
            link: 'https://github.com/vineet-k09',
            isExternal: true
        },
        {
            key: 'projects',
            theme: 'theme-sunlight' as const,
            title: homeCards.projects.title,
            stats: homeCards.projects.stats,
            desc: homeCards.projects.desc,
            icon: 'fa-regular fa-folder-open',
            link: '/projects',
            isExternal: false
        },
        {
            key: 'about',
            theme: 'theme-neon' as const,
            title: homeCards.about.title,
            stats: homeCards.about.stats,
            desc: homeCards.about.desc,
            icon: 'fa-solid fa-circle-info',
            link: '/about',
            isExternal: false
        },
        {
            key: 'art',
            theme: 'theme-crimson' as const,
            title: homeCards.art.title,
            stats: homeCards.art.stats,
            desc: homeCards.art.desc,
            icon: 'fa-regular fa-images',
            link: '/photography',
            isExternal: false
        }
    ];

    return (
        <>
            <Navbar />
            <div className="container mt-10">
                <div className="grid-layout">
                    <div className="content-area sm:px-10">
                        {/* 🧍 Hero Section */}
                        <motion.section 
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={revealVariants}
                            className="hero-header my-16"
                        >
                            <div className="flex flex-col md:flex-row justify-between items-center gap-10 mb-8">
                                <div className="flex-1">
                                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-2 transition-all duration-500">
                                        <TypedName name={visibleText.name} />
                                    </h1>
                                    <p className="text-lg md:text-xl opacity-80 font-medium transition-all duration-500 mb-6">
                                        {visibleText.role}
                                    </p>
                                    <p className="text-lg opacity-90 max-w-2xl mb-6 leading-relaxed font-normal">
                                        I&apos;m a <span className="text-[var(--accent)] font-semibold">{visibleText['aboutme13']}</span> with a strong grip on React, Node.js, and data analytics. Below is a mix-and-match interactive playground of my domains — hover to explore each theme.
                                    </p>
                                    <div className="flex items-center gap-4 h-12 mt-4">
                                        <div className="reactOut flex gap-3 items-center h-full">
                                            <a href='https://github.com/vineet-k09' target='_blank' aria-label="GitHub" className="flex items-center justify-center">
                                                <i className="devicon devicon-github-original hover:text-[var(--accent)] border-2 p-1.5 border-transparent hover:border-[var(--accent)] rounded-full duration-250 flex items-center justify-center" style={{ fontSize: '16px' }}></i>
                                            </a>
                                            <a href='https://www.linkedin.com/in/vineet-kushwaha-2666b5257/' target='_blank' aria-label="LinkedIn" className="flex items-center justify-center">
                                                <i className="devicon devicon-linkedin-plain hover:text-[var(--accent)] border-2 p-1.5 border-transparent hover:border-[var(--accent)] rounded-xl duration-250 flex items-center justify-center" style={{ fontSize: '16px' }}></i>
                                            </a>
                                            <a href='mailTo:vineetkushwaha6325@gmail.com' aria-label="Email" className="flex items-center justify-center">
                                                <i className="fa-regular fa-envelope hover:text-[var(--accent)] border-2 p-1.5 border-transparent hover:border-[var(--accent)] rounded-xl duration-250 flex items-center justify-center" style={{ fontSize: '16px' }}></i>
                                            </a>
                                            <button
                                                style={{
                                                    color: isPlaying ? 'var(--accent)' : 'var(--bg)'
                                                }}
                                                onClick={toggleAudio}
                                                className="hover:scale-120 hover:bg-[var(--accent)] 
                                                border-2 
                                                hover:border-[var(--text)]
                                                transition-all h-9 w-12 flex items-center justify-center rounded-2xl boxShadow 
                                                bg-[var(--text)]
                                                duration-250
                                                cursor-pointer
                                                font-semibold
                                                text-lg
                                                "
                                                aria-label="Toggle music"
                                            >
                                                ♫
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-shrink-0 flex items-center justify-center">
                                    <div className="morphing-blob-container">
                                        <div className="morphing-blob-glow" />
                                        <div className="morphing-blob" style={{ backgroundImage: "url('/photos/hero.jpg')" }} />
                                    </div>
                                </div>
                            </div>

                            {/* Theme Mix and Match Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
                                {cards.map((card) => {
                                    const cardContent = (
                                        <div className="horizontal-bento-card-inner">
                                            <div className="card-icon-wrapper">
                                                <i className={`${card.icon}`} style={{ fontSize: '18px' }} />
                                            </div>
                                            <div className="card-content-wrapper">
                                                <span className="card-tag">{card.stats}</span>
                                                <h3 className="card-title">{card.title}</h3>
                                                <p className="card-desc">{card.desc}</p>
                                            </div>
                                            <div className="card-arrow">
                                                <i className="fa-solid fa-arrow-right text-lg" />
                                            </div>
                                        </div>
                                    );

                                    return card.isExternal ? (
                                        <a
                                            key={card.key}
                                            href={card.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onMouseEnter={() => handleMouseEnter(card.theme)}
                                            onMouseLeave={handleMouseLeave}
                                            onClick={() => handleCardClick(card.theme)}
                                            className={`horizontal-bento-card ${card.theme} no-underline`}
                                        >
                                            {cardContent}
                                        </a>
                                    ) : (
                                        <Link
                                            key={card.key}
                                            href={card.link}
                                            onMouseEnter={() => handleMouseEnter(card.theme)}
                                            onMouseLeave={handleMouseLeave}
                                            onClick={() => handleCardClick(card.theme)}
                                            className={`horizontal-bento-card ${card.theme} no-underline`}
                                        >
                                            {cardContent}
                                        </Link>
                                    );
                                })}
                            </div>
                        </motion.section>

                        <motion.section 
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={revealVariants}
                            className='section sm:gap-x-22'
                        >
                            {/* 💼 Experience Section */}
                            <h2 className='col-span-1'>
                                {visibleText.experience?.title}
                            </h2>
                            <div className="col-span-1"></div>
                            <div className="col-span-5">
                                <div className="relative border-l border-[var(--accent)] border-opacity-30 pl-6 ml-2 space-y-8">
                                    {visibleText.experience?.list.map((exp, idx) => (
                                        <div key={idx} className="relative group">
                                            {/* Timeline dot */}
                                            <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[var(--bg)] border-2 border-[var(--accent)] shadow-sm transition-transform group-hover:scale-125 duration-300" />
                                            <div>
                                                <span className="text-xs font-mono text-[var(--accent)] font-semibold tracking-wider uppercase">{exp.timeLine}</span>
                                                <h3 className="text-xl font-bold mt-1 text-[var(--accent)]">{exp.title}</h3>
                                                <h4 className="text-md font-semibold opacity-85">{exp.company}</h4>
                                                <p className="text-sm mt-2 leading-relaxed opacity-80">{exp.description} {exp.duration ? `(${exp.duration})` : ''}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.section>

                        <motion.section 
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={revealVariants}
                            className='section sm:gap-x-22'
                        >
                            <h2 className='col-span-1'>Skills</h2>
                            <div className="col-span-1"></div>
                            <div className="col-span-5">
                                <div className="flex flex-col gap-6">
                                    {[
                                        { title: "Languages & Frontend", list: languagesAndFrontend },
                                        { title: "Backend & Databases", list: backendAndDatabases },
                                        { title: "DevOps & Tools", list: devopsAndTools }
                                    ].map((cat, idx) => (
                                        <div key={idx} className="inverted-theme-card p-5 rounded-2xl">
                                            <h3 className="text-lg font-bold mb-4 border-b border-opacity-10 border-[var(--text)] pb-2 text-[var(--accent)]">{cat.title}</h3>
                                            <ul className="flex flex-wrap gap-3 list-none p-0">
                                                {cat.list.map(({ className, label, link }) => (
                                                    <li key={label} className="list-none">
                                                        <a
                                                            href={link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inverted-tag flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm no-underline font-medium"
                                                        >
                                                            <i className={`${className}`} style={{ fontSize: '14px' }}></i>
                                                            <span>{label}</span>
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.section>

                        <motion.section 
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={revealVariants}
                            className='section'
                        >
                            {/* 🚀 Projects Section */}
                            <h2 className='col-span-1'>{visibleText.projects?.title}</h2>
                            <div className="col-span-1"></div>
                            <div className="space-y-6 grid grid-cols-1 sm:grid-cols-2 gap-6 col-span-5">
                                {visibleText.projects?.list?.map((project, idx) => (
                                    <div
                                        key={idx}
                                        className="inverted-theme-card p-6 rounded-2xl flex flex-col justify-between"
                                    >
                                        <div>
                                            <div className="flex justify-between items-start mb-3">
                                                <h3 className="text-xl font-bold">
                                                    {project.title}
                                                </h3>
                                                <div className="flex gap-2">
                                                    {project.github && (
                                                        <a href={project.github} target="_blank" rel="noreferrer" className="hover:text-[var(--accent)] transition-colors duration-200" aria-label="GitHub repo">
                                                            <i className="devicon-github-original" style={{ fontSize: '20px' }} />
                                                        </a>
                                                    )}
                                                    {project.live && (
                                                        <a href={project.live} target="_blank" rel="noreferrer" className="hover:text-[var(--accent)] transition-colors duration-200" aria-label="Live demo">
                                                            <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: '18px' }} />
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                            <p className="text-sm mb-4 leading-relaxed">{project.description}</p>
                                        </div>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {project.stack?.map((tech, i) => (
                                                <span key={i} className="inverted-tag text-xs px-2 py-1 rounded font-mono">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.section>

                        <motion.section 
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={revealVariants}
                            className='section sm:gap-x-22'
                        >
                            {/* 🎓 Education Section */}
                            <h2 className='col-span-1'>{visibleText.education?.title}</h2>
                            <div className="col-span-1"></div>
                            <div className="col-span-5">
                                <div className="inverted-theme-card p-6 rounded-2xl">
                                    {visibleText.education?.list.map((edu, idx) => (
                                        <div key={idx} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                            <div>
                                                <h3 className="text-xl font-bold">{edu.degree}</h3>
                                                <p className="text-md mt-1">{edu.institute} – {edu.location}</p>
                                            </div>
                                            <span className="inverted-tag text-sm font-mono px-3 py-1 rounded-full font-semibold">
                                                {edu.duration}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.section>
                    </div>
                </div>
            </div>
        </>
    );
}

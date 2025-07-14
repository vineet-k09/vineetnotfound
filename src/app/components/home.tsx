//src/app/home.tsx
import { useLangContext } from '../../hooks/useLang';
// import Image from 'next/image';
import Navbar from './navbar';
import { useAudio } from '@/context/AudioContext';
// import { visibleText } from './utility/visibletext';
import { skills1, skills2, skills3, skills4 } from './utility/skills';
import Link from 'next/link';

export default function Home() {
    const { visibleText } = useLangContext();

    const { toggleAudio, isPlaying } = useAudio();

    return (
        <>
            <Navbar />
            <div className="container mt-10">
                <div className="grid-layout">
                    <div className="content-area sm:px-10">
                        <section className='hero mx-auto my-20 grid grid-cols-8'>
                            {/* 🧍 Hero Section */}
                            <div className="col-span-4">
                                <h1 >{visibleText.name}</h1>
                                <p >{visibleText.role}</p>
                            </div>
                            <div className="col-span-1"></div>
                            <div className="reactOut col-span-3 flex gap-2">
                                <a href='https://github.com/vineet-k09' target='_blank'><i className="devicon devicon-github-original 
                                hover:text-[var(--accent)] 
                                border-2 p-1 border-transparent 
                                hover:border-[var(--accent)] rounded-full duration-250"></i></a>
                                <a href='https://www.linkedin.com/in/vineet-kushwaha-2666b5257/' target='_blank'><i className="devicon devicon-linkedin-plain hover:text-[var(--accent)] border-2 p-1 border-transparent hover:border-[var(--accent)] rounded-xl duration-250"></i></a>
                                <a href='mailTo:vineetkushwaha6325@gmail.com'><i className="fa-solid fa-envelope hover:text-[var(--accent)] border-2 p-1 border-transparent hover:border-[var(--accent)] -mt-1 rounded-xl duration-250"></i></a>
                            </div>
                            <p
                                style={{
                                    fontSize: '1.2em'
                                }}
                                className='text-3xl col-span-8 aboutme-main'>
                                {/* I&apos;m a <span className='specific'>
                                    <span className="font-extrabold">&#123;</span> full-stack web developer <span className="font-extrabold">&#125;</span></span> with a strong grip on React, Node.js, and everything in between. <span className="specific">I like building</span> responsive, real-world applications that are easy to use and fun to make. <br /> Alongside web dev, I use Python for automating tasks, experimenting with ideas, and working on computer vision projects. I&apos;m also studying Data Science, which adds some extra perspective to how I solve problems and think about code. I’m still learning, but I try to build with intention and keep getting better with every project. */}
                                {visibleText['aboutme11']}<span className='specific'>
                                    <span className="font-extrabold">{visibleText['aboutme12']}</span> {visibleText['aboutme13']} <span className="font-extrabold">{visibleText['aboutme121']}</span></span> {visibleText['aboutme14']} <span className="specific">{visibleText['aboutme15']}</span> {visibleText['aboutme16']} <br />
                                {visibleText['aboutme17']}
                                {/* {visibleText.aboutme1} */}
                            </p>

                            <button
                                style={{
                                    color: isPlaying ? 'var(--accent)' : 'var(--bg)'
                                }}
                                onClick={toggleAudio}
                                className="hover:scale-120 hover:bg-[var(--accent)] 
                                border-2 
                                hover:border-[var(--text)]
                                transition-all h-8 w-12 text-center justify-center rounded-2xl boxShadow 
                                bg-[var(--text)]
                                duration-250
                                "> ♫ </button>
                        </section>
                        <section className='section grid grid-cols-7'>
                            <h2 className='col-span-1'>Skills</h2>
                            <div className="col-span-1"></div>
                            <div className="col-span-5">
                                <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-5 gap-x-20 sm:gap-x-18  text-sm">
                                    {skills1.map(({ className, label, link }) => (
                                        <li key={label} className="specific">
                                            <a href={link} target="_blank" rel="noopener noreferrer" className='flex items-center gap-2 '>
                                                <i className={className}></i>
                                                {label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                                <hr className='my-4 col-span-4' />
                                <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-5 gap-x-20 sm:gap-x-18 text-sm">
                                    {skills2.map(({ className, label, link }) => (
                                        <li key={label} className="specific">
                                            <a href={link} target="_blank" rel="noopener noreferrer" className='flex items-center gap-2 '>
                                                <i className={className}></i>
                                                {label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                                <hr className='my-4' />
                                <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-5 gap-x-20 sm:gap-x-18 text-sm">
                                    {skills3.map(({ className, label, link }) => (
                                        <li key={label} className="specific">
                                            <a href={link} target="_blank" rel="noopener noreferrer" className='flex items-center gap-2 '>
                                                <i className={className}></i>
                                                {label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                                <hr className='my-4' />
                                <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-5 gap-x-20 sm:gap-x-18 text-sm">
                                    {skills4.map(({ className, label, link }) => (
                                        <li key={label} className="specific">
                                            <a href={link} target="_blank" rel="noopener noreferrer" className='flex items-center gap-2 '>
                                                <i className={className}></i>
                                                {label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>
                        <section className='section'>
                            {/* 🚀 Projects Section */}
                            <h2 className='col-span-1'>{visibleText.projects?.title}</h2>
                            <div className="col-span-1"></div>
                            <div
                                className="space-y-4 grid grid-cols-1 sm:grid-cols-2 gap-4 col-span-5 
                                //items-start
                                ">
                                {visibleText.projects?.list?.map((project, idx) => (
                                    <div
                                        key={idx}
                                        style={{
                                            // background: 'rgba(var(--accent-rgb), 0.29)'
                                            background: 'var(--text)',
                                            color: 'var(--bg)',
                                        }}
                                        className='border boxShadow p-4 rounded-2xl hover:scale-110 duration-250'>
                                        <h3 className='specific text-3xl'>{project.title}</h3>
                                        <p>{project.description}</p>
                                        <a href={project.github} target='_blank'>
                                            <i
                                                className="devicon devicon-github-original 
                                                text-[var(--bg)] hover:text-[var(--accent)] border-2 p-1 border-transparent hover:border-[var(--accent)] rounded-full duration-250"></i></a>
                                        <Link href={`/projects#${idx}`}>
                                            <i
                                                className="devicon fa-solid fa-link 
                                                text-[var(--bg)] hover:text-[var(--accent)] border-2 p-1 border-transparent hover:border-[var(--accent)] rounded-full duration-250"></i></Link>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className='section sm:gap-x-22'>
                            {/* 💼 Experience Section */}
                            <h2 className='col-span-1'>
                                {visibleText.experience?.title}
                                </h2>
                            <div className="col-span-1"></div>
                            <div className="space-y-4 col-span-5">
                                {visibleText.experience?.list.map((exp, idx) => (
                                    <div key={idx}>
                                        <h3 className='specific'>{exp.title} – {exp.company}</h3>
                                        <p>{exp.description} ({exp.duration})</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className='section sm:gap-x-22'>
                            {/* 🎓 Education Section */}
                            <h2 className='col-span-1'>{visibleText.education?.title}</h2>
                            <div className="col-span-1"></div>
                            <div className="space-y-4 col-span-5">
                                {visibleText.education?.list.map((edu, idx) => (
                                    <div key={idx}>
                                        <h3 className='specific'>{edu.degree}</h3>
                                        <p>{edu.institute} – {edu.location}</p>
                                        <p className='font-bold'>{edu.duration}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}

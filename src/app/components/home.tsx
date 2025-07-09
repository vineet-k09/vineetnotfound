//src/app/home.tsx
// import { useLangContext } from '../../hooks/useLang';
// import Image from 'next/image';
import Navbar from './navbar';
import { useAudio } from '@/context/AudioContext';
import { visibleText } from './utility/visibletext';

export default function Home() {
    // const { visibleText } = useLangContext();

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
                                <h1 > Vineet Kushwaha  </h1>
                                <p >Web Developer</p>
                            </div>
                            <div className="col-span-1"></div>
                            <div className="reactOut col-span-3 flex gap-2">
                                <a href='https://github.com/vineet-k09' target='_blank'><i className="devicon devicon-github-original hover:text-[var(--accent)]"></i></a>
                                <a href='https://www.linkedin.com/in/vineet-kushwaha-2666b5257/' target='_blank'><i className="devicon devicon-linkedin-plain hover:text-[var(--accent)]"></i></a>
                                <a href='mailTo:vineetkushwaha6325@gmail.com'><i className="fa-solid fa-envelope hover:text-[var(--accent)]"></i></a>
                            </div>
                            <p
                                style={{
                                    fontSize: '1.2em'
                                }}
                                className='text-3xl col-span-8'>
                                I&apos;m a <span className='specific'>
                                    <span className="font-extrabold">&#123;</span> full-stack web developer <span className="font-extrabold">&#125;</span></span> with a strong grip on React, Node.js, and everything in between. <span className="specific">I like building</span> responsive, real-world applications that are easy to use and fun to make. <br /> Alongside web dev, I use Python for automating tasks, experimenting with ideas, and working on computer vision projects. I&apos;m also studying Data Science, which adds some extra perspective to how I solve problems and think about code. I’m still learning, but I try to build with intention and keep getting better with every project.
                            </p>

                            <button
                                style={{
                                    color: isPlaying ? 'var(--accent)' : 'var(--bg)'
                                }}
                                onClick={toggleAudio}
                                className="hover:scale-120 transition-all h-8 w-12 text-center justify-center rounded-2xl boxShadow 
                                bg-[var(--text)]
                                "> ♫ </button>
                        </section>
                        <section className='section grid grid-cols-7'>
                            <h2 className='col-span-1'>Skills</h2>
                            <div className="col-span-1"></div>
                            <div className="col-span-5">
                                <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                                    <li className="flex items-center gap-2 specific">
                                        <i className="devicon-react-original colored text-xl "></i> React
                                    </li>
                                    <li className="flex items-center gap-2 specific">
                                        <i className="devicon-nodejs-plain colored text-xl"></i> Node.js
                                    </li>
                                    <li className="flex items-center gap-2 specific">
                                        <i className="devicon-mongodb-plain colored text-xl"></i> MongoDB
                                    </li>
                                    <li className="flex items-center gap-2 specific">
                                        <i className="devicon-python-plain text-blue-500 text-xl"></i> Python
                                    </li>
                                    <li className="flex items-center gap-2 specific">
                                        <i className="devicon-typescript-plain colored text-xl"></i> TypeScript
                                    </li>
                                    <li className="flex items-center gap-2 specific">
                                        <i className="devicon-tailwindcss-original colored text-xl"></i> TailwindCSS
                                    </li>
                                    <li className="flex items-center gap-2 specific">
                                        <i className="devicon-git-plain colored text-xl"></i> Git
                                    </li>
                                    <li className="flex items-center gap-2 specific">
                                        <i className="devicon-docker-plain colored text-xl"></i> Docker
                                    </li>
                                </ul>
                            </div>
                        </section>
                        <section className='section'>
                            {/* 🚀 Projects Section */}
                            <h2 className='col-span-1'>Projects</h2>
                            <div className="col-span-1"></div>
                            <div
                                className="space-y-4 grid grid-cols-2 gap-4 col-span-5 items-start">
                                {visibleText.projects?.list?.map((project, idx) => (
                                    <div
                                        key={idx}
                                        style={{
                                            // background: 'rgba(var(--accent-rgb), 0.29)'
                                            background: 'var(--text)',
                                            color: 'var(--bg)',
                                        }}
                                        className='border boxShadow p-4 rounded-2xl hover:scale-110 duration-100'>
                                        <h3 className='specific text-3xl'>{project.title}</h3>
                                        <p>{project.description}</p>
                                        <a href={project.github} target='_blank'>
                                            <i
                                                className="devicon devicon-github-original 
                                                text-[var(--bg)] hover:text-[var(--accent)]"></i></a>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className='section sm:gap-x-20'>
                            {/* 💼 Experience Section */}
                            <h2 className='col-span-1'>Experience</h2>
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

                        <section className='section sm:gap-x-20'>
                            {/* 🎓 Education Section */}
                            <h2 className='col-span-1'>{visibleText.education?.mainLabel}</h2>
                            <div className="col-span-1"></div>
                            <div className="space-y-4 col-span-5">
                                {visibleText.education?.list.map((edu, idx) => (
                                    <div key={idx}>
                                        <h3 className='specific'>{edu.degree}</h3>
                                        <p>{edu.institute} – {edu.location}</p>
                                        <p>{edu.duration}</p>
                                        <p className='font-bold'>{edu.cgpa}</p>
                                        <ul className="list-disc grid grid-cols-3">
                                            {edu.courses.map((course, i) => (
                                                <li key={i}>{course}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* <section className='mx-8 sm:-mx-12 md:-mx-20 lg:-mx-40 mb-12'>
                            <div className="grid grid-cols-6 gap-1 overflow-hidden">
                                <Image src="/name/1.jpg" height={200} width={200} alt="Image 1: Mapleton, Maine" className='hover:scale-105 duration-200' />
                                <Image src="/name/2.jpg" height={200} width={200} alt="Image 2:Canandaigua lake, New York" className='hover:scale-105 duration-200' />
                                <Image src="/name/3.jpg" height={200} width={200} alt="Image 3:Yapacani, Bolivia" className='hover:scale-105 duration-200' />
                                <Image src="/name/4.jpg" height={200} width={200} alt="Image 4:Sea of Okhotsk" className='hover:scale-105 duration-200' />
                                <Image src="/name/5.jpg" height={200} width={200} alt="Image 5:Bellona Plateau" className='hover:scale-105 duration-200' />
                                <Image src="/name/6.jpg" height={200} width={200} alt="Image 6:Liwa, United Arab Emirate" className='hover:scale-105 duration-200' />
                            </div>
                        </section> */}
                    </div>
                </div>
            </div>
        </>
    );
}

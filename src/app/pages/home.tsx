//src/app/home.tsx
// import { useLangContext } from '../../hooks/useLang';
import Image from 'next/image';
import Navbar from '../components/narbar';

export default function Home() {
    // const { visibleText } = useLangContext();
    const visibleText = {
        "projects": {
            "mainLabel": "Projects",
            "list": [
                {
                    "title": "Endxiety",
                    "description": "AI-powered mental wellness app with anonymous chat, emotion tracking, and journaling."
                },
                {
                    "title": "Saarthi AI",
                    "description": "Multilingual scheme recommender using AI, accessible via voice and text."
                },
                {
                    "title": "BiblioVerse",
                    "description": "AI-based ebook recommender system with big data filtering and a modern UI."
                },
                {
                    "title": "Real-Time Hand Gesture MIDI Synthesizer",
                    "description": "Gesture-based MIDI controller built using OpenCV + MediaPipe for real-time music output."
                },
                {
                    "title": "Bengaluru AI Road Guardian",
                    "description": "Smart city pothole reporter with AI-based image classification and emergency dashboards."
                },
                {
                    "title": "Portfolio Website",
                    "description": "A personal site showcasing projects, resume, and creative UI experiments."
                }
            ]
        },
        "experience": {
            "mainLabel": "Work Experience",
            "list": [
                {
                    "title": "Graphic Design Intern",
                    "company": "Curiosense Innovations Pvt. Ltd.",
                    "duration": "6 months",
                    "description": "Designed branding and UI assets. Collaborated with product teams. Practiced Agile workflow."
                }
            ]
        },
        "education": {
            "mainLabel": "Education",
            "list": [
                {
                    "degree": "Bachelor of Engineering - CSE (Data Science)",
                    "institute": "Acharya Institute of Technology",
                    "duration": "Expected 2026",
                    "location": "Bengaluru",
                    "cgpa": "CGPA: 8.2/10 (up to 6th Semester)",
                    "courses": [
                        "MERN Stack", "MySQL", "Hadoop", "MongoDB", "DBMS", "DSA"
                    ]
                }
            ]
        },
    }

    return (
        <>
            <Navbar />
            <div className="container mt-10">
                <div className="grid-layout">
                    <div className="content-area">
                        <section className='hero mx-auto my-20 flex flex-col x-4'>
                            {/* 🧍 Hero Section */}
                            <h1 > Vineet Kushwaha  </h1>
                            <p >Web Developer</p>
                        </section>
                        <section className='section grid grid-cols-7'>
                            {/* 🛠️ Skills Section */}
                            <h2 className='col-span-1'>Skills</h2>
                            <div className="col-span-1"></div>
                            <ul className="grid grid-cols-2 col-span-5 sm:grid-cols-3 md:grid-cols-4 gap-2">
                                <li>React</li>
                                <li>Node.js</li>
                                <li>MongoDB</li>
                                <li>Python</li>
                                <li>TypeScript</li>
                                <li>TailwindCSS</li>
                                <li>Git</li>
                                <li>Docker</li>
                            </ul>
                        </section>
                        <section className='section'>
                            {/* 🚀 Projects Section */}
                            <h2 className='col-span-1'>Projects</h2>
                            <div className="col-span-1"></div>
                            <div
                                className="space-y-4 grid grid-cols-2 gap-4 col-span-5">
                                {visibleText.projects?.list?.map((project, idx) => (
                                    <div
                                        key={idx}
                                        style={{
                                            background: 'rgba(var(--accent-rgb), 0.29)'
                                        }}
                                        className='border boxShadow p-4 rounded-2xl'>
                                        <h3>{project.title}</h3>
                                        <p>{project.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className='section'>
                            {/* 💼 Experience Section */}
                            <h2 className='col-span-1'>Experience</h2>
                            <div className="col-span-1"></div>
                            <div className="space-y-4 col-span-5">
                                {visibleText.experience?.list.map((exp, idx) => (
                                    <div key={idx}>
                                        <h3>{exp.title} – {exp.company}</h3>
                                        <p>{exp.description} ({exp.duration})</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className='section'>
                            {/* 🎓 Education Section */}
                            <h2 className='col-span-1'>{visibleText.education?.mainLabel}</h2>
                            <div className="col-span-1"></div>
                            <div className="space-y-4 col-span-5">
                                {visibleText.education?.list.map((edu, idx) => (
                                    <div key={idx}>
                                        <h3>{edu.degree}</h3>
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

                        <section className='mx-8 sm:-mx-12 md:-mx-20 lg:-mx-40 mb-12'>
                            <div className="grid grid-cols-6 gap-1 overflow-hidden">
                                <Image src="/name/1.jpg" height={200} width={200} alt="Image 1: Mapleton, Maine" className='hover:scale-105 duration-200' />
                                <Image src="/name/2.jpg" height={200} width={200} alt="Image 2:Canandaigua lake, New York" className='hover:scale-105 duration-200' />
                                <Image src="/name/3.jpg" height={200} width={200} alt="Image 3:Yapacani, Bolivia" className='hover:scale-105 duration-200' />
                                <Image src="/name/4.jpg" height={200} width={200} alt="Image 4:Sea of Okhotsk" className='hover:scale-105 duration-200' />
                                <Image src="/name/5.jpg" height={200} width={200} alt="Image 5:Bellona Plateau" className='hover:scale-105 duration-200' />
                                <Image src="/name/6.jpg" height={200} width={200} alt="Image 6:Liwa, United Arab Emirate" className='hover:scale-105 duration-200' />
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}

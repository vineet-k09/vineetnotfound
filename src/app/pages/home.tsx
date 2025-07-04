//src/app/home.tsx
import { useLangContext } from '../../hooks/useLang';
import Image from 'next/image';

export default function Home() {
    const { visibleText } = useLangContext();

    return (
        <div className="container mt-10">
            <div className="grid-layout">
                <div className="content-area">
                    <section>
                        {/* 🧍 Hero Section */}
                        <h1 >{visibleText.name}</h1>
                        <p >{visibleText.role}</p>
                    </section>
                    <section>
                        {/* 🛠️ Skills Section */}
                        <h2>{visibleText.skills}</h2>
                        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
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
                    <section>
                        {/* 🚀 Projects Section */}
                        <h2>{visibleText.projects?.mainLabel}</h2>
                        <div className="space-y-4">
                            {visibleText.projects?.list?.map((project, idx) => (
                                <div key={idx}>
                                    <h3>{project.title}</h3>
                                    <p>{project.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                    <section>
                        {/* 💼 Experience Section */}
                        <h2>{visibleText.experience?.mainLabel}</h2>
                        <div className="space-y-4">
                            {visibleText.experience?.list.map((exp, idx) => (
                                <div key={idx}>
                                    <h3>{exp.title} – {exp.company}</h3>
                                    <p>{exp.description} ({exp.duration})</p>
                                </div>
                            ))}
                        </div>
                    </section>
                    <section>
                        {/* 🎓 Education Section */}
                        <h2>{visibleText.education?.mainLabel}</h2>
                        <div className="space-y-4">
                            {visibleText.education?.list.map((edu, idx) => (
                                <div key={idx}>
                                    <h3>{edu.degree}</h3>
                                    <p>{edu.institute} – {edu.location}</p>
                                    <p>{edu.duration}</p>
                                    <p>{edu.cgpa}</p>
                                    <ul className="list-disc ml-6">
                                        {edu.courses.map((course, i) => (
                                            <li key={i}>{course}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
            <div className="grid grid-cols-6 gap-1 overflow-hidden">
                <Image src="/name/1.jpg" height={200} width={200} alt="Image 1: Mapleton, Maine" className='hover:scale-105 duration-200' />
                <Image src="/name/2.jpg" height={200} width={200} alt="Image 2:Canandaigua lake, New York" className='hover:scale-105 duration-200' />
                <Image src="/name/3.jpg" height={200} width={200} alt="Image 3:Yapacani, Bolivia" className='hover:scale-105 duration-200' />
                <Image src="/name/4.jpg" height={200} width={200} alt="Image 4:Sea of Okhotsk" className='hover:scale-105 duration-200' />
                <Image src="/name/5.jpg" height={200} width={200} alt="Image 5:Bellona Plateau" className='hover:scale-105 duration-200' />
                <Image src="/name/6.jpg" height={200} width={200} alt="Image 6:Liwa, United Arab Emirate" className='hover:scale-105 duration-200' />
            </div>
        </div>
    );
}

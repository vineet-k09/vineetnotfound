'use client'
import ProjectCarousel from '../components/render/carousel';
import '../page.css'
import PageWrapper from '../components/utility/pageWrapper'
import { useLangContext } from '@/hooks/useLang';

export default function Projects() {
    const {visibleText} = useLangContext()
    return (
        <PageWrapper>
            <div className="grid-layout">
                <div className="content-area sm:px-10 flex flex-col items-center my-10">
                    <h2 className='text-center my-5 text-4xl font-bold'>{visibleText.projects?.title}</h2>
                    <div className="grid gap-6 grid-cols-6">
                        {visibleText.projects?.list?.map((project, idx) => (
                            <div
                                key={idx}
                                className="rounded-xl shadow-lg border p-4 bg-[var(--text)] text-[var(--bg)] transition-transform hover:scale-[1.01] col-span-6 overflow-hidden duration-250"
                            >
                                <h3 className="text-2xl mb-2">{project.title}</h3>
                                <p className="text-sm mb-2">{project.description}</p>
                                <ProjectCarousel images={project?.image} />
                                <div className="flex flex-wrap gap-2 mt-3 ">
                                    {project.stack?.map((tech, i) => (
                                        <span key={i} className="bg-[var(--bg)] text-[var(--text)] text-xs px-2 py-1 rounded cursor-default hover:bg-[var(--accent)] duration-250">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                <div className="mt-3 flex gap-4">
                                    {project.github && (
                                        <a href={project.github} target="_blank" rel="noreferrer">
                                            <i className="devicon devicon-github-original text-xl hover:text-[var(--accent)] border-2 border-[var(--text)] hover:border-[var(--accent)] rounded-full p-1 duration-250" />
                                        </a>
                                    )}
                                    {project?.live && (
                                        <a href={project.live} target="_blank" rel="noreferrer">
                                            <span className="underline hover:text-[var(--accent)] text-sm "><i className="fa-brands fa-chrome border-2 border-[var(--text)] hover:border-[var(--accent)] rounded-full p-1 -mt-1.5 -ml-2.5 duration-250"></i></span>
                                        </a>
                                    )}
                                    {project?.figma && (
                                        <a href={project.live} target="_blank" rel="noreferrer">
                                            <span className="hover:text-[var(--accent)] text-sm">
                                                <i className="devicon-figma-plain border-2 border-[var(--text)] hover:border-[var(--accent)] rounded-full p-1 -ml-2.5 duration-250"></i>
                                            </span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
}
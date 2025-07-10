import ProjectCarousel from '../components/render/carousel';
import '../page.css'

export default function Projects() {
    return (
        <PageWrapper>
            <div className="grid-layout">
                <div className="content-area sm:px-10 flex flex-col items-center">
                    <h2 className='text-center my-10 text-4xl font-bold'>Projects</h2>
                    <div className="grid gap-6">
                        {visibleText.projects?.list?.map((project, idx) => (
                            <div
                                key={idx}
                                className="rounded-xl shadow-lg border p-4 bg-[var(--text)] text-[var(--bg)] transition-transform hover:scale-[1.01]"
                            >
                                <h3 className="text-2xl mb-2">{project.title}</h3>
                                <p className="text-sm mb-2">{project.description}</p>
                                <ProjectCarousel images={project?.image} />
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {project.stack?.map((tech, i) => (
                                        <span key={i} className="bg-[var(--bg)] text-[var(--text)] text-xs px-2 py-1 rounded">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                <div className="mt-3 flex gap-4">
                                    {project.github && (
                                        <a href={project.github} target="_blank" rel="noreferrer">
                                            <i className="devicon devicon-github-original text-xl hover:text-[var(--accent)]" />
                                        </a>
                                    )}
                                    {project?.live && (
                                        <a href={project.live} target="_blank" rel="noreferrer">
                                            <span className="underline hover:text-[var(--accent)] text-sm"><i className="fa-brands fa-chrome"></i></span>
                                        </a>
                                    )}
                                    {project?.figma && (
                                        <a href={project.live} target="_blank" rel="noreferrer">
                                            <span className="hover:text-[var(--accent)] text-sm">
                                                <i className="devicon-figma-plain"></i>
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














// import '../page.css'
import { visibleText } from '../components/utility/visibletext'
import PageWrapper from '../components/utility/pageWrapper'

// export default function Projects() {
//     return (
//         <PageWrapper>
//                 <div className="grid-layout">
//                     <div className="content-area sm:px-10 flex justify-center flex-col">
//                         <h2 className='text-center my-10'>Projects</h2>
//                         <section className='section'>
//                             {/* 🚀 Projects Section */}
//                             <div
//                                 className="space-y-4 gap-4 col-span-7">
//                                 {visibleText.projects?.list?.map((project, idx) => (
//                                     <div
//                                         key={idx}
//                                         style={{
//                                             // background: 'rgba(var(--accent-rgb), 0.29)'
//                                             background: 'var(--text)',
//                                             color: 'var(--bg)',
//                                         }}
//                                         className='border boxShadow p-4 rounded-2xl hover:scale-110 duration-100'>
//                                         <h3 className='specific text-3xl'>{project.title}</h3>
//                                         <p>{project.description}</p>
//                                         <a href={project.github} target='_blank'>
//                                             <i
//                                                 className="devicon devicon-github-original 
//                                                 text-[var(--bg)] hover:text-[var(--accent)]"></i></a>
//                                     </div>
//                                 ))}
//                             </div>
//                         </section>
//                     </div>
//                 </div>
//         </PageWrapper>
//     )
// }
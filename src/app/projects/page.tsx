import '../page.css'
import { visibleText } from '../components/utility/visibletext'
import PageWrapper from '../components/utility/pageWrapper'


export default function Projects() {
    return (
        <PageWrapper>
                <div className="grid-layout">
                    <div className="content-area sm:px-10 flex justify-center flex-col">
                        <h2 className='text-center my-10'>Projects</h2>
                        <section className='section'>
                            {/* 🚀 Projects Section */}
                            <div
                                className="space-y-4 gap-4 col-span-7">
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
                    </div>
                </div>
        </PageWrapper>
    )
}
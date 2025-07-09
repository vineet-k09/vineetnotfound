import '../page.css'

import PageWrapper from '../components/utility/pageWrapper'

export default function Contact() {
    return (
        <PageWrapper>
            <div className="grid-layout">
                <div className="content-area sm:px-10 flex justify-center flex-col">
                    <h2 className='text-center my-10'>Contact</h2>
                    <section className='section'>
                            <a href='https://github.com/vineet-k09' target='_blank'><i className="devicon devicon-github-original hover:text-[var(--accent)]"></i></a>
                            <a href='https://www.linkedin.com/in/vineet-kushwaha-2666b5257/' target='_blank'><i className="devicon devicon-linkedin-plain hover:text-[var(--accent)]"></i></a>
                            <a href='mailTo:vineetkushwaha6325@gmail.com'><i className="fa-solid fa-envelope hover:text-[var(--accent)]"></i></a>
                    </section>
                </div>
            </div>
        </PageWrapper >
    )
}
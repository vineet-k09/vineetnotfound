import '../page.css'

import PageWrapper from '../components/utility/pageWrapper'

export default function Contact() {
    return (
        <PageWrapper>
            <main className="flex-grow container mt-10">
                <div className="grid-layout">
                    <div className="content-area sm:px-10">
                        <h1 className='my-10'>Contact</h1>
                        <div className="grid grid-cols-3">
                            <a href='https://github.com/vineet-k09' target='_blank'><i className="devicon devicon-github-original hover:text-[var(--accent)]"></i></a>
                            <a href='https://www.linkedin.com/in/vineet-kushwaha-2666b5257/' target='_blank'><i className="devicon devicon-linkedin-plain hover:text-[var(--accent)]"></i></a>
                            <a href='mailTo:vineetkushwaha6325@gmail.com'><i className="fa-solid fa-envelope hover:text-[var(--accent)]"></i></a>
                        </div>
                    </div>
                </div>
            </main>
        </PageWrapper >
    )
}
//src/app/contact/page.tsx
import '../page.css'
import PageWrapper from '../components/utility/pageWrapper'

export default function Contact() {
    return (
        <PageWrapper>
            <div className="grid-layout">
                <div className="content-area sm:px-10 flex justify-center flex-col">
                    <h2 className='text-center my-10'>Contact</h2>
                    {/* <section className='flex flex-col gap-y-10'> */}
                    <section className='grid grid-cols-6 gap-10'>
                        <div className='sm:col-span-2 col-span-6'>
                            <h3>GitHub</h3>
                            <a href='https://github.com/vineet-k09' target='_blank' className='flex gap-1.5 border-1 px-2 max-w-max py-2 rounded-2xl my-2 hover:text-[var(--accent)]'><i className="devicon devicon-github-original"></i><span className='my-auto'>vineet-k09</span></a>
                        </div>
                        <div className="sm:col-span-2 sm:block hidden"></div>
                        <div className='sm:col-span-2 col-span-6'>
                            <h3 className=''>LinkedIn</h3>
                            <a href='https://www.linkedin.com/in/vineet-k09/' target='_blank' className='flex gap-1.5 border-1 px-2 max-w-max py-2 rounded-2xl my-2 hover:text-[var(--accent)]'><i className="devicon devicon-linkedin-plain"></i><span className='my-auto'>vineet-k09</span></a>
                        </div>

                        <div className='col-span-6'>
                            <h3>Email</h3>
                            <a href='mailTo:vineetkushwaha6325@gmail.com' className=' flex gap-1.5 border-1 px-2 max-w-max py-2 rounded-2xl my-2 hover:text-[var(--accent)]'><i className="fa-solid fa-envelope"></i><span className='my-auto'>vineetkushwaha6325@gmail.com</span></a>
                        </div>
                    </section>
                </div>
            </div>
        </PageWrapper >
    )
}
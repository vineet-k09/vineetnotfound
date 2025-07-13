//src/app/contact/page.tsx
import '../page.css'
import PageWrapper from '../components/utility/pageWrapper'
// import Image from 'next/image'

export default function Contact() {
    return (
        <PageWrapper>
            
            <div className="grid-layout">
                <div className="content-area sm:px-10 flex justify-center flex-col">
                    <h2 className='text-center my-10'>About</h2>
                    <section className='grid grid-cols-6 gap-10'>
                        <p 
                        style={{
                            fontSize: '1.3rem'
                        }}
                        className='col-span-6'>
                            Hey there, I’m <span className="specific">Vineet Kushwaha</span>. I’m a web developer and a data science student—
                            but mostly, I’m just someone trying to make sense of the chaos, one line of code at a time.
                            <br />
                            Between pixels and Python, I’ve learned that building things—apps, ideas, futures—isn’t just about logic,
                            it’s about heart. Every bug fixed is a tiny win, every late-night debug session a quiet act of belief.
                            <br />
                            I don’t have all the answers (yet), but I’m here—learning, breaking, rebuilding. Life’s messy. So is code.
                            But when it runs… it’s kind of beautiful.
                        </p>
                    </section>
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

                        <div className='col-span-4'>
                            <h3>Email</h3>
                            <a href='mailTo:vineetkushwaha6325@gmail.com' className=' flex gap-1.5 border-1 px-2 max-w-max py-2 rounded-2xl my-2 hover:text-[var(--accent)]'><i className="fa-solid fa-envelope"></i><span className='my-auto'>vineetkushwaha6325@gmail.com</span></a>
                        </div>
                        <div className='col-span-2'>
                            <h3>Instagram</h3>
                            <a href='https://www.instagram.com/vineetwhy/' className=' flex gap-1.5 border-1 px-2 max-w-max py-2 rounded-2xl my-2 hover:text-[var(--accent)]'><i className="fa-brands fa-instagram"></i><span className='my-auto'>vineetwhy</span></a>
                        </div>
                    </section>
                </div>
            </div>
        </PageWrapper >
    )
}
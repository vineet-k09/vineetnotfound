import Theme from "./theme"
import Navbar from "../narbar"
import Footer from "../footer"
export default function PageWrapper({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className='flex flex-col min-h-screen'>
            <Theme />
            <Navbar />
            <main className="flex-grow container mt-10">
                {children}
            </main>
            <Footer />
        </div>
    )
}
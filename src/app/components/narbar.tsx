export default function Navbar() {

    return (
        <nav className="w-full Text-center justify-center border-b border-gray-300 dark:border-gray-700 py-4">
            <div className="container flex justify-between items-center">
                <h1 className="text-xl font-bold">MySite</h1>
                <ul className="flex gap-4 text-sm">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Projects</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </div>
        </nav>)
}
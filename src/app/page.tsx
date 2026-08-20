"use client";
import "./page.css";

import Home from "./components/home";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

export default function Page() {
	return (
		<main className="transition-theme duration-1500">
			<Navbar />
			<Home />
			<Footer />
		</main>
	);
}

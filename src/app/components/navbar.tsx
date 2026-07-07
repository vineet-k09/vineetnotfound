//src/app/components/navbar.tsx
"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocation } from "@/context/LocationProvider";

import { useLangContext } from "../../hooks/useLang";

const getIcon = (path: string) => {
	switch (path.trim()) {
		case "":
		case " ":
			return "fa-solid fa-house";
		case "projects":
			return "fa-regular fa-folder-open";
		case "photography":
		case "creative":
			return "fa-solid fa-palette";
		case "about":
			return "fa-regular fa-user";
		default:
			return "fa-regular fa-circle";
	}
};

export default function Navbar() {
	const { visibleText } = useLangContext();
	const pathname = usePathname();
	const [isTime, setIsTime] = useState(true);
	const [time, setTime] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const menuRef = useRef<HTMLElement>(null);
	const { weather } = useLocation();
	const { scrollY } = useScroll();

	const smoothScroll = useSpring(scrollY, {
		damping: 40,
		stiffness: 500,
	});

	const width = useTransform(smoothScroll, [0, 300], ["100vw", "70vw"]);
	const top = useTransform(smoothScroll, [0, 300], ["-1px", "8px"]);
	const bRadius = useTransform(smoothScroll, [0, 300], ["0px", "40px"]);
	// const fontSize = useTransform(smoothScroll, [0, 300], ['clamp(0.2rem, 3vw, 2.5rem)', 'clamp(1rem, 4vw, 2rem)']);

	// Update time every second
	useEffect(() => {
		const update = () => {
			const now = new Date();
			const options: Intl.DateTimeFormatOptions = {
				hour: "2-digit",
				minute: "2-digit",
				hour12: false,
				timeZone: "Asia/Kolkata",
			};
			setTime(now.toLocaleTimeString("en-IN", options));
		};

		update();
		const interval = setInterval(update, 60 * 1000);
		return () => clearInterval(interval);
	}, []);

	// Toggle time/weather every 5 seconds
	useEffect(() => {
		const toggle = setInterval(() => setIsTime((prev) => !prev), 5000);
		return () => clearInterval(toggle);
	}, []);

	// ⛔ Close if clicked outside of mobile menu
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		}
		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
			document.addEventListener("pointerdown", handleClickOutside);
		}
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("pointerdown", handleClickOutside);
		};
	}, [isOpen]);

	return (
		<>
			<motion.div
				style={{
					width: width,
					top: top,
					borderRadius: bRadius,
				}}
				className="navbar
                backdrop-blur-sm 
                 fixed z-50">
				<nav ref={menuRef} className="px-7">
					<div>
						<div className="flex justify-between items-center my-2 w-full">
							<div className="text-sm border-2 px-2.5 py-0.5 min-w-18 my-auto rounded-lg border-[var(--text)] border-opacity-10 text-[var(--text)]">
								{isTime ? time : `${weather}°C`}
							</div>
							<ul className="list-none flex gap-4 items-center">
								{visibleText.navbar.map((value, id) => {
									const path = value[1].trim();
									const isActive =
										pathname === `/${path}` ||
										(pathname === "/" && path === "");
									return (
										<li key={id} className="py-1 hidden sm:flex">
											<Link
												href={`/${path}`}
												className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all duration-200 border no-underline hover:no-underline hover:border-[rgba(var(--accent-rgb),0.3)] hover:bg-[rgba(var(--accent-rgb),0.05)] hover:text-[var(--accent)] ${isActive ? "" : "text-[var(--text)] opacity-85 hover:opacity-100"}`}
												style={{
													borderColor: isActive
														? "var(--accent)"
														: "transparent",
													backgroundColor: isActive
														? "rgba(var(--accent-rgb), 0.1)"
														: "transparent",
													color: isActive ? "var(--accent)" : "var(--text)",
												}}>
												<i
													className={`${getIcon(path)}`}
													style={{ fontSize: "13px" }}></i>
												<span>{value[0]}</span>
											</Link>
										</li>
									);
								})}
								<li>
									<button
										onClick={() => setIsOpen(!isOpen)}
										className="sm:hidden flex flex-col justify-center items-center gap-[5px] p-2"
										aria-label="Toggle menu">
										<span
											className={`block w-6 h-0.5 bg-[var(--text)] transform transition duration-300 ${isOpen ? "rotate-45 translate-y-1.5" : ""}`}
										/>
										<span
											className={`block w-6 h-0.5 bg-[var(--text)] transition duration-300 ${isOpen ? "opacity-0" : ""}`}
										/>
										<span
											className={`block w-6 h-0.5 bg-[var(--text)] transform transition duration-300 ${isOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
										/>
									</button>
								</li>
							</ul>
						</div>

						{isOpen && (
							<div
								className="
                                sm:hidden 
                                flex flex-col mt-2 pb-4 gap-3 text-center border-t border-[var(--text)] border-opacity-10 pt-3">
								{visibleText.navbar.map((value, id) => (
									<Link
										key={id}
										href={`/${value[1].trim()}`}
										onClick={() => setIsOpen(false)}
										className="hover:text-[var(--accent)] transition-colors duration-250 py-2 flex items-center justify-center gap-2">
										<i
											className={`${getIcon(value[1])}`}
											style={{ fontSize: "18px" }}></i>
										<span>{value[0]}</span>
									</Link>
								))}
							</div>
						)}
					</div>
				</nav>
			</motion.div>
		</>
	);
}

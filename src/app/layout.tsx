import { Geist, Geist_Mono } from "next/font/google";
import { Metadata } from "next";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Vineet Kushwaha — Clean Slate",
	description: "Personal website & portfolio",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/icon.png" />
				<link
					rel="stylesheet"
					href="https://cdn.jsdelivr.net/gh/vineet-k09/devicon@latest/devicon.min.css"
				/>
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
				/>
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased bg-neutral-950 text-neutral-100 min-h-screen flex flex-col justify-between p-8 font-sans`}>
				{children}
			</body>
		</html>
	);
}

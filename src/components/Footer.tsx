import React from "react";
import { ArrowUp } from "lucide-react";
import profileData from "@data/profile.json";

interface FooterProps {
  onNavClick: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
		<footer className="relative border-t border-white/10 bg-[#08090d] pt-16 pb-12 overflow-hidden">
			{/* Subtle Spider Color Glow in Footer */}
			<div className="absolute bottom-0 right-0 w-80 h-80 bg-rose-600/5 rounded-full blur-3xl pointer-events-none" />

			<div className="max-w-6xl mx-auto px-6 sm:px-12 flex flex-col gap-12 relative z-10">
				{/* Main Taller Stacked Footer Grid */}
				<div className="grid grid-cols-1 md:grid-cols-12 gap-10">
					{/* Column 1: Brand & Philosophy (5 Cols) */}
					<div className="md:col-span-5 flex flex-col gap-4">
						<div className="flex items-center gap-2">
							<h3 className="font-display font-extrabold text-white text-xl tracking-tight">
								VINEET KUSHWAHA
							</h3>
						</div>
					</div>

					<div className="md:col-span-2 flex flex-col gap-3"></div>

					{/* Column 3: Stacked Channels & Links (3 Cols) */}
					<div className="md:col-span-3 flex flex-col gap-3">
						<span className="font-mono text-[11px] font-bold text-rose-500 uppercase tracking-widest mb-1">
							CONNECT
						</span>
						<ul className="flex flex-col gap-2.5 font-nav text-xs tracking-[0.15em] font-light text-neutral-400 uppercase">
							<li>
								<a
									href={profileData.developer.social.github}
									target="_blank"
									rel="noopener noreferrer"
									className="hover:text-rose-400 transition-colors flex items-center justify-between group">
									<span>GITHUB</span>
									<span className="font-mono text-[10px] text-neutral-600 group-hover:text-rose-400 transition-colors">
										↗
									</span>
								</a>
							</li>
							<li>
								<a
									href={profileData.developer.social.linkedin}
									target="_blank"
									rel="noopener noreferrer"
									className="hover:text-rose-400 transition-colors flex items-center justify-between group">
									<span>LINKEDIN</span>
									<span className="font-mono text-[10px] text-neutral-600 group-hover:text-rose-400 transition-colors">
										↗
									</span>
								</a>
							</li>
							<li>
								<a
									href={`mailto:${profileData.developer.social.email}`}
									className="hover:text-rose-400 transition-colors flex items-center justify-between group">
									<span>EMAIL</span>
									<span className="font-mono text-[10px] text-neutral-600 group-hover:text-rose-400 transition-colors">
										↗
									</span>
								</a>
							</li>
						</ul>
					</div>
					{/* Column 2: Stacked Navigation (2 Cols) */}
					<div className="md:col-span-2 flex flex-col gap-3">
						<span className="font-mono text-[11px] font-bold text-rose-500 uppercase tracking-widest mb-1">
							SITEMAP
						</span>
						<ul className="flex flex-col gap-2.5 font-nav text-xs tracking-[0.15em] font-light text-neutral-400 uppercase">
							<li>
								<button
									onClick={() => onNavClick("overview")}
									className="hover:text-white transition-colors cursor-pointer">
									OVERVIEW
								</button>
							</li>
							<li>
								<button
									onClick={() => onNavClick("projects")}
									className="hover:text-white transition-colors cursor-pointer">
									ENGINEERING
								</button>
							</li>
							<li>
								<button
									onClick={() => onNavClick("skills")}
									className="hover:text-white transition-colors cursor-pointer">
									STACK
								</button>
							</li>
						</ul>
					</div>
				</div>

				{/* Divider & Bottom Bar */}
				<div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 font-nav text-xs tracking-[0.15em] text-neutral-500 uppercase">
					<div>
						<span>
							&copy; {new Date().getFullYear()} VINEET KUSHWAHA &bull; BENGALURU
						</span>
					</div>

					<button
						onClick={scrollToTop}
						className="spider-cut-sm bg-[#141620] hover:bg-rose-500 hover:text-white text-neutral-300 px-4 py-2 flex items-center gap-2 transition-all cursor-pointer border border-white/10">
						<span>BACK TO TOP</span>
						<ArrowUp className="w-3.5 h-3.5" />
					</button>
				</div>
			</div>
		</footer>
	);
};

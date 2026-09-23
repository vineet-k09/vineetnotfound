import React from "react";
import profileData from "@data/profile.json";

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 border-t border-white/5 bg-[#090a0e]">
      <div className="max-w-6xl mx-auto px-6 sm:px-12 flex flex-col md:flex-row items-center justify-between gap-6 font-nav text-xs tracking-[0.15em] font-light text-neutral-400 uppercase">
        
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          <span>{profileData.developer.name} &bull; {profileData.developer.location}</span>
        </div>

        <div className="flex items-center gap-8">
          <a
            href={profileData.developer.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-rose-400 transition-colors"
          >
            GITHUB
          </a>
          <a
            href={profileData.developer.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-rose-400 transition-colors"
          >
            LINKEDIN
          </a>
          <a
            href={`mailto:${profileData.developer.social.email}`}
            className="hover:text-rose-400 transition-colors"
          >
            EMAIL
          </a>
        </div>

        <div>
          <span>CRAFT & SYSTEM ENGINEERING</span>
        </div>

      </div>
    </footer>
  );
};

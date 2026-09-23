import React from "react";
import profileData from "@data/profile.json";

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 border-t border-white/[0.06] bg-[#09090b]">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs text-neutral-500">
        
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{profileData.developer.name} &bull; {profileData.developer.handle}</span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href={profileData.developer.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition-colors"
          >
            GitHub
          </a>
          <a
            href={profileData.developer.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${profileData.developer.social.email}`}
            className="hover:text-cyan-400 transition-colors"
          >
            Email
          </a>
        </div>

        <div>
          <span>Vite + React + TS &bull; Engineering Slate</span>
        </div>

      </div>
    </footer>
  );
};

'use client'
import { createContext, useContext, useRef, useState } from "react";

type AudioContextType = {
    toggleAudio: () => void;
    isPlaying: boolean;
};

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const useAudio = () =>{
    const audioContext = useContext(AudioContext)
    if (!audioContext) {
        throw new Error("AudioContext must be used within an AudioProvider");
    }
    
    return audioContext
}

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const toggleAudio = () => {
        if (!audioRef.current) return;

        if (audioRef.current.paused) {
            audioRef.current.play();
            setIsPlaying(true)
        } else {
            audioRef.current.pause();
            setIsPlaying(false)
        }
    }
    return (
        <AudioContext.Provider value={{ toggleAudio, isPlaying }}>
            <audio
                ref={audioRef}
                src="/audio/StudyAndRelax.mp3"
                loop
                preload="true"
                hidden
            />
            {children}
        </AudioContext.Provider>
    )
}
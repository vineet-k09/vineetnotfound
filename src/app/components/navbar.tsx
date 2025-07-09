//src/app/components/navbar.tsx
'use client'
import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Link from 'next/link';
import { useLocation } from '@/context/LocationProvider';

// import { useLangContext } from '../../hooks/useLang';

export default function Navbar() {
    const [isTime, setIsTime] = useState(true);
    const [time, setTime] = useState('');
    // const [temp, setTemp] = useState('--°C');
    const [isOpen, setIsOpen] = useState(false)
    const menuRef = useRef<HTMLElement>(null)
    const { weather } = useLocation()
    // const [city, setCity] = useState('Bengaluru')
    // const { visibleText } = useLangContext();
    const { scrollY } = useScroll();

    const smoothScroll = useSpring(scrollY, {
        damping: 40,
        stiffness: 500,
    })

    const width = useTransform(smoothScroll, [0, 300], ['100vw', '70vw'])
    const top = useTransform(smoothScroll, [0, 300], ['-1px', '8px'])
    const bRadius = useTransform(smoothScroll, [0, 300], ['0px', '40px'])
    const fontSize = useTransform(smoothScroll, [0, 300], ['clamp(0.2rem, 3vw, 2.5rem)', 'clamp(1rem, 4vw, 2rem)']);

    // Update time every second
    useEffect(() => {
        const update = () => {
            const now = new Date();
            const options: Intl.DateTimeFormatOptions = {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
                timeZone: 'Asia/Kolkata',
            };
            setTime(now.toLocaleTimeString('en-IN', options));
        };

        update();
        const interval = setInterval(update, 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    // // Fetch temp once (can enhance to use IP later)
    // useEffect(() => {
    //     // Helper function to fetch weather
    //     const fetchWeather = (latitude: number, longitude: number) => {
    //         fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`)
    //             .then(res => res.json())
    //             .then(data => {
    //                 const c = data?.current_weather?.temperature;
    //                 if (typeof c === 'number') setTemp(`${c}°C`);
    //                 else throw new Error('Invalid temp');
    //             })
    //             .catch(() => setTemp('N/A'));
    //     };
    //     // Try IP-based location first
    //     fetch('/api/location')
    //         .then(res => res.json())
    //         .then(loc => {
    //             const { latitude, longitude } = loc;
    //             console.log(latitude,longitude)
    //             if (latitude && longitude) {
    //                 fetchWeather(latitude, longitude);
    //             } else {
    //                 throw new Error('No location data');
    //             }
    //             // setCity(loc.city)
    //         })
    //         .catch(() => {
    //             // Fallback: Bangalore
    //             fetchWeather(12.97, 77.59);
    //         });
    // }, []);


    // Toggle time/weather every 5 seconds
    useEffect(() => {
        const toggle = setInterval(() => setIsTime(prev => !prev), 5000);
        return () => clearInterval(toggle);
    }, []);

    // ⛔ Close if clicked outside of mobile menu
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
            document.addEventListener('pointerdown', handleClickOutside)
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('pointerdown', handleClickOutside)
        }
    }, [isOpen])

    return (
        <>
            <motion.div
                style={{
                    width: width,
                    top: top,
                    borderRadius: bRadius,
                }}
                className="navbar boxShadow backdrop-blur-sm fixed">
                <nav
                    ref={menuRef}
                    className="px-7">
                    <div>
                        <div className="justify-between items-center flex text-center my-2 ">
                            <motion.h3
                                style={{
                                    fontSize: fontSize,
                                    fontWeight: 'bold'
                                }}
                                className='specific'
                            >Vineet Kushwaha</motion.h3>
                            {/* <div className="burger block sm:hidden"></div> */}
                            <ul className="list-none flex gap-5">
                                <li className='text-sm border-2 min-w-18 my-auto rounded-lg'>{isTime ? time : `${weather}°C`}</li>
                                <li className='py-1 hidden sm:flex'>
                                    {/* <a href="">Home</a> */}
                                    <Link href='/'>Home</Link>
                                </li>
                                <li className='py-1 hidden sm:flex'>
                                    <Link href="/projects">Projects</Link>
                                </li>
                                <li className='py-1 hidden sm:flex'>
                                    <Link href="/contact">Contact</Link>
                                </li>
                                <li>

                                    <button
                                        onClick={() => setIsOpen(!isOpen)}
                                        className="
                                        sm:hidden 
                                        flex flex-col justify-center items-center gap-[5px] p-2"
                                    >
                                        <span
                                            className={`block w-6 h-0.5 bg-[var(--text)] transform transition duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''
                                                }`}
                                        />
                                        <span
                                            className={`block w-6 h-0.5 bg-[var(--text)] transition duration-300 ${isOpen ? 'opacity-0' : ''
                                                }`}
                                        />
                                        <span
                                            className={`block w-6 h-0.5 bg-[var(--text)] transform transition duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''
                                                }`}
                                        />
                                    </button>
                                </li>
                            </ul>
                        </div>

                        {isOpen && (
                            <div
                                className="
                                sm:hidden 
                                flex flex-col mt-2 gap-3 text-center">
                                <Link href="/" onClick={() => setIsOpen(false)}>
                                    Home
                                </Link>
                                <Link href="/projects" onClick={() => setIsOpen(false)}>
                                    Projects
                                </Link>
                                <Link href="/contact" onClick={() => setIsOpen(false)}>
                                    Contact
                                </Link>
                            </div>
                        )}
                    </div>
                </nav>
            </motion.div>
        </>
    );
}

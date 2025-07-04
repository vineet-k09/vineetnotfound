import { useEffect, useState } from 'react';

import { useLangContext } from '../../hooks/useLang';

export default function Navbar() {
    const [isTime, setIsTime] = useState(true);
    const [time, setTime] = useState('');
    const [temp, setTemp] = useState('--°C');
    const { visibleText } = useLangContext();

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

    // Fetch temp once (can enhance to use IP later)
    useEffect(() => {
        fetch('https://api.open-meteo.com/v1/forecast?latitude=12.97&longitude=77.59&current_weather=true')
            .then(res => res.json())
            .then(data => {
                const c = data?.current_weather?.temperature;
                if (typeof c === 'number') setTemp(`${c}°C`);
            })
            .catch(() => setTemp('N/A'));
    }, []);

    // Toggle time/weather every 5 seconds
    useEffect(() => {
        const toggle = setInterval(() => setIsTime(prev => !prev), 5000);
        return () => clearInterval(toggle);
    }, []);

    return (
        <nav className="border-b container">
            <div className="grid-layout">
                <div className="content-area justify-between items-center flex text-center my-3 ">
                    <h3>{visibleText.name}</h3>

                    <ul className="list-none flex gap-5">
                        <li className='text-sm border-2 min-w-18 py-1 rounded-lg'>{isTime ? time : temp}</li>
                        <li className='py-1'><a href="#">Home</a></li>
                        <li className='py-1'><a href="#">Projects</a></li>
                        <li className='py-1'><a href="#">Contact</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

// context/LocationProvider.tsx
'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

const LocationContext = createContext({ weather: '--' })

export function LocationProvider({ children }: { children: ReactNode }) {
    const [weather, setWeather] = useState('--')

    useEffect(() => {
        fetch('/api/location')
            .then(res => res.json())
            .then(data => {
                return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${data.latitude}&longitude=${data.longitude}&current_weather=true`)
            })
            .then(res => res.json())
            .then(data => setWeather(data.current_weather.temperature))
            .catch(() => {
                setWeather('--')
            })
    }, [])

    return (
        <LocationContext.Provider value={{ weather }}>
            {children}
        </LocationContext.Provider>
    )
}

export const useLocation = () => useContext(LocationContext)

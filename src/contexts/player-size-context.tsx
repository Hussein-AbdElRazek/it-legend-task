"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface PlayerSizeContextType {
    isWide: boolean;
    toggleWide: () => void;
}

const PlayerSizeContext = createContext<PlayerSizeContextType | undefined>(undefined);

export const PlayerSizeProvider = ({ children }: { children: ReactNode }) => {
    const [isWide, setIsWide] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const initialValue = localStorage.getItem('wide');
        if (initialValue === '1' && !isWide) setIsWide(true);
    }, []);

    const toggleWide = () => {
        if (typeof window === 'undefined') return;
        const next = !isWide;
        if (next) {
            localStorage.setItem('wide', '1');
        } else {
            localStorage.removeItem('wide');
        }
        setIsWide(next);
    };

    return (
        <PlayerSizeContext.Provider value={{ isWide, toggleWide }}>
            {children}
        </PlayerSizeContext.Provider>
    );
};

export const usePlayerSize = () => {
    const context = useContext(PlayerSizeContext);
    if (context === undefined) {
        throw new Error('usePlayerSize must be used within a PlayerSizeProvider');
    }
    return context;
};

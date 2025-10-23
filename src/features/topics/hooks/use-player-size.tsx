import { useEffect, useState } from 'react'

const usePlayerSize = () => {
    const [isWide, setIsWide] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const onChange = () => setIsWide(Boolean(localStorage.getItem('wide')));
        // set initial value after mount to avoid hydration mismatches
        onChange();
        window.addEventListener('wide-mode-changed', onChange);
        window.addEventListener('storage', onChange);
        return () => {
            window.removeEventListener('wide-mode-changed', onChange);
            window.removeEventListener('storage', onChange);
        };
    }, []);

    return isWide;
}

export default usePlayerSize
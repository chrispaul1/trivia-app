import { useState, useEffect } from 'react';

export function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        window.addEventListener('resize', handleResize);
        // Cleanup function to remove event listener
        return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty array ensures effect runs only on mount and unmount

    return windowSize;
}
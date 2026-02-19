import { useState, useEffect } from 'react';

export const useBusinessOpen = () => {
    const checkIsOpen = () => {
        const now = new Date();
        const day = now.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
        const hour = now.getHours();
        const minute = now.getMinutes();
        const time = hour * 100 + minute;

        // Schedule Logic
        if (day >= 1 && day <= 3) { // Mon (1) - Wed (3)
            return false;
        } else if (day === 4) { // Thu
            return time >= 1500 && time < 2200; // 3PM - 10PM
        } else if (day === 5) { // Fri
            return time >= 1200 && time < 2200; // 12PM - 10PM
        } else if (day === 6) { // Sat
            return time >= 1200 && time < 2245; // 12PM - 10:45PM
        } else if (day === 0) { // Sun
            return time >= 1200 && time < 2200; // 12PM - 10PM
        }
        return false;
    };

    const [isOpen, setIsOpen] = useState(checkIsOpen);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsOpen(checkIsOpen());
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    return isOpen;
};

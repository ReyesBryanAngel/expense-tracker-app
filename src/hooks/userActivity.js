import { useEffect, useState, useRef } from "react";
import { refreshToken } from "../utils/globalFunctions";

export const useUserActivity = (timeUntilExpiry, navigate, location) => {
    const [isActive, setIsActive] = useState(true);
    const timeoutRef = useRef(null);
    const refreshRef = useRef(null);
    const INACTIVITY_TIMEOUT = 15 * 60 * 1000; // 15 minutes

    const logout = () => {
        setIsActive(false);
        clearInterval(refreshRef.current); // ⬅️ ensure refresh stops
        navigate("/");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    };


    const resetInactivityTimer = () => {
        setIsActive(true);
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            logout();
        }, INACTIVITY_TIMEOUT);
    };

    useEffect(() => {
        if (location.pathname === "/") return;

        const events = ["mousemove", "keydown", "click", "scroll"];
        events.forEach((event) => window.addEventListener(event, resetInactivityTimer));

        resetInactivityTimer();

        refreshRef.current = setInterval(() => {
            if (isActive) {
                refreshToken();
            }
        }, Math.max(5000, timeUntilExpiry - 10000)); // always use safe min

        return () => {
            events.forEach((event) => window.removeEventListener(event, resetInactivityTimer));
            clearTimeout(timeoutRef.current);
            clearInterval(refreshRef.current);
        };
    }, [timeUntilExpiry, isActive]);

    return isActive;
};

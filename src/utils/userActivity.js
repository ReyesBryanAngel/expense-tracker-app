import { useEffect, useState, useRef } from "react";
import { refreshToken } from "./globalFunctions";

export const useUserActivity = (timeout = 840000, navigate, location) => {
    const [isActive, setIsActive] = useState(true);
    const timeoutRef = useRef(null);
    const refreshRef = useRef(null);

    const logout = () => {
        setIsActive(false);
        navigate("/");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("isActive");
    };

    const resetInactivityTimer = () => {
        setIsActive(true);
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            logout();
        }, timeout);
    };

    useEffect(() => {
        if (location.pathname === "/") return;

        const events = ["mousemove", "keydown", "click", "scroll"];
        events.forEach((event) => window.addEventListener(event, resetInactivityTimer));

        resetInactivityTimer();

        refreshRef.current = setInterval(() => {
            refreshToken();
        }, timeout - 60000);

        return () => {
            events.forEach((event) => window.removeEventListener(event, resetInactivityTimer));
            clearTimeout(timeoutRef.current);
            clearInterval(refreshRef.current);
        };
    }, [timeout]);

    return isActive;
};

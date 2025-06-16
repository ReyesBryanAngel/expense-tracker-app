import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RouteProtector = (props) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const checkUserToken = () => {
        const userToken = JSON.parse(localStorage.getItem('accessToken'));
        if (!userToken) {
            setIsLoggedIn(false);
            return navigate('/');
        }
        setIsLoggedIn(true);
    }
    useEffect(() => {
            checkUserToken();
        }, []);
    return (
        <React.Fragment>
            {
                isLoggedIn ? props.children : null

            }
        </React.Fragment>
    );
}
export default RouteProtector;
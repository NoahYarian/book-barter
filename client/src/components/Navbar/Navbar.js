import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Userfront from "@userfront/react";

const Navbar = () => {

    const location = useLocation();
        
    const LogoutButton = Userfront.build({
      toolId: process.env.REACT_APP_USERFRONT_LOGOUT
    });
    
    if (["/dashboard", "/profile"].indexOf(location.pathname) === -1) return <></>;

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/login">Log In</Link>
                </li>
                <li>
                    <Link to="/forgot">Forgot Password</Link>
                </li>
                <li>
                    <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                    <Link to="/profile">Profile</Link>
                </li>
                <li>
                    <LogoutButton />
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;

import React from 'react';
import { Link } from 'react-router-dom';
import Userfront from "@userfront/react";

const Navbar = () => {
        
    const LogoutButton = Userfront.build({
      toolId: process.env.REACT_APP_USERFRONT_LOGOUT
    });
    
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
                    <LogoutButton />
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;

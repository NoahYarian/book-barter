import React from "react";
import { Navigate, useLocation } from 'react-router-dom';
import Userfront from '@userfront/react';

const Dashboard = () => {

    const location = useLocation();

    if (!Userfront.accessToken()) {
        return (
            <Navigate
                to={{
                    pathname: "/login",
                    state: { from: location }
                }}
            />
        );
    }

    const userData = JSON.stringify(Userfront.user, null, 2);
    
    return (
        <div>
            <h1>Dashboard</h1>
            <pre>{userData}</pre>
            <button onClick={Userfront.logout}>Logout</button>
        </div>
    );
}

export default Dashboard;
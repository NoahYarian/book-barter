import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Userfront from "@userfront/react";

import Navbar from './components/Navbar/Navbar';
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import Welcome from "./components/Welcome/Welcome";
import Dashboard from "./components/Dashboard/Dashboard";
import Profile from "./components/Profile/Profile";

const App = () => {

    Userfront.init(process.env.REACT_APP_USERFRONT_INIT);

    return (
        <BrowserRouter>
            <CssBaseline />
            <Container>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/forgot" element={<ForgotPassword />} />
                    <Route path="/welcome" element={<Welcome />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </Container>
        </BrowserRouter>
    );
}

export default App;

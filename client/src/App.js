import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import Userfront from "@userfront/react";

import Navbar from './components/Navbar/Navbar';
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import Dashboard from "./components/Dashboard/Dashboard";

const App = () => {

    Userfront.init(process.env.REACT_APP_USERFRONT_INIT);

    return (
        <BrowserRouter>
            <Container>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/forgot" element={<ForgotPassword />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </Container>
        </BrowserRouter>
    );
}

export default App;

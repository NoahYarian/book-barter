import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Userfront from "@userfront/react";

import AppBar from './components/AppBar/AppBar';
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import Welcome from "./components/Welcome/Welcome";
import Profile from "./components/Profile/Profile";
import Bookshelf from "./components/Bookshelf/Bookshelf";
import Wishlist from "./components/Wishlist/Wishlist";
import Matches from "./components/Matches/Matches";

const App = () => {

    Userfront.init(process.env.REACT_APP_USERFRONT_INIT);

    return (
        <BrowserRouter>
            <CssBaseline />
            <Container>
                <AppBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/forgot" element={<ForgotPassword />} />
                    <Route path="/welcome" element={<Welcome />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/bookshelf" element={<Bookshelf />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/matches" element={<Matches />} />
                </Routes>
            </Container>
        </BrowserRouter>
    );
}

export default App;

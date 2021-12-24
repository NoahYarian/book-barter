import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';

import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

const App = () => (
    <BrowserRouter>
        <Container>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
            </Routes>
        </Container>
    </BrowserRouter>
);

export default App;

import React from "react";
import { Link } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import Userfront from "@userfront/react";

const Login = () => {
    
    const LoginForm = Userfront.build({
      toolId: process.env.REACT_APP_USERFRONT_LOGIN
    });
    
    return (
        <Container style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100vh" }}>
            <LoginForm />
            <Typography variant="body2" align="center" style={{ margin: "20px 0 20px 0" }}>Need an account? <Link to="/">Sign Up</Link></Typography>
        </Container>
    );
}

export default Login;

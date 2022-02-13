import React from "react";
import { Container } from '@mui/material';
import Userfront from "@userfront/react";

const ForgotPassword = () => {
    
    const PasswordResetForm = Userfront.build({
      toolId: process.env.REACT_APP_USERFRONT_FORGOT
    });
    
    return (
        <Container style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100vh" }}>
            <PasswordResetForm />
        </Container>
    );
}

export default ForgotPassword;

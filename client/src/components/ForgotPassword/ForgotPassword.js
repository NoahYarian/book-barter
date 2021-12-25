import React from "react";
import Userfront from "@userfront/react";

const ForgotPassword = () => {
    
    const PasswordResetForm = Userfront.build({
      toolId: process.env.REACT_APP_USERFRONT_FORGOT
    });
    
    return (
        <div>
            <h1>Forgot Password</h1>
            <PasswordResetForm />
        </div>
    );
}

export default ForgotPassword;

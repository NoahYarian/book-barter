import React from "react";
import Userfront from "@userfront/react";

const ForgotPassword = () => {
    
    const PasswordResetForm = Userfront.build({
      toolId: process.env.REACT_APP_USERFRONT_FORGOT
    });
    
    return (
        <div>
            <PasswordResetForm />
        </div>
    );
}

export default ForgotPassword;

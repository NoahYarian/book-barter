import React from "react";
import Userfront from "@userfront/react";

const Login = () => {
    
    const LoginForm = Userfront.build({
      toolId: process.env.REACT_APP_USERFRONT_LOGIN
    });
    
    return (
        <div>
            <h1>Login</h1>
            <LoginForm />
        </div>
    );
}

export default Login;
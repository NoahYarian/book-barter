import React from 'react';
import Userfront from "@userfront/react";

const Home = () => {

    const SignupForm = Userfront.build({
      toolId: process.env.REACT_APP_USERFRONT_SIGNUP
    });

    return (
        <div>
            <h1>Home</h1>
            <SignupForm />
        </div>
    );
}

export default Home;

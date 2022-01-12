import React from 'react';
import { Link } from 'react-router-dom';
import Userfront from "@userfront/react";

import booksImage from '../../images/Stack-of-Books-Clipart.jpg';

const Home = () => {

    const SignupForm = Userfront.build({
      toolId: process.env.REACT_APP_USERFRONT_SIGNUP
    });

    return (
        <div>
            <div style={{ float: "left" }}>
                <h1>Welcome to Book Barter</h1>
                <p>Where books make new friends</p>
                <img src={booksImage} alt="snazzy stack of books" style={{ width: "500px" }} />
                {/* <a href="https://www.freevector.com/stack-of-books-clipart-vector-30222">FreeVector.com</a> */}
            </div>
            <div>
                <SignupForm />
                <p>Already have an account? <Link to="/login">Log in</Link></p>
            </div>
        </div>
    );
}

export default Home;

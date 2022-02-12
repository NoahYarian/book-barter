import React from 'react';
import { Link } from 'react-router-dom';
import Userfront from "@userfront/react";
import { Grid, Typography } from '@mui/material';

import booksImage from '../../images/Stack-of-Books-Clipart.jpg';

const Home = () => {

    const SignupForm = Userfront.build({
      toolId: process.env.REACT_APP_USERFRONT_SIGNUP
    });

    return (
        <Grid container alignItems="center" sx={{ height: "100vh" }}>
            <Grid item xs={12} sm={6} md={8}>
                <Typography sx={{ typography: { xs: "h2", md: "h1" } }} align="center" style={{ marginTop: "35px", fontWeight: "600" }}>Book Barter</Typography>
                <Typography sx={{ typography: { xs: "body1", md: "h5" } }} align="center">Where books make new friends</Typography>
                <img src={booksImage} alt="snazzy stack of books" style={{ width: "100%" }} />
                {/* <a href="https://www.freevector.com/stack-of-books-clipart-vector-30222">FreeVector.com</a> */}
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <SignupForm />
                <Typography variant="body2" align="center" style={{ margin: "20px 0 20px 0" }}>Already have an account? <Link to="/login">Log in</Link></Typography>
            </Grid>
        </Grid>
    );
}

export default Home;

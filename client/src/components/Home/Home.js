import React from 'react';
import { Button } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

const Home = () => {
    return (
        <Button size="large" variant="contained" startIcon={<SwapHorizIcon />}>Trade Books</Button>
    );
}

export default Home;
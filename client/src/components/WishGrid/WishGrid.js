import React from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '@mui/material';

import Wish from './Wish/Wish';

const WishGrid = ({ setCurrentWishId }) => {
    const wishes = useSelector((state) => state.wishes);

    return (
        <Grid container>
            {wishes.map((wish) => (
                <Grid item key={wish._id}>
                    <Wish wish={wish} setCurrentWishId={setCurrentWishId} />
                </Grid>
            ))}
        </Grid>
    );
}

export default WishGrid;

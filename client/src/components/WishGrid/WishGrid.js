import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Card, Typography } from '@mui/material';

import Wish from './Wish/Wish';

const WishGrid = ({ setCurrentWishId }) => {
    const wishes = useSelector((state) => state.wishes);

    return (
        <Grid container sx={{ mb: 1 }}>
            {wishes.length > 0 ?
                wishes.map((wish) => (
                    <Grid item key={wish._id} sx={{ width: '100%', mt: 1 }}>
                        <Wish wish={wish} setCurrentWishId={setCurrentWishId} />
                    </Grid>
                )) :
                <Grid item sx={{ width: '100%', mt: 1 }}>
                    <Card elevation={4} sx={{ p: 2 }}>
                        <Typography variant="body1">Add some titles and authors to see them listed here!</Typography>
                    </Card>
                </Grid>
            }
        </Grid>
    );
}

export default WishGrid;

import { Card, Typography, Button } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';

import { deleteWish } from '../../../actions/wishes';

const Wish = ({ wish, setCurrentWishId }) => {
    const dispatch = useDispatch();

    return (
        <Card>
            <Typography variant="h5">{wish.title}</Typography>
            <Typography variant="h6">by {wish.author}</Typography>
            <Button size="small" variant="outlined" color="primary" onClick={() => setCurrentWishId(wish._id)}>Edit</Button>
            <Button size="small" variant="contained" color="error" onClick={() => dispatch(deleteWish(wish._id))}>Delete</Button>
        </Card>
    );
}

export default Wish;

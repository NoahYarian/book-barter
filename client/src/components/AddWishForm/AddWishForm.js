import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Box } from '@mui/material';

import { createWish, updateWish } from '../../actions/wishes';

const AddWishForm = ({ currentWishId, wishData, setWishData, clear }) => {
    const dispatch = useDispatch();

    const wish = useSelector((state) => currentWishId ? state.wishes.find((wish) => wish._id === currentWishId) : null);
    const userId = useSelector((state) => state.user.userId);

    useEffect(() => {
        if (wish) setWishData(wish);
    }, [wish, setWishData]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const wishDataWithUserId = { ...wishData, userId };

        if (currentWishId) {
            dispatch(updateWish(currentWishId, wishDataWithUserId));
        } else {
            dispatch(createWish(wishDataWithUserId));
        }
        clear();
    }
    return (
        <Box
            onSubmit={handleSubmit}
            component="form"
            autoComplete="off"
            sx={{
                width: { md: '60%' },
                margin: { md: 'auto' }
            }}
        >
            <TextField sx={{ mt: -1 }} name="title" variant="outlined" label="Title" value={wishData.title} onChange={(e) => setWishData({ ...wishData, title: e.target.value })} fullWidth />
            <TextField sx={{ mt: 1 }} name="author" variant="outlined" label="Author" value={wishData.author} onChange={(e) => setWishData({ ...wishData, author: e.target.value })} required fullWidth />
            <Button sx={{ mt: 1 }} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
            <Button sx={{ mt: 1 }} variant="contained" color="error" size="small" onClick={clear} fullWidth>Clear</Button>
        </Box>
    );
}

export default AddWishForm;

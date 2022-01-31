import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, TextField, Button } from '@mui/material';

import { createWish, updateWish } from '../../actions/wishes';

const AddWishForm = ({ currentWishId, setCurrentWishId }) => {
    const dispatch = useDispatch();

    const initialState = { title: '', author: '' };
    const [wishData, setWishData] = useState(initialState);

    const wish = useSelector((state) => currentWishId ? state.wishes.find((wish) => wish._id === currentWishId) : null);
    const userId = useSelector((state) => state.user.userId);

    useEffect(() => {
        if (wish) setWishData(wish);
    }, [wish]);

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

    const clear = () => {
        setCurrentWishId(null);
        setWishData(initialState);
    }

    return (
        <Paper>
            <form onSubmit={handleSubmit}>
                <TextField name="title" variant="outlined" label="Title" value={wishData.title} onChange={(e) => setWishData({ ...wishData, title: e.target.value })} />
                <TextField name="author" variant="outlined" label="Author" value={wishData.author} onChange={(e) => setWishData({ ...wishData, author: e.target.value })} />
                <Button variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="error" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
}

export default AddWishForm;

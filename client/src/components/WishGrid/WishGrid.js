import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Card, Typography, Dialog, DialogTitle, DialogActions, Button } from '@mui/material';

import { deleteWish } from '../../actions/wishes';
import Wish from './Wish/Wish';

const WishGrid = ({ handleEdit }) => {
    const dispatch = useDispatch();

    const wishes = useSelector((state) => state.wishes);

    const [wishIdForDeletion, setWishIdForDeletion] = useState(null);
    const [open, setOpen] = useState(false);

    const confirmBeforeDelete = (wishId) => {
        setOpen(true);
        setWishIdForDeletion(wishId);
    };

    const handleClose = (confirmed) => {
        if (confirmed) dispatch(deleteWish(wishIdForDeletion));
        setOpen(false);
    };

    return (
        <>
            <Grid container spacing={1.5} sx={{ mb: 1 }}>
                {wishes.length > 0 ?
                    wishes.map((wish) => (
                        <Grid item
                            key={wish._id}
                            xs={12} sm={6} md={4}
                            sx={{
                                width: '100%',
                                '& .MuiPaper-root': { height: '100%' },
                                '& .MuiPaper-root > .wishCardText': { height: 'calc(100% - 39px)' }
                            }}
                        >
                            <Wish wish={wish} confirmBeforeDelete={confirmBeforeDelete} handleEdit={handleEdit} />
                        </Grid>
                    )) :
                    <Grid item sx={{ width: '100%', mt: 1 }}>
                        <Card elevation={4} sx={{ p: 2 }}>
                            <Typography variant="body1">Add some titles and authors to see them listed here!</Typography>
                        </Card>
                    </Grid>
                }
            </Grid>
            <Dialog
                open={open}
                onClose={() => handleClose(false)}
                aria-labelledby="wish-alert-dialog-title"
            >
                <DialogTitle id="wish-alert-dialog-title">Delete this title / author?</DialogTitle>
                <DialogActions>
                    <Button onClick={() => handleClose(true)}>Yes</Button>
                    <Button onClick={() => handleClose(false)} autoFocus>No</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default WishGrid;

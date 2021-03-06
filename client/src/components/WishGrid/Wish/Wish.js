import { Card, Typography, Button, Box } from '@mui/material';
import React from 'react';

const Wish = ({ wish, confirmBeforeDelete, handleEdit }) => {

    return (
        <Card elevation={4} sx={{ width: '100%', p: 1 }}>
            <Box className="wishCardText">
                {wish.title && <Typography variant="h5" sx={{ fontWeight: 600 }}>{wish.title}</Typography>}
                {wish.title ?
                    <Typography variant="subtitle2">by {wish.author}</Typography> :
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>{wish.author}</Typography>
                }
            </Box>
            <Box>
                <Button size="small" variant="contained" color="primary" onClick={() => handleEdit(wish._id)} sx={{ width: 'calc(50% - 4px)', mr: 1, mt: 1 }}>Edit</Button>
                <Button size="small" variant="contained" color="error" onClick={() => confirmBeforeDelete(wish._id)} sx={{ width: 'calc(50% - 4px)', mt: 1 }}>Delete</Button>
            </Box>
        </Card>
    );
}

export default Wish;

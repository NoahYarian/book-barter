import { Card, Typography, Button, Box } from '@mui/material';
import React from 'react';
import dayjs from 'dayjs';

const Book = ({ book, confirmBeforeDelete, handleEdit }) => {

    return (
        <Card elevation={4} sx={{ width: '100%', p: 1 }}>
            <Box className="bookCardText" sx={{ float: 'left', width: '50%' }}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>{book.title}</Typography>
                <Typography variant="subtitle2">by {book.author}</Typography>
                <Box sx={{ pt: 2, pb: 1 }}>
                    {book.isbn &&    <Box sx={{ '> *': { display: 'inline' } }}><Typography variant="body2" sx={{ fontWeight: 'bold'}}>ISBN: </Typography><Typography variant="body2">{book.isbn}</Typography></Box>}
                    {book.year &&    <Box sx={{ '> *': { display: 'inline' } }}><Typography variant="body2" sx={{ fontWeight: 'bold'}}>Year: </Typography><Typography variant="body2">{dayjs(book.year).year()}</Typography></Box>}
                                     <Box sx={{ '> *': { display: 'inline' } }}><Typography variant="body2" sx={{ fontWeight: 'bold'}}>Format: </Typography><Typography variant="body2">{book.format}</Typography></Box>
                                     <Box sx={{ '> *': { display: 'inline' } }}><Typography variant="body2" sx={{ fontWeight: 'bold'}}>Condition: </Typography><Typography variant="body2">{book.condition}</Typography></Box>
                    {book.details && <Box sx={{ '> *': { display: 'inline' } }}><Typography variant="body2" sx={{ fontWeight: 'bold'}}>Details: </Typography><Typography variant="body2">{book.details}</Typography></Box>}
                </Box>
            </Box>
            {book.imageURL &&
                <Box sx={{ float: 'right', width: '50%' }}>
                    <img src={book.imageURL} alt="book cover" style={{ maxWidth: 100 + '%' }} />
                </Box>
            }
            <Box>
                <Button size="small" variant="contained" color="primary" onClick={() => handleEdit(book._id)} sx={{ width: 'calc(50% - 4px)', mr: 1 }}>Edit</Button>
                <Button size="small" variant="contained" color="error" onClick={() => confirmBeforeDelete(book._id)} sx={{ width: 'calc(50% - 4px)'}}>Delete</Button>
            </Box>
        </Card>
    );
}

export default Book;

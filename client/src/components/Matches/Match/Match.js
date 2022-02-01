import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Card, Typography, Button, TextField, List, ListItem, ListItemText, Box, Avatar, Accordion, AccordionDetails, AccordionSummary, Chip } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { createMessage } from '../../../actions/messages';
import { updateMatchWithSentMessage, updateMatchWithReceivedMessage } from '../../../actions/matches';
import { socket } from '../../../api/index';

dayjs.extend(relativeTime);

const Match = ({ match }) => {
    const dispatch = useDispatch();

    const [textField, setTextField] = useState('');
    const [accordionExpanded, setAccordionExpanded] = useState(false);

    useEffect(() => {
        socket.on("newMessage", (message) => {
            dispatch(updateMatchWithReceivedMessage(message));
        });

        return () => {
            socket.off("newMessage");
        }
    });

    const messageEndRef = useRef(null);

    useEffect(() => {
        messageEndRef.current?.scrollIntoView();
    });

    useEffect(() => {
        messageEndRef.current?.scrollIntoView();
    }, [match.conversation.length]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (textField.length === 0 || textField.match(/^\s*$/g)) {
            setTextField('');
            return;
        }
        let message = {
            from: match.myUser,
            to: match.theirUser,
            text: textField,
            time: new Date()
         };
        setTextField('');
        dispatch(createMessage(message));
        dispatch(updateMatchWithSentMessage(match.theirUser.userId, message));
        socket.emit("message", message);
    }

     return (
         <div>
            <Card elevation={4} sx={{ mt: 1, p: 1 }}>
                <Box>
                    <Avatar src={match.theirUser.imageURL} alt={match.theirUser.name} sx={{ display: 'inline-block' }} />
                    <Typography variant="h4" sx={{ fontWeight: 600, ml: 1, display: 'inline' }}>{match.theirUser.name}</Typography>
                </Box>
                <Typography variant="h6" sx={{ mt: .5 }}>Their books on your wishlist:</Typography>
                <List>
                    { match.booksOfTheirsIWant.map((book) => (
                        <ListItem key={book._id}>
                            <ListItemText primary={book.title} secondary={'by ' + book.author} />
                        </ListItem>
                    ))}
                </List>
                <Typography variant="h6">Your books on their wishlist:</Typography>
                <List>
                    { match.booksOfMineTheyWant.map((book) => (
                        <ListItem key={book._id}>
                            <ListItemText primary={book.title} secondary={'by ' + book.author} />
                        </ListItem>
                    ))}
                </List>

                <Accordion expanded={accordionExpanded} onChange={() => setAccordionExpanded(prev => !prev)}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: "rgba(0,0,0,.06)"}}>
                        <Typography>{accordionExpanded ? 'Hide' : 'Show'} Chat</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 0 }}>
                        <List sx={{ overflow: "auto", maxHeight: 250 }}>
                            {match.conversation.map((message) => {
                                return (
                                    <ListItem
                                        key={message.time}
                                        sx={{ justifyContent: message.from.userId === match.myUser.userId ? 'flex-end' : 'flex-start' }}
                                    >
                                        <Chip
                                            avatar={<Avatar sx={{ mt: .5 }} alt={message.from.name + ' - ' + dayjs(message.time).fromNow()} src={message.from.imageURL} />}
                                            label={<Typography sx={{whiteSpace: 'normal', pt: .5, pb: .5 }}>{message.text}</Typography>}
                                            variant="outlined"
                                            sx={{ maxWidth: '100%', height: '100%', alignItems: 'flex-start' }}
                                        />
                                    </ListItem>
                                );
                            })}
                            <div ref={messageEndRef}></div>
                        </List>
                        <Box
                            sx={{ p: 1, '& .MuiOutlinedInput-root': { width: 'calc(100% - 74px)' } }}
                            component="form"
                            onSubmit={handleSubmit}
                        >
                            <TextField
                                sx={{ display: 'inline' }}
                                name="chat"
                                variant="outlined"
                                multiline
                                maxRows={4}
                                autoComplete='off'
                                value={textField}
                                onChange={(e) => setTextField(e.target.value)}
                            />
                            <Button
                                sx={{ display: 'inline', height: '56px', ml: 1 }}
                                variant="contained"
                                color="primary"
                                size="small"
                                type='submit'
                            >
                                <Typography>Send</Typography>
                            </Button>
                        </Box>
                    </AccordionDetails>
                </Accordion>

            </Card>
        </div>
    );
}

export default Match;

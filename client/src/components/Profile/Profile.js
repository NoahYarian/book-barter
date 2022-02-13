import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { Typography, TextField, Button, Box, Avatar } from '@mui/material';
import Userfront from '@userfront/react';

import { userLoggedIn, updateUser, logOut } from '../../actions/user';

const Profile = () => {

    const location = useLocation();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);

    const [userData, setUserData] = useState(user);
    const [imageURL, setImageURL] = useState(user.imageURL);

    if (Userfront.accessToken()) {
        if (!user.name) dispatch(userLoggedIn(Userfront.user));
    } else {
        dispatch(logOut());
        return (
            <Navigate
                to={{
                    pathname: "/login",
                    state: { from: location }
                }}
            />
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUser(userData));
    }

    return (
        <Box sx={{ width: { md: '60%' }, m: { md: 'auto' } }}>
            <Box>
                <Avatar
                    alt={userData.imageURL}
                    src={userData.imageURL}
                    sx={{ width: '224px', height: '224px', m: 'auto', mt: 1 }}
                />
            </Box>
            <Box
                component="form"
                onSubmit={handleSubmit}
                autoComplete="off"
                sx={{ '& .MuiTextField-root, .MuiButtonBase-root': { mt: 1 } }}
            >
                <TextField
                    disabled
                    name="Username"
                    label="Username"
                    value={userData.username}
                    variant="outlined"
                    fullWidth
                />
                <TextField
                    disabled
                    name="email"
                    label="E-mail"
                    value={userData.email}
                    variant="outlined"
                    fullWidth
                />
                <TextField
                    name="name"
                    label="Name"
                    value={userData.name}
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                    variant="outlined"
                    fullWidth
                />
                <Box fullWidth>
                    <TextField
                        name="imageURL"
                        label="Image URL"
                        value={imageURL}
                        onChange={(e) => setImageURL(e.target.value)}
                        variant="outlined"
                        sx={{ width: 'calc(100% - 72px)' }}
                    />
                    <Button
                        onClick={() => setUserData({ ...userData, imageURL })}
                        variant="contained"
                        color="primary"
                        size="small"
                        sx={{ height: '56px', ml: 1 }}
                    >
                        <Typography>Set</Typography>
                    </Button>
                </Box>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                >
                    <Typography>Save Changes</Typography>
                </Button>
            </Box>
        </Box>
    );
}

export default Profile;

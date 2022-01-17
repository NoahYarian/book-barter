import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { Typography, TextField, Button } from '@mui/material';
import Userfront from '@userfront/react';

import { userLoggedIn, updateUser, logOut } from '../../actions/user';

const Profile = () => {

    const location = useLocation();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);

    const [userData, setUserData] = useState(user);

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
        <div>
            <Typography variant="h2">User Profile for {userData.username}</Typography>
            <img src={userData.imageURL} alt="user avatar" style={{width: "200px"}} />
            <form onSubmit={handleSubmit}>
                <TextField name="name" variant="outlined" label="Name" value={userData.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} />
                <TextField name="email" variant="outlined" label="E-mail" value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
                <TextField name="imageURL" variant="outlined" label="Image URL" value={userData.imageURL} onChange={(e) => setUserData({ ...userData, imageURL: e.target.value })} fullWidth />
                <Button variant="contained" color="primary" size="large" type="submit">Save Changes</Button>
            </form>

        </div>
    );
}

export default Profile;

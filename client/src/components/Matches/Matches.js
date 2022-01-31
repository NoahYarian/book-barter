import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { Button, Grid } from '@mui/material';
import Userfront from '@userfront/react';

import { userLoggedIn, logOut } from "../../actions/user";
import { getMatches } from '../../actions/matches';
import Match from './Match/Match';

const Matches = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const matches = useSelector((state) => state.matches);
    const user = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getMatches());
    }, [dispatch]);

    const handleClick = () => {
        dispatch(getMatches());
    }

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


    return (
        <div>
            <Grid container>
                {matches.map((match) => (
                    <Grid item key={match.theirUser.userId}>
                        <Match match={match} />
                    </Grid>
                ))}
            </Grid>
            <Button onClick={handleClick}>Update Matches</Button>
        </div>
    );
}

export default Matches;

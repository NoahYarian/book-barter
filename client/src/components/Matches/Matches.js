import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { Button, Grid } from '@mui/material';
import Userfront from '@userfront/react';

import { userLoggedIn } from "../../actions/user";
import { getMatches } from '../../actions/matches';
import Match from './Match/Match';

const Matches = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const matches = useSelector((state) => state.matches);
    const user = useSelector(state => state.user);

    const handleClick = () => {
        dispatch(getMatches());
    }

    if (Userfront.accessToken()) {
        if (!user.name) dispatch(userLoggedIn(Userfront.user));
    } else {
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
            <Button onClick={handleClick}>Get Matches</Button>
            <Grid container>
                {matches.map((match) => (
                    <Grid item key={match.theirUser.userId}>
                        <Match match={match} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default Matches;

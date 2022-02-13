import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { Button, Grid, Typography, Card } from '@mui/material';
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
                {matches.length > 0 ?
                    matches.map((match) => (
                        <Grid item key={match.theirUser.userId} md={6} sx={{ width: '100%' }}>
                            <Match match={match} />
                        </Grid>
                    )) :
                    <Grid item>
                        <Card elevation={4} sx={{ p: 2, mt: 1, mb: 1 }}>
                            <Typography variant="body1">No matches yet. Add to your <Link to="/bookshelf">Bookshelf</Link> and <Link to="/wishlist">Wishlist</Link> and check back later!</Typography>
                        </Card>
                    </Grid>
                }
            </Grid>
            <Button onClick={handleClick}>Update Matches</Button>
        </div>
    );
}

export default Matches;

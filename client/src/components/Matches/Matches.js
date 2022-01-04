import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid } from '@mui/material';

import { getMatches } from '../../actions/matches';
import Match from './Match/Match';

const Matches = () => {
    const dispatch = useDispatch();
    const matches = useSelector((state) => state.matches);

    const handleClick = () => {
        dispatch(getMatches());
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

import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';

import { getMatches } from '../../actions/matches';

const Matches = () => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(getMatches());
    }

    return (
        <Button onClick={handleClick}>Get Matches</Button>
    );
}

export default Matches;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import Userfront from '@userfront/react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { userLoggedIn, logOut } from "../../actions/user";
import { getWishes } from '../../actions/wishes';
import WishGrid from '../WishGrid/WishGrid';
import AddWishForm from '../AddWishForm/AddWishForm';

const Wishlist = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const initialState = { title: '', author: '' };
    const [wishData, setWishData] = useState(initialState);
    const [currentWishId, setCurrentWishId] = useState(null);
    const [accordionExpanded, setAccordionExpanded] = useState(false);


    const user = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getWishes());
    }, [dispatch]);

    const clear = () => {
        setCurrentWishId(null);
        setWishData(initialState);
    }

    const handleEdit = (wishId) => {
        clear();
        setCurrentWishId(wishId);
        setAccordionExpanded(true);
        window.scrollTo(0,0);
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
            <Accordion expanded={accordionExpanded} onChange={() => setAccordionExpanded(prev => !prev)}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                    <Typography>Add a book or author</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <AddWishForm currentWishId={currentWishId} wishData={wishData} setWishData={setWishData} clear={clear} />
                </AccordionDetails>
            </Accordion>
            <WishGrid handleEdit={handleEdit} />
        </div>
    );
}

export default Wishlist;

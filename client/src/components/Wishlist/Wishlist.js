import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { getWishes } from '../../actions/wishes';
import WishGrid from '../WishGrid/WishGrid';
import AddWishForm from '../AddWishForm/AddWishForm';

const Wishlist = () => {
    const [currentWishId, setCurrentWishId] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getWishes());
    }, [dispatch]);

    return (
        <div>
            <h1>Wishlist</h1>
            <WishGrid setCurrentWishId={setCurrentWishId} />
            <AddWishForm currentWishId={currentWishId} setCurrentWishId={setCurrentWishId} />
        </div>
    );
}

export default Wishlist;

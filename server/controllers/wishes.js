import mongoose from 'mongoose';
import Wish from '../models/wish.js';

export const getWishes = async (req, res) => {
    try {
        const wishes = await Wish.find();

        res.status(200).json(wishes);
    } catch (error) {
        res.status(404).json({ messsage: error.message });
    }
}

export const createWish = async (req, res) => {
    const wish = req.body;

    const newWish = new Wish(wish);

    try {
        await newWish.save();

        res.status(201).json(newWish);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const deleteWish = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No wish with that id');

    const wish = await Wish.findByIdAndRemove(id);

    res.json({ message: 'Wish deleted successfully' });
}

export const updateWish = async (req, res) => {
    const { id } = req.params;
    const wish = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No wish with that id');

    const updatedWish = await Wish.findByIdAndUpdate(id, wish, { new: true });

    res.json(updatedWish);
}

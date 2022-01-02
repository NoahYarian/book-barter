import User from '../models/user.js';

export const getUser = async (req, res) => {
    try {
        const user = await User.find({ userId: req.userId });

        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ messsage: error.message });
    }
}

export const createUser = async (req, res) => {
    const user = req.body;

    const newUser = new User(user);

    try {
        await newUser.save();

        res.status(201).json(newUser);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateUser = async (req, res) => {
    const user = req.body;

    const updatedUser = await User.findOneAndUpdate({ userId: req.userId }, user, { new: true });

    res.json(updatedUser);
}

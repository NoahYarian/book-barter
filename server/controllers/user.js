import User from '../models/user.js';

export const userLoggedIn = async (req, res) => {
    try {
        const user = await User.find({ userId: req.userId });

        if (user.length === 0) {
            const newUser = new User({
                userId: req.body.userUuid,
                username: req.body.username,
                name: req.body.name,
                email: req.body.email,
                imageURL: req.body.image,
                dateCreated: new Date().toISOString(),
                lastLogin: new Date().toISOString(),
            });

            try {
                await newUser.save();

                return res.status(201).json(newUser);
            } catch (error) {
                return res.status(409).json({ message: error.message });
            }
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ messsage: error.message });
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await User.find({ userId: req.userId });

        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ messsage: error.message });
    }
}

export const updateUser = async (req, res) => {
    const user = req.body;

    const updatedUser = await User.findOneAndUpdate({ userId: req.userId }, user, { new: true });

    res.json(updatedUser);
}

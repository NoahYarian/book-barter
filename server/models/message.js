import mongoose from 'mongoose';
import { userSchema } from './user.js';

const messageSchema = new mongoose.Schema({
    from: userSchema,
    to: userSchema,
    text: String,
    time: Date,
});

export default mongoose.model('Message', messageSchema);

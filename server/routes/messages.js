import express from 'express';

import { getMessages, createMessage } from '../controllers/messages.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getMessages);
router.post('/', auth, createMessage);

export default router;

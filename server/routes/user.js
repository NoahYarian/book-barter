import express from 'express';

import { getUser, createUser, updateUser } from '../controllers/user.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getUser);
router.post('/', auth, createUser);
router.patch('/', auth, updateUser);

export default router;

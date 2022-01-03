import express from 'express';

import { userLoggedIn, getUser, updateUser } from '../controllers/user.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, userLoggedIn);
router.get('/', auth, getUser);
router.patch('/', auth, updateUser);

export default router;

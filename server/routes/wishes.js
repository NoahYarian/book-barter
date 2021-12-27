import express from 'express';

import { getWishes, createWish, deleteWish, updateWish } from '../controllers/wishes.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getWishes);
router.post('/', auth, createWish);
router.delete('/:id', auth, deleteWish);
router.patch('/:id', auth, updateWish);

export default router;

import express from 'express';

import { getMatches } from '../controllers/matches.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getMatches);

export default router;

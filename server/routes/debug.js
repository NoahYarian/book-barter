import express from 'express';

import { consoleLog } from '../controllers/debug.js';

const router = express.Router();

router.post('/', consoleLog);

export default router;

import express from 'express';

import { getBooks, createBook, deleteBook, updateBook } from '../controllers/books.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getBooks);
router.post('/', auth, createBook);
router.delete('/:id', auth, deleteBook);
router.patch('/:id', auth, updateBook);

export default router;

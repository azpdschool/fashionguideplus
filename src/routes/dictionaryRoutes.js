import express from 'express';
import { DictionaryController } from '../controllers/dictionaryController.js';

const router = express.Router();

router.get('/', DictionaryController.getAll);

export default router;
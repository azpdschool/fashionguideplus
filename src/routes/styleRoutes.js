import express from 'express';
import { StyleController } from '../controllers/styleController.js';

const router = express.Router();

router.get('/', StyleController.getAll);

export default router;
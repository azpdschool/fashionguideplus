import express from 'express';
import { BodyTypeController } from '../controllers/bodyTypeController.js';

const router = express.Router();

router.get('/', BodyTypeController.getAll);

export default router;
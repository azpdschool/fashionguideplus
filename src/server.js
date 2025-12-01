import express from 'express';
import dotenv from 'dotenv';
import bodyTypeRoutes from './routes/bodyTypeRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import dictionaryRoutes from './routes/dictionaryRoutes.js';
import styleRoutes from './routes/styleRoutes.js';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/body-types', bodyTypeRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/dictionary', dictionaryRoutes);
app.use('/api/styles', styleRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});
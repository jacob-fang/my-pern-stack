import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet'; 
import productRoutes from './routes/productRoutes.js';

dotenv.config(); // Load environment variables from .env file FIRST!
const PORT = process.env.PORT || 3000; // Now gets 5000 from .env

const app = express();
// Middleware setup
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Allows frontend (React on port 3000) to talk to backend (Express on port 5000)
app.use(morgan('dev')); // HTTP Request Logger
app.use(helmet()); // Security middleware

app.use('/api/products', productRoutes); // Use product routes

app.listen(PORT, () => {
  console.log('Server is running on PORT ' + PORT);
});
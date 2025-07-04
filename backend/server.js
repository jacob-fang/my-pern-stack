import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet'; 
import morgan from 'morgan';

import productRoutes from './routes/productRoutes.js';
import { sql } from './config/db.js'; 

dotenv.config(); // Load environment variables from .env file FIRST!
const PORT = process.env.PORT || 5000;

const app = express();
// Application Middleware setup
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Allows frontend (React on port 3000) to talk to backend (Express on port 5000)
app.use(helmet()); // Security middleware
app.use(morgan('dev')); // HTTP Request Logger
// Routes Middleware setup
app.use('/api/products', productRoutes); 

async function initDB() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log("Database initialized successfully");
  } catch (error) {
    console.log("Error initDB", error);
  }
}

initDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
  });
});
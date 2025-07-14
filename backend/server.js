import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet'; 
import morgan from 'morgan';

import productRoutes from './routes/productRoutes.js';
import { sql } from './config/db.js'; 
import { aj } from "./lib/arcjet.js";

dotenv.config(); // Load environment variables from .env file FIRST!
const PORT = process.env.PORT || 5001;
const app = express();


// Application Middleware setup
// Step 1: Parse JSON bodies
app.use(express.json()); 
// Step 2: Enable CORS - allows frontend to talk to backend
app.use(cors());
// Step 3: Add security headers - protect app by setting various HTTP headers
app.use(helmet()); 
// Step 4: Log HTTP requests
app.use(morgan('dev')); 
// Step 5: Rate limiting & bot protection
app.use(async (req, res, next) => {
  try {
    const decision = await aj.protect(req, {
      requested: 1, // specifies that each request consumes 1 token
    });
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        res.status(429).json({ error: "Too Many Requests" });
      } else if (decision.reason.isBot()) {
        res.status(403).json({ error: "Bot access denied" });
      } else {
        res.status(403).json({ error: "Forbidden" });
      }
      return;
    }
    // check for spoofed bots
    if (decision.results.some((result) => result.reason.isBot() && result.reason.isSpoofed())) {
      res.status(403).json({ error: "Spoofed bot detected" });
      return;
    }
    next();
  } catch (error) {
    console.log("Arcjet error", error);
    next(error);
  }
});
// Step 6: Handle routes
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
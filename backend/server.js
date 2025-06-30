import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet'; 
import morgan from 'morgan';

dotenv.config(); // Load environment variables from .env file
const app = express();
const PORT = process.env.PORT || 3000; // Default to 3000 if PORT is not set

app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS if needed
app.use(helmet()); // Security middleware
app.use(morgan('dev')); // Logging middleware

app.get('/test', (req, res) => {
  console.log(res.getHeaders());
  res.send('Hello, from backend test route!');
});

app.listen(PORT, () => {
  console.log('Server is running on PORT' + PORT);
});
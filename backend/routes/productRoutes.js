import express from 'express';
import { getAllProducts, createProduct } from '../controllers/productionControllers.js';

const router = express.Router();

router.get('/', getAllProducts); // GET all products
router.post('/', createProduct); // POST a new product 

export default router; // Export the router to use in server.js
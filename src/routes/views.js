import express from 'express';
const router = express.Router();
import { showAllProducts, showCart } from '../controllers/views.js';

// Ruta para mostrar todos los productos
router.get('/products', showAllProducts);

// Ruta para mostrar el carrito específico
router.get('/carts/:cid', showCart);

export default router;

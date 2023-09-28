import express from 'express';
const router = express.Router();
import { showAllProducts, showCart } from '../controllers/views.js';


router.get('/products', showAllProducts);

router.get('/carts/:cid', showCart);

export default router;

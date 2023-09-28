import express from 'express';
import { 
    createCart, 
    getCartById, 
    addProductToCart,
    deleteProductFromCart,
    updateCart,
    deleteAllProductsFromCart } from '../controllers/carts.js';

const router = express.Router();

router.post('/', createCart);
router.get('/:cid' , getCartById);
router.post('/:cid/product/:pid', addProductToCart);
router.delete('/:cid/products/:pid', deleteProductFromCart);
router.put('/:cid' , updateCart);
router.delete('/:cid', deleteAllProductsFromCart);

export default router
import { cartModel } from "../models/cart.model.js";

export default class CartManager{
    async createCart() {
        const newCart = await cartModel.create({ products: [] });
        return newCart;
    }
    
    async getCartById(cartId) {
        try {
            const foundCart = await cartModel.findById(cartId);
            return foundCart;
        } catch (error) {
            return null;
        }
    }
    
    async addProductToCart(cartId, productId, quantity = 1) {
        try {
            const foundCart = await cartModel.findById(cartId);
    
            if (foundCart) {
            foundCart.products.push({ productId, quantity });
            await foundCart.save();
            return foundCart;
        }
    
        return null;
        } catch (error) {
        return null;
        }
    }
    
    async getCarts() {
        try {
            const allCarts = await cartModel.find().lean();
            return allCarts;
        } catch (error) {
            return [];
        }
    }
}
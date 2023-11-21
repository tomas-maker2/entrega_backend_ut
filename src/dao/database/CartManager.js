import { cartRepository } from "../../repository/index.js";

export default class CartManager{
    async createCart() {
        const newCart = await cartRepository.create();
        return newCart;
    }
    
    async getCartById(cartId) {
        try {
            const foundCart = await cartRepository.getID(cartId)
            return foundCart;
        } catch (error) {
            return null;
        }
    }
    
    async addProductToCart(cartId, productId, quantity = 1) {
        try {
            const foundCart = await cartRepository.add(cartId);
    
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
            const allCarts = await cartRepository.get();
            return allCarts;
        } catch (error) {
            return [];
        }
    }
}
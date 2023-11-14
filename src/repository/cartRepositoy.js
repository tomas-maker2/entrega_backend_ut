import { cartModel } from "../dao/models/cart.model.js";

export class CartRepository{
    async create(){
        return await cartModel.create({ products: [] });
    }

    async getID(cartId){
        return await cartModel.findById(cartId);
    }

    async add(cartId){
        return await cartModel.findById(cartId)
    }

    async get(){
        return await cartModel.find().lean();
    }
}
import mongoose from "mongoose";

const productsCollection = 'products';

const productsSchema = new mongoose.Schema({
    title: String,
    description: String,
    code: String,
    price: Number,
    status: Boolean,
    stock: Number,
    category: String,
    thumbnails: String,
})

const productModel = mongoose.model(productsCollection, productsSchema);
export {productModel};
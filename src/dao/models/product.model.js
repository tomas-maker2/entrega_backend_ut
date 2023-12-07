import mongoose from "mongoose";
import { userModel } from "./user.model.js";

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
    owner: {
        type:String,
        default: 'admin',
        validate: {
            validator: async function (email){
                const user = await userModel.findOne({email, role: 'premium'});
                return user !== null
            },
            message: 'El propietario debe ser un usuario premium'
        }
    }
})

const productModel = mongoose.model(productsCollection, productsSchema);
export {productModel};
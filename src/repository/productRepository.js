import { productModel } from "../dao/models/product.model.js";

export  class ProductRepository {
    async get(productId){
        return await productModel.findById(productId).exec();
    }

    async products(){
        return await productModel.find().exec()
    }
    
    async delete(productId){
        return await productModel.findByIdAndRemove(productId).exec();
    }

    async update(productId, updatedProductData){
        return await productModel.findByIdAndUpdate(
            productId,
            updatedProductData,
            { new: true }
        ).exec();
    }

    async add(productData){
        return new productModel(productData);
    }
}
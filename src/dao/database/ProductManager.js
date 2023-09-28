import { productModel } from "../models/product.model.js";

class ProductManager {
    async addProduct(productData) {
        try {
        const newProduct = new productModel(productData);
        await newProduct.save();
        return newProduct;
        } catch (error) {
        console.error('Error al agregar un nuevo producto', error);
        throw error;
    }
    }

    async getProducts() {
        try {
        const products = await productModel.find().exec();
        return products;
        } catch (error) {
        console.error('Error al obtener los productos', error);
        throw error;
    }
    }

    async getProductById(productId) {
        try {
        const product = await productModel.findById(productId).exec();
        return product;
    } catch (error) {
        console.error('Error al obtener el producto por ID', error);
        throw error;
    }
    }

    async updateProduct(productId, updatedProductData) {
        try {
        const product = await productModel.findByIdAndUpdate(
            productId,
            updatedProductData,
            { new: true }
        ).exec();
        return product;
    } catch (error) {
        console.error('Error al actualizar el producto', error);
        throw error;
    }
    }

    async deleteProduct(productId) {
        try {
        const result = await productModel.findByIdAndRemove(productId).exec();
        return result !== null;
    } catch (error) {
        console.error('Error al eliminar el producto', error);
        throw error;
    }
    }
}

export default ProductManager;
// import { productModel } from "../models/product.model.js";
import { ProductRepository } from "../../repository/productRepository.js";

const productRepository = new ProductRepository();

class ProductManager {
    async addProduct(productData) {
        try {
        const newProduct = productRepository.add(productData);
        await newProduct.save();
        return newProduct;
        } catch (error) {
        console.error('Error al agregar un nuevo producto', error);
        throw error;
    }
    }

    async getProducts() {
        try {
        const products = await productRepository.products();
        return products;
        } catch (error) {
        console.error('Error al obtener los productos', error);
        throw error;
    }
    }

    async getProductById(productId) {
        try {
            // productModel.findById(productId).exec();
        const product = await productRepository.get(productId);
        return product;
    } catch (error) {
        console.error('Error al obtener el producto por ID', error);
        throw error;
    }
    }

    async updateProduct(productId, updatedProductData) {
        try {
        const product = await productRepository.update(productId, updatedProductData)
        return product;
    } catch (error) {
        console.error('Error al actualizar el producto', error);
        throw error;
    }
    }

    async deleteProduct(productId) {
        try {
        const result = await productRepository.delete(productId);
        return result !== null;
    } catch (error) {
        console.error('Error al eliminar el producto', error);
        throw error;
    }
    }
}

export default ProductManager;
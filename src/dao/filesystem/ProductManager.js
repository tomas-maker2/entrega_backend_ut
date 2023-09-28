import { promises as fsPromises } from 'fs';

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.nextId = 1;
  }

  async addProduct(productData) {
    const products = await this.getProductsFromFile();
    const newProduct = {
      id: this.nextId++,
      ...productData,
    };
    products.push(newProduct);
    await this.saveProductsToFile(products);
    return newProduct;
  }

  async getProducts() {
    return await this.getProductsFromFile();
  }

  async getProductById(productId) {
    const products = await this.getProductsFromFile();
    return products.find((product) => product.id === productId);
  }

  async updateProduct(productId, updatedProductData) {
    const products = await this.getProductsFromFile();
    const productIndex = products.findIndex((product) => product.id === productId);
    if (productIndex !== -1) {
      products[productIndex] = {
        id: productId,
        ...updatedProductData,
      };
      await this.saveProductsToFile(products);
      return products[productIndex];
    }
    return null;
  }

  async deleteProduct(productId) {
    const products = await this.getProductsFromFile();
    const productIndex = products.findIndex((product) => product.id === productId);
    if (productIndex !== -1) {
      products.splice(productIndex, 1);
      await this.saveProductsToFile(products);
      return true;
    }
    return false;
  }

  async getProductsFromFile() {
    try {
      const data = await fsPromises.readFile(this.path, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  async saveProductsToFile(products) {
    const data = JSON.stringify(products, null, 2);
    await fsPromises.writeFile(this.path, data);
  }
}

export default ProductManager;

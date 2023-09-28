import { promises as fsPromises } from 'fs';

class CartManager {
  constructor(filePath) {
    this.path = filePath;
    this.nextCartId = 1;
  }

  async createCart() {
    const carts = await this.getCartsFromFile();
    const newCart = {
      id: this.nextCartId++,
      products: [],
    };
    carts.push(newCart);
    await this.saveCartsToFile(carts);
    return newCart;
  }

  async getCartById(cartId) {
    const carts = await this.getCartsFromFile();
    return carts.find((cart) => cart.id === cartId);
  }

  async addProductToCart(cartId, productId, quantity = 1) {
    const carts = await this.getCartsFromFile();
    const cartIndex = carts.findIndex((cart) => cart.id === cartId);

    if (cartIndex !== -1) {
      carts[cartIndex].products.push({ productId, quantity });
      await this.saveCartsToFile(carts);
      return carts[cartIndex];
    }

    return null;
  }

  async getCarts() {
    return await this.getCartsFromFile();
  }

  async getCartsFromFile() {
    try {
      const data = await fsPromises.readFile(this.path, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  async saveCartsToFile(carts) {
    const data = JSON.stringify(carts, null, 2);
    await fsPromises.writeFile(this.path, data);
  }
}

export default CartManager;

import { ProductRepository } from "./productRepository.js";
import { CartRepository } from "./cartRepositoy.js";
import { FakerRepository } from "./fakerRepository.js";

const productRepository = new ProductRepository();
const cartRepository = new CartRepository()
const fakerRepository = new FakerRepository()

export {productRepository, cartRepository, fakerRepository}
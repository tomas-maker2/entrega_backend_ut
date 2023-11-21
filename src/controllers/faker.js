import { fakerRepository } from "../repository/index.js";

export class FakerController {
    execute(req, res) {
        const numberOfProducts = 100;
        const products = [];

        for (let i = 0; i < numberOfProducts; i++) {
            const product = fakerRepository.get();
            const productDTO = {
                name: `${product.name}`,
                description: `${product.description}`,
                price: `${product.price}$`
            };
            products.push(productDTO);
        }

        res.send(products);
    }
}

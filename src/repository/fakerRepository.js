import {fakerES as faker} from '@faker-js/faker'

export class FakerRepository {
    get(){
        const product = {
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: faker.commerce.price({ min: 100, max: 200 })
        }
        return product
    }
}
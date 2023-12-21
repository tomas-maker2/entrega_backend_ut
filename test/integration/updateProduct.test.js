import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest('http://localhost:8080')

describe('Test de actualizar productos' , () => {
    it('Deberia actualizar un producto al hacer un Put a /api/products/:pid', async () => {
        const productId = '650dcca1b0e42de7bb32202d'

        const updatedProductData = {
            name: 'NuevoNombre',
            // Otros campos actualizados
        };

        const response = await requester
            .put(`/api/products/${productId}`)
            .send(updatedProductData)

        expect(response.status).to.equal(200)

        expect(response.body).to.be.an('object')

        expect(response.body).to.have.property('name', 'Iphone 12')

    
    })
})
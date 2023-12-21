import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

describe('Test de agregar productos', () => {
    it('Debería agregar un nuevo producto al hacer un POST a /api/products', async () => {
        const productoNuevo = {
            name: 'Camioneta 4*4',
            price: 1999.99,
            description: 'Descripcion del nuevo producto'
        };

        const { statusCode, body } = await requester
            .post('/api/products')
            .send(productoNuevo);

        if (statusCode === 200) {
            // Caso de éxito
            expect(body).to.have.property('status', 'success');
            expect(body).to.have.property('payload');
            expect(body.payload).to.have.property('id');
            expect(body.payload.name).to.equal(productoNuevo.name);
            expect(body.payload.price).to.equal(productoNuevo.price);
            expect(body.payload.description).to.equal(productoNuevo.description);
        } else {
            // Caso de error
            expect(body).to.have.property('status', 'error');
            expect(body).to.have.property('error');
        }
    });

    it('Debería manejar un error al agregar un producto al hacer un POST a /api/products', async () => {
        const productoInvalido = {
            // Proporciona datos inválidos para forzar un error
            name: null,
            price: 'invalid',
            description: 'Descripción inválida'
        };

        const { statusCode, body } = await requester
            .post('/api/products')
            .send(productoInvalido);

        expect(statusCode).to.equal(500);
        expect(body).to.have.property('status', 'error');
        expect(body).to.have.property('error');
    });
});







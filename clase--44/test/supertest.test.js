const assert = require('assert');
const supertest = require("supertest");

const requester = supertest("http://localhost:3000");

describe('Testing Routers', () => {
    
    describe('Router de Productos', () => {

        it('El array de productos me deberia retornar un status 200', async () => {
            const res = await requester.get('/api/products');
            assert.strictEqual(res.status, 200);
            assert(Array.isArray(res.body.docs));
        });

        it('debería obtener un producto por su ID y devolver el estado 200', async () => {
            const productId = '660c84dd63cb6fcdd9399ee7';
            const res = await requester.get(`/api/products/${productId}`);
            assert.strictEqual(res.status, 200);
            assert.strictEqual(res.body._id, productId);
        });

        it('debería eliminar un producto existente y devolver el estado 200', async () => {
            const productId = "66580474ffc11ba30d14870b";

            const res = await requester.delete(`/api/products/${productId}`);
            assert.strictEqual(res.status, 200);

        });
    });
    describe("Testing de Usuarios", () => {
        it("Se puede crear un nuevo usuario", async () => {
            
            const nuevoUsuario = {
                first_name: "Nuevo",
                last_name: "Contacto",
                email: "potele@tubbies.com.ar",
                password: "123456",
                age: 30,
            };

          
            const res = await requester.post('/api/users/register').send(nuevoUsuario);
            assert.strictEqual(res.status, 302);  
            //Chequeo si me redirecciona al login.  
        });
        it("No debería permitir iniciar sesión con una contraseña incorrecta", async () => {
            const loginData = {
                email: "potele@tubbie.com.ar",
                password: "firulais"
            };

            const res = await requester.post('/api/users/login').send(loginData);
            assert.strictEqual(res.status, 401);
            assert.strictEqual(res.text, "Contraseña incorrecta");
        });
    });


});

const request = require('supertest');
const app = require('../src/app');

// Configurar credenciales para auth básica
const AUTH_USER = process.env.AUTH_USER || 'admin';
const AUTH_PASS = process.env.AUTH_PASS || '1234';
const authHeader = 'Basic ' + Buffer.from(`${AUTH_USER}:${AUTH_PASS}`).toString('base64');

describe('API de contactos de HubSpot', () => {
  let createdContactId = null;

  test('Debería crear un nuevo contacto', async () => {
    const nuevoContacto = {
      firstName: 'Test',
      lastName: 'User',
      email: `testuser${Date.now()}@example.com`,
      phone: '1234567890',
    };

    const response = await request(app)
      .post('/contacts')
      .set('Authorization', authHeader)
      .send(nuevoContacto);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');

    createdContactId = response.body.id;
  });

  test('Debería obtener el contacto creado por ID', async () => {
    if (!createdContactId) return;

    const response = await request(app)
      .get(`/contacts/${createdContactId}`)
      .set('Authorization', authHeader);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id', createdContactId);
  });

  test('Debería eliminar el contacto creado', async () => {
    if (!createdContactId) return;

    const response = await request(app)
      .delete(`/contacts/${createdContactId}`)
      .set('Authorization', authHeader);

    expect(response.statusCode).toBe(200);
  });
});

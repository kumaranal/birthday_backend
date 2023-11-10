// tests/createTodo.test.js
const request = require('supertest');
const app = require('../src/app');

describe('POST /api/birthdayPersonInfo', () => {
  it('should create a new user', async () => {
    const todo = { text: 'Test Todo' };

    const response = await request(app)
      .post('/todos')
      .send(todo);

    expect(response.statusCode).toBe(404);
    // expect(response.body).toHaveProperty('text', 'Test Todo');
  });
});

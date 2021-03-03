const { connection } = require('mongoose');
const supertest = require('supertest');
const Batch = require('../models/batch');
const Sequence = require('../models/sequence');
const { app } = require('../app');

const api = supertest(app);

const completeData = {
  size: 'M',
  color: 'red',
  quantity: 50,
};

beforeAll(async () => {
  await Sequence.deleteMany({});
  await Batch.deleteMany({});
  await new Sequence({ name: 'batch', last: 0 }).save();
});

describe('create batch', () => {
  test('success with complete data', async () => {
    const { body, status } = await api.post('/api/batches').send(completeData);
    expect(status).toBe(201);
    expect(body.number).toBeGreaterThan(0);
    expect(body.size).toBe(completeData.size);
    expect(body.color).toBe(completeData.color);
    expect(body.quantity).toBe(completeData.quantity);
  });
});

afterAll(() => connection.close());

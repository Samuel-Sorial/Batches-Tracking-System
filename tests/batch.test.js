const { connection } = require('mongoose');
const supertest = require('supertest');
const Batch = require('../models/batch');
const Sequence = require('../models/sequence');
const { app } = require('../app');
const { completeData, invalidData } = require('./helper/DataSamples.json');
const { addBatches } = require('./helper/functions');

const api = supertest(app);

beforeAll(async () => {
  await Sequence.deleteMany({});
  await Batch.deleteMany({});
  await new Sequence({ name: 'batch', last: 0 }).save();
});

describe('find all batches', () => {
  test('success with all data', async () => {
    await Promise.all(addBatches(50, api));
    const { body, status } = await api.get('/api/batches');
    expect(status).toBe(200);
    expect(body.length).toBe(50);
  });
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
  test('failes with invalid data', async () => {
    const { status } = await api.post('/api/batches').send(invalidData);
    expect(status).toBe(400);
  });
});

afterAll(() => connection.close());

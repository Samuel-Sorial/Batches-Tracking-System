/* eslint-disable no-underscore-dangle */
const rewire = require('rewire');
const ObjectId = require('mongodb').ObjectID;

const batch = rewire('../models/batch.js');

const idToNumber = batch.__get__('convertIdToNumber');

const testingData = require('./objectIds.json').map((ob) =>
  ObjectId(ob._id.$oid)
);

describe('object id to number', () => {
  test('successfully generate number greater than 0', () => {
    expect(idToNumber(testingData[0])).toBeGreaterThan(0);
  });
});

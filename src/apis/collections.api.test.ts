import request from 'supertest';
import express from 'express';
import { api as collectionAPI } from './collections.api';
import { prismaMock } from '../tests/singleton';
import { time } from 'console';

beforeAll(async () => {
  const mockSubject = {
    id: 1,
    no: 'no-123',
    name: 'subject-name',
    description: 'description',
    issuer: 'issuer-name',
    brand: 'brand-name',
    status: 0,
    salesTime: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const mockCollection = {
    id: 1,
    no: 'no',
    name: 'name',
    description: 'description',
    issueTotal: 100,
    issueRemain: 90,
    createdAt: new Date(),
    updatedAt: new Date(),
    subjectId: 1,
    resourceId: 1,
  };
  prismaMock.subject.findUnique.mockResolvedValue(mockSubject);
  prismaMock.collection.create.mockResolvedValue(mockCollection);
  prismaMock.collection.findUnique.mockResolvedValue(mockCollection);
});

describe('Testing Collection API', () => {
  describe('[GET] collection in denoms', () => {
    it('response get collection', async () => {
      const app = express();
      app.use(collectionAPI);

      const mockValues = null;
      prismaMock.subject.findUnique.mockResolvedValue(mockValues);

      const dno = '123';
      return request(app).get(`/denoms/${dno}/collections`).expect(200);
    });
  });
});

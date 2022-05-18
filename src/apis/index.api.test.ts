import request from 'supertest';
import express from 'express';
import { api as indexAPI } from './index.api';

describe('Testing Index API', () => {
  describe('[GET] index in denoms', () => {
    it('response get index', async () => {
      const app = express();
      app.use(indexAPI);

      return request(app).get(`/`).expect(200);
    });
  });
});

import { prismaMock } from './singleton';
import { api as usersAPI } from '../apis/users.api';
import express from 'express';
import request from 'supertest';
import { CreateUserDto } from '../dtos/users.dto';

const bodyParser = require('body-parser');
const expectTime = new Date();
describe('Testing users API', () => {
  describe('[GET] users', () => {
    it('response find all user', async () => {
      const app = express();
      app.use(usersAPI);

      return request(app).get(`/users`).expect(200);
    });
    it('response find user by Id', async () => {
      const app = express();
      app.use(usersAPI);
      const mockUser1 = {
        id: 1,
        email: 'gg@thoughtworks.com',
        password: 'no123',
        createdAt: expectTime,
        updatedAt: expectTime,
      };
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      prismaMock.user.findUnique.mockResolvedValue(mockUser1);
      return request(app).get(`/users/1`).expect(200);
    });
  });

  describe('[POST] users', () => {
    it('response create user', async () => {
      const app = express();
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(usersAPI);
      const mockUser3 = {
        id: 2,
        email: 'goodguy@thoughtworks.com',
        password: 'yes456',
        createdAt: expectTime,
        updatedAt: expectTime,
      };
      prismaMock.user.create.mockResolvedValue(mockUser3);
      const body: CreateUserDto = { email: 'goodguy@thoughtworks.com', password: 'yes456' };
      return request(app).post('/users').send(body).expect(200, {
        id: 2,
        email: 'goodguy@thoughtworks.com',
        password: 'yes456',
        createdAt: expectTime.toISOString(),
        updatedAt: expectTime.toISOString(),
      });
    });
  });

  describe('[PUT] users', function () {
    it('response update user', async () => {
      const app = express();
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(usersAPI);

      const mockUser4 = {
        id: 20,
        email: 'guy@thoughtworks.com',
        password: '456',
        createdAt: expectTime,
        updatedAt: expectTime,
      };
      const mockUser5 = {
        id: 20,
        email: 'goodguy@thoughtworks.com',
        password: 'yes456',
        createdAt: expectTime,
        updatedAt: expectTime,
      };
      prismaMock.user.findUnique.mockResolvedValueOnce(mockUser4).mockResolvedValueOnce(mockUser5);
      const body: CreateUserDto = { email: 'goodguy@thoughtworks.com', password: 'yes456' };
      prismaMock.user.update.mockResolvedValue(mockUser5);
      return request(app).put(`/users/20`).send(body).expect(200, {
        id: 20,
        email: 'goodguy@thoughtworks.com',
        password: 'yes456',
        createdAt: expectTime.toISOString(),
        updatedAt: expectTime.toISOString(),
      });
    });
  });

  describe('[DELETE] users', () => {
    it('response delete user', async () => {
      const app = express();
      app.use(usersAPI);

      const mockUser6 = {
        id: 22,
        email: 'poiyhnnm@tworks.com',
        password: 'yes456',
        createdAt: expectTime,
        updatedAt: expectTime,
      };
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      prismaMock.user.findUnique.mockResolvedValue(mockUser6);
      prismaMock.user.delete.mockResolvedValue(mockUser6);
      return request(app).delete(`/users/22`).expect(200);
    });
  });
});

import bcrypt from 'bcrypt';
import { Sequelize } from 'sequelize';
import request from 'supertest';
import App from '@/app';
import NftRoute from '@routes/nft.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Nft', () => {
  describe('[GET] /nft/list', () => {
    it('response nft list', async () => {
      const nftRoute = new NftRoute();
      const nftService = nftRoute.nftController.nftService;

      nftService.list = jest.fn().mockReturnValue([
        {
          id: 1,
          email: 'a@email.com',
          password: await bcrypt.hash('q1w2e3r4!', 10),
        },
        {
          id: 2,
          email: 'b@email.com',
          password: await bcrypt.hash('a1s2d3f4!', 10),
        },
        {
          id: 3,
          email: 'c@email.com',
          password: await bcrypt.hash('z1x2c3v4!', 10),
        },
      ]);

      (Sequelize as any).authenticate = jest.fn();
      const app = new App([nftRoute]);
      return request(app.getServer()).get(`${nftRoute.path}`).expect(200);
    });
  });
});

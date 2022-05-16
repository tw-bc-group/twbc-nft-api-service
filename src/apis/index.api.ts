import { Request, Response, Router } from 'express';

const api = Router();

const baseUrl = '/';

api.get(baseUrl, async (req: Request, res: Response) => {
  res.json('ok');
});

export { api };

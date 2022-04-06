import { Request, Response, Router } from 'express';
import dayjs from 'dayjs';
import { generateDenomId } from '@clients/nft';
import db from '@databases';

const denomAPI = Router();

const baseUrl = '/denoms';

denomAPI.get(baseUrl, async (_: Request, res: Response) => {
  const records = await db.subject.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });

  res.json(records);
});

denomAPI.post(baseUrl, async (req: Request, res: Response) => {
  const { name, description, issuer, brand, salesTime } = req.body;
  const no = generateDenomId();
  const record = await db.subject.create({
    data: {
      name,
      description,
      issuer,
      brand,
      salesTime: dayjs(salesTime).toISOString(),
      no,
      status: 0,
    },
  });

  res.json(record);
});

denomAPI.put(`${baseUrl}/:no`, async (req: Request, res: Response) => {
  const { no } = req.params;
  const { status } = req.body;

  const record = await db.subject.update({
    data: {
      status,
    },
    where: {
      no,
    },
  });

  res.json(record);
});

export { denomAPI };

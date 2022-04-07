import { Request, Response, Router } from 'express';
import dayjs from 'dayjs';
import { generateDenomId, client, newBaseTx, generateSchema } from '@clients/nft';
import db from '@databases';

const api = Router();

const baseUrl = '/denoms';

api.get(baseUrl, async (_: Request, res: Response) => {
  const records = await db.subject.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });

  res.json(records);
});

api.post(baseUrl, async (req: Request, res: Response) => {
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

  const schema = generateSchema();
  const baseTx = newBaseTx();
  // Save response.hash to db?
  await client.nft.issueDenom(no, name, schema, true, true, baseTx);

  res.json(record);
});

api.put(`${baseUrl}/:no`, async (req: Request, res: Response) => {
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

export { api };

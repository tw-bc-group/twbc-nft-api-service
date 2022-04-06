import { Request, Response, Router } from 'express';
import { generateCollectionId } from '@clients/nft';
import db from '@databases';

const api = Router();

const baseUrl = '/denoms/:dno/collections';

api.get(baseUrl, async (req: Request, res: Response) => {
  const { dno } = req.params;

  const subject = await db.subject.findUnique({
    where: { no: dno },
    include: {
      collections: true,
    },
  });

  res.json(subject.collections);
});

api.post(baseUrl, async (req: Request, res: Response) => {
  const { dno } = req.params;
  const { name, description, issueTotal,url } = req.body;

  const subject = await db.subject.findUnique({
    where: { no: dno },
  });

  const collection = await db.collection.create({
    data: {
      name,
      description,
      issueTotal,
      no: generateCollectionId(),
      issueRemain: 0,
      subject: {
        connect: { id: subject.id },
      },
      resource: {
        create: {
          url,
          hash: 'fake hash'
        }
      },
    },
    include: { resource: true, subject: true},
  });

  res.json(collection);
});

export { api };

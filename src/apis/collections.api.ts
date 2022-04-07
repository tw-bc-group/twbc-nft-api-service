import { NextFunction, Request, Response, Router } from 'express';
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
  const { name, description, issueTotal, url } = req.body;

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
          hash: 'fake hash',
        },
      },
    },
    include: { resource: true, subject: true },
  });

  res.json(collection);
});

api.post(`${baseUrl}/:cno/apply`, async (req: Request, res: Response, next: NextFunction) => {
  const { dno, cno } = req.params;
  const { userId } = req.body;

  const subject = await db.subject.findUnique({
    where: { no: dno },
  });

  const collection = await db.collection.findUnique({
    where: { no: cno },
  });

  if (subject?.status != 1) {
    next(500)
  }

  // TODO(adam): mint nft to user's wallet address. thx

  const collectionUpdated = await db.collection.update({
    where: { id: collection.id },
    data: {
      issueTotal: {
        decrement: 1,
      },
      issueRemain: {
        increment: 1
      }
    }
  });

  res.json(collectionUpdated)
});

export { api };

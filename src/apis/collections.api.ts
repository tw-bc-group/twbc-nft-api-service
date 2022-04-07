import { NextFunction, Request, Response, Router } from 'express';
import { generateCollectionId, generateDenomId, client, newBaseTx, generateSchema, getAdminAddress, generateCollectionNftId } from '@clients/nft';
import db from '@databases';
import { RequestWithUser } from '@interfaces/auth.interface';
import { Nft } from '@interfaces/nft.interface';
import dayjs from 'dayjs';

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
  res.json(subject?.collections ?? []);
});

api.post(baseUrl, async (req: Request, res: Response) => {
  const { dno } = req.params;
  const { name, description, url } = req.body;
  const issueTotal = parseInt(req.body.issueTotal);

  const subject = await db.subject.findUnique({
    where: { no: dno },
  });

  const collection = await db.collection.create({
    data: {
      name,
      description,
      issueTotal,
      no: generateCollectionId(),
      issueRemain: issueTotal,
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

api.post(`${baseUrl}/:cno/apply`, async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const { dno, cno } = req.params;
  const { name, salesTime } = req.body;

  const subject = await db.subject.findUnique({
    where: { no: dno },
  });

  const collection = await db.collection.findUnique({
    where: { no: cno },
    include: {
      resource: true,
    }
  });

  if (subject?.status != 1) {
    next(500)
  }

  const userName = req.user.email;
  const userWallet = await client.keys.show(req.user.id.toString());
  const denomName = subject.name;
  const nftId = generateCollectionNftId(cno, collection.issueTotal - collection.issueRemain + 1)
  const data: Nft = {
    nft: {
      id: nftId,
      name: name,
    },
    denom: {
      id: dno,
      name: denomName,
    },
    creator: {
      wallet: userWallet,
      name: userName,
    },
    createdAt: dayjs(salesTime).toISOString(),
    imageUrl: collection.resource.url,
  };
  const response = await client.nft.mintNft(nftId, dno, name, collection.resource.url, JSON.stringify(data), userWallet, newBaseTx());

  await db.collection.update({
    where: { id: collection.id },
    data: {
      issueRemain: {
        decrement: 1
      }
    }
  });
  const mintRecord = await db.mintRecord.create({
    data: {
      status: 0,
      response: JSON.parse(JSON.stringify(response)),
      userId: req.user.id,
      collectionId: collection.id,
    },
  });

  res.json(mintRecord)
});

export { api };

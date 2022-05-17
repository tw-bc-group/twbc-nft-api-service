import { NextFunction, Request, Response, Router } from 'express';
import { generateCollectionId, client, generateCollectionNftId, mintAndTransfer } from '@clients/nft';
import db from '@databases';
import { RequestWithUser } from '@interfaces/auth.interface';
import { Nft } from '@interfaces/nft.interface';
import dayjs from 'dayjs';
import { User } from '@prisma/client';

const api = Router();

const baseUrl = '/denoms/:dno/collections';

api.get(baseUrl, async (req: Request, res: Response) => {
  const { dno } = req.params;
  const subject = await db.subject.findUnique({
    where: { no: dno },
    include: {
      collections: {
        include: {
          resource: true,
          mintRecords: true,
        },
      },
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
        connect: { id: subject?.id },
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
  const { name, salesTime, email } = req.body;

  const subject = await db.subject.findUnique({
    where: { no: dno },
  });

  const collection = await db.collection.findUnique({
    where: { no: cno },
    include: {
      resource: true,
    },
  });

  if (subject?.status != 1 || collection?.issueRemain === 0) {
    next(500);
    return;
  }

  let mintUser: User | null = req.user;
  if (email) {
    mintUser = await db.user.findUnique({
      where: { email: email },
    });
  }

  const userName = mintUser?.email || '';
  const userWallet = await client.keys.show(mintUser?.id.toString() || '');
  const denomName = subject?.name;
  const total = collection?.issueTotal || 0;
  const remain = collection?.issueRemain || 0;
  const nftId = generateCollectionNftId(cno, total - remain + 1) || '';
  const nft: Nft = {
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
    imageUrl: collection?.resource.url,
  };
  const response = await mintAndTransfer(nft);

  await db.collection.update({
    where: { id: collection?.id },
    data: {
      issueRemain: {
        decrement: 1,
      },
    },
  });
  const mintRecord = await db.mintRecord.create({
    data: {
      status: 0,
      no: nftId,
      response: JSON.parse(JSON.stringify(response)),
      user: {
        connect: {
          id: mintUser?.id,
        },
      },
      collection: {
        connect: {
          id: collection?.id,
        },
      },
    },
    include: {
      user: true,
      collection: true,
    },
  });

  res.json(mintRecord);
});

export { api };

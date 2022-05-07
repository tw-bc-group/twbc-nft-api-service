import {Request, Response, Router} from 'express';
import db from '@databases';

const api = Router();

const baseUrl = '/mintRecords';

api.get(baseUrl, async (req: Request, res: Response) => {
  const { email } = req.query;
  const user = await db.user.findUnique({
    where: {email: String(email)},
    include: {
      mintRecord: {
        include: {
          collection: {
            include: {
              resource: true,
              subject: true,
            },
          },
        },
      },
    },
  });

  res.json(user.mintRecord);
});

export { api };

import { NextFunction, Request, Response, Router } from 'express';
import { client } from '@clients/nft';
import { RequestWithUser } from '@interfaces/auth.interface';
import { HttpException } from '@exceptions/HttpException';
import { mock } from '@utils/mock';
import NftService from '@services/nft.service';

const api = Router();
const nftService = new NftService();

const baseUrl = '/nft';

api.get(baseUrl, async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const nfts = await nftService.list(req.user.id);
    res.status(200).json(nfts);
  } catch (error) {
    next(error);
  }
});

api.get(`${baseUrl}/transfered`, async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json(mock('../../data/TransferedNftList.json'));
  } catch (error) {
    next(error);
  }
});

api.post(`${baseUrl}/transfer`, async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json(mock('../../data/TransferedSuccfully.json'));
  } catch (error) {
    next(error);
  }
});

api.get(`${baseUrl}/:denomId/:id`, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const denomId = req.params.denomId;
    const nftId = req.params.id;
    if (!denomId || !nftId) {
      next(new HttpException(409, 'no nft found'));
    }
    const response: any = await client.nft.queryNFT(denomId, nftId);
    res.status(200).json(response.nft.data);
  } catch (error) {
    next(error);
  }
});

api.post(`${baseUrl}`, async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const denomName = req.body.denomName?.toString();
    const nftName = req.body.name?.toString();
    const imageUrl = req.body.imageUrl?.toString();
    const count = parseInt(req.body.count);
    const userId = req.user.id;
    const userName = req.user.email;
    const response = await nftService.createDenomAndNft(userId, userName, denomName, nftName, imageUrl, count);
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
});

export { api };

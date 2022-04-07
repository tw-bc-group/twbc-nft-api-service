import { NextFunction, Request, Response } from 'express';
import NftService from '@services/nft.service';
import { mock } from '@utils/mock';
import { RequestWithUser } from '@interfaces/auth.interface';

class NftController {
  public nftService = new NftService();

  public getNfts = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const nfts = await this.nftService.list(req.user.id);
      res.status(200).json(nfts);
    } catch (error) {
      next(error);
    }
  };

  public getTransferedNft = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json(mock('../../data/TransferedNftList.json'));
    } catch (error) {
      next(error);
    }
  };

  public getNftById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const nft = await this.nftService.findNftById(req.params.denomId, req.params.id);
      res.status(200).json(nft);
    } catch (error) {
      next(error);
    }
  };

  public createNft = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const denomName = req.body.denomName?.toString();
      const nftName = req.body.name?.toString();
      const imageUrl = req.body.imageUrl?.toString();
      const count = parseInt(req.body.count);
      const userId = req.user.id;
      const userName = req.user.email;
      const response = await this.nftService.createDenomAndNft(userId, userName, denomName, nftName, imageUrl, count);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  };

  public transferNft = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json(mock('../../data/TransferedSuccfully.json'));
    } catch (error) {
      next(error);
    }
  };
}

export default NftController;

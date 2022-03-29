import { NextFunction, Request, Response } from 'express';
import nftService from '@services/nft.service';
import { mock } from '@utils/mock';

class NftController {
  public nftService = new nftService();

  public getNfts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json(mock('../../data/NftList.json'));
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
      res.status(200).json(mock('../../data/NftDetail.json'));
    } catch (error) {
      next(error);
    }
  };

  public createNft = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json(mock('../../data/NftCreatedSuccessfully.json'));
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

import { NextFunction, Request, Response } from 'express';
import NftService from '@services/nft.service';
import { mock } from '@utils/mock';

class NftController {
  public nftService = new NftService();

  public getNfts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      //TODO get user address, paging
      const address = "iaa1jr0zwjhrk4y0jg79l08nlzq2q2awzjuafdgqez";
      const nfts = await this.nftService.queryOwner(address);
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
      res.status(200).json(mock('../../data/NftDetail.json'));
    } catch (error) {
      next(error);
    }
  };

  public createNft = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const creatorAddress = 'iaa1jr0zwjhrk4y0jg79l08nlzq2q2awzjuafdgqez';
      const creatorName = 'AW';
      const denomName = req.body.denomName?.toString();
      const nftName = req.body.name?.toString();
      const imageUrl = req.body.imageUrl?.toString();
      const count = parseInt(req.body.count);
      const response = await this.nftService.createNft(creatorAddress, creatorName, denomName, nftName, imageUrl, count);
      res.status(200).json(response);
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

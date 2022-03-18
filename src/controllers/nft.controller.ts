import { NextFunction, Request, Response } from 'express';
import { Nft } from '@interfaces/nft.interface';
import nftService from '@services/nft.service';
import resultService from '@services/result.service';
import { Page } from '@/vo/page.vo';

class NftController {
  public nftService = new nftService();
  public resultService = new resultService();

  public list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const nftList: Page = await this.nftService.list();

      res.status(200).json(this.resultService.toSuccess(nftList));
    } catch (error) {
      next(error);
    }
  };
}

export default NftController;

import { Router } from 'express';
import NftController from '@controllers/nft.controller';
import { Routes } from '@interfaces/routes.interface';
import { CreateNftDto } from '@dtos/nft/createnft.dto';
import { TransferNftDto } from '@dtos/nft/transfernft.dto';

import validationMiddleware from '@middlewares/validation.middleware';

class NftRoute implements Routes {
  public path = '/nft';
  public router = Router();
  public nftController = new NftController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.nftController.getNfts);
    this.router.post(`${this.path}`, validationMiddleware(CreateNftDto, 'body'), this.nftController.createNft);
    this.router.post(`${this.path}/transfer`, validationMiddleware(TransferNftDto, 'body'), this.nftController.transferNft);
    this.router.get(`${this.path}/transfered`, this.nftController.getTransferedNft);
    this.router.get(`${this.path}/:id(\\d+)`, this.nftController.getNftById);
    // TODO 其他接口
  }
}

export default NftRoute;

import { Router } from 'express';
import NftController from '@controllers/nft.controller';
import { Routes } from '@interfaces/routes.interface';

class NftRoute implements Routes {
  public path = '/nft';
  public router = Router();
  public nftController = new NftController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`, this.nftController.getNftById);
    this.router.get(`${this.path}/list`, this.nftController.list);
    // TODO 其他接口
  }
}

export default NftRoute;

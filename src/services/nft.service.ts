import { Nft } from '@interfaces/nft.interface';
import { Page } from '@/vo/page.vo';
import pageService from '@services/page.service';
import { HttpException } from '@exceptions/HttpException';

class NftService {
  public pageService = new pageService();

  // TODO 查询列表信息
  public async list(): Promise<Page> {
    const list = [];
    const nft1 = { name: 'nft name', nftId: '123', address: '0xcafebabe', createdAt: 1647570843000 };
    list.push(nft1);
    return this.pageService.buildPage(1, 10, 10, list);
  }
  public async findNftById(id: number): Promise<Nft> {
    if (!id) throw new HttpException(409, 'no nft found');
    return { name: 'nft name', id, address: '0xcafebabe', createdAt: 1647570843000 };
  }
}

export default NftService;

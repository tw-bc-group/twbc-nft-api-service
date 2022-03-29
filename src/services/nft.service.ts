import { Nft } from '@interfaces/nft.interface';
import { HttpException } from '@exceptions/HttpException';
import { newNftClient, generateDenomId, generateNftId } from '@clients/nft';
import { Client } from '@irita/irita-sdk';

class NftService {
  public nftClient: Client;

  constructor(nftClient?: Client) {
    this.nftClient = nftClient ?? newNftClient();
  }
  /**
   * Owner queries the NFTs of the specified owner
   * @param owner
   */
  public async queryOwner(owner: string): Promise<Nft[]> {
    if (!owner) throw new HttpException(409, 'no nft found');
    const ownerResponse: any = await this.nftClient.nft.queryOwner(owner);
    const idCollectionsList: { denomId: string; tokenIdsList: string[] }[] = ownerResponse.owner.idCollectionsList;
    const filteredIdCollectionsList = idCollectionsList.filter(item => item.denomId.startsWith("thoughtworks"));
    const ownedDenomIds = filteredIdCollectionsList.map(({ denomId }) => denomId);
    const ownedTokenIds = filteredIdCollectionsList.map(({ tokenIdsList }) => tokenIdsList).flat();

    const collectionResponses = await Promise.all(ownedDenomIds.map(denomId => this.nftClient.nft.queryCollection(denomId)));
    const nfts = collectionResponses.map((item: any) => item.collection.nftsList).flat();
    const ownedNfts = nfts.filter(item => ownedTokenIds.includes(item.id));
    return ownedNfts.map(nft => JSON.parse(nft.data));
  }

  public async findNftById(denomId: string, tokenId: string): Promise<Nft> {
    if (!denomId || !tokenId) throw new HttpException(409, 'no nft found');
    const response: any = await this.nftClient.nft.queryNFT(denomId, tokenId);
    return JSON.parse(response.nft.data);
  }
  }
}

export default NftService;

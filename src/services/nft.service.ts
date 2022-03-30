import { Nft } from '@interfaces/nft.interface';
import { HttpException } from '@exceptions/HttpException';
import { generateDenomId, generateNftId, newBaseTx, newNftClient } from '@clients/nft';
import { TxType, Client, BroadcastMode } from '@irita/irita-sdk';
import * as TJS from 'typescript-json-schema';
import { resolve } from 'path';

class NftService {
  public nftClient: Client;

  constructor(nftClient?: Client) {
    this.nftClient = nftClient ?? newNftClient();
  }

  generateSchema() {
    const settings: TJS.PartialArgs = {
      required: true,
    };
    const compilerOptions: TJS.CompilerOptions = {
      strictNullChecks: true,
    };
    const program = TJS.getProgramFromFiles([resolve('src/interfaces/nft.interface.ts')], compilerOptions);
    return JSON.stringify(TJS.generateSchema(program, 'Nft', settings));
  }

  /**
   * create NFT
   * @param creatorAddress string creator address
   * @param creatorName string creator name
   * @param denomName string denom name
   * @param nftName string nft name
   * @param imageUrl string nft image url
   * @param count number number of NFT to be minted
   * @returns Transaction hash string
   */
  public async createNft(creatorAddress: string, creatorName: string, denomName: string, nftName: string, imageUrl: string, count: number): Promise<{hash: string}> {
    // TODO temporarily use a higher fee and gas limit, need to work on simulate the transaction later
    if (count > 10) throw new HttpException(400, 'too many nfts in one batch');
    const baseTx = newBaseTx({
      fee: {
        denom: 'ugas',
        amount: '500000',
      },
      gas: '500000',
    });
    const sender = this.nftClient.keys.show(baseTx.from);
    const denomId = generateDenomId();
    const schema = this.generateSchema();
    const issueDenomMsg = {
      type: TxType.MsgIssueDenom,
      value: {
        id: denomId,
        name: denomName,
        schema,
        sender,
      },
    };

    const nowInMilliseconds = new Date().getTime();
    const mintNftMsgs = Array.from(Array(count)).map((_, i) => {
      const nftId = generateNftId(i + 1);
      const nft: Nft = {
        nft: {
          id: nftId,
          name: nftName,
        },
        denom: {
          id: denomId,
          name: denomName,
        },
        creator: {
          wallet: creatorAddress,
          name: creatorName,
        },
        createdAt: nowInMilliseconds,
        imageUrl
      };
      return {
        type: TxType.MsgMintNFT,
        value: {
          id: nftId,
          denom_id: denomId,
          name: nftName,
          uri: imageUrl,
          data: JSON.stringify(nft),
          sender,
          recipient: creatorAddress,
        },
      };
    });

    return await this.nftClient.tx.buildAndSend([issueDenomMsg, ...mintNftMsgs], baseTx);
  }

  /**
   * Owner queries the NFTs of the specified owner
   * @param owner
   */
  public async queryOwner(owner: string): Promise<Nft[]> {
    if (!owner) throw new HttpException(409, 'no nft found');
    const ownerResponse: any = await this.nftClient.nft.queryOwner(owner);
    const idCollectionsList: { denomId: string; tokenIdsList: string[] }[] = ownerResponse.owner.idCollectionsList;
    const filteredIdCollectionsList = idCollectionsList.filter(item => item.denomId.startsWith('thoughtworks'));
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

export default NftService;

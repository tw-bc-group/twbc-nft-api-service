import { Nft } from '@interfaces/nft.interface';
import { HttpException } from '@exceptions/HttpException';
import { generateDenomId, generateNftId, newBaseTx, newNftClient } from '@clients/nft';
import { TxType, Client } from '@irita/irita-sdk';
import * as TJS from 'typescript-json-schema';
import { resolve } from 'path';

class NftService {
  public nftClient: Client;

  constructor(nftClient?: Client) {
    this.nftClient = nftClient ?? newNftClient();
  }

  private generateSchema() {
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
   * @param denomName string denom name
   * @param nftName string nft name
   * @param imageUrl string nft image url
   * @param count number number of NFT to be minted
   * @returns Transaction hash string
   */
  public async createNft(
    denomName: string,
    nftName: string,
    imageUrl: string,
    count: number,
  ): Promise<{ hash: string }> {
    // TODO find current user info from DB
    const creatorAddress = 'iaa1jr0zwjhrk4y0jg79l08nlzq2q2awzjuafdgqez';
    const creatorName = 'AW';
    const baseTx = newBaseTx();
    const sender = await this.nftClient.keys.show(baseTx.from);
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
        imageUrl,
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
    const msgs = [issueDenomMsg, ...mintNftMsgs];
    const simulation = await this.nftClient.tx.simulate(msgs, baseTx);
    // Fee multiplier 1.2 recommended by bianjie staff
    const amount = Math.floor(simulation.gasInfo.gasUsed * 1.2).toString();
    const realTx = newBaseTx({
      fee: {
        denom: 'ugas',
        amount,
      },
      gas: amount,
    });
    return await this.nftClient.tx.buildAndSend(msgs, realTx);
  }

  /**
   * List the NFTs owned by the current user
   */
  public async list(): Promise<Nft[]> {
    // TODO find current user address from DB
    const user = "iaa1jr0zwjhrk4y0jg79l08nlzq2q2awzjuafdgqez";
    const ownerResponse: any = await this.nftClient.nft.queryOwner(user);
    const idCollectionsList: { denomId: string; tokenIdsList: string[] }[] = ownerResponse.owner.idCollectionsList;
    const ownedNftDenomIds = idCollectionsList.map(({ denomId }) => denomId);
    const ownedNftIds = idCollectionsList.map(({ tokenIdsList }) => tokenIdsList).flat();

    const collectionResponses = await Promise.all(ownedNftDenomIds.map(denomId => this.nftClient.nft.queryCollection(denomId)));
    const adminAddress = await this.nftClient.keys.show(newBaseTx().from);
    const nfts = collectionResponses
      .filter((item: any) => item.collection.denom.creator === adminAddress)
      .map((item: any) => item.collection.nftsList)
      .flat();
    const ownedNfts = nfts.filter(item => ownedNftIds.includes(item.id));
    return ownedNfts.map(nft => JSON.parse(nft.data));
  }

  public async findNftById(denomId: string, nftId: string): Promise<Nft> {
    if (!denomId || !nftId) throw new HttpException(409, 'no nft found');
    const response: any = await this.nftClient.nft.queryNFT(denomId, nftId);
    return JSON.parse(response.nft.data);
  }
}

export default NftService;

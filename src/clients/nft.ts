import config from '@config';
import { BaseTx, Key, KeyDAO, newClient, PubkeyType, SdkError, TxResult, TxType } from '@irita/irita-sdk';
import { v4 as uuid } from 'uuid';
import DB from '@databases';
import * as TJS from 'typescript-json-schema';
import { resolve } from 'path';
import { Nft } from '@interfaces/nft.interface';
import { Wallet } from '@prisma/client';

class IritaKeyDAO implements KeyDAO {
  private wallets = DB.wallet;

  async write(name: string, key: Key): Promise<void> {
    await this.wallets.create({
      data: {
        keyName: name,
        ...key,
      },
    });
  }

  async read(name: string): Promise<Key> {
    const wallet = await this.wallets.findFirst({
      where: {
        keyName: name,
      },
    });
    return {
      address: wallet?.address || '',
      privKey: wallet?.privKey || '',
    };
  }

  async delete(name: string): Promise<void> {
    const wallet = await this.wallets.findFirst({
      where: {
        keyName: name,
      },
    });
    await this.wallets.delete({ where: { id: wallet?.id } });
  }
}

export const generateDenomId = (): string => `thoughtworks${uuid().replace(/-/g, '')}`;

export const generateNftId = (count: number): string => `nft${uuid().replace(/-/g, '')}${count.toString().padStart(10, '0')}`;

export const generateNftIdByExistsCollectionId = (cid: string, count: number): string => `nft${cid}${count.toString().padStart(10, '0')}`;

export const generateCollectionId = (): string => `nft${uuid().replace(/-/g, '')}`;

export const generateCollectionNftId = (cno: string, no: number): string => `${cno}${no.toString().padStart(10, '0')}`;

export const generateSchema = () => {
  const settings: TJS.PartialArgs = {
    required: true,
  };
  const compilerOptions: TJS.CompilerOptions = {
    strictNullChecks: true,
  };
  const program = TJS.getProgramFromFiles([resolve('src/interfaces/nft.interface.ts')], compilerOptions);
  return JSON.stringify(TJS.generateSchema(program, 'Nft', settings));
};

export const getAdminAddress = async (): Promise<string> => {
  try {
    return await client.keys.show(config.irita.adminKeyName);
  } catch (e: unknown) {
    // Recover admin key
    if (e instanceof SdkError) {
      return await client.keys.recover(config.irita.adminKeyName, config.irita.keystorePassword, config.irita.adminKeyMnemonic, PubkeyType.sm2);
    }
    throw e;
  }
};

export const newBaseTx = (baseTx?: Partial<BaseTx>): BaseTx => {
  const amount = config.nodeEnv === 'production' ? '100000' : '200000';
  const defaultBaseTx: BaseTx = {
    from: config.irita.adminKeyName,
    password: config.irita.keystorePassword,
    pubkeyType: PubkeyType.sm2,
    fee: {
      denom: 'ugas',
      amount,
    },
    gas: amount,
  };
  Object.assign(defaultBaseTx, baseTx);
  return defaultBaseTx;
};

export const mintAndTransfer = async (nft: Nft): Promise<TxResult> => {
  const sender = await getAdminAddress();
  const msgs: any[] = [
    {
      type: TxType.MsgMintNFT,
      value: {
        id: nft.nft.id,
        denom_id: nft.denom.id,
        name: nft.nft.name,
        uri: nft.imageUrl,
        data: JSON.stringify(nft),
        sender,
        recipient: sender,
      },
    },
    {
      type: TxType.MsgTransferNFT,
      value: {
        id: nft.nft.id,
        denom_id: nft.denom.id,
        sender,
        recipient: nft.creator.wallet,
      },
    },
  ];
  const simulation = await client.tx.simulate(msgs, newBaseTx());
  // Fee multiplier 2 recommended by bianjie staff
  const amount = Math.floor(simulation.gasInfo.gasUsed ?? 0 * 2).toString();
  const realBaseTx = newBaseTx({
    fee: {
      denom: 'ugas',
      amount,
    },
    gas: amount,
  });
  return await client.tx.buildAndSend(msgs, realBaseTx);
};

// Instantiate client
const headers = config.irita.apiKey && { headers: { 'x-api-key': config.irita.apiKey } };
export const client = newClient({
  node: config.irita.node,
  chainId: config.irita.chainId,
  keyDAO: new IritaKeyDAO(),
  rpcConfig: { ...headers, timeout: 20000 },
});

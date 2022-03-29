import { Key, KeyDAO, BaseTx, PubkeyType, newClient, Tx, Client } from '@irita/irita-sdk';
import { IRITA_API_KEY, IRITA_NODE, IRITA_CHAIN_ID, IRITA_KEY_NAME, IRITA_KEY_PASSWORD, IRITA_MNEMONIC, NODE_ENV } from '@config';
import { v4 as uuid } from 'uuid';

class KeyDAOImpl implements KeyDAO {
  private map: { [key: string]: Key };

  constructor() {
    this.map = {};
  }
  write(name: string, key: Key): void {
    this.map[name] = key;
  }
  read(name: string): Key {
    return this.map[name];
  }
  delete(name: string): void {
    delete this.map[name];
  }
}

export const newBaseTx = (baseTx?: Partial<BaseTx>): BaseTx => {
  const defaultBaseTx: BaseTx = {
    from: IRITA_KEY_NAME,
    password: IRITA_KEY_PASSWORD,
    pubkeyType: PubkeyType.sm2,
    fee: {
      denom: 'ugas',
      amount: NODE_ENV === 'production' ? '200000' : '100000',
    },
  };
  Object.assign(defaultBaseTx, baseTx);
  return defaultBaseTx;
};

export const newNftClient = (): Client => {
  const rpcConfig = IRITA_API_KEY && { rpcConfig: { headers: { 'x-api-key': IRITA_API_KEY } } };
  const config = {
    node: IRITA_NODE,
    chainId: IRITA_CHAIN_ID,
    keyDAO: new KeyDAOImpl(),
    ...rpcConfig,
  };
  const client = newClient(config);
  client.keys.recover(IRITA_KEY_NAME, IRITA_KEY_PASSWORD, IRITA_MNEMONIC, PubkeyType.sm2);
  return client;
};

export const generateDenomId = (): string => `thoughtworks${uuid().replace(/-/g, '')}`;

export const generateNftId = (count: number): string => `nft${uuid().replace(/-/g, '')}${count.toString().padStart(10, '0')}`;

import { Key, KeyDAO, newClient, Client, BaseTx, PubkeyType } from '@irita/irita-sdk';
import { IRITA_API_KEY, IRITA_NODE, IRITA_CHAIN_ID, IRITA_KEY_NAME, IRITA_KEY_PASSWORD, IRITA_MNEMONIC, NODE_ENV } from '@config';
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

const rpcConfig = IRITA_API_KEY && { rpcConfig: { headers: { 'x-api-key': IRITA_API_KEY } } };
const config = {
  node: IRITA_NODE,
  chainId: IRITA_CHAIN_ID,
  keyDAO: new KeyDAOImpl(),
  ...rpcConfig,
};
export const client = newClient(config);
export const baseTx = {
  from: IRITA_KEY_NAME,
  password: IRITA_KEY_PASSWORD,
  pubkeyType: PubkeyType.sm2,
  fee: {
    denom: 'ugas',
    amount: NODE_ENV === 'production' ? '200000' : '100000',
  },
};
export const key = client.keys.recover(IRITA_KEY_NAME, IRITA_KEY_PASSWORD, IRITA_MNEMONIC, PubkeyType.sm2);

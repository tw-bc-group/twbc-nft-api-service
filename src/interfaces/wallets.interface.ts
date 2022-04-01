import { Key } from '@irita/irita-sdk'
export interface Wallet extends Key {
  id: number;
  keyName: string;
}

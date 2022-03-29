import { newNftClient, generateDenomId, generateNftId } from '@clients/nft';
import { IRITA_KEY_NAME } from '@config';
import { v4 as uuid } from 'uuid';

const client = newNftClient();
describe('Client configuration', () => {
  it('Key should be recovered in memory', () => {
    const key = client.keys.show(IRITA_KEY_NAME);
    expect(typeof key).toEqual('string');
  });
});

describe('NFT queries', () => {
  it('queryDenoms', async () => {
    const response = await client.nft.queryDenoms();
    expect(response).toHaveProperty('denomsList');
  }, 5000);

  it('queryOwner', async () => {
    const key = client.keys.show(IRITA_KEY_NAME);
    const response = await client.nft.queryOwner(key);
    expect(response).toHaveProperty('owner');
  }, 5000);

  it('queryDenom', async () => {
    const denomId = 'batchdenom156';
    const response = await client.nft.queryDenom(denomId);
    expect(response).toHaveProperty('denom');
  }, 5000);

  it('queryCollection', async () => {
    const denomId = 'batchdenom156';
    const response = await client.nft.queryCollection(denomId);
    expect(response).toHaveProperty('collection');
  }, 5000);

  it('queryNFT', async () => {
    const denomId = 'batchdenom156';
    const tokenId = 'batchnft1';
    const response = await client.nft.queryNFT(denomId, tokenId);
    expect(response).toHaveProperty('nft');
  }, 5000);
});

describe('id generators', () => {
  it('should generate denom id with correct format', () => {
    const regExp = new RegExp(/^thoughtworks[0-9a-f]{8}[0-9a-f]{4}4[0-9a-f]{3}[89ab][0-9a-f]{3}[0-9a-f]{12}$/);
    const denomId = generateDenomId();
    expect(denomId.match(regExp)).toHaveLength(1);
  });
  it('should generate nft id with correct format', () => {
    const regExp = new RegExp(/^nft[0-9a-f]{8}[0-9a-f]{4}4[0-9a-f]{3}[89ab][0-9a-f]{3}[0-9a-f]{12}[0-9]{10}$/);
    const nftId = generateNftId(1);
    expect(nftId.match(regExp)).toHaveLength(1);
  });
})

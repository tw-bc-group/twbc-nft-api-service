import { client, key } from '@clients/nft';
import { IRITA_KEY_NAME } from '@config';

describe('Client configuration', () => {
  it('Key should be recovered in memory', () => {
    const keyFromClient = client.keys.show(IRITA_KEY_NAME);
    expect(keyFromClient).toEqual(key);
  });
});

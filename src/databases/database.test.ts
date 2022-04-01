import db from './database'

describe('test config get', () => {
  it('should get config file', async () => {
    const result = await db.authenticate()
    expect(result).toEqual(expect.anything())
  });
});

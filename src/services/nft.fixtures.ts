export const queryOwnerResponse = {
  owner: {
    address: 'iaa1jm67urz07rlu8mfgph286gk9egcw32n2f0ldfd',
    idCollectionsList: [
      {
        denomId: 'thoughtworksbaefd7830500409d90cfd6bec01d3e3d',
        tokenIdsList: ['nftf0c7dc6fe6b047729b41bee9d4bfb38c0000000001', 'nftddbfe293fbda44f08bdfa2122690e7220000000002'],
      },
    ],
  },
};

export const queryCollectionResponse = {
  collection: {
    denom: {
      id: 'thoughtworksbaefd7830500409d90cfd6bec01d3e3d',
      name: 'Test Denom',
      schema:
        '{"type":"object","properties":{"nft":{"type":"object","properties":{"id":{"type":"string"},"name":{"type":"string"}},"required":["id","name"]},"denom":{"type":"object","properties":{"id":{"type":"string"},"name":{"type":"string"}},"required":["id","name"]},"creator":{"type":"object","properties":{"wallet":{"type":"string"},"name":{"type":"string"}},"required":["name","wallet"]},"createdAt":{"type":"number"},"imageUrl":{"type":"string"}},"required":["createdAt","creator","denom","nft"],"$schema":"http://json-schema.org/draft-07/schema#"}',
      creator: 'iaa1uhajlcjxtkzq7g6uey4hqvukru9n2t4nfxe3pr',
    },
    nftsList: [
      {
        id: 'nftf0c7dc6fe6b047729b41bee9d4bfb38c0000000001',
        name: 'Test NFT',
        uri: 'https://www.thoughtworks.com/etc.clientlibs/thoughtworks/clientlibs/clientlib-site/resources/images/thoughtworks-logo.svg',
        data: '{"nft":{"id":"nft0068ae41762840929ecfa27fc9edd80d0000000001","name":"Test NFT"},"denom":{"id":"thoughtworks6024dd5142ec4adfa27b81840ead5594","name":"Test Denom"},"creator":{"wallet":"iaa1jr0zwjhrk4y0jg79l08nlzq2q2awzjuafdgqez","name":"AW"},"createdAt":1648655197179,"imageUrl":"https://www.thoughtworks.com/etc.clientlibs/thoughtworks/clientlibs/clientlib-site/resources/images/thoughtworks-logo.svg"}',
        owner: 'iaa1jm67urz07rlu8mfgph286gk9egcw32n2f0ldfd',
      },
      {
        id: 'nftddbfe293fbda44f08bdfa2122690e7220000000002',
        name: 'Test NFT',
        uri: 'https://www.thoughtworks.com/etc.clientlibs/thoughtworks/clientlibs/clientlib-site/resources/images/thoughtworks-logo.svg',
        data: '{"nft":{"id":"nft0068ae41762840929ecfa27fc9edd80d0000000002","name":"Test NFT"},"denom":{"id":"thoughtworks6024dd5142ec4adfa27b81840ead5594","name":"Test Denom"},"creator":{"wallet":"iaa1jr0zwjhrk4y0jg79l08nlzq2q2awzjuafdgqez","name":"AW"},"createdAt":1648655197179,"imageUrl":"https://www.thoughtworks.com/etc.clientlibs/thoughtworks/clientlibs/clientlib-site/resources/images/thoughtworks-logo.svg"}',
        owner: 'iaa1jm67urz07rlu8mfgph286gk9egcw32n2f0ldfd',
      },
      {
        id: 'nftddbfe293fbda44f08bdfa2122690e7220000000002',
        name: 'Test NFT',
        uri: 'https://www.thoughtworks.com/etc.clientlibs/thoughtworks/clientlibs/clientlib-site/resources/images/thoughtworks-logo.svg',
        data: '{"nft":{"id":"nft0068ae41762840929ecfa27fc9edd80d0000000003","name":"Test NFT"},"denom":{"id":"thoughtworks6024dd5142ec4adfa27b81840ead5594","name":"Test Denom"},"creator":{"wallet":"iaa1jr0zwjhrk4y0jg79l08nlzq2q2awzjuafdgqez","name":"AW"},"createdAt":1648655197179,"imageUrl":"https://www.thoughtworks.com/etc.clientlibs/thoughtworks/clientlibs/clientlib-site/resources/images/thoughtworks-logo.svg"}',
        owner: 'iaa1n8yt3e2y3dc4cueq9w8hv84nrleqfr44cdwjx9',
      },
    ],
  },
};

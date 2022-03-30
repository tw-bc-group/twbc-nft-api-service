export const queryOwnerResponse = {
  owner: {
    address: 'iaa1jm67urz07rlu8mfgph286gk9egcw32n2f0ldfd',
    idCollectionsList: [
      {
        denomId: 'thoughtworksbaefd7830500409d90cfd6bec01d3e3d',
        tokenIdsList: [
          'nftf0c7dc6fe6b047729b41bee9d4bfb38c0000000001',
          'nftddbfe293fbda44f08bdfa2122690e7220000000002'
        ],
      },
    ],
  },
};

export const queryCollectionResponse = {
  collection: {
    denom: {
      id: 'thoughtworksbaefd7830500409d90cfd6bec01d3e3d',
      name: 'Test Denom',
      schema: '{"type":"object","properties":{"id":{"type":"string"},"denomId":{"type":"string"},"name":{"type":"string"},"imageUrl":{"type":"string"},"minter":{"type":"string"},"mintedAt":{"type":"number"}},"required":["denomId","id","mintedAt","minter","name"],"$schema":"http://json-schema.org/draft-07/schema#"}',
      creator: 'iaa1uhajlcjxtkzq7g6uey4hqvukru9n2t4nfxe3pr',
    },
    nftsList: [
      {
        id: 'nftf0c7dc6fe6b047729b41bee9d4bfb38c0000000001',
        name: 'Test NFT',
        uri: 'https://www.thoughtworks.com/etc.clientlibs/thoughtworks/clientlibs/clientlib-site/resources/images/thoughtworks-logo.svg',
        data: '{"id":"nftf0c7dc6fe6b047729b41bee9d4bfb38c0000000001","denomId":"thoughtworksbaefd7830500409d90cfd6bec01d3e3d","name":"Test NFT","imageUrl":"https://www.thoughtworks.com/etc.clientlibs/thoughtworks/clientlibs/clientlib-site/resources/images/thoughtworks-logo.svg","minter":"iaa1jm67urz07rlu8mfgph286gk9egcw32n2f0ldfd","mintedAt":1648563959824}',
        owner: 'iaa1jm67urz07rlu8mfgph286gk9egcw32n2f0ldfd',
      },
      {
        id: 'nftddbfe293fbda44f08bdfa2122690e7220000000002',
        name: 'Test NFT',
        uri: 'https://www.thoughtworks.com/etc.clientlibs/thoughtworks/clientlibs/clientlib-site/resources/images/thoughtworks-logo.svg',
        data: '{"id":"nftddbfe293fbda44f08bdfa2122690e7220000000002","denomId":"thoughtworksbaefd7830500409d90cfd6bec01d3e3d","name":"Test NFT","imageUrl":"https://www.thoughtworks.com/etc.clientlibs/thoughtworks/clientlibs/clientlib-site/resources/images/thoughtworks-logo.svg","minter":"iaa1jm67urz07rlu8mfgph286gk9egcw32n2f0ldfd","mintedAt":1648563959824}',
        owner: 'iaa1jm67urz07rlu8mfgph286gk9egcw32n2f0ldfd',
      },
      {
        id: 'nftddbfe293fbda44f08bdfa2122690e7220000000002',
        name: 'Test NFT',
        uri: 'https://www.thoughtworks.com/etc.clientlibs/thoughtworks/clientlibs/clientlib-site/resources/images/thoughtworks-logo.svg',
        data: '{"id":"nftb043228d66b747f189c5d62365d4a5ce0000000003","denomId":"thoughtworksbaefd7830500409d90cfd6bec01d3e3d","name":"Test NFT","imageUrl":"https://www.thoughtworks.com/etc.clientlibs/thoughtworks/clientlibs/clientlib-site/resources/images/thoughtworks-logo.svg","minter":"iaa1jm67urz07rlu8mfgph286gk9egcw32n2f0ldfd","mintedAt":1648563959824}',
        owner: 'iaa1n8yt3e2y3dc4cueq9w8hv84nrleqfr44cdwjx9',
      },
    ],
  },
};

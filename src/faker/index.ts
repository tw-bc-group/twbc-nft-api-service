const { faker } = require('@faker-js/faker');
const randomName = faker.name.findName(); // Rowan Nikolaus
const randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
const randomPhoneNumber = faker.phone.phoneNumber(); // (279) 329-8663 x30233

// {
//    "denom" : {
//      "id": "thoughtworksc846f9a95811439bb537b2399c4809bd",
//      "name": "TWCollection00001"
//    },
//    "nft": {
//      "name": "NFT00004",
//      "id": "thoughtworksca7e7a83345645af8fa357fe047889000000000004"
//    },
//    "imgUrl": "https://via.placeholder.com/300.jpg/008000?text=nft4",
//    "createdAt": "2022-03-30 01:28:37"
//  }

function fakeDenom() {
  return {
    id: 'thoughtworks' + faker.datatype.uuid().replaceAll('-', ''),
    name: 'Collection ' + faker.random.words(),
  };
}

function fakeNFT(name, count) {
  const prefix = 'thoughtworks';
  const suffix = ('0000000000' + count).slice(-10);
  return {
    id: prefix + faker.datatype.uuid().replaceAll('-', '') + suffix,
    name: name,
  };
}

function fakeMint(list, count) {
  const denom = fakeDenom();
  const nftName = faker.commerce.productName();
  for (let i = 0; i < count; i++) {
    const item = {
      denom: denom,
      nft: fakeNFT(nftName, i),
      imgUrl: faker.image.fashion(),
      createdAt: faker.date.recent(),
    };
    list.push(item);
  }
  return list;
}

const list = [];
fakeMint(list, 100);
fakeMint(list, 100);

console.log(JSON.stringify(list, null, 2));

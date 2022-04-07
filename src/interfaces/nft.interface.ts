export interface Nft {
  nft: {
    id: string;
    name: string;
  }
  denom: {
    id: string;
    name: string;
  }
  creator: {
    wallet: string;
    name: string;
  },
  createdAt: string;
  imageUrl?: string
}

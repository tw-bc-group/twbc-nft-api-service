export interface Nft {
  id: string;
  denomId: string;
  name: string;
  imageUrl?: string;
  minter: string;
  mintedAt: number;
}

export interface Nft {
  id: string;
  denomId: string;
  name: string;
  imageUrl?: string;
  owner: string;
  minter: string;
  mintedAt: number;
  updatedAt?: number;
}

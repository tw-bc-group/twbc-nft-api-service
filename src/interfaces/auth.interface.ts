import { Request } from 'express';
import { User, Wallet } from '@prisma/client';

export interface DataStoredInToken {
  id: number;
  email: String;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: User;
  wallet: Wallet;
}

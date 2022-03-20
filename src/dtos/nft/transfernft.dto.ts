import { IsString, IsEmail } from 'class-validator';

export class TransferNftDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}

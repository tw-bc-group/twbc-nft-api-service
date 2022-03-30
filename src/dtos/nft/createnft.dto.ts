import { IsString, IsEmail, IsInt } from 'class-validator';

export class CreateNftDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  public denomName: string;

  @IsString()
  public name: string;

  @IsString()
  public imageUrl: string;

  @IsInt()
  public count: number;
}

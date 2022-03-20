import { IsString, IsEmail } from 'class-validator';

export class CreateNftDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}

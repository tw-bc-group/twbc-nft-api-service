import { IsString, IsInt } from 'class-validator';

export class CreateDenomNftDto {
  @IsString()
  public name: string;

  @IsString()
  public imageUrl: string;

  @IsInt()
  public count: number;
}

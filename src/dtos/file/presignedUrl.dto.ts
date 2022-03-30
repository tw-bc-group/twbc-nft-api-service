import { IsString } from 'class-validator';

export class PresignedUrlDto {
  @IsString()
  public contentType: string;
}

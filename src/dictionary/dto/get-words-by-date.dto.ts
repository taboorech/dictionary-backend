import { IsString } from 'class-validator';

export class GetWordsByDateDto {
  @IsString()
  date: string;
}

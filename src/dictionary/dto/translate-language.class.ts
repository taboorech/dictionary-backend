import { IsEnum, IsString, IsNotEmpty } from 'class-validator';
import { Language } from '../language.enum';

export class Translate {
  @IsEnum(Language)
  language: Language;

  @IsString()
  @IsNotEmpty()
  translate: string;
}

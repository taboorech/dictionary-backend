import { IsEnum } from 'class-validator';
import { Language } from '../language.enum';

export class GetWordsByLanguageDto {
  @IsEnum(Language)
  language: Language;
}

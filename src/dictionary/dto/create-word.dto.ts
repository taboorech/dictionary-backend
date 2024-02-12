import { IsEnum, IsNotEmpty, IsString } from '@nestjs/class-validator';
import { Language } from '../language.enum';
import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Translate } from './translate-language.class';

export class CreateWordDto {
  @IsNotEmpty()
  @IsString()
  word: string;

  @IsNotEmpty()
  @IsEnum(Language)
  language: Language;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Translate)
  translate: Translate[];
}

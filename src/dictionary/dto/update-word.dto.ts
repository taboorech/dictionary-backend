import { IsEnum, IsString } from '@nestjs/class-validator';
import { Language } from '../language.enum';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Translate } from './translate-language.class';

export class UpdateWordDto {
  @IsOptional()
  @IsString()
  word: string;

  @IsOptional()
  @IsEnum(Language)
  language: Language;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Translate)
  translate: Translate[];
}

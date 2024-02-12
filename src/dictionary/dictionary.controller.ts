import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { DictionaryService } from './dictionary.service';
import { CreateWordDto } from './dto/create-word.dto';
import { Word } from 'src/schemas/word.schema';
import { UpdateWordDto } from './dto/update-word.dto';
import { GetWordsByDateDto } from './dto/get-words-by-date.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetWordsByLanguageDto } from './dto/get-word-by-language.dto';

@Controller('dictionary')
export class DictionaryController {
  constructor(private dictionaryService: DictionaryService) {}

  @Get('/')
  @UseGuards(AuthGuard('jwt'))
  getAll(@Req() req): Promise<Word[]> {
    return this.dictionaryService.getAll(req.user);
  }

  @Get('/date/:date')
  @UseGuards(AuthGuard('jwt'))
  getByDate(
    @Req() req,
    @Param() getWordsByDateDto: GetWordsByDateDto,
  ): Promise<Word[]> {
    return this.dictionaryService.getByDate(req.user, getWordsByDateDto);
  }

  @Get('/language')
  @UseGuards(AuthGuard('jwt'))
  getByLanguage(
    @Req() req,
    @Body() getWordsByLanguageDto: GetWordsByLanguageDto,
  ): Promise<Word[]> {
    return this.dictionaryService.getByLanguage(
      req.user,
      getWordsByLanguageDto,
    );
  }

  @Put('/create')
  @UseGuards(AuthGuard('jwt'))
  create(@Req() req, @Body() createWordDto: CreateWordDto): Promise<Word> {
    return this.dictionaryService.createWord(req.user, createWordDto);
  }

  @Patch('/:id/edit')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id') wordId: string,
    @Body() updateWordDto: UpdateWordDto,
  ): Promise<Word> {
    return this.dictionaryService.updateWord(wordId, updateWordDto);
  }

  @Delete('/:id/delete')
  @UseGuards(AuthGuard('jwt'))
  delete(@Req() req, @Param('id') wordId: string): Promise<Word> {
    return this.dictionaryService.deleteWord(req.user, wordId);
  }
}

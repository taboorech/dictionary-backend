import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWordDto } from './dto/create-word.dto';
import { Word, WordDocument } from 'src/schemas/word.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateWordDto } from './dto/update-word.dto';
import { GetWordsByDateDto } from './dto/get-words-by-date.dto';
import { User, UserDocument } from 'src/schemas/user.schema';
import { GetWordsByLanguageDto } from './dto/get-word-by-language.dto';

@Injectable()
export class DictionaryService {
  constructor(
    @InjectModel(Word.name) private wordModel: Model<WordDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async getAll(user: User): Promise<Word[]> {
    const words = (
      await (
        await this.userModel.findOne({ _id: user._id })
      ).populate({
        path: 'words',
      })
    ).words;
    return words;
  }

  async getByDate(
    user: User,
    getWordsByDateDto: GetWordsByDateDto,
  ): Promise<Word[]> {
    return user.getWordsByDate(new Date(getWordsByDateDto.date));
  }

  async getByLanguage(
    user: User,
    getWordsByLanguageDto: GetWordsByLanguageDto,
  ) {
    return user.getWordsByLanguage(getWordsByLanguageDto.language);
  }

  async createWord(user: User, createWordDto: CreateWordDto): Promise<Word> {
    const createdWord = new this.wordModel(createWordDto);
    user.addWord(createdWord);
    return await createdWord.save();
  }

  async updateWord(
    wordId: string,
    updateWordDto: UpdateWordDto,
  ): Promise<Word> {
    return await this.wordModel.findOneAndUpdate(
      { _id: wordId },
      updateWordDto,
    );
  }

  async deleteWord(user: User, wordId: string): Promise<Word> {
    const word = await this.wordModel.findOne({ _id: wordId });
    if (!(await user.removeWord(word))) {
      throw new NotFoundException(`User haven't the word`);
    }
    await word.deleteOne();
    return word;
  }
}

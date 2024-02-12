import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Word } from './word.schema';
import { Language } from 'src/dictionary/language.enum';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  _id: Types.ObjectId;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  login: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  refreshToken: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Word' }] })
  words: Word[];

  addWord: Function;

  getWordsByDate: Function;

  removeWord: Function;

  getWordsByLanguage: Function;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.addWord = async function (word: Word): Promise<User> {
  const words = [...this.words];
  words.push({ _id: word._id });
  this.words = words;
  return await this.save();
};

UserSchema.methods.getWordsByDate = async function (
  date: Date,
): Promise<Word[]> {
  await this.populate('words');
  let words = [...this.words];
  words = words.filter((word) => word.date.toString() === date.toString());
  return words;
};

UserSchema.methods.getWordsByLanguage = async function (
  language: Language,
): Promise<Word[]> {
  await this.populate('words');
  let words = [...this.words];
  words = words.filter((word) => word.language === language);
  return words;
};

UserSchema.methods.removeWord = async function (
  word: Word,
): Promise<User | boolean> {
  let words = [...this.words];
  words = words.filter(({ _id }) => _id.toString() !== word._id.toString());
  if (this.words.length === words.length) {
    return false;
  }
  this.words = words;
  return await this.save();
};

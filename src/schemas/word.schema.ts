import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type WordDocument = HydratedDocument<Word>;

@Schema()
export class Word {
  _id: Types.ObjectId;

  @Prop()
  word: string;

  @Prop()
  language: string;

  @Prop()
  translate: [
    {
      language: string;
      translate: string;
    },
  ];

  @Prop({ default: new Date(new Date().setHours(2, 0, 0, 0)) })
  date: Date;
}

export const WordSchema = SchemaFactory.createForClass(Word);

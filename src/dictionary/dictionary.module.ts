import { Module } from '@nestjs/common';
import { DictionaryController } from './dictionary.controller';
import { DictionaryService } from './dictionary.service';
import { Word, WordSchema } from 'src/schemas/word.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Word.name, schema: WordSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [DictionaryController],
  providers: [DictionaryService],
})
export class DictionaryModule {}

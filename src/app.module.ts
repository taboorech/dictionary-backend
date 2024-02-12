import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DictionaryModule } from './dictionary/dictionary.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    DictionaryModule,
    MongooseModule.forRoot('mongodb://localhost:27017/dictionary'),
    ConfigModule.forRoot(),
  ],
  // controllers: [AuthController],
  // providers: [AuthService, DictionaryService],
})
export class AppModule {}

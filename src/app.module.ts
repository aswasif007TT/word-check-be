import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DictionaryService } from './tasks/dictionary.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    // Todo: use redis instead of memory
    CacheModule.register({ isGlobal: true }),
    HttpModule,
  ],
  controllers: [AppController],
  providers: [AppService, DictionaryService],
})
export class AppModule {}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DictionaryService } from './tasks/dictionary.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3000, async () => {
    console.log(`Server started.`);

    // Build dictionary on startup
    await app.get(DictionaryService).buildDictionary();
  });
}
bootstrap();

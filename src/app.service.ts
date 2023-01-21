import {
  CACHE_MANAGER,
  HttpException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CheckSentenceRequestDto, CheckSentenceResponseDto } from './app.dto';
import PrefixTree from './utils/prefix-tree';

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  getHello(): string {
    return 'Hello World!';
  }

  /**
   * Check if a sentence contains non-english words
   * @param reqDto The request object
   * @returns Promise<CheckSentenceResponseDto> The response object
   */
  async checkSentence(
    reqDto: CheckSentenceRequestDto,
  ): Promise<CheckSentenceResponseDto> {
    const dictionary: PrefixTree = await this.cacheManager.get('dictionary');
    if (!dictionary) {
      throw new HttpException('Service unavailable', 503);
    }

    const { sentence } = reqDto;
    const words = sentence.split(' ');

    // Regex to strip out punctuation for start and end of word
    const regex = /^[\W_]+|[\W_]+$/g;
    const invalidWords = [];

    for (let word of words) {
      word = word.replace(regex, '').trim();
      if (!dictionary.hasWord(word)) {
        invalidWords.push(word);
      }
    }

    return { invalidWords };
  }
}

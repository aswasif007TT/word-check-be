import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { firstValueFrom } from 'rxjs';
import PrefixTree from '../utils/prefix-tree';

// Todo: Make it configurable
const dictionaryUrl =
  'https://raw.githubusercontent.com/jeremy-rifkin/Wordlist/master/master.txt';

@Injectable()
export class DictionaryService {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheService: Cache,
    private readonly httpService: HttpService,
  ) {}

  /**
   * Build dictionary and store it in cache
   * @returns Promise<void>
   */
  async buildDictionary() {
    console.log('Building dictionary...');
    const response = await firstValueFrom(this.httpService.get(dictionaryUrl));
    const words = response.data;
    const dictionary = new PrefixTree(words.split('\n'));

    console.log('Dictionary built. Storing in cache...');
    await this.cacheService.set('dictionary', dictionary, { ttl: 0 });
  }
}

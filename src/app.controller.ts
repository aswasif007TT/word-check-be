import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CheckSentenceRequestDto, CheckSentenceResponseDto } from './app.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('check-sentence')
  @HttpCode(200)
  checkSentence(
    @Body() reqDto: CheckSentenceRequestDto,
  ): Promise<CheckSentenceResponseDto> {
    return this.appService.checkSentence(reqDto);
  }
}

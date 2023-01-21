export class CheckSentenceRequestDto {
  sentence: string;
}

export class CheckSentenceResponseDto {
  invalidWords: string[];
}

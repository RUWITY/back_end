import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class upsertUserExplanation {
  @IsString()
  @ApiProperty({
    description: '한 줄 표현',
    example: '코딩중~.~',
  })
  explanation: string;
}

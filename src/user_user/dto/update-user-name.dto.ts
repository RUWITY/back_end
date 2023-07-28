import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class updateUserName {
  @ApiProperty({
    description: '변경 닉네임',
    example: '지민이다',
  })
  @IsString()
  name: string;
}

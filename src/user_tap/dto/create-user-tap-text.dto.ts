import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserTapTextDto {
  @IsString()
  @ApiProperty({
    description: '탭 타입[텍스트]',
    example: '텍스트',
  })
  tap_type: string;

  @IsString()
  @ApiProperty({
    description: '내용',
    example: '텍스트 내용내용',
  })
  context: string;
}

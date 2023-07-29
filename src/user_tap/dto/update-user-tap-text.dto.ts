import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateUserTapTextDto {
  @IsNumber()
  @ApiProperty({
    description: '수정 tap id',
    example: 1,
  })
  tap_id: number;

  @IsString()
  @ApiProperty({
    description: '수정 내용',
    example: '텍스트 수정내용',
  })
  context: string;
}

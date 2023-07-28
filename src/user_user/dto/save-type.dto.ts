import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';

export class TypeDto {
  @IsArray()
  @IsNumber({}, { each: true })
  @ApiProperty({
    description: '유형 타입',
    example: [1, 2],
  })
  type: number[];
}

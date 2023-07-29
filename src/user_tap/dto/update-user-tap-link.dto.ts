import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserTapLinkDto {
  @IsNumber()
  @ApiProperty({
    description: '수정 tap id',
    example: 1,
  })
  tap_id: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: '제목 수정 또는 제목 추가',
    example: '링크 제목제목',
  })
  title: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: '링크 수정',
    example: 'http...',
  })
  url: string;
}

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateUserInfoDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'nickname',
    example: '지민',
  })
  nickname?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'profile',
    example: 'image.png',
  })
  profile?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: '한줄 표현',
    example: '산 좋고 물 좋은 곳',
  })
  explanation?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: '오늘의 링크',
    example: 'https...',
  })
  today_link?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: '링크 이미지',
    example: 'dfdf/img',
  })
  img?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: '링크 제목',
    example: '고라니 날다',
  })
  title?: string;

  constructor(data: Partial<CreateUserInfoDto>) {
    Object.assign(this, data);
  }
}

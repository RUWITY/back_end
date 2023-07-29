import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UserReportDto {
  @IsString()
  @ApiProperty({
    description: '페이지 url',
    example: 'hiurl',
  })
  page_url: string;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({
    description: '성별(남자 true, 여자 false, 표시안함 null',
    example: 'true',
  })
  gender?: boolean;

  @IsNumber()
  @ApiProperty({
    description: '나이',
    example: '20',
  })
  age: number;
}

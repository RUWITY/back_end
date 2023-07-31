import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class ActionTapDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'delete할애들만 넣기',
    example: 'text',
  })
  method?: string;

  @IsString()
  @ApiProperty({
    description: '탭 text,link,profile 인지 ',
    example: 'text',
  })
  column: string;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    description: '삭제할 tap id',
    example: 1,
  })
  tap_id?: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: '수정할 제목',
    example: 'title',
  })
  title?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: '수정할 내용',
    example: 'title',
  })
  context?: string;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({
    description: '공개 true, 비공개 false',
    example: true,
  })
  toggle_state?: boolean;

  @IsOptional()
  @ApiPropertyOptional({
    type: 'string', // 기존의 type: 'string' 대신 type: 'string', format: 'binary' 사용
    format: 'binary',
    description: 'link_img',
    example: 'image.png',
  })
  link_img?: Express.Multer.File;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({
    description: '링크 이미지 삭제를 하려면 true',
    example: true,
  })
  link_img_delete?: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({
    description: '펼친 상태 true, 접은 상태 false',
    example: true,
  })
  folded_state?: boolean;
}

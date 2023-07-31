import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { ActionTapDto } from './tap-delete.dto';

export class CreateUserInfoDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'nickname',
    example: '지민',
  })
  nickname?: string;

  @IsOptional()
  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
    description: 'profile',
    example: 'image.png',
  })
  profile?: Express.Multer.File;

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

  @IsOptional()
  @ApiPropertyOptional({
    type: [ActionTapDto], // ActionTapDto 배열 타입으로 설정
    description:
      '프로필, TAP[text, link] 수정 ->> 탭 삭제하는 것 제외하고는 method생략 ',
    example: [
      { column: 'profile' }, // 프로필 이미지 삭제 <<update로 들어감
      // { column: 'text', title: '수정', context: '내용수정' }, // 수정은 method 안적어도됨
      // {
      //   // 탭을 완전히 삭제하는게 아니면 다 update
      //   // 텍스트 탭 삭제
      //   method: 'delete',
      //   column: 'text',
      //   tap_id: 1,
      // },
      // {
      //   // 링크 이미지 삭제
      //   method: 'delete',
      //   column: 'link',
      //   tap_id: 1,
      //   link_img_delete: true,
      // },
      // {
      //   // 링크 탭 삭제
      //   method: 'delete',
      //   column: 'link',
      //   tap_id: 1,
      // },
      // {
      //   // link_img 변경 예시
      //   column: 'link',
      //   tap_id: 1,
      //   link_img: {
      //     originalname: 'example.jpg',
      //     encoding: '7bit',
      //     mimetype: 'image/jpeg',
      //     buffer: 'base64-encoded-image-data',
      //   },
      // },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  // @Type(() => ActionTapDto)
  actions?: ActionTapDto[];

  constructor(data: Partial<CreateUserInfoDto>) {
    Object.assign(this, data);
  }
}

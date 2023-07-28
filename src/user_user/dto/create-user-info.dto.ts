import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserInfoDto {
  @IsString()
  @ApiPropertyOptional({
    description: 'nickname',
    example: '지민',
  })
  nickname: string;

  @IsString()
  @ApiPropertyOptional({
    description: 'profile',
    example: 'image.png',
  })
  profile: string;

  @IsString()
  @ApiPropertyOptional({
    description: '한줄 표현',
    example: '산 좋고 물 좋은 곳',
  })
  explanation: string;

  constructor(data: Partial<CreateUserInfoDto>) {
    Object.assign(this, data);
  }
}

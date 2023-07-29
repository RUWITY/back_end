import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { UserTokenEntity } from './user_token.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserPageEntity } from './user_page.entity';
import { UserTodyLinkEntity } from './user_today_link.entity';

@Entity('user_user')
export class UserEntity {
  @PrimaryColumn('int4')
  @Generated()
  @IsNumber()
  @ApiProperty({
    description: 'user_user PK',
    example: 1,
  })
  id: number;

  @Column({ type: 'bigint' })
  @IsNumber()
  @ApiProperty({
    description: 'kakao_id',
    example: 1111,
  })
  kakao_id: number;

  @Column({ type: 'varchar', length: '6', nullable: true })
  @IsString()
  @ApiProperty({
    description: 'nickname',
    example: '지민',
  })
  nickname: string;

  @Column({ type: 'varchar', length: '225', nullable: true })
  @IsString()
  @ApiProperty({
    description: 'profile',
    example: 'image.png',
  })
  profile: string;

  @Column({ type: 'varchar', length: '225', nullable: true })
  @IsString()
  @ApiProperty({
    description: '한줄 표현',
    example: '산 좋고 물 좋은 곳',
  })
  explanation: string;

  @Column({ type: 'boolean', nullable: true })
  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({
    description: '성별(남자true,여자false,표시안함null)',
    example: 'true',
  })
  gender?: boolean;

  @Column({ type: 'int4', nullable: true })
  @IsNumber()
  @ApiProperty({
    description: '나이',
    example: '20',
  })
  age: number;

  @Column({ type: 'varchar', length: 225, nullable: true })
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'email',
    example: '111@naver.com',
  })
  user_email: string;

  @CreateDateColumn()
  @IsDate()
  created_at: Date;

  @OneToOne(() => UserTokenEntity, (token) => token.user, {
    cascade: true,
    nullable: true,
  })
  token: UserTokenEntity;

  @OneToOne(() => UserPageEntity, (page) => page.user, {
    cascade: true,
    nullable: false,
  })
  page: UserPageEntity;

  @OneToOne(() => UserTodyLinkEntity, (today) => today.user, {
    cascade: true,
    nullable: false,
  })
  today_link: UserEntity;

  constructor(data: Partial<UserEntity>) {
    Object.assign(this, data);
  }
}

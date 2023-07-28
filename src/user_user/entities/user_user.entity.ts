import { IsDate, IsNumber, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { UserTokenEntity } from './user_token.entity';
import { ApiProperty } from '@nestjs/swagger';

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

  @CreateDateColumn()
  @IsDate()
  created_at: Date;

  @OneToOne(() => UserTokenEntity, (token) => token.user, {
    cascade: true,
    nullable: true,
  })
  token: UserTokenEntity;

  constructor(data: Partial<UserEntity>) {
    Object.assign(this, data);
  }
}

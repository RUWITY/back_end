import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { UserEntity } from '../../user_user/entities/user_user.entity';

@Entity('user_url')
export class UserUrlEntity {
  @PrimaryColumn('int4')
  @Generated()
  @IsNumber()
  @ApiProperty({
    description: 'user_url PK',
    example: 1,
  })
  id: number;

  @Column({ type: 'varchar', length: '225', nullable: true })
  @IsString()
  @ApiPropertyOptional({
    description: 'img 썸네일',
    example: '.../png',
  })
  img: string;

  @Column({ type: 'varchar', length: '225', nullable: true })
  @IsString()
  @ApiPropertyOptional({
    description: '제목',
    example: '고라니가 수영함',
  })
  title: string;

  @Column({ type: 'varchar', length: '225', nullable: false })
  @IsString()
  @ApiProperty({
    description: 'url',
    example: 'https...',
  })
  url: string;

  @Column({ type: 'int4', default: 0 })
  @IsNumber()
  view: number;

  @Column({ type: 'int4' })
  @IsNumber()
  user_id: number;

  @CreateDateColumn()
  @IsDate()
  created_at: Date;

  @DeleteDateColumn({ name: 'delete_at', type: 'timestamp', default: null })
  delete_at: Date | null;

  @ManyToOne(() => UserEntity, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  constructor(data: Partial<UserUrlEntity>) {
    Object.assign(this, data);
  }
}

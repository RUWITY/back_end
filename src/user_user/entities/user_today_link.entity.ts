import { IsNumber, IsString } from 'class-validator';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from './user_user.entity';

@Entity('user_today_link')
export class UserTodyLinkEntity {
  @PrimaryColumn('int4')
  @IsNumber()
  user_id: number;

  @Column({ type: 'varchar', length: '13', nullable: false })
  @IsString()
  today_link: string;

  @OneToOne(() => UserEntity, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  constructor(data: Partial<UserTodyLinkEntity>) {
    Object.assign(this, data);
  }
}

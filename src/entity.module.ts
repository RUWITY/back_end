import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTokenEntity } from './user_user/entities/user_token.entity';
import { UserEntity } from './user_user/entities/user_user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserTokenEntity, UserEntity])],
  exports: [TypeOrmModule],
})
export class EntitiesModule {}

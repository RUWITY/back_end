import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTokenEntity } from './user_user/entities/user_token.entity';
import { UserEntity } from './user_user/entities/user_user.entity';
import { UserUrlEntity } from './user_url/entities/user_url.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserTokenEntity, UserEntity, UserUrlEntity]),
  ],
  exports: [TypeOrmModule],
})
export class EntitiesModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTokenEntity } from './user_user/entities/user_token.entity';
import { UserEntity } from './user_user/entities/user_user.entity';
import { UserUrlEntity } from './user_url/entities/user_url.entity';
import { UserPageEntity } from './user_user/entities/user_page.entity';
import { UserTodyLinkEntity } from './user_user/entities/user_today_link.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserTokenEntity,
      UserEntity,
      UserUrlEntity,
      UserPageEntity,
      UserTodyLinkEntity,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class EntitiesModule {}

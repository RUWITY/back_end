import { Module } from '@nestjs/common';
import { UserUserService } from './user_user.service';
import { UserUserController } from './user_user.controller';
import { EntitiesModule } from 'src/entity.module';
import { JsonWebTokenModule } from 'src/jwt.module';

@Module({
  imports: [EntitiesModule, JsonWebTokenModule],
  controllers: [UserUserController],
  providers: [UserUserService],
  exports: [UserUserService],
})
export class UserUserModule {}

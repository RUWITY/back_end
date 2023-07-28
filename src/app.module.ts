import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KakaoLoginModule } from './kakao-login/kakao-login.module';
import { UserUserModule } from './user_user/user_user.module';
import { EntitiesModule } from './entity.module';
import { SettingModule } from './config/config.module';

@Module({
  imports: [KakaoLoginModule, UserUserModule, EntitiesModule, SettingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

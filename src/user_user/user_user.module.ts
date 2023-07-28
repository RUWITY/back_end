import { Module } from '@nestjs/common';
import { UserUserService } from './user_user.service';
import { UserUserController } from './user_user.controller';
import { EntitiesModule } from 'src/entity.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    EntitiesModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: process.env.JWT_ACCESS_SECRET,
        signOptions: {
          expiresIn: '12h',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [UserUserController],
  providers: [UserUserService],
  exports: [UserUserService],
})
export class UserUserModule {}

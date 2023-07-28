import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigService } from './configuration.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        `src/envs/${
          process.env.NODE_ENV == 'dev' ? 'development' : 'production'
        }.env`,
      ],
      load: [
        databaseConfig,
        // kakaoConfig,
        // tokenConfig,
        // mailConfig,
        // swaggerConfig,
      ],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get('postgres'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AppConfigService],
})
export class SettingModule {}

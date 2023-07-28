import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user_user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { UserTokenEntity } from './entities/user_token.entity';
import { CreateUserUserDto } from './dto/create-user_user.dto';
import { plainToInstance } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserUserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(UserTokenEntity)
    private readonly userTokenRepository: Repository<UserTokenEntity>,

    private readonly jwtService: JwtService,
  ) {}

  async findOAuthUser(kakao_id: number) {
    const findOneResult = await this.userRepository.findOne({
      where: {
        kakao_id: kakao_id,
      },
    });

    return findOneResult;
  }

  async saveUser(dto: CreateUserUserDto) {
    const createUserDtoToEntity = plainToInstance(UserEntity, dto);

    const saveResult = await this.userRepository.save(createUserDtoToEntity);

    return saveResult;
  }

  async generateAccessToken(id: number): Promise<string> {
    const payload = {
      id: id,
    };
    return this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '12h',
    });
  }

  //7 days 604800
  async generateRefreshToken(id: number): Promise<string> {
    const payload = {
      id: id,
    };
    return this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '30d',
    });
  }

  async defaultToken(user_id: number) {
    await this.userTokenRepository.save({
      user_id: user_id,
      access_token: undefined,
      refresh_token: undefined,
    });
  }

  async setCurrentRefreshToken(
    refreshToken: string,
    userId: number,
  ): Promise<void> {
    await this.userTokenRepository.update(userId, {
      refresh_token: refreshToken,
    });
  }

  async setKaKaoCurrentAccessToken(
    accessToken: string,
    userId: number,
  ): Promise<void> {
    await this.userTokenRepository.update(userId, {
      access_token: accessToken,
    });
  }

  async updateUserName(id: number, name: string): Promise<UpdateResult> {
    const updateResult = await this.userRepository.update(id, {
      nickname: name,
    });

    return updateResult;
  }

  async upsertUserExplanation(
    id: number,
    explanation: string,
  ): Promise<UserEntity | UpdateResult> {
    const findResult = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!findResult) {
      return await this.userRepository.save(
        new UserEntity({
          id: id,
          explanation: explanation,
        }),
      );
    } else {
      return await this.userRepository.update(id, {
        explanation: explanation,
      });
    }
  }
}

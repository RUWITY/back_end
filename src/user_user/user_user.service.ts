import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user_user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { UserTokenEntity } from './entities/user_token.entity';
import { CreateUserUserDto } from './dto/create-user_user.dto';
import { plainToInstance } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';
import { CreateUserInfoDto } from './dto/create-user-info.dto';
import { UserPageEntity } from './entities/user_page.entity';
import { UserReportDto } from './dto/save-user-report.dto';
import { UserTodyLinkEntity } from './entities/user_today_link.entity';

@Injectable()
export class UserUserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(UserTokenEntity)
    private readonly userTokenRepository: Repository<UserTokenEntity>,

    private readonly jwtService: JwtService,

    @InjectRepository(UserPageEntity)
    private readonly userPageEntityRepository: Repository<UserPageEntity>,

    @InjectRepository(UserTodyLinkEntity)
    private readonly userTodayLinkEntityRepository: Repository<UserTodyLinkEntity>,
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

  async getUserInfo(id: number) {
    const findResult = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });

    const findTodayLink = await this.userTodayLinkEntityRepository.findOne({
      where: {
        user_id: id,
      },
    });

    return {
      profile: findResult?.profile || null,
      nickname: findResult?.nickname || null,
      explanation: findResult?.explanation || null,
      today_link: findTodayLink?.today_link || null,
    };
  }

  //프로필,닉네임, 한줄 설명, 오늘의 링크 없으면 save , 있으면 update
  async saveUserInfo(id: number, dto: CreateUserInfoDto) {
    const updateResult = await this.userRepository.update(id, {
      nickname: dto?.nickname,
      profile: dto?.profile,
      explanation: dto?.explanation,
    });

    return updateResult;
  }

  //닉네임 없으면 save, 있으면 update
  async updateUserName(id: number, name: string) {
    const findResult = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!findResult) {
      return await this.userRepository.save(
        new UserEntity({
          id: id,
          nickname: name,
        }),
      );
    } else {
      return await this.userRepository.update(id, {
        nickname: name,
      });
    }
  }

  //한줄표현 없으면 save, 있으면 update
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

  async checkPage(url: string) {
    const findResult = await this.userPageEntityRepository.findOne({
      where: {
        page_url: url,
      },
    });

    if (findResult) {
      throw new Error('이미 사용중인 URL입니다.');
    } else {
      return true;
    }
  }

  async saveGenderAge(id: number, dto: UserReportDto) {
    const saveReult = await this.userPageEntityRepository.save(
      new UserPageEntity({
        user_id: id,
        page_url: dto.page_url,
      }),
    );

    const saveReult2 = await this.userRepository.update(id, {
      gender: dto?.gender || undefined,
      age: dto.age,
    });
  }
}

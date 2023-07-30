import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CtxUser } from 'src/decorator/auth.decorator';
import { JWTToken } from 'src/kakao-login/dto/jwt-token.dto';
import { JwtAccessAuthGuard } from 'src/kakao-login/jwt-access.guard';
import { UserUserService } from './user_user.service';
import { CreateUserInfoDto } from './dto/create-user-info.dto';
import { UserReportDto } from './dto/save-user-report.dto';

@ApiTags('유저 API')
@Controller('user-user')
export class UserUserController {
  constructor(private readonly userUserService: UserUserService) {}

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAccessAuthGuard)
  @ApiOperation({
    summary:
      '유저 정보 출력(프로필(개발 미완),닉네임,한 줄 표현, 오늘의 링크, 페이지 링크',
  })
  @Get('/profile')
  async getUserInfo(@CtxUser() token: JWTToken) {
    try {
      return await this.userUserService.getUserInfo(token.id);
    } catch (e) {
      if (e instanceof NotFoundException)
        throw new NotFoundException(e.message);

      throw new InternalServerErrorException(e.message);
    }
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAccessAuthGuard)
  @ApiOperation({
    summary: '유저가 신규인지 아닌지 구별',
  })
  @Get('user_type')
  async userTypeCheck(@CtxUser() token: JWTToken) {
    try {
      return await this.userUserService.userTypeCheck(token.id);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAccessAuthGuard)
  @ApiOperation({
    summary:
      '유저 닉네임, 한 줄 표현, 프로필(개발 미완),오늘의 링크 저장 ---프로필 추가!!',
  })
  @Patch()
  async saveUserInfo(
    @CtxUser() token: JWTToken,
    @Body(new ValidationPipe({ whitelist: true, transform: true }))
    dto: CreateUserInfoDto,
  ) {
    return await this.userUserService.saveUserInfo(token.id, dto);
  }

  @Get('check/page/:url')
  @ApiOperation({
    summary: '페이지 생성 중복 확인',
  })
  async checkPage(@Param('url') url: string) {
    try {
      return await this.userUserService.checkPage(url);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAccessAuthGuard)
  @ApiOperation({
    summary: '성별, 나이, 페이지url 저장',
    description: '성별(남자 male, 여자 female, 표시안함 null',
  })
  @Post('report')
  async saveGenderAge(
    @CtxUser() token: JWTToken,
    @Body(new ValidationPipe({ whitelist: true, transform: true }))
    dto: UserReportDto,
  ) {
    try {
      return await this.userUserService.saveGenderAge(token.id, dto);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAccessAuthGuard)
  @ApiOperation({
    summary: '오늘의 링크 프로필로 적용하기',
  })
  @Patch('update/todayLink/:url_id')
  async updateTodayLink(
    @CtxUser() token: JWTToken,
    @Param('url_id') url_id: number,
  ) {
    try {
      return await this.userUserService.updateTodayLink(token.id, url_id);
    } catch (e) {
      if (e instanceof NotFoundException)
        throw new NotFoundException(e.message);

      throw new InternalServerErrorException(e.message);
    }
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAccessAuthGuard)
  @ApiOperation({
    summary: '로그아웃',
  })
  @Post('logout')
  async logoutUser(@CtxUser() token: JWTToken) {
    try {
      return await this.userUserService.logoutTokenNull(token.id);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAccessAuthGuard)
  @ApiOperation({
    summary: '계정 탈퇴',
  })
  @Post('logout')
  async userWithdraw(@CtxUser() token: JWTToken) {
    try {
      return await this.userUserService.userWithdraw(token.id);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}

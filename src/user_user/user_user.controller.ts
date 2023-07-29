import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
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
    summary: '유저 닉네임, 한 줄 표현, 프로필(개발 미완) 저장 ------해야해!!',
  })
  @Patch()
  async saveUserInfo(
    @CtxUser() token: JWTToken,
    @Body(new ValidationPipe({ whitelist: true, transform: true }))
    dto: CreateUserInfoDto,
  ) {
    return await this.userUserService.saveUserInfo(token.id, dto);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAccessAuthGuard)
  @ApiOperation({
    summary: '유저 정보 출력(프로필(개발 미완),닉네임,한 줄 표현, 오늘의 링크',
  })
  @Get()
  async getUserInfo(@CtxUser() token: JWTToken) {
    return await this.userUserService.getUserInfo(token.id);
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
    summary: '성별, 나이, 페이지url',
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
    summary: '프로필로 적용하기',
  })
  @Patch('update/todayLink/:url_id')
  async updateTodayLink(
    @CtxUser() token: JWTToken,
    @Param('url_id') url_id: number,
  ) {
    try {
      return await this.userUserService.updateTodayLink(token.id, url_id);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}

import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Patch,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CtxUser } from 'src/decorator/auth.decorator';
import { JWTToken } from 'src/kakao-login/dto/jwt-token.dto';
import { JwtAccessAuthGuard } from 'src/kakao-login/jwt-access.guard';
import { UserUserService } from './user_user.service';
import { updateUserName } from './dto/update-user-name.dto';
import { upsertUserExplanation } from './dto/upsert-user-explanation.dto';
import { CreateUserInfoDto } from './dto/create-user-info.dto';

@ApiTags('유저 API')
@Controller('user-user')
export class UserUserController {
  constructor(private readonly userUserService: UserUserService) {}

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAccessAuthGuard)
  @ApiOperation({
    summary: '유저 닉네임, 한 줄 표현, 프로필(개발 미완) 저장',
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
    summary: '유저 정보 출력(프로필(개발 미완),닉네임,한 줄 표현',
  })
  @Get()
  async getUserInfo(@CtxUser() token: JWTToken) {
    return await this.userUserService.getUserInfo(token.id);
  }
}

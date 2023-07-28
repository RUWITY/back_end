import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
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
import { updateUserName } from './dto/update-user-name.dto';
import { upsertUserExplanation } from './dto/upsert-user-explanation.dto';

@ApiTags('유저 API')
@Controller('user-user')
export class UserUserController {
  constructor(private readonly userUserService: UserUserService) {}

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAccessAuthGuard)
  @ApiOperation({
    summary: '닉네임 변경',
  })
  @Patch('update/nickname')
  async updateUserName(
    @CtxUser() token: JWTToken,
    @Body(new ValidationPipe({ whitelist: true, transform: true }))
    dto: updateUserName,
  ) {
    try {
      return await this.userUserService.updateUserName(token.id, dto.name);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAccessAuthGuard)
  @ApiOperation({
    summary: '한 줄 표현 생성/수정',
  })
  @Patch('update/explanation')
  async saveExplanation(
    @CtxUser() token: JWTToken,
    @Body(new ValidationPipe({ whitelist: true, transform: true }))
    dto: upsertUserExplanation,
  ) {
    try {
      return await this.userUserService.upsertUserExplanation(
        token.id,
        dto.explanation,
      );
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}

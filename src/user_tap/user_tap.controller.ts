import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserTapService } from './user_tap.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAccessAuthGuard } from 'src/kakao-login/jwt-access.guard';
import { CreateUserTapTextDto } from './dto/create-user-tap-text.dto';
import { JWTToken } from 'src/kakao-login/dto/jwt-token.dto';
import { CtxUser } from 'src/decorator/auth.decorator';
import { UpdateUserTapTextDto } from './dto/update-user-tap-text.dto';
import { UpdateUserTapFolderState } from './dto/create-user-tap-folder.dto';
import { UpdateUserTapToggle } from './dto/create-user-tap-toggle.dto';
import { CreateUserTapLinkDto } from './dto/create-user-tap-link.dto';
import { UpdateUserTapLinkDto } from './dto/update-user-tap-link.dto';

@ApiTags('Tap API')
@Controller('user-tap')
export class UserTapController {
  constructor(private readonly userTapService: UserTapService) {}

  @Post('text')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAccessAuthGuard)
  @ApiOperation({
    summary: 'tap text 생성',
  })
  async saveTapText(
    @CtxUser() token: JWTToken,
    @Body(new ValidationPipe({ whitelist: true, transform: true }))
    dto: CreateUserTapTextDto,
  ) {
    try {
      return await this.userTapService.saveTapText(token.id, dto);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  @Patch('text')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAccessAuthGuard)
  @ApiOperation({
    summary: 'tap text 내용 수정',
  })
  async updateTapText(
    @Body(new ValidationPipe({ whitelist: true, transform: true }))
    dto: UpdateUserTapTextDto,
  ) {
    try {
      return await this.userTapService.updateTapText(dto);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  @Patch('text/folder')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAccessAuthGuard)
  @ApiOperation({
    summary: 'tap text folder 상태 변경 [펼침=true, 접음=false]',
  })
  async updateTapFolderState(
    @Body(new ValidationPipe({ whitelist: true, transform: true }))
    dto: UpdateUserTapFolderState,
  ) {
    try {
      return await this.userTapService.updateTapFolderState(dto);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  @Patch('text/toggle')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAccessAuthGuard)
  @ApiOperation({
    summary: 'tap text toggle 상태 변경 [공개=true, 비공개=false]',
  })
  async updateTapTextToggle(
    @Body(new ValidationPipe({ whitelist: true, transform: true }))
    dto: UpdateUserTapToggle,
  ) {
    try {
      return await this.userTapService.updateTapTextToggle(dto);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  @Delete('text/:tap_id')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAccessAuthGuard)
  @ApiOperation({
    summary: 'tap text 삭제',
  })
  async deleteTapText(@Param('tap_id', new ParseIntPipe()) tap_id: number) {
    try {
      return await this.userTapService.deleteTapText(tap_id);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  //-------------------------------------------------

  @Post('link')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAccessAuthGuard)
  @ApiOperation({
    summary: 'tap link 생성',
  })
  async saveTapLink(
    @CtxUser() token: JWTToken,
    @Body(new ValidationPipe({ whitelist: true, transform: true }))
    dto: CreateUserTapLinkDto,
  ) {
    try {
      return await this.userTapService.saveTapLink(token.id, dto);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  @Patch('link')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAccessAuthGuard)
  @ApiOperation({
    summary: 'tap link 내용(제목 or url) 수정 --- 프로필 추가 미완!!',
  })
  async updateTapLink(
    @Body(new ValidationPipe({ whitelist: true, transform: true }))
    dto: UpdateUserTapLinkDto,
  ) {
    try {
      return await this.userTapService.updateTapLink(dto);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  @Patch('link/folder')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAccessAuthGuard)
  @ApiOperation({
    summary: 'tap link folder 상태 변경 [펼침=true, 접음=false]',
  })
  async updateTapLinkFolderState(
    @Body(new ValidationPipe({ whitelist: true, transform: true }))
    dto: UpdateUserTapFolderState,
  ) {
    try {
      return await this.userTapService.updateTapLinkFolderState(dto);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  @Patch('link/toggle')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAccessAuthGuard)
  @ApiOperation({
    summary: 'tap link toggle 상태 변경 [공개=true, 비공개=false]',
  })
  async updateTapLinkTextToggle(
    @Body(new ValidationPipe({ whitelist: true, transform: true }))
    dto: UpdateUserTapToggle,
  ) {
    try {
      return await this.userTapService.updateTapLinkTextToggle(dto);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  @Delete('link/:id')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAccessAuthGuard)
  @ApiOperation({
    summary: 'tap link 삭제',
  })
  async deleteTapLink(@Param('id', new ParseIntPipe()) id: number) {
    try {
      return await this.userTapService.deleteTapLink(id);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  //-----------------------------------------------

  @Get(':user_id')
  @ApiOperation({
    summary: '모든 탭 출력',
  })
  async findAllUserTages(
    @Param('user_id', new ParseIntPipe()) user_id: number,
  ) {
    try {
      return await this.userTapService.findAllByUserIdOrderByCreatedAtDesc(
        user_id,
      );
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}

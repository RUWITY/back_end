import { Controller, Get, HttpStatus, Res, UseGuards } from '@nestjs/common';
import { KakaoLoginService } from './kakao-login.service';
import { Response } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CtxUser } from 'src/decorator/auth.decorator';
import { JwtAuthGuard } from './jwt-auth.guard';
import { KakaoLoginUserDto } from './dto/kakao-login.dto';

@ApiTags('로그인 API')
@Controller('kakao-login')
export class KakaoLoginController {
  constructor(private readonly kakaoLoginService: KakaoLoginService) {}

  @ApiOperation({
    summary: '로그인 리다이렉트 url',
  })
  @Get()
  async redirectToKakaoLogin(@Res() response: Response) {
    console.log('df', process.env.REST_API);

    const redirect_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REST_API}&redirect_uri=${process.env.REDIRECT_URI}&response_type=code`;
    response.redirect(HttpStatus.MOVED_PERMANENTLY, redirect_URL);
  }

  @Get('kakao-callback')
  @UseGuards(JwtAuthGuard)
  async handleKakaoCallback(
    @CtxUser() kakao_user: KakaoLoginUserDto,
    @Res() response: Response,
  ) {
    console.log('ddd');
    const { access_token, refresh_token } =
      await this.kakaoLoginService.kakaoLogin(kakao_user);

    const redirectUrl = `http://localhost:3000?access_token=${access_token}&refresh_token=${refresh_token}`;
    response.redirect(302, redirectUrl);
  }
}

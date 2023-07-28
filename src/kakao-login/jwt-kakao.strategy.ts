import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-kakao';

export class JwtKakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientID: process.env.REST_API,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.REDIRECT_URI,
      scope: [],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
      kakao_id: profile._json.id,
      // nickname: profile._json.properties.nickname,
      // profile_image: profile._json.properties.profile_image,
    };
  }
}

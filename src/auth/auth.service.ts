import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from 'src/config';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entity/user.entity';
import { LoginPayload } from './dto/login-payload.dto';
import { Hash } from 'src/utils/hash';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  async createToken(user: User) {
    return {
      expireIn: this.configService.get('JWT_EXPIRATION_TIME'),
      accessToken: this.jwtService.sign({
        id: user.id,
        email: user.email,
      }),
      user,
    };
  }

  async validateUser(payload: LoginPayload): Promise<any> {
    const user = await this.userService.getByEmail(payload.email);
    if (!user || !Hash.compare(payload.password, user.password)) {
      throw new UnauthorizedException('Invalid creadential');
    }
    return user;
  }
}

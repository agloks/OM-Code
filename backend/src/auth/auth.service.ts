import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}
  
  async generateToken(user: User) {
    const payload = { email: user.email };

    return {"jwt_token": await this.jwtService.signAsync(payload)};
  }

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    return {...await this.generateToken(user), user};
  }

  async refreshToken(token: string): Promise<any> {
    const payload = await this.jwtService.verifyAsync(token);
    const user = await this.usersService.findOneByEmail(payload.email);
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.generateToken(user);
  }

  async truncate() {
    return this.usersService.truncate();
  }
}

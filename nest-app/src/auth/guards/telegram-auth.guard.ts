import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class TelegramAuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    try {
      const [authType, authData] = authHeader.split(' ');
      if (!authType || authType !== 'tma' || !authData) {
        throw new UnauthorizedException('Invalid authorization header format');
      }
      const userData = await this.authService.validateUserFromHeader(authData);

      request.telegramUser = userData.telegramUser;
      request.dbUser = userData.dbUser;
      return true;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}

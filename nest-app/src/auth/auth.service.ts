import { Injectable, UnauthorizedException } from '@nestjs/common';
import { parse, validate, type InitData } from '@telegram-apps/init-data-node';

@Injectable()
export class AuthService {
  botToken: string;
  constructor() {
    this.botToken = process.env.BOT_TOKEN!;
    if (!this.botToken) {
      throw new Error('Bot Token not provided.');
    }
  }

  async validateUserFromHeader(
    authHeader: string,
  ): Promise<{ telegramUser: InitData; dbUser: InitData['user'] }> {
    if (!authHeader) {
      throw new UnauthorizedException('No authorization header provided');
    }

    try {
      // Taken from https://docs.telegram-mini-apps.com/platform/authorizing-user#server
      validate(authHeader, this.botToken, {
        // We consider init data sign valid for 1 hour from their creation moment.
        expiresIn: 3600,
      });
      const telegramUser = parse(authHeader);

      if (!telegramUser) {
        throw new UnauthorizedException(
          'Invalid or incomplete Telegram user data',
        );
      }
      // Here you would typically fetch the user from your database using the telegramUser data
      // Here we just copy the telegramUser to dbUser for demonstration purposes
      const dbUser = telegramUser.user;
      return {
        telegramUser,
        dbUser,
      };
    } catch (error) {
      throw new UnauthorizedException(
        `Authentication failed: ${error.message}`,
      );
    }
  }
}

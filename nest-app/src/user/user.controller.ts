import { Controller, Get, UseGuards } from '@nestjs/common';
import { InitData } from '@telegram-apps/init-data-node';
import { DbUser } from 'src/auth/decorators/db-user.decorator';
import { TelegramUser } from 'src/auth/decorators/telegram-user.decorator';
import { TelegramAuthGuard } from 'src/auth/guards/telegram-auth.guard';

@Controller('user')
export class UserController {
  @Get('/')
  @UseGuards(TelegramAuthGuard)
  getSecureData(
    @TelegramUser() telegramUser: InitData,
    @DbUser() dbUser: InitData['user'],
  ) {
    return `${telegramUser.chat_type} ${dbUser?.first_name} ${dbUser?.last_name}`;
  }
}

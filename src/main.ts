import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Telegraf } from 'telegraf';
import * as dotenv from 'dotenv';
import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

function getButton(ctx: any, text: string): InlineKeyboardButton {
    return {text, url: `${process.env.URL}?bot=${ctx.botInfo.id}&user=${ctx.update.message.from.username}&data=${'LEGO'}&date=${ctx.update.message.date}`}
}
const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start(async (ctx) => {
  try {
      await ctx.reply(`Выбери ${ctx.startPayload}`, {
      reply_markup: {
        inline_keyboard: [
            [
                getButton(ctx, "LEGO"),
            ],
            [
                getButton(ctx, "Мозайка"),
                getButton(ctx, "Монополия"),
                getButton(ctx, "UNO"),
            ],
          ],
      },
    });
  } catch (error) {
    ctx.reply("error");
  }
});
bot.launch({});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

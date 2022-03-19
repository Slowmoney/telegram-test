import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto'
@Injectable()
export class AppService {
  getHello(query: {bot: string, user: string, data: string, date: string}) {
    const hash = crypto.createHash("sha256").update(`${query.bot}${query.user}${query.data}${query.date}`).digest('hex')
    return {bot: query.bot, user: query.user, data: query.data, date: query.date, hash};
  }
}

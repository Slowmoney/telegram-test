import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Query() query: {bot: string, user: string, data: string, date: string}) {
    return this.appService.getHello(query)
  }
}

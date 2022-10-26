import { Controller, Get } from '@nestjs/common';

@Controller('')
export class AppController {
  @Get()
  welcome() {
    return 'welcome NestJs Movie API! ';
  }
}

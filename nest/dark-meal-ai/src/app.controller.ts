import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { OptionalJwtAuthGuard } from './auth/optional-jwt.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(OptionalJwtAuthGuard)
  @Get()
  getHello(@Req() req): string {
    if (req.user) {
      return `Hello, ${req.user.email}!`;
    }
    return this.appService.getHello();
  }
}
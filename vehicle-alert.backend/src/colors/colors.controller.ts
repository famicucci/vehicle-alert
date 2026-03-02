import { Body, Controller, Get, Post } from '@nestjs/common';
import { ColorsService } from './colors.service';

@Controller('colors')
export class ColorsController {
  constructor(private readonly colorsService: ColorsService) {}

  @Get('/')
  getColors() {
    return this.colorsService.getColors();
  }

  @Post('/')
  createColor(@Body() colorData: { name: string; code: string }) {
    return this.colorsService.createColor(colorData);
  }
}

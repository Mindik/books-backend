import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { User } from '../user/entities/user.entity';
import { CreateYearDto } from './dto/create-year.dto';
import { UpdateYearDto } from './dto/update-year.dto';
import { Year } from './entities/year.entity';
import { YearService } from './year.service';

@Controller('year')
export class YearController {
  constructor(private readonly yearService: YearService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll() {
    return (await this.yearService.findAll()).map((year) => new Year(year));
  }

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() createYearDto: CreateYearDto) {
    return new Year(await this.yearService.create(createYearDto));
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async findOne(@Param('id') id: string): Promise<Year> {
    return new Year(await this.yearService.findOne(Number.parseInt(id, 10)));
  }

  @Get('value/:value')
  @UseInterceptors(ClassSerializerInterceptor)
  async findOneByValue(@Param('value') value: string): Promise<Year> {
    return new Year(await this.yearService.findOneByValue(value));
  }

  @Patch(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async update(@Param('id') id: string, @Body() updateYearDto: UpdateYearDto): Promise<Year> {
    return new Year(await this.yearService.update(Number.parseInt(id, 10), updateYearDto));
  }

  @Delete(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async remove(@Param('id') id: string): Promise<Year> {
    return new Year(await this.yearService.remove(Number.parseInt(id, 10)));
  }
}

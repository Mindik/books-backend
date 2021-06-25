import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateYearDto } from './dto/create-year.dto';
import { UpdateYearDto } from './dto/update-year.dto';
import { Year } from './entities/year.entity';
import { ALREADY_EXISTS_YEAR, NOT_FOUND_YEAR } from './year.constants';

@Injectable()
export class YearService {
  constructor(@InjectRepository(Year) private readonly yearRepository: Repository<Year>) {}

  async create(createYearDto: CreateYearDto): Promise<Year> {
    try {
      return this.yearRepository.save(createYearDto);
    } catch (e) {
      if (e.code === '23505') throw new ConflictException(ALREADY_EXISTS_YEAR);
      throw new InternalServerErrorException();
    }
  }

  async findAll(): Promise<Year[]> {
    return this.yearRepository.find();
  }

  async findOne(id: number): Promise<Year> {
    return this.yearRepository.findOne(id);
  }

  async findOneByValue(value: string): Promise<Year> {
    return this.yearRepository.findOne({ value });
  }

  async update(id: number, updateYearDto: UpdateYearDto): Promise<Year> {
    const year = await this.findOne(id);
    if (!year) throw new NotFoundException(NOT_FOUND_YEAR);
    return this.yearRepository.save({ id, ...updateYearDto });
  }

  async remove(id: number): Promise<Year> {
    const year = await this.findOne(id);
    if (!year) throw new NotFoundException(NOT_FOUND_YEAR);
    return this.yearRepository.remove(year);
  }
}

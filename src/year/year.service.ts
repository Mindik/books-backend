import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateBookDto } from '../book/dto/update-book.dto';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { User } from '../user/entities/user.entity';
import { NOT_FOUND } from '../user/users.constants';
import { CreateYearDto } from './dto/create-year.dto';
import { Year } from './entities/year.entity';
import { ALREADY_EXISTS_YEAR } from './year.constants';

@Injectable()
export class YearService {
  constructor(@InjectRepository(Year) private readonly yearRepository: Repository<Year>) {}

  async createYear(createYearDto: CreateYearDto): Promise<Year> {
    try {
      return this.yearRepository.save(createYearDto);
    } catch (e) {
      if (e.code === '23505') throw new ConflictException(ALREADY_EXISTS_YEAR);
      throw new InternalServerErrorException();
    }
  }

  async findAllYear(): Promise<Year[]> {
    return this.yearRepository.find();
  }

  async findOneById(id: number): Promise<Year> {
    return this.yearRepository.findOne(id);
  }

  async findOneByValue(value: string): Promise<Year> {
    return this.yearRepository.findOne({ value });
  }

  update(id: number, updateBookDto: UpdateBookDto): Promise<Year> {
    const year = this.findOneById(id);
    if (!year) throw new NotFoundException(NOT_FOUND);
    return this.yearRepository.save({ id, ...updateBookDto });
  }

  async remove(id: number): Promise<Year> {
    const year = await this.findOneById(id);
    if (!year) throw new NotFoundException(NOT_FOUND);
    return this.yearRepository.remove(year);
  }
}

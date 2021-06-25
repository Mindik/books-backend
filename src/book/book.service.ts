import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ALREADY_EXISTS_YEAR, NOT_FOUND_YEAR } from '../year/year.constants';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Author } from '../author/entities/author.entity';
import { Book } from './entities/book.entity';
import { Year } from '../year/entities/year.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Year) private readonly yearRepository: Repository<Year>,
    @InjectRepository(Author) private readonly authorRepository: Repository<Author>,
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    return this.bookRepository.save(createBookDto);
  }

  async findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  async findOne(uid: string): Promise<Book> {
    return this.bookRepository.findOne(uid);
  }

  async findOneByTitle(title: string): Promise<Book> {
    return this.bookRepository.findOne({ title });
  }

  async update(uid: string, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await this.findOne(uid);
    if (!book) throw new NotFoundException(NOT_FOUND_YEAR);
    return this.bookRepository.save({ uid, ...updateBookDto });
  }

  async remove(uid: string): Promise<Book> {
    const book = await this.findOne(uid);
    if (!book) throw new NotFoundException(NOT_FOUND_YEAR);
    return this.bookRepository.remove(book);
  }
}

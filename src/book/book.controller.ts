import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@ApiTags('book')
@Controller('Book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return new Book(await this.bookService.create(createBookDto));
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll(): Promise<Book[]> {
    return (await this.bookService.findAll()).map((book) => new Book(book));
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async findOne(@Param('uid') uid: string): Promise<Book> {
    return new Book(await this.bookService.findOne(uid));
  }

  @Patch(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async update(@Param('uid') uid: string, @Body() updateBookDto: UpdateBookDto): Promise<Book> {
    return new Book(await this.bookService.update(uid, updateBookDto));
  }

  @Delete(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async remove(@Param('uid') uid: string): Promise<Book> {
    return new Book(await this.bookService.remove(uid));
  }
}

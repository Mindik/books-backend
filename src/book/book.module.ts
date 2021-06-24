import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { Author } from './entities/author.entity';
import { Book } from './entities/book.entity';
import { Year } from '../year/entities/year.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Year, Author, Book])],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { UpdateBookDto } from '../book/dto/update-book.dto';
import { NOT_FOUND_AUTHOR } from './author.constants';
import { CreateAuthorDto } from './dto/create-author.dto';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorService {
  constructor(@InjectRepository(Author) private readonly authorRepository: Repository<Author>) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    return this.authorRepository.save(createAuthorDto);
  }

  async findAll(): Promise<Author[]> {
    return this.authorRepository.find();
  }

  async findOne(uid: string): Promise<Author> {
    return this.authorRepository.findOne(uid);
  }

  async findByName(name: string) {
    return this.authorRepository.find({
      where: [{ name: ILike(`%${name}%`) }, { middleName: ILike(`%${name}%`) }, { lastName: ILike(`%${name}%`) }],
    });
  }

  async update(uid: string, updateAuthorDto: UpdateBookDto): Promise<Author> {
    const author = this.findOne(uid);
    if (!author) throw new NotFoundException(NOT_FOUND_AUTHOR);
    return this.authorRepository.save({ uid, ...updateAuthorDto });
  }

  async remove(uid: string): Promise<Author> {
    const author = await this.findOne(uid);
    if (!author) throw new NotFoundException(NOT_FOUND_AUTHOR);
    return this.authorRepository.remove(author);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() createAuthorDto: CreateAuthorDto): Promise<Author> {
    return new Author(await this.authorService.create(createAuthorDto));
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll(): Promise<Author[]> {
    return (await this.authorService.findAll()).map((author) => new Author(author));
  }

  @Get(':uid')
  @UseInterceptors(ClassSerializerInterceptor)
  async findOne(@Param('uid') uid: string): Promise<Author> {
    return new Author(await this.authorService.findOne(uid));
  }

  @Get('name/:name')
  @UseInterceptors(ClassSerializerInterceptor)
  async findOneByName(@Param('name') name: string): Promise<Author[]> {
    return (await this.authorService.findByName(name)).map((author) => new Author(author));
  }

  @Patch(':uid')
  @UseInterceptors(ClassSerializerInterceptor)
  async update(@Param('uid') uid: string, @Body() updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    return new Author(await this.authorService.update(uid, updateAuthorDto));
  }

  @Delete(':uid')
  @UseInterceptors(ClassSerializerInterceptor)
  async remove(@Param('uid') uid: string): Promise<Author> {
    return new Author(await this.authorService.remove(uid));
  }
}

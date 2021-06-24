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
import { ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return new User(await this.userService.create(createUserDto));
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll(): Promise<User[]> {
    return (await this.userService.findAll()).map((user) => new User(user));
  }

  @Get(':uid')
  @UseInterceptors(ClassSerializerInterceptor)
  async findOne(@Param('uid') uid: string): Promise<User> {
    return new User(await this.userService.findOneByUid(uid));
  }

  @Get('email/:email')
  @UseInterceptors(ClassSerializerInterceptor)
  async findOneByEmail(@Param('email') email: string): Promise<User> {
    return new User(await this.userService.findOneByEmail(email));
  }

  @Patch(':uid')
  @UseInterceptors(ClassSerializerInterceptor)
  async update(@Param('uid') uid: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return new User(await this.userService.update(uid, updateUserDto));
  }

  @Delete(':uid')
  @UseInterceptors(ClassSerializerInterceptor)
  async remove(@Param('uid') uid: string): Promise<User> {
    return new User(await this.userService.remove(uid));
  }
}

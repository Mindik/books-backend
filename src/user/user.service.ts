import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IS_BLOCKED } from '../auth/auth.constants';
import { RoleDescription, RoleValue } from '../role/role.enum';
import { RoleService } from '../role/role.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { NOT_FOUND, ALREADY_EXISTS } from './users.constants';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly roleService: RoleService,
  ) {}

  async isValidUser(user: User, ...status): Promise<boolean> {
    return new Promise((resolve) => {
      if (status.some((s) => !!user[s])) {
        throw new HttpException(IS_BLOCKED, HttpStatus.FORBIDDEN);
      }
      return resolve(true);
    });
  }
  async create(createUserDto: CreateUserDto): Promise<User> {
    let role = await this.roleService.findOneByValue(RoleValue.User);
    if (!role) {
      role = await this.roleService.create({
        value: RoleValue.User,
        description: RoleDescription.User,
      });
    }

    try {
      return this.userRepository.save({ ...createUserDto, roles: [role] });
    } catch (e) {
      if (e.code === '23505') throw new ConflictException(ALREADY_EXISTS);
      throw new InternalServerErrorException();
    }
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOneByUid(uid: string): Promise<User> {
    return this.userRepository.findOne(uid);
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ email });
  }

  async update(uid: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOneByUid(uid);
    if (!user) throw new NotFoundException(NOT_FOUND);
    return this.userRepository.save({ uid, ...updateUserDto });
  }

  async remove(uid: string): Promise<User> {
    const user = await this.findOneByUid(uid);
    if (!user) throw new NotFoundException(NOT_FOUND);
    return this.userRepository.remove(user);
  }
}

import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { ALREADY_EXISTS, NOT_FOUND } from './role.constants';

@Injectable()
export class RoleService {
  constructor(@InjectRepository(Role) private readonly roleRepository: Repository<Role>) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    try {
      return this.roleRepository.save(createRoleDto);
    } catch (e) {
      if (e.code === '23505') {
        throw new ConflictException(ALREADY_EXISTS);
      }
      throw new InternalServerErrorException();
    }
  }

  async findAll(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  async findOneByUid(uid: string): Promise<Role> {
    return this.roleRepository.findOne(uid);
  }

  async findOneByValue(value: string): Promise<Role> {
    return this.roleRepository.findOne({ value });
  }

  async update(uid: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const user = await this.findOneByUid(uid);
    if (!user) throw new NotFoundException(NOT_FOUND);
    return this.roleRepository.save({ uid, ...updateRoleDto });
  }

  async remove(uid: string): Promise<Role> {
    const user = await this.findOneByUid(uid);
    if (!user) throw new NotFoundException(NOT_FOUND);
    return this.roleRepository.remove(user);
  }
}

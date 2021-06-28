import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@ApiTags('role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':uid')
  findOne(@Param('uid') uid: string) {
    return this.roleService.findOneByUid(uid);
  }

  @Get('value/:value')
  findOneByValue(@Param('value') value: string) {
    return this.roleService.findOneByValue(value);
  }

  @Patch(':uid')
  update(@Param('uid') uid: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(uid, updateRoleDto);
  }

  @Delete(':uid')
  remove(@Param('uid') uid: string) {
    return this.roleService.remove(uid);
  }
}

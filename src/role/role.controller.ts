import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Permission } from '../public/permission.decorator';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Permission('role::add')
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Permission('role::get')
  @Get()
  getAllRole(){
    return this.roleService.findAll();
  }

  @Patch()
  @Permission('role::update')
  updateRole(
    @Body() dto: UpdateRoleDto
  ){
    return this.roleService.update(dto);
  }
}

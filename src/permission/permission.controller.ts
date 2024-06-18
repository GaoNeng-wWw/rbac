import { Body, Controller, Patch, Post } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { Permission } from '../public/permission.decorator';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Permission('permission::create')
  @Post()
  create(
    @Body() dto: CreatePermissionDto
  ){
    return this.permissionService.create(dto);
  }

  @Patch()
  @Permission('permission::update')
  update(
    @Body() dto: UpdatePermissionDto
  ){
    return this.permissionService.updatePermission(dto);
  }
}
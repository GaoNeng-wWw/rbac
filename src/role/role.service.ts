import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission, Role } from '@app/models';
import { In, Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly role: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permission: Repository<Permission>
  ){}
  async create(createRoleDto: CreateRoleDto) {
    const {name, permissionIds} = createRoleDto;
    const roleInfo = this.role.findOne({
      where:{
        name
      }
    })
    if (await roleInfo){
      throw new HttpException('角色已存在', HttpStatus.BAD_REQUEST);
    }
    const permissions = await this.permission.find({
      where:{
        id: In(permissionIds)
      }
    });
    return this.role.save({name, permission: permissions});
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Role, User } from '@app/models';
import { In, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRep: Repository<User>,
    @InjectRepository(Role)
    private roleRep: Repository<Role>
  ){

  }
  async create(createUserDto: CreateUserDto) {
    const {email, password, roleIds=[], username} = createUserDto;
    const userInfo = this.getUserInfo(email);
    if (await userInfo){
      throw new HttpException('用户存在', HttpStatus.BAD_REQUEST);
    }
    const roles = this.roleRep.find({
      where: {
        id: In(roleIds)
      }
    })
    try {
      const user = this.userRep.create({
        email,
        password,
        name: username,
        role: await roles
      })
      return this.userRep.save(user);
    } catch (err) {
      throw new HttpException((err as Error).message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getUserInfo(email: string, relations: string[]=[]){
    console.log(email)
    return this.userRep.findOne({
      where: {email},
      select: [
        'id','name','email','createTime','updateTime','role'
      ],
      relations
    });
  }

  async getUserPermission(token: string, userInfo: User){
    const {email} = userInfo;
    const {role} = await this.getUserInfo(email, ['role', 'role.permission']) ?? {role: [] as Role[]};
    const permission = role.flatMap(r => r.permission);
    const permissionNames = permission.map((p) => p.name);
    return [...new Set([...permissionNames])]
  }
}

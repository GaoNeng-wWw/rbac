import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Permission } from '../public/permission.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('reg')
  @Permission('user::add')
  async register(
    @Body() body: CreateUserDto
  ){
    return this.userService.create(body);
  }
  @Get('/info/:email')
  async getUserInfo(
    @Param('email') email: string
  ){
    return this.userService.getUserInfo(email, ['role', 'role.permission'])
  }
}

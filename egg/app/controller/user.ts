import { UserService } from '@/service/user';
import { Context, EggContext, HTTPBody, HTTPController, HTTPMethod, HTTPMethodEnum, HTTPParam, HTTPQuery, Inject } from '@eggjs/tegg';
import { CreateUser, createUser, updateUser, UpdateUser } from 'app/dto';
import { HttpException } from 'app/utils/HttpException';
import { ValidateException } from 'app/utils/ValidateError';
import { StatusCodes } from 'http-status-codes';

@HTTPController({
  path: '/user',
})
export class UserController {
  @Inject()
  private service: UserService;


  @HTTPMethod({
    method: HTTPMethodEnum.POST,
    path: '/reg',
  })
  async reg(
    @Context() ctx: EggContext,
    @HTTPBody() body: CreateUser,
  ) {
    console.log(body);
    const errors = ctx.app.validator.validate(createUser, body);
    if (errors) {
      throw new ValidateException(errors[0]);
    }
    return this.service.create(body, ctx);
  }


  @HTTPMethod({
    method: HTTPMethodEnum.GET,
    path: '/info/:email',
  })
  async getUser(
    @HTTPParam({ name: 'email' }) email: string,
    @Context() ctx: EggContext,
  ) {
    if (!email) {
      throw new HttpException('email不能为空', StatusCodes.BAD_REQUEST);
    }
    const userInfo = await this.service.getUserInfo(email, [ 'role', 'role.permission' ], ctx);
    if (userInfo === null) {
      throw new HttpException('用户不存在', StatusCodes.NOT_FOUND);
    }
    return userInfo;
  }


  @HTTPMethod({
    method: HTTPMethodEnum.DELETE,
    path: '/:email',
  })
  async deleteUser(
    @HTTPParam({
      name: 'email',
    }) email: string,
    @Context() ctx: EggContext,
  ) {
    if (!email) {
      throw new HttpException('用户不存在', StatusCodes.BAD_REQUEST);
    }
    await this.service.delUser(email, ctx);
    return {};
  }

  @HTTPMethod({
    method: HTTPMethodEnum.GET,
    path: '/',
  })
  async getAllUser(
    @HTTPQuery({ name: 'page' }) _page = 0,
    @Context() ctx:EggContext,
    @HTTPQuery({ name: 'limit' }) _limit?:number,
  ) {
    const page = _page;
    const limit = _limit ?? ctx.app.config.page.pageSize;
    return await this.service.getAllUser(Number.parseInt(page.toString()), limit, ctx);
  }

  @HTTPMethod({
    method: HTTPMethodEnum.DELETE,
    path: '/update',
  })
  async updatePassword(
    @HTTPBody() body: UpdateUser,
    @Context() ctx: EggContext,
  ) {
    const errors = ctx.app.validator.validate(updateUser, body);
    if (errors) {
      throw new ValidateException(errors[0]);
    }

    this.service.updateUserPwd(body, ctx);
    // TODO: LOGOUT
  }
}

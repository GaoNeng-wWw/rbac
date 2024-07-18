import { Context, EggContext, HTTPController, HTTPMethod, HTTPMethodEnum } from '@eggjs/tegg';
import { HttpException } from 'app/utils/HttpException';
import { StatusCodes } from 'http-status-codes';

@HTTPController({
  path: '/user',
})
export class User {
  @HTTPMethod({
    method: HTTPMethodEnum.GET,
    path: '/info',
  })
  async getUser(
    @Context() ctx: EggContext,
  ) {
    const { email = '' } = ctx.request.query;
    if (!email) {
      throw new HttpException(StatusCodes.BAD_REQUEST, 'email不能为空');
    }
  }
}

import { AccessLevel, Context, EggContext, SingletonProto } from '@eggjs/tegg';
import { CreateAuth } from 'app/dto';
import { User } from 'app/models';
import { encry } from 'app/models/user';
import { HttpException } from 'app/utils/HttpException';
import { StatusCodes } from 'http-status-codes';
import { sign, Algorithm } from 'jsonwebtoken';

@SingletonProto({
  accessLevel: AccessLevel.PUBLIC,
})
export class AuthService {
  private establish(
    payload: Record<string, any>,
    algorithm:Algorithm,
    @Context() ctx: EggContext,
  ) {
    const { secret, expiresIn } = ctx.app.config.jwt;
    const token = sign(payload, secret, {
      expiresIn,
      algorithm,
    });
    // TODO: register in redis
    return token;
  }
  private revoke(
    // token: string,
    email: string,
  ) {
    console.log(email);
    // TODO: delete token in redis
  }
  async login(
    data: CreateAuth,
    @Context() ctx: EggContext,
  ) {
    const { password, email } = data;
    const userRep = ctx.app.db.getRepository(User);
    const userInfo = await userRep.findOne({
      where: {
        email,
      },
      select: [ 'email', 'password', 'deleteAt' ],
    });
    if (!userInfo || userInfo.deleteAt) {
      throw new HttpException('用户不存在', StatusCodes.NOT_FOUND);
    }
    if (encry(password, userInfo.salt) !== userInfo.password) {
      throw new HttpException('密码或邮箱错误', StatusCodes.BAD_REQUEST);
    }
    const token = this.establish({
      email,
    }, 'HS256', ctx);
    return token;
  }
  async logout(email:string) {
    return this.revoke(email);
  }
}

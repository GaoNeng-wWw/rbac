import { AccessLevel, Context, EggContext, SingletonProto } from '@eggjs/tegg';
import { CreateUser, UpdateUser } from '../dto';
import { Role, User } from 'app/models';
import { HttpException } from 'app/utils/HttpException';
import { StatusCodes } from 'http-status-codes';
import { In } from 'typeorm';
import { pbkdf2Sync } from 'node:crypto';

@SingletonProto({
  accessLevel: AccessLevel.PUBLIC,
})
export class UserService {
  async getUserInfo(
    email:string,
    relations:string[] = [],
    ctx:EggContext,
  ) {
    const user = ctx.app.db.getRepository(User);
    return user.findOne({
      where: { email, deleteAt: 0 },
      select: [
        'id',
        'name',
        'email',
        'createTime',
        'updateTime',
        'role',
        'deleteAt',
      ],
      relations,
    });
  }
  async create(
    data: CreateUser,
    ctx:EggContext,
  ) {
    const {
      email,
      password,
      roleIds = [],
      username,
    } = data;
    const userInfo = await this.getUserInfo(email, [], ctx);
    if (userInfo) {
      throw new HttpException('用户存在', StatusCodes.BAD_REQUEST);
    }
    const roleRep = ctx.app.db.getRepository(Role);
    const userRep = ctx.app.db.getRepository(User);
    const roles = roleRep.find({
      where: {
        id: In(roleIds),
      },
    });
    try {
      const user = userRep.create({
        email,
        password,
        name: username,
        role: await roles,
        deleteAt: 0,
      });
      return userRep.save(user);
    } catch (e) {
      throw new HttpException(
        (e as Error).message,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getAllUser(
    page: number,
    @Context() ctx: EggContext,
  ) {
    const pageSize = ctx.app.config.page.pageSize;
    const userRep = ctx.app.db.getRepository(User);
    const totalUser = userRep.count({
      cache: {
        id: 'cache::getAllUser::totalUser',
        milliseconds: 3000,
      },
    });
    const skip = Math.max(page - 1, 0) * pageSize;
    const users = userRep.find({
      skip,
      take: pageSize,
      cache: {
        id: `cache::getAllUser::${skip}`,
        milliseconds: 3000,
      },
      select: [
        'id',
        'name',
        'email',
        'role',
        'updateTime',
        'createTime',
        'update_time',
        'updateTime',
        'deleteAt',
      ],
      relations: [ 'role' ],
    });
    const totalPages = Math.ceil(await totalUser / pageSize);
    return {
      users: await users,
      totalPages,
    };
  }

  private async verifyPassword(password: string, storedHash: string, salt: string) {
    const newHash = pbkdf2Sync(password, salt, 1000, 18, 'sha256')
      .toString('hex');
    return newHash === storedHash;
  }
  private encry(value: string, salt: string) {
    return pbkdf2Sync(value, salt, 1000, 18, 'sha256').toString('hex');
  }

  async updateUserPwd(
    data: UpdateUser,
    ctx: EggContext,
  ) {
    const { email, newPassword, oldPassword } = data;
    const userRep = ctx.app.db.getRepository(User);
    const user = await userRep.findOne({
      where: {
        email,
        deleteAt: 0,
      },
    });
    if (!user) {
      throw new HttpException('用户不存在', StatusCodes.NOT_FOUND);
    }
    if (
      !(
        await this.verifyPassword(
          oldPassword,
          user.password,
          user.salt,
        )
      )
    ) {
      throw new HttpException('旧密码错误', StatusCodes.BAD_REQUEST);
    }
    user.password = this.encry(
      newPassword,
      user.salt,
    );
    userRep.save(user);
    return;
  }

  async delUser(
    email: string,
    ctx: EggContext,
  ) {
    const user = await this.getUserInfo(email, [], ctx);
    if (!user) {
      throw new HttpException('用户不存在', StatusCodes.BAD_REQUEST);
    }
    user.deleteAt = new Date().getTime();
    const userRep = ctx.app.db.getRepository(User);
    await userRep.save(user);
    return;
  }
}

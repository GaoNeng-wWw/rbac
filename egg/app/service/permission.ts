import { AccessLevel, Context, EggContext, SingletonProto } from '@eggjs/tegg';
import { CreatePermission, DeletePermission, UpdatePermission } from 'app/dto';
import { Permission } from 'app/models';
import { HttpException } from 'app/utils/HttpException';
import { StatusCodes } from 'http-status-codes';

@SingletonProto({
  accessLevel: AccessLevel.PUBLIC,
})
export class PermissionService {
  async create(
    data: CreatePermission,
    @Context() ctx: EggContext,
  ) {
    const { name, desc } = data;
    const permissionRep = ctx.app.db.getRepository(Permission);
    const permission = await permissionRep.findOne({
      where: {
        name,
      },
    });
    if (permission) {
      throw new HttpException(
        `权限字段 ${name} 已经存在`,
        StatusCodes.BAD_REQUEST,
      );
    }
    return await permissionRep.save({ name, desc });
  }
  private findPermissionByName(name: string, ctx:EggContext) {
    const rep = ctx.app.db.getRepository(Permission);
    return rep.findOne({ where: { name } });
  }
  async updatePermission(
    data: UpdatePermission,
    @Context() ctx: EggContext,
  ) {
    const { name, desc, id } = data;
    const permission = this.findPermissionByName(name!, ctx);
    if (!permission) {
      throw new HttpException('权限字段不存在', StatusCodes.NOT_FOUND);
    }
    const rep = ctx.app.db.getRepository(Permission);
    return rep.update(id, { name, desc });
  }
  async findPermission(
    @Context() ctx: EggContext,
  ) {
    const rep = ctx.app.db.getRepository(Permission);
    return rep.find();
  }
  async delPermission(
    data: DeletePermission,
    @Context() ctx: EggContext,
  ) {
    const { name } = data;
    const permission = await this.findPermissionByName(name, ctx);
    if (!permission) {
      throw new HttpException(`字段${name}不存在`, StatusCodes.NOT_FOUND);
    }
    const rep = ctx.app.db.getRepository(Permission);
    return rep.remove(permission);
  }
}

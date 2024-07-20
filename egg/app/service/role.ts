import { AccessLevel, EggContext, SingletonProto } from '@eggjs/tegg';
import { CreateRole, DeleteRole, UpdateRole } from 'app/dto';
import { Menu, Permission, Role } from 'app/models';
import { HttpException } from 'app/utils/HttpException';
import { StatusCodes } from 'http-status-codes';
import { In } from 'typeorm';

@SingletonProto({
  accessLevel: AccessLevel.PUBLIC,
})
export class RoleService {
  findAll(ctx:EggContext) {
    const rep = ctx.app.db.getRepository(Role);
    return rep.find();
  }
  findOne(id: string, ctx:EggContext) {
    const rep = ctx.app.db.getRepository(Role);
    const role = rep.findOne({
      where: {
        id: parseInt(id),
      },
    });
    if (!role) {
      throw new HttpException('角色不存在', StatusCodes.NOT_FOUND);
    }
    return role;
  }
  async create(
    data: CreateRole,
    ctx: EggContext,
  ) {
    const { name, permissionIds = [], menuIds = [] } = data;
    const rep = ctx.app.db.getRepository(Role);
    const roleInfo = await rep.findOne({ where: { name } });
    if (roleInfo) {
      throw new HttpException('角色存在', StatusCodes.BAD_REQUEST);
    }
    const permissionRep = ctx.app.db.getRepository(Permission);
    const menuRep = ctx.app.db.getRepository(Menu);
    const permissions = await permissionRep.find({
      where: {
        id: In(permissionIds),
      },
    });
    const menus = await menuRep.find({
      where: {
        id: In(menuIds),
      },
    });
    const role = rep.create({
      name,
      permission: permissions,
      menus,
    });
    return rep.save(role);
  }
  async update(
    data: UpdateRole,
    ctx: EggContext,
  ) {
    const permissionRep = ctx.app.db.getRepository(Permission);
    const menuRep = ctx.app.db.getRepository(Menu);
    const roleRep = ctx.app.db.getRepository(Role);
    const permission = permissionRep.find({
      where: {
        id: In(data.permissionIds ?? []),
      },
    });
    const menus = menuRep.find({
      where: {
        id: In(data.menuIds ?? []),
      },
    });
    const { id, name } = data;
    const roleInfo = await roleRep.findOne({
      where: {
        id,
      },
    });
    if (!roleInfo) {
      throw new HttpException('角色不存在', StatusCodes.NOT_FOUND);
    }
    if (name) {
      roleInfo.name = name;
    }
    if ((await permission).length) {
      roleInfo.permission = await permission;
    }
    if ((await menus).length) {
      roleInfo.menus = await menus;
    }
    return roleRep.save(roleInfo);
  }
  async del(
    data: DeleteRole,
    ctx: EggContext,
  ) {
    const rep = ctx.app.db.getRepository(Role);
    const role = rep.find({
      where: {
        name: data.name,
      },
    });
    return rep.remove(await role);
  }
}

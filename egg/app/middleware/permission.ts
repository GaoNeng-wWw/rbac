import { EggContext } from '@eggjs/tegg';
import AntPathMatcher from '@maxbilbow/ant-path-matcher';
import { User } from 'app/models';
import { StatusCodes } from 'http-status-codes';
import { Next } from 'koa';

export default () => {
  const matcher = AntPathMatcher();
  return async (
    ctx:EggContext,
    next:Next,
  ) => {
    const path = ctx.path;
    const reqMethod = ctx.method.toLowerCase();
    const permissionsList = ctx.app.config.permission;
    const route = permissionsList.filter(p => {
      return matcher.match(p.pattern, path);
    });
    if (!route.length) {
      ctx.logger.debug(`[MIDDLEWARE][permission]: allow ${path}`);
      await next();
      return;
    }
    if (!ctx.request.user) {
      ctx.status = StatusCodes.UNAUTHORIZED;
      ctx.body = {
        statusCode: StatusCodes.UNAUTHORIZED,
        message: '未登录',
      };
      return;
    }
    const { email } = ctx.request.user;
    const userRep = ctx.app.db.getRepository(User);
    const user = await userRep.findOne({
      where: {
        email,
      },
      relations: [ 'role', 'role.permission' ],
    });
    if (!user) {
      ctx.status = StatusCodes.UNAUTHORIZED;
      ctx.body = {
        statusCode: StatusCodes.UNAUTHORIZED,
        message: '未登录',
      };
      return;
    }
    const userPermissions = user?.role.flatMap(role => role.permission).map(p => p.name);
    if (userPermissions.includes('*')) {
      await next();
      return;
    }
    const { method, permissions } = route[0];
    if (method !== reqMethod) {
      await next();
      return;
    }
    let allow = false;
    for (const p of permissions) {
      if (allow) {
        break;
      }
      allow = userPermissions.includes(p);
    }
    if (!allow) {
      ctx.status = StatusCodes.FORBIDDEN;
      ctx.body = {
        statusCode: StatusCodes.FORBIDDEN,
        message: '权限不足',
      };
    }
    await next();
  };
};

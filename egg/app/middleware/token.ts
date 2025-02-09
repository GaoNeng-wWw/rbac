import { EggContext, Next } from '@eggjs/tegg';
import AntPathMather from '@maxbilbow/ant-path-matcher';
import { StatusCodes } from 'http-status-codes';
import { WhiteListItem } from 'index';
import { decode, verify } from 'jsonwebtoken';
export default () => {
  const matcher = AntPathMather();
  const inWhiteList = (
    whiteList: WhiteListItem[],
    reqMethod: string,
    reqUrl: string,
  ) => {
    return whiteList.filter(({ pattern, method }) => {
      return matcher.match(pattern, reqUrl) && reqMethod.toLowerCase() === method.toLowerCase();
    })[0] !== undefined || whiteList.find(({ pattern }) => pattern === '*') !== undefined;
  };
  const getToken = (ctx:EggContext) => {
    return ctx.header.authorization?.replace('Bearer ', '');
  };
  return async (
    ctx: EggContext,
    next: Next,
  ) => {
    const path = ctx.path;
    const method = ctx.method;
    const { whitelist = [] } = ctx.app.config.jwt;
    if (inWhiteList(whitelist, method, path)) {
      await next();
      return;
    }
    const token = getToken(ctx);
    if (!token) {
      ctx.status = StatusCodes.FORBIDDEN;
      ctx.body = {
        statusCode: StatusCodes.FORBIDDEN,
        message: 'token 异常',
      };
      return;
    }
    verify(token, ctx.app.config.jwt.secret);
    const payload = decode(token) as {email: string};
    ctx.request.user = payload;
    await next();
  };
};

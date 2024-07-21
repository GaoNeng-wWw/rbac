import { HttpException } from 'app/utils/HttpException';
import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import { DataSourceOptions } from 'typeorm';
import { join } from 'node:path';

export default (appInfo: EggAppInfo) => {
  const config = {
    onerror: {
      json: (err, ctx) => {
        if (err instanceof HttpException) {
          ctx.status = err.statusCode;
          ctx.body = {
            statusCode: err.statusCode,
            message: err.message,
          };
          ctx.logger.error(`${ctx.status} - ${err.message}`);
          return;
        }
        ctx.status = 500;
        ctx.body = {
          statusCode: 500,
          message: '网络错误',
        };
        ctx.logger.error(`${ctx.status} - ${err.message}`);
      },
    },
    logger: {
      disableConsoleAfterReady: false,
      consoleLevel: 'DEBUG',
      level: 'INFO',
    },
  } as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1721200598000_5573';

  config.cluster = {
    listen: {
      path: '',
      port: 3000,
    },
  };

  config.security = {
    xframe: {
      enable: false,
    },
    csrf: {
      enable: false,
    },
    xssProtection: {
      enable: false,
    },
  };

  // add your egg config in here
  config.middleware = [
    'errorHandling',
    'token',
    'permission',
  ];

  config.typeorm = {
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'ospp-nest',
    synchronize: true,
    entities: [
      join(
        __dirname, '../app/models/*.ts',
      ),
    ],
  } as DataSourceOptions;

  config.db = {
    autoClear: appInfo.env === 'local',
  };

  config.page = {
    pageSize: 10,
  };

  config.jwt = {
    secret: 'secret',
    expiresIn: '2h',
    whitelist: [
      {
        pattern: '/auth/login',
        method: 'post',
      },
    ],
  };

  config.permission = [
    {
      pattern: '/permission',
      method: 'get',
      permissions: [ 'permission::get' ],
    },
    {
      pattern: '/permission',
      method: 'post',
      permissions: [ 'permission::create' ],
    },
    {
      pattern: '/permission',
      method: 'patch',
      permissions: [ 'permission::update' ],
    },
    {
      pattern: '/permission',
      method: 'delete',
      permissions: [ 'permission::remove' ],
    },

    {
      pattern: '/role',
      method: 'get',
      permissions: [ 'role::get' ],
    },
    {
      pattern: '/role/info/:id',
      method: 'get',
      permissions: [ 'role::get' ],
    },
    {
      pattern: '/role',
      method: 'post',
      permissions: [ 'role::add' ],
    },
    {
      pattern: '/role',
      method: 'patch',
      permissions: [ 'role::update' ],
    },
    {
      pattern: '/role',
      method: 'delete',
      permissions: [ 'role::remove' ],
    },

    {
      pattern: '/user/reg',
      method: 'post',
      permissions: [ 'user::add' ],
    },
    {
      pattern: '/user/info/{:email}',
      method: 'get',
      permissions: [],
    },
    {
      pattern: '/user/{:email}',
      method: 'delete',
      permissions: [ 'user::remove' ],
    },
    {
      pattern: '/user/update',
      method: 'patch',
      permissions: [ 'user::update' ],
    },
    {
      pattern: '/user/',
      method: 'get',
      permissions: [ 'user::qeury' ],
    },

    {
      pattern: '/menu',
      method: 'get',
      permissions: [],
    },
    {
      pattern: '/menu',
      method: 'post',
      permissions: [ 'menu::add' ],
    },
    {
      pattern: '/menu',
      method: 'patch',
      permissions: [ 'menu::update' ],
    },
    {
      pattern: '/menu',
      method: 'delete',
      permissions: [ 'menu::remove' ],
    },
  ];

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};

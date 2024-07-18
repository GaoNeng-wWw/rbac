import { HttpException } from 'app/utils/HttpException';
import { Menu, Permission, Role, User } from '../app/models';
import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import { DataSourceOptions } from 'typeorm';

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
  } as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1721200598000_5573';

  // add your egg config in here
  config.middleware = [
    'errorHandling',
  ];

  config.typeorm = {
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'ospp-nest',
    synchronize: true,
    entites: [
      User,
      Role,
      Permission,
      Menu,
    ],
  } as DataSourceOptions;

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

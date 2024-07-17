import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1721200598000_5573';

  // add your egg config in here
  config.middleware = [];

  config.sequelize = {
    username: 'root',
    password: 'root',
    database: 'ospp-nest',
    host: '127.0.0.1',
    dialect: 'mysql',
    define: {
      underscored: false,
      freezeTableName: false,
    },
  };

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

import { DataSourceOptions } from 'typeorm';
import { Application } from 'typings/app';
import { DataSource } from 'typeorm';

export default class AppBootHook {
  private app: Application;
  constructor(app: Application & {db: DataSource}) {
    this.app = app;
  }
  async didLoad() {
    const typeormConfig:DataSourceOptions = this.app.config.typeorm;
    const datasource = new DataSource({
      ...typeormConfig,
    });
    (this.app as any).db = await datasource.initialize();
    this.app.logger.info('Connect Database success!');
  }
}

import 'reflect-metadata';
import { DataSourceOptions } from 'typeorm';
import { Application } from 'typings/app';
import { DataSource } from 'typeorm';

export default class AppBootHook {
  private app: Application;
  constructor(app: Application & {db: DataSource}) {
    this.app = app;
  }
  async didLoad() {
    this.app.logger.clear();
    const typeormConfig:DataSourceOptions = this.app.config.typeorm;
    const datasource = new DataSource({
      ...typeormConfig,
    });
    (this.app as any).db = await datasource.initialize();
    if (this.app.config.db.autoClear) {
      this.app.logger.info('db.autoClear: ', this.app.config.db.autoClear);
      await this.app.db.synchronize(true);
    }
    this.app.logger.info('Connect Database success!');
  }
}

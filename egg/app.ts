import 'reflect-metadata';
import { DataSourceOptions, Repository } from 'typeorm';
import { Application } from 'typings/app';
import { DataSource } from 'typeorm';
import { join } from 'node:path';
import { existsSync, writeFileSync } from 'node:fs';
import { Permission, Role, User } from 'app/models';
import { exit } from 'node:process';


export default class AppBootHook {
  private app: Application;
  private permission: Repository<Permission>;
  private user: Repository<User>;
  private role: Repository<Role>;

  constructor(app: Application & {db: DataSource}) {
    this.app = app;
  }
  private async createPermission(name: string, desc:string) {
    const permission = this.permission.create();
    permission.name = name;
    permission.desc = desc;
    if (!await this.permission.findOneBy({ name: '*' })) {
      return await this.permission.save(permission);
    }
    return null;
  }
  async didLoad() {
    const typeormConfig:DataSourceOptions = this.app.config.typeorm;
    const datasource = new DataSource({
      ...typeormConfig,
    });
    (this.app as any).db = await datasource.initialize();
    if (this.app.config.db.autoClear) {
      this.app.logger.info('[APP]: auto clear');
      await this.app.db.synchronize(true);
    }
    this.app.logger.info('[APP]: Connect Database success!');
    this.permission = this.app.db.getRepository(Permission);
    this.user = this.app.db.getRepository(User);
    this.role = this.app.db.getRepository(Role);

    const ROOT = __dirname;
    const LOCK_FILE = join(ROOT, 'lock');
    if (existsSync(LOCK_FILE)) {
      return;
    }
    const modules = [ 'user', 'permission', 'role', 'menu' ];
    const actions = [ 'add', 'remove', 'update', 'query' ];
    const tasks:Promise<Permission | null>[] = [];
    let permission;
    try {
      permission = this.createPermission('*', 'super permission');
      if (!permission) {
        this.app.logger.error('[APP]: Please clear the database an try agin');
        exit(-1);
      }
    } catch (e) {
      const err = e as Error;
      this.app.logger.error(err.message);
      this.app.logger.error('[APP]: Please clear the database an try agin');
      exit(-1);
    }
    for (const module of modules) {
      for (const action of actions) {
        tasks.push(
          this.createPermission(
            `${module}::${action}`,
            '',
          ),
        );
      }
    }
    const status = await Promise.allSettled(tasks);
    const hasFail = status.some(state => state.status === 'rejected');
    status.filter(data => data.status === 'fulfilled')
      .forEach(res => {
        this.app.logger.info(`[APP]: create ${res.value?.name} permission success`);
      });
    if (hasFail) {
      const fail: any[] = status.filter(data => data.status === 'rejected');
      fail.forEach(data => {
        this.app.logger.error(`${data.reason}`);
      });
      this.app.logger.error('[APP]: Please clear the database and try again');
      exit(-1);
    }
    const _role = this.role.create();
    _role.name = 'admin';
    _role.permission = [ await permission ];
    _role.menus = [];
    const role = await this.role.save(_role);
    const _user = this.user.create();
    _user.email = 'admin@no-reply.com';
    _user.password = 'admin';
    _user.role = [ role ];
    _user.name = 'admin';
    const user = await this.user.save(_user);

    this.app.logger.info('[APP]: create admin user success');
    this.app.logger.info(`[APP]: email: ${user.email}`);
    this.app.logger.info('[APP]: password: \'admin\'');
    this.app.logger.info('[APP]: Enjoy!');
    writeFileSync(LOCK_FILE, '');

  }
}

// import { Application } from 'typings/app';

export default class AppBootHook {
//   private app: Application;
//   constructor(app: Application) {
//     this.app = app;
//   }
  async didLoad() {
    console.log('didLoad');
  }
}

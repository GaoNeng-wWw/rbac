// This file is created by egg-ts-helper@2.1.0
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportHello from '../../../app/controller/hello';

declare module 'egg' {
  interface IController {
    hello: ExportHello;
  }
}

import { DataSource } from "typeorm";

interface CheckHandlerFunc {
    (rule: any, value: any): string | void;
}
  
interface ValidateError {
  code: string;
  field?: string;
  message: string;
}

export type WhiteListItem = {
  pattern: string,
  method: string
};

declare module '@types/koa' {
  export interface Request {
    user: {
      email: string;
    }
  }
}

declare module 'egg' {
    export interface Application {
        db: DataSource;
        validator: {
          addRule: (type: string, check: RegExp | CheckHandlerFunc) => void;
          validate: (rules: any, data: any) => ValidateError[];
        };
    }
    export interface Context {
      validate: (rules: any, data?: any) => void;
    }
    export interface EggAppConfig {
      cluster: {
        listen:{
          path?:string,
          port?:number,
          hostname?: string
        }
      }
      page: {
        pageSize: number;
      };
      permission: {
        pattern: string,
        method: string;
        permissions: string[];
      }[];
      jwt: {
        secret: string;
        expiresIn: string;
        whitelist: WhiteListItem[];
      }
    }
}
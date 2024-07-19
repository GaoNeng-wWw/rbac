import { DataSource } from "typeorm";

interface CheckHandlerFunc {
    (rule: any, value: any): string | void;
}
  
interface ValidateError {
  code: string;
  field?: string;
  message: string;
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
        whitelist: {
          pattern: string,
          method: string
        }[]
      }
    }
}
import { DataSource } from "typeorm";

declare module 'egg' {
    interface Application {
        db: DataSource
    }
}
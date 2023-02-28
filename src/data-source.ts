import 'dotenv/config'
import 'reflect-metadata'
import { DataSource } from "typeorm";
import { default1677599036045 } from './migrations/1677599036045-default';
import { Book } from './models/Book';
import { Reserve } from './models/Reserve';
import { User } from './models/User';


export const AppDataSource = new DataSource({
    name: process.env.DB_NAME,
    type: "postgres",
    url: process.env.DB_URL,
    port: 3333,
    synchronize: true,
    logging: true,
    entities: [User, Book, Reserve],
    migrations: [default1677599036045],
})

import 'dotenv/config'
import 'reflect-metadata'
import { DataSource } from "typeorm";
import { default1677707331957 } from './migrations/1677707331957-default';
import { Book } from './models/Book';
import { User } from './models/User';


export const AppDataSource = new DataSource({
    name: process.env.DB_NAME,
    type: "postgres",
    url: process.env.DB_URL,
    port: 3333,
    synchronize: true,
    logging: true,
    entities: [User, Book],
    migrations: [default1677707331957],
})

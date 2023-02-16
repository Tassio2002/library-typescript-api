import 'dotenv/config'
import 'reflect-metadata'
import { DataSource } from "typeorm";
import { default1676487373018 } from './migrations/1676487373018-default';
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
    migrations: [default1676487373018],
})

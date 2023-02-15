import 'dotenv/config'
import 'reflect-metadata'
import { DataSource } from "typeorm";

const port = process.env.DB_PORT as number | undefined

export const AppDataSource = new DataSource({
    name: process.env.DB_NAME,
    type: "postgres",
    url: process.env.DB_URL,
    synchronize: true,
    logging: true,
})
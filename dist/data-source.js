"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require('dotenv/config');
require('reflect-metadata');
const typeorm_1 = require("typeorm");
console.log('rwe');
exports.AppDataSource = new typeorm_1.DataSource({
    name: process.env.DB_NAME,
    type: "postgres",
    url: process.env.DB_URL,
    port: 3333,
    synchronize: true,
    logging: true,
    entities: [`${__dirname}/**/models/*.{ts,js}`],
    migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
});
console.log(exports.AppDataSource);

"use strict";
exports.__esModule = true;
exports.AppDataSource = void 0;
require("dotenv/config");
require("reflect-metadata");
var typeorm_1 = require("typeorm");
console.log('rwe');
exports.AppDataSource = new typeorm_1.DataSource({
    name: process.env.DB_NAME,
    type: "postgres",
    url: process.env.DB_URL,
    port: 3333,
    synchronize: true,
    logging: true,
    entities: ["".concat(__dirname, "/**/models/*.{ts,js}")],
    migrations: ["".concat(__dirname, "/**/migrations/*.{ts,js}")]
});
console.log(exports.AppDataSource);

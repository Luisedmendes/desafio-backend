import "reflect-metadata"
import { DataSource } from "typeorm"
import {CreateUsersTable1694834624474} from './migrations/1694834624474-CreateUsersTable'
import User from "../app/entities/User"


export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root123",
    database: "meubd",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [CreateUsersTable1694834624474],
    subscribers: [],
})

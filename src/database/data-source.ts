import "reflect-metadata"
import { DataSource } from "typeorm"
import User from "../app/entities/User"
import Plan from "../app/entities/Plan"


export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "", // insira usuario do MYSQL
    password: "", // insira senha do MYSQL
    database: "meubd",
    synchronize: true,
    logging: false,
    entities: [User, Plan],
    migrations: [],
    subscribers: [],
})

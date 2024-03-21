import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Movie } from "./entity/Movie"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "123456",
    database: "postgres",
    logging: false,
    synchronize: false,
    name: "default",
    entities: [User, Movie],
    migrations: ['src/migrations/**/*{.ts,.js}'],
    subscribers: ['src/subscriber/**/*{.ts,.js}'],
})

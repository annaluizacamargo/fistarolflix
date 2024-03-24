import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Movie } from "./entity/Movie";
import { hash } from "bcrypt";
import { mockMovies } from "./mock/Movies";
import "reflect-metadata";

/**
 * Class that represents the connection to the database
 * @class
 * @extends DataSource
 * @property {string} type - Type of database
 * @property {string} host - Host of database
 * @property {number} port - Port of database
 * @property {string} username - Username of database
 * @property {string} password - Password of database
 * @property {string} database - Database name
 * @property {boolean} logging - Log of database
 * @property {boolean} synchronize - Synchronize of database
 * @property {Array} entities - Entities of database
 * @property {Array} migrations - Migrations of database
 * @property {Array} subscribers - Subscribers of database
 */
export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "123456",
  database: "postgres",
  logging: false,
  synchronize: true,
  entities: [User, Movie],
  migrations: ["src/migrations/*{.ts,.js}"],
  subscribers: ["src/subscriber/*{.ts,.js}"],
});

AppDataSource.initialize()
  .then(async () => {
    console.log("Database connected");

    const hashedPasswordExample = await hash("SenhaTeste123", 10);

    //Example of creating a user
    const user = new User(
      "Usuário Teste",
      "usuario@teste.com",
      hashedPasswordExample,
      true
    );

    await AppDataSource.manager.insert(Movie, mockMovies);

    await AppDataSource.manager.save(user);
  })
  .catch((error) => {
    console.log(error);
  });

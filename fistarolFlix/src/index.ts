import express = require("express")
import { Movie } from "./entity/Movie"
import { User } from "./entity/User"
import "reflect-metadata"
import { DataSource } from "typeorm"
import { Router } from "express"
import UserController from "./controllers/UserController"



const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "123456",
    database: "postgres",
    logging: false,
    synchronize: true,
    name: "default", //nome da conexão, pode ser qualquer coisa
    entities: [User, Movie],
})

    const port = 3000
    const app = express();
AppDataSource.initialize().then(async () => {

    // console.log("Inserting a new user into the database...")
    // const user = new User()
    // user.name = "Jane Doe"
    // user.email = "jane@email.com"
    // user.password = 'skdnfdjsn'
    // await AppDataSource.manager.save(user)
    // console.log("Saved a new user with id: " + user.id)

    // //console.log("Loading users from the database...")
    // // const users = await AppDataSource.manager.find(User)
    // // console.log("Loaded users: ", users)

    // const movie = new Movie()
    // movie.title = "Jane Doe"
    // movie.ageRating = "a13"
    // await AppDataSource.manager.save(movie)
    // console.log("Saved a new movie with id: " + movie.id)

    // console.log("Loading movies from the database...")
    // const movies = await AppDataSource.manager.find(Movie)
    // console.log("Loaded movies: ", movies)

    // console.log("Here you can setup and run express / fastify / any other framework.")

    //gere um servidor express

    app.use(express.json()) //o método use é usado para adicionar middlewares

    app.get('/', (req: any, res: any) => {
        res.send('Hello World!')
    })

    app.listen(port, () => { //o método listen é usado para fazer o servidor escutar requisições
        console.log(`Server is running on port ${port}`)
    })

    const router = Router();

    const userController = new UserController();

    //router.post('/login', userController.login);
    app.post('/register', userController.create);
    // router.get('/users', userController.get);
    // router.get('/users/:id', userController.getById);
    // router.put('/users/:id', userController.update);
    // router.patch('/users/:id', userController.patch);

}).catch(error => console.log(error))

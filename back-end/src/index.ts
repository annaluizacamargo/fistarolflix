import express = require("express");
import UserController from "./controllers/UserController";
import MovieController from "./controllers/MovieController";
import "reflect-metadata";
require("dotenv").config();

const port = 3333;

const app = express();

app.use(express.json());

const userController = new UserController();
const movieController = new MovieController();

app.post("/login", userController.login);
app.post("/register", userController.create);
app.get("/users", userController.get);
app.get("/user/:id", userController.getById);
app.get("/user-email/:email", userController.getByEmail);
app.put("/edit-user/:id", userController.update);
app.patch("/active-user/:id", userController.patch);

app.post("/movie-create", movieController.create);
app.get("/movies", movieController.get);
app.get("/movie/:code", movieController.getByMovieCode);
app.put("/edit-movie/:id", movieController.update);
app.patch("/active-movie/:id", movieController.patch);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

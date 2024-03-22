import express = require("express");
import UserController from "./controllers/UserController";
import MovieController from "./controllers/MovieController";
import "reflect-metadata";
require('dotenv').config();

const port = 3000;

const app = express();

app.use(express.json());

// /** TODO: Implementar
//  * Middleware for token verification
//  * @param req
//  * @param res
//  * @param next
//  * @returns
//  */
// const verifyToken = (
//   req: express.Request,
//   res: express.Response,
//   next: express.NextFunction
// ) => {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(403).json({ error: "Token não fornecido" });
//   }

//   verify(token.split(" ")[1], process.env.SECRET_KEY || "", (err, decoded) => {
//     console.log('env', process.env.SECRET_KEY)
//     console.log('decoded', decoded)
//     console.log('err', err)
//     if (err) {
//       return res.status(401).json({ error: "Token inválido" });
//     }
//     next();
//   });
// };

const userController = new UserController();
const movieController = new MovieController();

app.post("/login", userController.login);
app.post("/register", userController.create);
app.get("/users", userController.get);
app.get("/user/:id", userController.getById); //TODO: Implementar
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

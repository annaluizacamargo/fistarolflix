import { Request, Response } from "express";
import { User } from "../entity/User";
import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { mapUserToViewModel, mapUsersToViewModels } from "../mapper/UserMapper";
import UserRepository from "../repository/UserRepository";

/**
 * Class that represents the user controller
 * @class
 * @method create - Method to create a user
 * @method login - Method to login a user
 * @method get - Method to get all users
 * @method getById - Method to get a user by id
 * @method getByEmail - Method to get a user by email
 * @method update - Method to update a user
 * @method patch - Method to enable or disable a user
 */
class UserController {
  async create(request: Request, response: Response) {
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
      return response.sendStatus(400);
    }

    const hashedPassword = await hash(password ?? "", 10);
    const user = new User(name, email, hashedPassword, true);
    const userRepository = new UserRepository();
    const userAlreadyCreate = await userRepository.findByEmail(email);

    if (userAlreadyCreate) {
      return response.sendStatus(409);
    }

    const data = await userRepository.createAndSave(user);

    if (!data) {
      return response.sendStatus(400);
    }

    const token = sign(
      {
        id: data.id,
        name: data.name,
        email: data.email,
      },
      process.env.SECRET_KEY || "",
      { expiresIn: "1h" }
    );

    const responseData = mapUserToViewModel(data);

    return response.status(201).json({ responseData, token });
  }

  async login(request: Request, response: Response) {
    const { email, password } = request.body;
    const userRepository = new UserRepository();
    const data = await userRepository.findByEmail(email);

    if (!data) {
      return response.sendStatus(400);
    }

    const isValidPassword = await compare(password, data.hashedPassword);

    if (!isValidPassword) {
      return response.sendStatus(401);
    }

    const token = sign(
      {
        id: data.id,
        name: data.name,
        email: data.email,
      },
      process.env.SECRET_KEY || "",
      { expiresIn: "1h" }
    );

    const responseData = mapUserToViewModel(data);

    return response.json({
      responseData,
      token,
    });
  }

  async get(request: Request, response: Response) {
    const userRepository = new UserRepository();
    const data = await userRepository.findUsers();
    const responseDataList = mapUsersToViewModels(data);

    return response.json(responseDataList);
  }

  async getById(request: Request, response: Response) {
    const { id } = request.params;
    const idNumber = parseInt(id);

    if (isNaN(idNumber)) {
      return response.sendStatus(400);
    }

    const userRepository = new UserRepository();
    const data = await userRepository.findById(idNumber);

    if (!data) {
      return response.sendStatus(404);
    }

    const responseData = mapUserToViewModel(data);

    return response.json(responseData);
  }

  async getByEmail(request: Request, response: Response) {
    const { email } = request.params;
    const userRepository = new UserRepository();
    const data = await userRepository.findByEmail(email);

    if (!data) {
      return response.sendStatus(404);
    }

    const responseData = mapUserToViewModel(data);

    return response.json(responseData);
  }

  async update(request: Request, response: Response) {
    const { idUser, name, email, hashedPassword } = request.body;
    const id = parseInt(idUser);
    const userRepository = new UserRepository();

    if (isNaN(id)) {
      return response.sendStatus(400);
    }

    await userRepository.updateUser({ id, name, email, hashedPassword });

    return response.sendStatus(200);
  }

  async patch(request: Request, response: Response) {
    const { id } = request.params;
    const { isActive } = request.body;
    const idNumber = parseInt(id);
    const userRepository = new UserRepository();

    if (isNaN(idNumber)) {
      return response.sendStatus(400);
    }

    await userRepository.enableOrDisableUser(idNumber, isActive);

    return response.sendStatus(200);
  }
}

export default UserController;

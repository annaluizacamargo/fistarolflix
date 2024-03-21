import { Request, Response } from 'express';
import UserRepository from '../repository/UserRepository';

class UserController {
  async create(request: Request, response: Response) {
    // const repository = getRepository(User);
    console.log('chegou aqui')
    const { name, email, password } = request.body;

    console.log('chegou aquiasfadf', request.body)
    //const userExists = await userRepository.findOne({ where: { email } });

    //const password: string = await bcrypt.hash(userPassword, 8);

    // if (userExists) {
    //   return response.sendStatus(409);
    // }

    const repository = new UserRepository();
    const user = repository.create({ name, email, password });

    await repository.save(user);

    return response.status(201).json(user);
  }

  // async login(request: Request, response: Response) {
  //   const repository = getRepository(User);
  //   const { email, userPassword } = request.body;

  //   const user = await repository.findOne({ where: { email } });
  //   const password: string = await bcrypt.hash(userPassword, 8);

  //   if (!user) {
  //     return response.sendStatus(401);
  //   }

  //   const isValidPassword = await bcrypt.compare(password, user.password);

  //   if (!isValidPassword) {
  //     return response.sendStatus(401);
  //   }

  //   const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });

  //   //delete user.password;

  //   return response.json({
  //     user,
  //     token,
  //   });
  // }

  //   async get(request: Request, response: Response) {
  //       const repository = getRepository(User);
  //       const users = await repository.find();
    
  //       return response.json(users);
  //   }

  //   async getById(request: Request, response: Response) {
  //       const repository = getRepository(User);
  //       const { id } = request.params;
  //       const user = await repository.findOne({ where: { id } });
    
  //       if (!user) {
  //           return response.sendStatus(404);
  //       }
    
  //       return response.json(user);
  //   }

  //   async update(request: Request, response: Response) {
  //       const repository = getRepository(User);
  //       const { id } = request.params;
  //       const { name, email } = request.body;
    
  //       await repository.update(id, {
  //           name,
  //           email,
  //       });
    
  //       return response.sendStatus(200);
  //   }

  //   async patch(request: Request, response: Response) {
  //       const repository = getRepository(User);
  //       const { id } = request.params;
  //       const { active } = request.body;
    
  //       await repository.update(id, {
  //           active
  //       });
    
  //       return response.sendStatus(200);
  //   }
}

export default UserController;

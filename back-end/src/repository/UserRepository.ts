import { Repository } from "typeorm";
import { User } from "../entity/User";
import { IUser } from "../dto/IUser";
import { AppDataSource } from "../data-source";

/**
 * Class that represents the repository of the user entity
 * @class
 * @property {Repository<User>} repository - Repository of user entity
 * @method createAndSave - Method to creaWte and save a user
 * @method findUsers - Method to find all users
 * @method findByEmail - Method to find a user by email
 * @method findById - Method to find a user by id
 * @method updateUser - Method to update a user
 * @method enableOrDisableUser - Method to enable or disable a user
 */
class UserRepository {
  private repository: Repository<User> =
    AppDataSource.manager.getRepository(User);

  async createAndSave(user: User) {
    return await this.repository.save(user);
  }

  async findUsers() {
    return await this.repository.find({ where: { isActive: true } });
  }

  async findByEmail(email: IUser["email"]) {
    return this.repository.findOne({ where: { email, isActive: true } });
  }

  async findById(id: IUser["id"]) {
    return this.repository.findOne({ where: { id, isActive: true } });
  }

  async updateUser({ id, name, email, hashedPassword }: IUser) {
    return this.repository.update(id, { name, email, hashedPassword });
  }

  async enableOrDisableUser(id: IUser["id"], isActive: IUser["isActive"]) {
    return this.repository.update(id, { isActive: isActive });
  }
}

export default UserRepository;

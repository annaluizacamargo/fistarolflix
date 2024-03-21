import { DataSource, Repository } from "typeorm";
import { User } from "../entity/User";


class UserRepository extends Repository<User> {
    //private repository: Repository<User> = DataSource.getRepository(User);
  async findByEmail(email: string) {
    return this.findOne({ where: { email } });
  }

  async findById(id: number) {
    return this.findOne({ where: { id } });
  }

  async createAndSave(name: string, email: string, password: string) {
    console.log('chegou createAndSave')
    const user = this.create({ name, email, password });
    console.log('chegou createAndSave/user')
    return this.save(user);
  }
}

export default UserRepository;

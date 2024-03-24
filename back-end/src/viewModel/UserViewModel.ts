import { IUser } from "../dto/IUser";
import { Expose } from "class-transformer";

/**
 * Class that represents the user view model
 * @class
 * @property {number} id - User id (primary key)
 * @property {string} name - User name
 * @property {string} email - User email
 */
export class UserViewModel {
  constructor(id: IUser["id"], name: IUser["name"], email: IUser["email"]) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
  @Expose() id: number;
  @Expose() name: string;
  @Expose() email: string;
}

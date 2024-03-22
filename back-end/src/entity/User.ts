import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IUser } from "../dto/IUser";

/**
 * Class that represents the user entity
 * @class
 * @property {number} id - User id (primary key)
 * @property {string} name - User name
 * @property {string} email - User email
 * @property {string} hashedPassword - User hashed password
 * @property {boolean} isActive - User status
 */
@Entity()
export class User {
  constructor(
    name: IUser["name"],
    email: IUser["email"],
    hashedPassword: IUser["hashedPassword"],
    isActive: IUser["isActive"]
  ) {
    this.name = name;
    this.email = email;
    this.hashedPassword = hashedPassword;
    this.isActive = isActive;
  }

  @PrimaryGeneratedColumn("increment")
  id: IUser["id"];

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  hashedPassword: string;

  @Column({ default: true })
  isActive: boolean;
}

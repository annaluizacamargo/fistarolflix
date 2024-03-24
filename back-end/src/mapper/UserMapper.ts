import { plainToClass } from "class-transformer";
import { UserViewModel } from "../viewModel/UserViewModel";
import { User } from "../entity/User";

export function mapUserToViewModel(user: User): UserViewModel {
  return plainToClass(UserViewModel, user, { excludeExtraneousValues: true });
}

export function mapUsersToViewModels(users: User[]): UserViewModel[] {
  return users.map((user) => mapUserToViewModel(user));
}

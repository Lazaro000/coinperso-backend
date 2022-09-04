import { UserModel } from '#Models/user.model.js';
import { UserEmailAlreadyInUseException } from '../errors/user-email-already-in-use.exception.js';
import { UserIdAlreadyInUseException } from '../errors/user-id-already-in-use.exception.js';

export class UserRegisterUseCase {
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  async execute(id, name, email, password) {
    const newUser = await UserModel.create(id, name, email, password);

    // TODO: Check if there is a duplicate ID
    const existingUserById = await this.userRepository.findById(id);
    if (existingUserById) {
      throw new UserIdAlreadyInUseException();
    }

    // TODO: Check if there is a duplicate email
    const existingUserByEmail = await this.userRepository.findByEmail(email);
    if (existingUserByEmail) {
      throw new UserEmailAlreadyInUseException();
    }

    // TODO: Persist the new user
    await this.userRepository.create(newUser);
  }
}

import { UserModel } from 'src/domain/models/user.model.js';
import { UserRepository } from 'src/infrastructure/repositories/user.repository.js';
import { UserEmailAlreadyInUseException } from '../errors/user-email-already-in-use.exception.js';
import { UserIdAlreadyInUseException } from '../errors/user-id-already-in-use.exception.js';

export const userRegisterUseCase = async (id, name, email, password) => {
  const newUser = await UserModel.create(id, name, email, password);

  // TODO: Check if there is a duplicate ID
  const existingUserById = await UserRepository.findById(id);
  if (existingUserById) {
    throw new UserIdAlreadyInUseException();
  }

  // TODO: Check if there is a duplicate email
  const existingUserByEmail = await UserRepository.findByEmail(email);
  if (existingUserByEmail) {
    throw new UserEmailAlreadyInUseException();
  }

  // TODO: Persist the new user
  await UserRepository.create(newUser);
};

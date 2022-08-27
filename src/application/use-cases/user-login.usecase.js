import { compare } from 'bcrypt';
import { UserRepository } from '#Repositories/user.repository.js';
import { InvalidLoginException } from '../errors/invalid-login.exception.js';

export const userLoginUseCase = async (email, password) => {
  // Check that the user exists by email
  const existingUser = await UserRepository.findByEmail(email);

  if (
    !existingUser ||
    !existingUser.getId() ||
    !existingUser.getEmail() ||
    !existingUser.getName() ||
    !existingUser.getPassword
  ) {
    throw new InvalidLoginException();
  }

  // Check if the password matches
  const didPasswordMatch = await compare(password, existingUser.getPassword());

  if (!didPasswordMatch) throw new InvalidLoginException();

  // Return the ID of the existing user
  return existingUser.getId();
};

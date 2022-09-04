import { compare } from 'bcrypt';
import { InvalidLoginException } from '../errors/invalid-login.exception.js';

export class UserLoginUseCase {
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  async execute(email, password) {
    // Check that the user exists by email
    const existingUser = await this.userRepository.findByEmail(email);
    const userExists =
      existingUser ||
      existingUser.getId() ||
      existingUser.getEmail() ||
      existingUser.getName() ||
      existingUser.getPassword();

    if (!userExists) throw new InvalidLoginException();

    // Check if the password matches
    const didPasswordMatch = await compare(
      password,
      existingUser.getPassword()
    );

    if (!didPasswordMatch) throw new InvalidLoginException();

    // Return the ID of the existing user
    return existingUser.getId();
  }
}

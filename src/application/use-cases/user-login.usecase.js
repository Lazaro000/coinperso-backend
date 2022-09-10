import { EmailVO } from '#ValueObjects/email.vo.js';
import { PlainPasswordVO } from '#ValueObjects/plain-password.vo.js';
import { compare } from 'bcrypt';
import { VOFormatException } from '../../domain/errors/vo-format.exception.js';
import { InvalidLoginException } from '../errors/invalid-login.exception.js';

export class UserLoginUseCase {
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  async execute(email, password) {
    try {
      const userEmail = new EmailVO(email);
      const userPassword = new PlainPasswordVO(password);

      // Check that the user exists by email
      const existingUser = await this.userRepository.findByEmail(userEmail);

      const userExists =
        existingUser ||
        existingUser.getId() ||
        existingUser.getEmail() ||
        existingUser.getName() ||
        existingUser.getPassword();

      if (!userExists) throw new InvalidLoginException();

      // Check if the password matches
      const didPasswordMatch = await compare(
        userPassword.value,
        existingUser.getPassword()
      );

      if (!didPasswordMatch) throw new InvalidLoginException();

      // Return the ID of the existing user
      return existingUser.getId();
    } catch (err) {
      // If there is a VO format error, it is because the email/password
      // doesn't have the correct format, so it is considered invalid login
      if (err instanceof VOFormatException) throw new InvalidLoginException();

      // If the error is something else, we throw it up to be treated
      // in the right place, just like the rest of the use cases
      throw err;
    }
  }
}

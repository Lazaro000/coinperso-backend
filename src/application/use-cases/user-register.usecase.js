import { UserModel } from '#Models/user.model.js';
import { EmailVO } from '#ValueObjects/email.vo.js';
import { NameVO } from '#ValueObjects/name.vo.js';
import { PasswordVO } from '#ValueObjects/password.vo.js';
import { UuidVO } from '#ValueObjects/uuid.vo.js';
import { UserEmailAlreadyInUseException } from '../errors/user-email-already-in-use.exception.js';
import { UserIdAlreadyInUseException } from '../errors/user-id-already-in-use.exception.js';

export class UserRegisterUseCase {
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  async execute(id, name, email, password) {
    const userId = new UuidVO(id);
    const userEmail = new EmailVO(email);

    const newUser = new UserModel(
      userId,
      new NameVO(name),
      userEmail,
      await PasswordVO.create(password)
    );

    // TODO: Check if there is a duplicate ID
    const existingUserById = await this.userRepository.findById(userId);
    if (existingUserById) {
      throw new UserIdAlreadyInUseException();
    }

    // TODO: Check if there is a duplicate email
    const existingUserByEmail = await this.userRepository.findByEmail(
      userEmail
    );
    if (existingUserByEmail) {
      throw new UserEmailAlreadyInUseException();
    }

    // TODO: Persist the new user
    await this.userRepository.create(newUser);
  }
}

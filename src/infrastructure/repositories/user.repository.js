import { UserModel } from '#Models/user.model.js';
import { UserSchema } from '#Schemas/user.schema.js';
import { EmailVO } from '#ValueObjects/email.vo.js';
import { NameVO } from '#ValueObjects/name.vo.js';
import { PasswordVO } from '#ValueObjects/password.vo.js';
import { UuidVO } from '#ValueObjects/uuid.vo.js';

/**
 * User MongoDB repository implementation
 */
export class UserRepository {
  /**
   * Transforms a database user into a domain user
   * @param {*} persistanceUser Database user
   * @returns Domain user
   */
  toDomain(persistanceUser) {
    const { _id, email, name, password, profilePic, portfolios, roles } =
      persistanceUser;

    // TODO do ProfilePicVO validation
    return new UserModel(
      new UuidVO(_id),
      new NameVO(name),
      new EmailVO(email),
      new PasswordVO(password),
      profilePic,
      portfolios,
      roles
    );
  }

  /**
   * Transforms a domain user into a database user
   * @param {UserModel} domainUser  Domain user
   * @returns Database user
   */
  toPersistance(domainUser) {
    return {
      _id: domainUser.getId(),
      name: domainUser.getName(),
      email: domainUser.getEmail(),
      password: domainUser.getPassword(),
      profilePic: domainUser.getProfilePic(),
      portfolios: domainUser.getPortfolios(),
      roles: domainUser.getRoles(),
    };
  }

  /**
   * Finds a user by id
   * @param {String} id User id
   * @returns Domain user
   */
  async findById(id) {
    const userFound = await UserSchema.findById(id.value).exec();

    if (!userFound) return null;

    return this.toDomain(userFound);
  }

  /**
   * Finds a user by email
   * @param {String} email User email
   * @returns Domain user
   */
  async findByEmail(email) {
    const userFound = await UserSchema.findOne({ email: email.value }).exec();

    if (!userFound) return null;

    return this.toDomain(userFound);
  }

  /**
   * Persists a new user
   * @param {UserModel} domainUser Domain user
   */
  async create(domainUser) {
    const persistanceUser = this.toPersistance(domainUser);

    const user = new UserSchema(persistanceUser);

    await user.save();
  }
}

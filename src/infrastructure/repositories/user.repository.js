import { UserModel } from '#Models/user.model.js';
import { UserSchema } from '#Schemas/user.schema.js';

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
    const { _id, email, name, password, profilePic, images, roles } =
      persistanceUser;

    return new UserModel(_id, name, email, password, profilePic, images, roles);
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
      portfolios: domainUser.getPortfolio(),
      roles: domainUser.getRoles(),
    };
  }

  /**
   * Finds a user by id
   * @param {String} id User id
   * @returns Domain user
   */
  async findById(id) {
    const userFound = await UserSchema.findById(id).exec();

    if (!userFound) return null;

    return this.toDomain(userFound);
  }

  /**
   * Finds a user by email
   * @param {String} email User email
   * @returns Domain user
   */
  async findByEmail(email) {
    const userFound = await UserSchema.findOne({ email }).exec();

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

import { UserModel } from '#Models/user.model.js';
import { UserSchema } from '#Schemas/user.schema.js';

/**
 * User MongoDB repository implementation
 */
export class UserRepository {
  /**
   * Transforms a database user into a domain user
   * @param {*} persistanceUser DataBase user
   * @returns Domain user
   */
  static toDomain(persistanceUser) {
    const { _id, email, name, password, profilePic, images } = persistanceUser;

    return new UserModel(_id, name, email, password, profilePic, images);
  }

  /**
   * Transforms a domain user into a database user
   * @param {*} domainUser  Domain user
   * @returns Database user
   */
  static toPersistance(domainUser) {
    return {
      _id: domainUser.getId(),
      name: domainUser.getName(),
      email: domainUser.getEmail(),
      password: domainUser.getPassword(),
      profilePic: domainUser.getProfilePic(),
      portfolios: domainUser.getPortfolio(),
    };
  }

  /**
   * Finds a user by id
   * @param {*} id User id
   * @returns Domain user
   */
  static async findById(id) {
    const userFound = await UserSchema.findById(id).exec();

    if (!userFound) return null;

    return UserRepository.toDomain(userFound);
  }

  /**
   * Finds a user by email
   * @param {*} email User email
   * @returns Domain user
   */
  static async findByEmail(email) {
    const userFound = await UserSchema.findOne({ email }).exec();

    if (!userFound) return null;

    return UserRepository.toDomain(userFound);
  }

  /**
   * Persists a new user
   * @param {*} domainUser Domain user
   */
  static async create(domainUser) {
    const persistanceUser = UserRepository.toPersistance(domainUser);

    const user = new UserSchema(persistanceUser);

    await user.save();
  }
}

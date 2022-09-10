import { EmailVO } from '#ValueObjects/email.vo.js';
import { NameVO } from '#ValueObjects/name.vo.js';
import { PasswordVO } from '#ValueObjects/password.vo.js';
import { UuidVO } from '#ValueObjects/uuid.vo.js';
import { InvalidUserFormatException } from '../errors/invalid-user-format.exception.js';

/**
 * Registered user in the application
 */
export class UserModel {
  #id;
  #name;
  #email;
  #password;
  #profilePic;
  #portfolios;
  #roles;

  /**
   * Constructor
   * @param {UuidVO} id User unique identifier
   * @param {NameVO} name User name
   * @param {EmailVO} email User email
   * @param {PasswordVO} password User hashed password
   * @param {ProfilePicVO} profilePic User profile picture URL
   * @param {String[]} portfolios User's portfolios IDs
   * @param {String[]} roles User's roles
   */
  constructor(id, name, email, password, profilePic, portfolios, roles) {
    this.assertIsValid(id, name, email, password);

    this.#id = id;
    this.#password = password;
    this.#email = email;
    this.#name = name;
    this.#profilePic = profilePic;
    this.#portfolios = portfolios;
    this.#roles = roles;
  }

  getId() {
    return this.#id._value;
  }

  getName() {
    return this.#name._value;
  }

  getEmail() {
    return this.#email._value;
  }

  getPassword() {
    return this.#password._value;
  }

  getProfilePic() {
    return this.#profilePic ? this.#profilePic._value : undefined;
  }

  getPortfolios() {
    return this.#portfolios ? this.#portfolios._value : undefined;
  }

  getRoles() {
    return this.#roles ? this.#roles._value : undefined;
  }

  assertIsValid(id, name, email, password) {
    if (
      !(id instanceof UuidVO) ||
      !(name instanceof NameVO) ||
      !(email instanceof EmailVO) ||
      !(password instanceof PasswordVO)
    )
      throw new InvalidUserFormatException();
  }
}

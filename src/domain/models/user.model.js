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
   * @param {String} id User's unique identifier
   * @param {String} name User's name
   * @param {String} email User's email
   * @param {String} password User's hashed password
   * @param {String} profilePic User's profile picture URL
   * @param {Portfolio[]} portfolios User's portfolios IDs
   * @param {Roles[]} roles User's roles
   */
  constructor(id, name, email, password, profilePic, portfolios, roles) {
    this.#id = id;
    this.#password = password;
    this.#email = email;
    this.#name = name;
    this.#profilePic = profilePic;
    this.#portfolios = portfolios;
    this.#roles = roles;
  }
}

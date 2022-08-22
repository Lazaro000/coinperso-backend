/**
 * Asset linked to a user's portfolio in the application
 */
export class AssetModel {
  #name;
  #symbol;
  #movements;

  /**
   * Constructor
   * @param {String} name Asset's name
   * @param {String} symbol Asset's symbol
   * @param {Movements[]} movements Asset's movements
   */
  constructor(name, symbol, movements) {
    this.#name = name;
    this.#symbol = symbol;
    this.#movements = movements;
  }
}

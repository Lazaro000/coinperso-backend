/**
 * Movement linked to a user's asset in the application
 */
export class MovementModel {
  #type;
  #date;
  #price;
  #quantity;

  /**
   *
   * @param {String} type Movement's type
   * @param {Date} date Movement's date
   * @param {Number} price Movement's price
   * @param {Number} quantity Movement's quantity
   */
  constructor(type, date, price, quantity) {
    this.#type = type;
    this.#date = date;
    this.#price = price;
    this.#quantity = quantity;
  }
}

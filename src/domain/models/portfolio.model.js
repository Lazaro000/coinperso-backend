/**
 * Portfolio created in the application
 */
export class PortfolioModel {
  #id;
  #name;
  #assets;

  /**
   * Constructor
   * @param {String} id Portfolio's id
   * @param {String} name Portolio's name
   * @param {Assets[]} assets Portolio's assets
   */
  constructor(id, name, assets) {
    this.#id = id;
    this.#name = name;
    this.#assets = assets;
  }
}

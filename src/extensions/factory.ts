import { LEObject } from "../common/";
import { Legalesign } from "../Legalesign";

/**
 * Send and track all document on legalesign platform
 * including single, bulk and batch documents. This class should be called via the Legalesign core object.
 *
 * @example
 *
 *      const legalesign = new Legalesign({params});
 *
 *      await legalesign.sender.send( {sendOptions} )
 *
 */
export class Factory {
  legalesign: Legalesign;
  result: string | undefined;

  constructor(legalesign: Legalesign) {
    this.legalesign = legalesign;
  }

  /**
   *
   * @description Create a new object from Legalesign.
   *
   * @returns object instance of type LEObject
   *
   */
  createInstance<O extends LEObject>(
    ctor: new (id: string, le: Legalesign) => O,
    id: string
  ): O {
    this.legalesign.setup();

    return new ctor(id, this.legalesign);
  }

  /**
   *
   * @description Create and load an existing object from Legalesign.
   *
   * @returns object instance of type LEObject
   *
   */
  loadInstance<O extends LEObject>(
    ctor: new (id: string, le: Legalesign) => O,
    id: string
  ): O {
    this.legalesign.setup();

    return new ctor(id, this.legalesign);
  }
}

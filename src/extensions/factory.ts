import {   SendOptions } from "../../types/legalesign-js";
import { LEObject } from "../common/";
import { Legalesign } from "../legalesign";
import { parseSingleSend } from "../sendParser";

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
  result: string;

  constructor(legalesign: Legalesign) {
    this.legalesign = legalesign;
  }
      

  /**
   * 
   * @description Send a single document via Legalesign.
   * 
   * @returns boolean
   *
   */
    createInstance<O extends LEObject>(c:  new (id: string, le: Legalesign) => O ): O {
      
        this.legalesign.setup();

        if(id) {
          return new c(id, this.legalesign)

        } else {
          return new c(this.legalesign)
        }
  
        return new c();
      
    }


}

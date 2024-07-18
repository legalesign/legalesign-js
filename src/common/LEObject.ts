/**
 * The Template object used to easily fetch and handle template information.
 */
export abstract class LEObject {
  public id: string;

  constructor(id: string | null) {
   

    if(!id) throw new Error("Invalid template ID.");
    this.id = id;
  } 
  


}

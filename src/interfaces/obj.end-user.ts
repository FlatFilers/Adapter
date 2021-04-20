import { CustomerObject } from './obj.customer'

export interface EndUserObject extends CustomerObject {
  /**
   * The unique UUID Flatfile assigns to the user of your import
   */
  id: string
}

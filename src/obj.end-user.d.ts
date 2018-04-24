import CustomerObject from './obj.customer'

export default interface EndUserObject extends CustomerObject {
  /**
   * The unique UUID Flatfile assigns to the user of your import
   */
  id: string
}

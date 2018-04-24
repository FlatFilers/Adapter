export default interface CustomerObject {
  /**
   * Your internal ID reference for this user (required)
   */
  userId: string

  /**
   * A name to reference this person
   */
  name?: string

  /**
   * An optional email address for this person
   */
  email?: string

  /**
   * The company name the user is currently operating under
   */
  companyName?: string

  /**
   * Your internal ID for the company the user is currently operating under
   */
  companyId?: string
}

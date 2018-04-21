import EndUserObject from './obj.end-user'

export default class EndUser {
  private $user: EndUserObject

  constructor (meta: EndUserObject) {
    this.$user = meta
  }

  /**
   * The UUID referencing the user's record stored in Flatfile
   */
  get uuid (): string {
    return this.$user.uuid
  }

  /**
   * Your system ID of the user who uploaded the file
   */
  get id (): string {
    return this.$user.id
  }

  /**
   * The user's full name if you provided it
   */
  get name (): string | undefined {
    return this.$user.name
  }

  /**
   * The user's email if you provided it
   */
  get email (): string | undefined {
    return this.$user.name
  }

  /**
   * The company the user belongs to if provided
   */
  get company (): Company | null {
    if (this.$user.companyId) {
      return new Company(this.$user.companyId, this.$user.companyName)
    }
    return null
  }
}

export class Company {
  /**
   * Your system ID of the company
   */
  public id: string

  /**
   * The name of the company the user belongs to
   */
  public name?: string

  constructor (id, name) {
    this.id = id
    this.name = name
  }
}

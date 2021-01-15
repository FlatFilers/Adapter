import EndUserObject from './obj.end-user'

export default class EndUser {
  private $user: EndUserObject

  constructor(meta: EndUserObject) {
    this.$user = meta
  }

  /**
   * The UUID referencing the user's record stored in Flatfile
   */
  get id(): string {
    return this.$user.id
  }

  /**
   * Your internal ID reference for this user (required)
   */
  get userId(): string {
    return this.$user.userId
  }

  /**
   * The user's full name if you provided it
   */
  get name(): string | undefined {
    return this.$user.name
  }

  /**
   * The user's email if you provided it
   */
  get email(): string | undefined {
    return this.$user.name
  }

  /**
   * The company name the user is currently operating under
   */
  get companyName(): string | undefined {
    return this.$user.companyName
  }

  /**
   * The company name the user is currently operating under
   */
  get companyId(): string | undefined {
    return this.$user.companyId
  }
}

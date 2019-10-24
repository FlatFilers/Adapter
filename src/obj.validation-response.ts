export default interface IValidationResponse {
  /**
   * A string referencing the key affected by the problem
   */
  key: string

  /**
   * The validation error message
   */
  message: string

  /**
   * The type of validation response - currently only 'error' is supported
   */
  level?: 'error'
}

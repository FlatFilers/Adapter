export interface IValidationResponse {
  /**
   * A string referencing the key affected by the problem
   */
  key: string

  /**
   * The validation error message
   */
  message: string

  /**
   * The type of validation response
   */
  level?: 'error' | 'warning' | 'info'
}

export interface IDataHookResponse {
  [key: string]: IDataHookRecord
}

export interface IDataHookRecord {
  value?: string | boolean | number
  info?: IDataHookInfo[]
}

export interface IDataHookInfo {
  message: string
  level?: 'error' | 'warning' | 'info'
}

import IValidationResponse from './obj.validation-response'

export default interface LoadOptionsObject {
  /**
   * The number of records to receive per chunk
   */
  inChunks?: number,

  /**
   * Provide a CSV string, file url, list of row arrays, or list of input objects
   */
  source?: IPrimitive[][] | string | InputObject[]
}

export type IPrimitive = string | boolean | null | number

export interface IPrimitiveObject {
  [key: string]: IPrimitive
}

export interface InputObject {
  sequence?: number
  data: IPrimitiveObject
  errors?: IValidationResponse[]
}

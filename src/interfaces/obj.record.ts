export interface RecordObject {
  /**
   * Did the user delete this row before submitting
   */
  deleted: boolean

  /**
   * Did this row pass validation
   */
  valid: boolean

  /**
   * The original sequence of this row in the uploaded file
   */
  sequence: number

  /**
   * The fully mapped final data for this row
   */
  data: any
}

export type RawRecordObject = Record<string, string> & { $custom?: Record<string, string> }

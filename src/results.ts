export interface ImportMetaObject {
  batchID: string
  endUser: object
  status: string
  originalFile: string | null
  csvFile: string | null
  filename: string
  isManaged: boolean
  filetype: string
  manual: boolean
  config: object
  parsing_config: object
  count_rows: number
  count_skipped_rows: number
  count_accepted_rows: number
  count_rows_invalid: number
  count_columns: number
  count_columns_matched: number
  skipped_rows: number
  headers_raw: Array<object> | null
  headers_matched: Array<object> | null
  custom_columns: Array<object>
  failure_reason: string
  submitted_at: string
  failed_at: string
  created_at: string
  handled_at: string
  validated_in: number | null
  matched_in: string
}

export default class FlatfileResults {
  private static licenseKey: string
  private meta: ImportMetaObject
  private data: Array<Object>

  constructor (data: Array<Object>, meta: ImportMetaObject) {
    this.meta = meta
    this.data = data
  }

  public static setLicenseKey (licenseKey: string): void {
    this.licenseKey = licenseKey
  }

  // public static loadFrom (fileKey: string): File {
    // load from server here
  //   return new File({})
  // }

  /**
   * The uuid for this specific importer instance
   */
  get batchID (): string {
    return this.meta.batchID
  }

  /**
   * The current status of the importer's progress
   */
  get status (): string {
    return this.meta.status
  }

  /**
   * The endUser object created by setUser
   */
  get user (): object {
    return this.meta.endUser
  }

  /**
   * A File object of the originally uploaded file stored as an AWS url
   */
  get originalFile (): File | null {
    return this.meta.originalFile // fetch from AWS
  }

  /**
   * Same as originalFile unless it was uploaded in xls format, in which case this is the converted csv file stored as an AWS url
   */
  get csvFile (): File | null {
    if (this.meta.filetype === 'xls') {
      return this.meta.csvFile // fetched from AWS
    } else {
      return this.originalFile
    }
  }

  /**
   * The filename of the originally uploaded file
   */
  get filename (): string | null {
    return this.meta.filename || null
  }

  /**
   * If the final upload is managed by a private endpoint or not
   */
  get isManaged (): boolean {
    return this.meta.isManaged || false
  }

  /**
   * If the data was entered manually instead of via file upload or not
   */
  get isManual (): boolean {
    return this.meta.manual
  }

  /**
   * The parsed and bootstrapped config object used by this importer instance
   */
  get config (): object {
    return this.meta.config
  }

  /**
   * The configuration used by the csv parser PapaParse: https://www.papaparse.com/docs#config
   */
  get parsingConfig (): object {
    return this.meta.parsing_config
  }

  /**
   * The number of rows in the parsed data
   */
  get countRows (): number {
    return this.meta.count_rows
  }

  /**
   * The number of invalid rows that were skipped instead of fixed
   */
  get countSkippedRows (): number | null {
    return this.meta.count_skipped_rows || null
  }

  /**
   * The number of rows that were submitted
   */
  get countAcceptedRows (): number | null {
    return this.meta.count_accepted_rows || null
  }

  /**
   * The number of rows that had invalid cells before correction in the review stage
   */
  get countRowsInvalid (): number | null {
    return this.meta.count_rows_invalid || null
  }

  /**
   * The number of columns in the parsed data
   */
  get countColumns (): number | null {
    return this.meta.count_columns || null
  }

  /**
   * The number of columns submitted
   */
  get countColumnsMatched (): number | null {
    return this.meta.count_columns_matched || null
  }

  /**
   * The invalid rows that were skipped on submission
   */
  get skippedRows (): number | null {
    return this.meta.skipped_rows || null
  }

  /**
   * The headers before they were matched as given in the original file
   */
  get headersRaw (): Array<object> | null {
    return this.meta.headers_raw || null
  }

  /**
   * The headers after they are matched
   */
  get headersMatched (): Array<object> | null {
    return this.meta.headers_matched || null
  }

  /**
   * An array of any columns that were created during import
   */
  get customColumns (): Array<object> {
    return this.meta.custom_columns
  }

  /**
   * The reason for the failure if there was a failure
   */
  get failureReason (): string | null {
    return this.meta.failure_reason || null
  }

  /**
   * The time that the data was submitted
   */
  get submittedAt (): string | null {
    return this.meta.submitted_at || null
  }

  /**
   * The time that the import failed if it failed
   */
  get failedAt (): string | null {
    return this.meta.failed_at || null
  }

  /**
   * The time the data began the import, whether via file upload or manual data entry
   */
  get createdAt (): string {
    return this.meta.created_at
  }

  /**
   * The time the upload either failed or succeeded
   */
  get handledAt (): string | null {
    return this.meta.handled_at || null
  }

  /**
   * The time it took to initially validate the data
   */
  get validatedIn (): number | null {
    const validatedIn = this.meta.validated_in
    return typeof validatedIn === 'number' ? validatedIn : null
  }

  /**
   * The time it took to automatically match the columns
   */
  get matchedIn (): string | null {
    return this.meta.matched_in || null
  }
}

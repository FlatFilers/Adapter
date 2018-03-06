export interface ImportMetaObject {
  rawData: string
  batchID: string
  status: string
  originalFile: string | null
  csvFile: string | null
  filename: string
  isManaged: boolean
  isManual: boolean
  config: object
  parsingConfig: object
  countRows: number
  countSkippedRows: number
  countAcceptedRows: number
  countRowsInvalid: number
  countColumns: number
  countColumnsMatched: number
  columnsMatched: Array<object>
  skippedRows: number
  headersRaw: Array<object> | null
  headersMatched: Array<object> | null
  customColumns: Array<object>
  failureReason: string
  submittedAt: string
  failedAt: string
  createdAt: string
  handledAt: string
  validatedIn: string
  matchedIn: string
}

export default class FlatfileResults {
  private static licenseKey: string
  private customer: object
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
   * A reconstituted File object of the originally uploaded file
   */
  get originalFile (): File | null {
    return new File(this.meta.rawData.split(/\r\n|\r|\n/), this.meta.filename, { type: 'text/plain' }) // needs polyfill
  }

  /**
   * Same as originalFile unless it was uploaded in xls format, in which case this is the converted csv file
   */
  get csvFile (): File | null {
    return this.originalFile
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
    return this.meta.isManual
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
    return this.meta.parsingConfig
  }

  /**
   * The number of rows in the parsed data
   */
  get countRows (): number {
    return this.meta.countRows
  }

  /**
   * The number of invalid rows that were skipped instead of fixed
   */
  get countSkippedRows (): number | null {
    return this.meta.countSkippedRows || null
  }

  /**
   * The number of rows that were submitted
   */
  get countAcceptedRows (): number | null {
    return this.meta.countAcceptedRows || null
  }

  /**
   * The number of rows that had invalid cells before correction in the review stage
   */
  get countRowsInvalid (): number | null {
    return this.meta.countRowsInvalid || null
  }

  /**
   * The number of columns in the parsed data
   */
  get countColumns (): number | null {
    return this.meta.countColumns || null
  }

  /**
   * The number of columns submitted
   */
  get countColumnsMatched (): number | null {
    return this.meta.countColumnsMatched || null
  }

  /**
   * The column objects that were submitted
   */
  get columnsMatched (): Array<object> | null {
    return this.meta.columnsMatched || null
  }

  /**
   * The invalid rows that were skipped on submission
   */
  get skippedRows (): number | null {
    return this.meta.skippedRows || null
  }

  /**
   * The headers before they were matched as given in the original file
   */
  get headersRaw (): Array<object> | null {
    return this.meta.headersRaw || null
  }

  /**
   * The headers after they are matched
   */
  get headersMatched (): Array<object> | null {
    return this.meta.headersMatched || null
  }

  /**
   * An array of any columns that were created during import
   */
  get customColumns (): Array<object> {
    return this.meta.customColumns
  }

  /**
   * The reason for the failure if there was a failure
   */
  get failureReason (): string | null {
    return this.meta.failureReason || null
  }

  /**
   * The time that the data was submitted
   */
  get submittedAt (): string | null {
    return this.meta.submittedAt || null
  }

  /**
   * The time that the import failed if it failed
   */
  get failedAt (): string | null {
    return this.meta.failedAt || null
  }

  /**
   * The time the data began the import, whether via file upload or manual data entry
   */
  get createdAt (): string {
    return this.meta.createdAt
  }

  /**
   * The time the upload either failed or succeeded
   */
  get handledAt (): string | null {
    return this.meta.handledAt || null
  }

  /**
   * The time it took to initially validate the data
   */
  get validatedIn (): string | null {
    return this.meta.validatedIn || null
  }

  /**
   * The time it took to automatically match the columns
   */
  get matchedIn (): string | null {
    return this.meta.matchedIn || null
  }

  updateCustomer (customer: object): void {
    this.customer = customer // support partial data updates
  }
}

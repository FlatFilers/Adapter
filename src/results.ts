export interface ImportMetaObject {
  rawData: string
  csv: string
  filename: string
  isManaged: boolean
  countRows: number
  skippedRows: number
  columns: Array<object>
  countColumns: number
  columnsMatched: Array<object>
  isManual: boolean
  countRowsInvalid: number
  headersRaw: Array<object>
  countColumnsMatched: number
  importedFromURL: boolean
  failureReason: string
  submittedAt: string
  failedAt: string
  createdAt: string
  handledAt: string
  config: object
  validatedIn: string
  matchedIn: string
  status: string
  batchID: string
}

export default class FlatfileResults {
  private static licenseKey: string
  private customer: object
  private meta: ImportMetaObject
  private rows: Array<Object>

  constructor (rows: Array<Object>, meta: ImportMetaObject) {
    this.meta = meta
    this.rows = rows
  }

  public static setLicenseKey (licenseKey: string): void {
    this.licenseKey = licenseKey
  }

  // public static loadFrom (fileKey: string): File {
    // load from server here
  //   return new File({})
  // }

  get batchID (): string {
    return this.meta.batchID
  }

  get csv (): string {
    return this.meta.csv
  }

  get filename (): string {
    return this.meta.filename
  }

  get isManaged (): boolean {
    return this.meta.isManaged
  }

  get countRows (): number {
    return this.meta.countRows
  }

  get skippedRows (): number {
    return this.meta.skippedRows
  }

  get columns (): Array<object> {
    return this.meta.columns
  }

  get countColumns (): number {
    return this.meta.countColumns
  }

  get columnsMatched (): Array<object> {
    return this.meta.columnsMatched
  }

  get isManual (): boolean {
    return this.meta.isManual
  }

  get countRowsInvalid (): number {
    return this.meta.countRowsInvalid
  }

  get headersRaw (): Array<object> {
    return this.meta.headersRaw
  }

  get countColumnsMatched (): number {
    return this.meta.countColumnsMatched
  }

  get importedFromURL (): boolean {
    return this.meta.importedFromURL
  }

  get failureReason (): string {
    return this.meta.failureReason
  }

  get submittedAt (): string {
    return this.meta.submittedAt
  }

  get failedAt (): string {
    return this.meta.failedAt
  }

  get createdAt (): string {
    return this.meta.createdAt
  }

  get handledAt (): string {
    return this.meta.handledAt
  }

  get config (): object {
    return this.meta.config
  }

  get validatedIn (): string {
    return this.meta.validatedIn
  }

  get matchedIn (): string {
    return this.meta.matchedIn
  }

  get status (): string {
    return this.meta.status
  }

  updateCustomer (customer: object): void {
    this.customer = customer // support partial data updates
  }
}

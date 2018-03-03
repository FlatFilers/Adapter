export interface Importer {
  rawData: string
  csv: string
  jsonRows: Array<object>
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

export default class File implements Importer {
  private static licenseKey: string
  public rawData: string
  public csv: string
  public jsonRows: Array<object>
  public filename: string
  public isManaged: boolean
  public countRows: number
  public skippedRows: number
  public columns: Array<object>
  public countColumns: number
  public columnsMatched: Array<object>
  public isManual: boolean
  public countRowsInvalid: number
  public headersRaw: Array<object>
  public countColumnsMatched: number
  public importedFromURL: boolean
  public failureReason: string
  public submittedAt: string
  public failedAt: string
  public createdAt: string
  public handledAt: string
  public config: object
  public validatedIn: string
  public matchedIn: string
  public status: string
  public batchID: string
  private customer: object
  private payload: Importer

  constructor (payload: Importer) {
    this.payload = payload
  }

  public static setLicenseKey (licenseKey: string): void {
    this.licenseKey = licenseKey
  }

  // public static loadFrom (fileKey: string): File {
    // load from server here
  //   return new File({})
  // }

  getBatchID (): string {
    let batchID // get the id
    return this.payload.batchID
  }

  updateCustomer (customer: object): void {
    this.customer = customer // support partial data updates
  }
}

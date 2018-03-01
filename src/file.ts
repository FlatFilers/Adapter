export default class File {
  public static rawData: string
  public static csv: string
  public static jsonRows: Array<object>
  public static filename: string
  public static isManaged: boolean
  public static countRows: number
  public static skippedRows: number
  public static columns: Array<object>
  public static countColumns: number
  public static columnsMatched: Array<object>
  public static isManual: boolean
  public static countRowsInvalid: number
  public static headersRaw: Array<object>
  public static countColumnsMatched: number
  public static importedFromURL: boolean
  public static failureReason: string
  public static submittedAt: string
  public static failedAt: string
  public static createdAt: string
  public static handledAt: string
  public static config: object
  private static customer: object
  private static apiKey: string
  public validatedIn: string
  public matchedIn: string
  public status: string

  constructor (apiKey: string, options: object, customer: object) {
    File.config = options
    File.customer = customer
    File.apiKey = apiKey
  }

  getBatchID (): number {
    let batchID // get the id
    return batchID
  }

  updateCustomer (customer: object): void {
    File.customer = customer // support partial data updates
  }
}

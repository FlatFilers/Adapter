import { FlatfileImporter } from './importer'
import { Stats } from './stats'
import { Meta, RecordObject } from './interfaces'
import { EndUser } from './user'
import { UploadFile } from './upload-file'
import { StreamedResults } from './streamed-results'
import { FlatfileResults } from './interfaces/results.interface'

export class Results implements FlatfileResults {
  /**
   * Information about the import
   */
  private $meta: Meta

  /**
   * Raw data output from the importer
   */
  private $data: Array<RecordObject>

  /**
   * Instance of importer used to manage this file
   */
  private $importer: FlatfileImporter

  /**
   * The raw output from the importer including all deleted rows
   * and sequence info
   */
  rawOutput: Array<RecordObject>

  /**
   * An array of valid data, key-mapped to the configuration provided
   * (alias of validData)
   */
  data: Array<any>

  /**
   * An array of valid data, key-mapped to the configuration provided
   */
  validData: Array<any>

  /**
   * Rows of data the user excluded from the final results,
   * key-mapped to the configuration provided
   */
  deletedData: Array<any>

  /**
   * All data from the original file upload including deleted rows,
   * key-mapped to the configuration provided
   */
  allData: Array<any>

  /**
   * The uuid of the batch assigned by Flatfile (use this in internal
   * references for support purposes)
   */
  batchId: string

  /**
   * Stats and counts about this file upload
   */
  stats: Stats

  /**
   * The customer provided in setCustomer
   */
  customer: EndUser | null

  /**
   * A File object of the originally uploaded file stored as an AWS url
   */
  originalFile: UploadFile | null

  /**
   * Same as originalFile unless it was uploaded in xls format, in which case this is the converted csv file stored as an AWS url
   */
  csvFile: UploadFile | null

  /**
   * The filename of the originally uploaded file
   */
  fileName: string | null

  /**
   * If the final upload is managed by a private endpoint or not
   */
  managed: boolean

  /**
   * If the data was entered manually instead of via file upload or not
   */
  manual: boolean

  /**
   * The parsed and bootstrapped config object used by this importer instance
   */
  config: object

  /**
   * The configuration used by the csv parser PapaParse: https://www.papaparse.com/docs#config
   */
  parsingConfig: object

  /**
   * The invalid rows that were skipped on submission
   */
  skippedRows: number | null

  /**
   * The headers before they were matched as given in the original file
   */
  headersRaw: Array<object> | null

  /**
   * The headers after they are matched
   */
  headersMatched: Array<object> | null

  /**
   * An array of any columns that were created during import
   */
  customColumns: Array<object>

  /**
   * A mapping of source values to target category values
   */
  categoryFieldMap: object | null

  /**
   * The reason for the failure if there was a failure
   */
  failureReason: string | null

  /**
   * The time that the data was submitted
   */
  submittedAt: string | null

  /**
   * The time that the import failed if it failed
   */
  failedAt: string | null

  /**
   * The time the data began the import, whether via file upload or manual data entry
   */
  createdAt: string

  /**
   * The stylesheet of the cells. Make sure to use `allowFormatting=true` in the config.
   */
  stylesheet: Meta['stylesheet'] | null

  /**
   * Get the next chunk of records
   */
  nextChunk: () => Promise<null | StreamedResults>

  constructor(data: Array<RecordObject>, meta: Meta, importer: FlatfileImporter) {
    this.$meta = meta
    this.$data = data
    this.$importer = importer

    this.rawOutput = this.blobOnly(this.$data, 'rawOutput')

    this.validData = this.blobOnly(
      this.$data
        .filter((v) => v.valid)
        .filter((v) => !v.deleted)
        .map((v) => v.data),
      'validData'
    )

    this.data = this.blobOnly(this.validData, 'data')

    this.deletedData = this.blobOnly(
      this.$data.filter((v) => v.deleted).map((v) => v.data),
      'deletedData'
    )
    this.allData = this.blobOnly(
      this.$data.map((v) => v.data),
      'allData'
    )

    this.batchId = this.$meta.batchID
    this.stats = new Stats(this.$meta)
    this.customer = this.$meta.endUser ? new EndUser(this.$meta.endUser) : null
    this.originalFile = this.$meta.originalFile ? new UploadFile(this.$meta.originalFile) : null
    this.csvFile = this.getCSVFile()
    this.fileName = this.$meta.filename || null
    this.managed = this.$meta.managed || false
    this.manual = this.$meta.manual
    this.config = this.$meta.config
    this.parsingConfig = this.$meta.parsing_config
    this.skippedRows = this.$meta.skipped_rows || null
    this.headersRaw = this.$meta.headers_raw || null
    this.headersMatched = this.$meta.headers_matched || null
    this.customColumns = this.$meta.custom_columns
    this.categoryFieldMap = this.$meta.category_field_map || null
    this.failureReason = this.$meta.failure_reason || null
    this.submittedAt = this.$meta.submitted_at || null
    this.failedAt = this.$meta.failed_at || null
    this.createdAt = this.$meta.created_at
    this.stylesheet = this.$meta.stylesheet

    this.nextChunk = () => this.getNextChunk()
  }

  private getCSVFile() {
    if (this.$meta.originalFile) {
      if (this.$meta.originalFile.filetype === 'csv') {
        return new UploadFile(this.$meta.originalFile)
      } else {
        if (this.$meta.csvFile) {
          return new UploadFile(this.$meta.csvFile)
        }
      }
    }
    return null
  }

  private getNextChunk(): Promise<null | StreamedResults> {
    return new Promise((resolve, reject) => {
      if (!this.$meta.inChunks) {
        return reject(
          `"nextChunk()" is only accessible when using "inChunks". Please see docs for "requestDataFromUser".`
        )
      }
      this.$importer.$ready.then((child) => {
        console.log('child.nextChunk()')
        child.nextChunk().then(
          (data) => {
            console.log('nextChunk()', data)
            resolve(data.results.length ? new StreamedResults(data.results, data.meta) : null)
          },
          (err) => {
            console.log('nextChunk(err)', err)
          }
        )
      })
    })
  }

  private blobOnly<T>(v: T, method, alt = 'nextChunk()'): T {
    if (this.$meta.inChunks) {
      throw new Error(
        `"${method}" is not accessible when using "inChunks". Please see docs for "${alt}" instead.`
      )
    }
    return v
  }
}

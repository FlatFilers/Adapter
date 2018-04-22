import Importer from './index'
import Stats from './stats'
import Meta from './obj.meta'
import RecordObject from './obj.record'
import User from './user'
import UploadFile from './upload-file'

export default class FlatfileResults {
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
  private $importer: Importer

  constructor (data: Array<RecordObject>, meta: Meta, importer: Importer) {
    this.$meta = meta
    this.$data = data
    this.$importer = importer
  }

  get rawOutput (): Array<RecordObject> {
    return this.$data
  }

  get validData (): Array<any> {
    return this.$data.filter(v => v.valid)
                     .map(v => v.data)
  }

  get deletedData (): Array<any> {
    return this.$data.filter(v => v.deleted)
                     .map(v => v.data)
  }

  get allData (): Array<any> {
    return this.$data.map(v => v.data)
  }

  /**
   * [alias] batchID
   */
  get batchId (): string {
    return this.$meta.batchID
  }

  /**
   * The current status of the importer's progress
   */
  get status (): string {
    return this.$meta.status
  }

  /**
   * Stats and counts about this file upload
   */
  get stats (): Stats {
    return new Stats(this.$meta)
  }

  /**
   * The endUser object created by setUser
   */
  get user (): User | null {
    if (this.$meta.endUser) {
      return new User(this.$meta.endUser)
    }
    return null
  }

  /**
   * A File object of the originally uploaded file stored as an AWS url
   */
  get originalFile (): UploadFile | null {
    if (this.$meta.originalFile) {
      return new UploadFile(this.$meta.originalFile)
    }
    return null
  }

  /**
   * Same as originalFile unless it was uploaded in xls format, in which case this is the converted csv file stored as an AWS url
   */
  get csvFile (): UploadFile | null {
    if (this.$meta.filetype === 'csv') {
      if (this.$meta.originalFile) {
        return new UploadFile(this.$meta.originalFile)
      }
    } else {
      if (this.$meta.csvFile) {
        return new UploadFile(this.$meta.csvFile)
      }
    }
    return null
  }

  /**
   * The filename of the originally uploaded file
   */
  get fileName (): string | null {
    return this.$meta.filename || null
  }

  /**
   * If the final upload is managed by a private endpoint or not
   */
  get isManaged (): boolean {
    return this.$meta.isManaged || false
  }

  /**
   * If the data was entered manually instead of via file upload or not
   */
  get isManual (): boolean {
    return this.$meta.manual
  }

  /**
   * The parsed and bootstrapped config object used by this importer instance
   */
  get config (): object {
    return this.$meta.config
  }

  /**
   * The configuration used by the csv parser PapaParse: https://www.papaparse.com/docs#config
   */
  get parsingConfig (): object {
    return this.$meta.parsing_config
  }

  /**
   * The invalid rows that were skipped on submission
   */
  get skippedRows (): number | null {
    return this.$meta.skipped_rows || null
  }

  /**
   * The headers before they were matched as given in the original file
   */
  get headersRaw (): Array<object> | null {
    return this.$meta.headers_raw || null
  }

  /**
   * The headers after they are matched
   */
  get headersMatched (): Array<object> | null {
    return this.$meta.headers_matched || null
  }

  /**
   * An array of any columns that were created during import
   */
  get customColumns (): Array<object> {
    return this.$meta.custom_columns
  }

  /**
   * The reason for the failure if there was a failure
   */
  get failureReason (): string | null {
    return this.$meta.failure_reason || null
  }

  /**
   * The time that the data was submitted
   */
  get submittedAt (): string | null {
    return this.$meta.submitted_at || null
  }

  /**
   * The time that the import failed if it failed
   */
  get failedAt (): string | null {
    return this.$meta.failed_at || null
  }

  /**
   * The time the data began the import, whether via file upload or manual data entry
   */
  get createdAt (): string {
    return this.$meta.created_at
  }
}

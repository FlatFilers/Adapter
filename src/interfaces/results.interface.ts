import { EndUser } from '../user'
import { FlatfileImporter } from '../importer'
import { Stats } from '../stats'

import { Meta } from './obj.meta'
import { RecordObject } from './obj.record'
import { UploadFile } from 'src/upload-file'
import { StreamedResults } from 'src/streamed-results'

export interface FlatfileResults {
  /**
   * The raw output from the importer including all deleted rows
   * and sequence info
   */
  readonly rawOutput: Array<RecordObject>

  /**
   * An array of valid data, key-mapped to the configuration provided
   * (alias of validData)
   */
  readonly data: Array<any>

  /**
   * An array of valid data, key-mapped to the configuration provided
   */
  readonly validData: Array<any>

  /**
   * Rows of data the user excluded from the final results,
   * key-mapped to the configuration provided
   */
  readonly deletedData: Array<any>

  /**
   * All data from the original file upload including deleted rows,
   * key-mapped to the configuration provided
   */
  readonly allData: Array<any>

  /**
   * The uuid of the batch assigned by Flatfile (use this in internal
   * references for support purposes)
   */
  readonly batchId: string

  /**
   * Stats and counts about this file upload
   */
  readonly stats: Stats

  /**
   * The customer provided in setCustomer
   */
  readonly customer: EndUser | null

  /**
   * A File object of the originally uploaded file stored as an AWS url
   */
  readonly originalFile: UploadFile | null

  /**
   * Same as originalFile unless it was uploaded in xls format, in which case this is the converted csv file stored as an AWS url
   */
  readonly csvFile: UploadFile | null

  /**
   * The filename of the originally uploaded file
   */
  readonly fileName: string | null

  /**
   * If the final upload is managed by a private endpoint or not
   */
  readonly managed: boolean

  /**
   * If the data was entered manually instead of via file upload or not
   */
  readonly manual: boolean

  /**
   * The parsed and bootstrapped config object used by this importer instance
   */
  readonly config: object

  /**
   * The configuration used by the csv parser PapaParse: https://www.papaparse.com/docs#config
   */
  readonly parsingConfig: object

  /**
   * The invalid rows that were skipped on submission
   */
  readonly skippedRows: number | null

  /**
   * The headers before they were matched as given in the original file
   */
  readonly headersRaw: Array<object> | null

  /**
   * The headers after they are matched
   */
  readonly headersMatched: Array<object> | null

  /**
   * readonly the next chunk of records
   */
  nextChunk: () => Promise<null | StreamedResults>

  /**
   * An array of any columns that were created during import
   */
  readonly customColumns: Array<object>

  /**
   * A mapping of source values to tarreadonly category values
   */
  readonly categoryFieldMap: object | null

  /**
   * The reason for the failure if there was a failure
   */
  readonly failureReason: string | null

  /**
   * The time that the data was submitted
   */
  readonly submittedAt: string | null

  /**
   * The time that the import failed if it failed
   */
  readonly failedAt: string | null

  /**
   * The time the data began the import, whether via file upload or manual data entry
   */
  readonly createdAt: string

  /**
   * The stylesheet of the cells. Make sure to use `allowFormatting=true` in the config.
   */
  readonly stylesheet: Meta['stylesheet'] | null
}

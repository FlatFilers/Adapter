import { RecordObject, StreamedMeta } from './interfaces'

export class StreamedResults {
  /**
   * Helpful meta information
   */
  private $meta: Pick<StreamedMeta, 'hasMore' | 'inChunks' | 'count_rows_accepted' | 'pointer'>

  /**
   * Raw data output from the importer
   */
  private $data: Array<RecordObject>

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
   * The number of remaining chunks in the stream
   */
  remainingChunks: number

  /**
   * The total number of chunks that will have to be received before data processing is completed
   */
  totalChunks: number

  /**
   * The size of chunks as configured when requesting data.
   */
  chunkSize: number

  /**
   * The current chunk by index
   */
  currentChunk: number

  /**
   * The current chunk by index
   */
  hasMore: boolean

  constructor(data: Array<RecordObject>, meta: StreamedMeta) {
    this.$meta = meta
    this.$data = data

    this.rawOutput = this.$data
    this.validData = this.$data
      .filter((v) => v.valid)
      .filter((v) => !v.deleted)
      .map((v) => v.data)

    this.data = this.validData
    this.deletedData = this.$data.filter((v) => v.deleted).map((v) => v.data)
    this.allData = this.$data.map((v) => v.data)
    this.remainingChunks = Math.ceil((this.totalChunks - this.currentChunk) / this.$meta.inChunks)
    this.totalChunks = Math.ceil(this.$meta.count_rows_accepted / this.$meta.inChunks)
    this.chunkSize = this.$meta.inChunks
    this.currentChunk = (this.$meta.pointer + this.chunkSize) / this.chunkSize
    this.hasMore = this.$meta.hasMore
  }
}

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

  constructor(data: Array<RecordObject>, meta: StreamedMeta) {
    this.$meta = meta
    this.$data = data
  }

  /**
   * The raw output from the importer including all deleted rows
   * and sequence info
   */
  get rawOutput(): Array<RecordObject> {
    return this.$data
  }

  /**
   * An array of valid data, key-mapped to the configuration provided
   * (alias of validData)
   */
  get data(): Array<any> {
    return this.validData
  }

  /**
   * An array of valid data, key-mapped to the configuration provided
   */
  get validData(): Array<any> {
    return this.$data
      .filter((v) => v.valid)
      .filter((v) => !v.deleted)
      .map((v) => v.data)
  }

  /**
   * Rows of data the user excluded from the final results,
   * key-mapped to the configuration provided
   */
  get deletedData(): Array<any> {
    return this.$data.filter((v) => v.deleted).map((v) => v.data)
  }

  /**
   * All data from the original file upload including deleted rows,
   * key-mapped to the configuration provided
   */
  get allData(): Array<any> {
    return this.$data.map((v) => v.data)
  }

  /**
   * The number of remaining chunks in the stream
   */
  get remainingChunks(): number {
    return Math.ceil((this.totalChunks - this.currentChunk) / this.$meta.inChunks)
  }

  /**
   * The total number of chunks that will have to be received before data processing is completed
   */
  get totalChunks(): number {
    return Math.ceil(this.$meta.count_rows_accepted / this.$meta.inChunks)
  }

  /**
   * The size of chunks as configured when requesting data.
   */
  get chunkSize(): number {
    return this.$meta.inChunks
  }

  /**
   * The current chunk by index
   */
  get currentChunk(): number {
    return (this.$meta.pointer + this.chunkSize) / this.chunkSize
  }

  /**
   * The current chunk by index
   */
  get hasMore(): boolean {
    return this.$meta.hasMore
  }
}

import { Meta } from './interfaces'

export class Stats {
  private $meta: Meta

  /**
   * The number of rows in the parsed data
   */
  originalRows: number

  /**
   * The number of rows that were submitted
   */
  acceptedRows: number | null

  /**
   * The number of columns in the parsed data
   */
  originalColumns: number | null

  /**
   * The number of columns submitted
   */
  matchedColumns: number | null

  constructor(meta: Meta) {
    this.$meta = meta

    this.originalRows = this.$meta.count_rows
    this.acceptedRows = this.$meta.count_rows_accepted || null
    this.originalColumns = this.$meta.count_columns || null
    this.matchedColumns = this.$meta.count_columns_matched || null
  }
}

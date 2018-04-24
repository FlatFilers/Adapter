import Meta from './obj.meta'

export default class Stats {
  private $meta: Meta

  constructor (meta: Meta) {
    this.$meta = meta
  }

  /**
   * The number of rows in the parsed data
   */
  get originalRows (): number {
    return this.$meta.count_rows
  }

  /**
   * The number of rows that were submitted
   */
  get acceptedRows (): number | null {
    return this.$meta.count_rows_accepted || null
  }

  /**
   * The number of columns in the parsed data
   */
  get originalColumns (): number | null {
    return this.$meta.count_columns || null
  }

  /**
   * The number of columns submitted
   */
  get matchedColumns (): number | null {
    return this.$meta.count_columns_matched || null
  }
}

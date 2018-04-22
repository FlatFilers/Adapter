import EndUserObject from './obj.end-user'
import FileObject from './obj.file'
export default interface Meta {
  batchID: string
  endUser?: EndUserObject
  status: string
  originalFile: FileObject | null
  csvFile: FileObject | null
  filename: string
  isManaged: boolean
  filetype: string
  manual: boolean
  config: object
  parsing_config: object
  count_rows: number
  count_skipped_rows: number
  count_accepted_rows: number
  count_rows_invalid: number
  count_columns: number
  count_columns_matched: number
  skipped_rows: number
  headers_raw: Array<object> | null
  headers_matched: Array<object> | null
  custom_columns: Array<object>
  failure_reason: string
  submitted_at: string
  failed_at: string
  created_at: string
  handled_at: string
  validated_in: number | null
  matched_in: string
}

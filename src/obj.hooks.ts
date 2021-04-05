import { IDataHookRecord } from './obj.validation-response'

export type STEP = 'upload' | 'match' | 'review' | 'match_field'
export type Scalar = string | number | boolean | null | undefined
export enum RULE_STATUS {
  PENDING,
  IGNORED,
  ACCEPTED
}

export type FieldHookCallback = (
  values: [Scalar, number][],
  meta: any
) => [IDataHookRecord, number][] | Promise<[IDataHookRecord, number][]>

interface IStepMeta {
  batchId: string
  fileName?: string
  fileSize?: number
  fileType?: string

  count_rows?: number
  count_columns?: number
  count_columns_matched?: number

  headers_raw?: {
    index: number
    letter: string
    value?: string
  }[]
  headers_matched?: {
    index: number
    letter: string
    value?: string
    matched_key: string
  }[]

  sample?: [string[], number][]
}

interface IRule {
  sourceIndex: number
  targetKey?: string
  targetType?: string
  isCustom?: boolean
  optionsMap?: Record<string, Scalar>
  status: RULE_STATUS
  editable?: boolean
}

export type StepHooks = Record<STEP, StepHookCallback<STEP>>
export type StepHookCallback<T> = (
  payload: T extends 'match_field' ? IRule : IStepMeta
) => void | boolean | Promise<boolean>

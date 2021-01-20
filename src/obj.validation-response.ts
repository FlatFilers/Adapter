export interface IDataHookResponse {
  [key: string]: IDataHookRecord
}

export interface IDataHookRecord {
  value?: string | boolean | number
  info?: IDataHookInfo[]
}

export interface IDataHookInfo {
  message: string
  level?: 'error' | 'warning' | 'info'
}

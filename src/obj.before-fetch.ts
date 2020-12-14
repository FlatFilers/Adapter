export interface IBeforeFetchRequest {
  operation: string
  variables: Record<string, any>
}

export interface IBeforeFetchResponse {
  headers?: Record<string, string>
}

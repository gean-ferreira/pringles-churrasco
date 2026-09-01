export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export interface FetchOptions<TBody = unknown> {
  method: HttpMethod
  body?: TBody
  requiresAuth?: boolean
}

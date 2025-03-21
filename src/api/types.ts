export interface ApiResponse<T> {
  data: T
  status: number
  statusText: string
  headers: Record<string, string>
}

export interface ApiError<E = unknown> {
  message: string
  status?: number
  data?: E
}

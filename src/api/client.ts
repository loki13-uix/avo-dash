import type { ApiError } from '@/api/types'
import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios'

export class AxiosClient {
  private instance: AxiosInstance

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.initializeInterceptors()
  }

  private initializeInterceptors(): void {
    this.instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token')
        if (token) {
          config.headers = config.headers || {}
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        console.error('Request error:', error)
        return Promise.reject(error)
      }
    )

    this.instance.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status

          switch (status) {
            case 401:
              console.error('Unauthorized access')
              localStorage.removeItem('token')
              window.location.href = '/login'
              break
            case 403:
              console.error('Forbidden access')
              break
            case 404:
              console.error('Resource not found')
              break
            case 500:
              console.error('Server error')
              break
            default:
              console.error(`API Error (${status || 'unknown'}):`)
              break
          }

          console.error('API Error details:', {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data,
          })
        } else {
          console.error('Unknown error:', error)
        }

        return Promise.reject(error)
      }
    )
  }

  public async get<T>(
    url: string,
    params?: Record<string, unknown>,
    config?: Omit<AxiosRequestConfig, 'params'>
  ) {
    try {
      const response = await this.instance.get<AxiosResponse<T>>(url, {
        ...config,
        params,
      })

      const res = response.data?.data

      return res
    } catch (error) {
      throw this.handleError(error)
    }
  }

  public async post<T>(
    url: string,
    data?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ) {
    try {
      const response = await this.instance.post<AxiosResponse<T>>(
        url,
        data,
        config
      )

      const res = response.data?.data

      return res
    } catch (error) {
      throw this.handleError(error)
    }
  }

  public async put<T>(
    url: string,
    data?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ) {
    try {
      const response = await this.instance.put<AxiosResponse<T>>(
        url,
        data,
        config
      )

      const res = response.data?.data

      return res
    } catch (error) {
      throw this.handleError(error)
    }
  }

  public async patch<T>(
    url: string,
    data?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ) {
    try {
      const response = await this.instance.patch<AxiosResponse<T>>(
        url,
        data,
        config
      )

      const res = response.data?.data

      return res
    } catch (error) {
      throw this.handleError(error)
    }
  }

  public async delete<T>(
    url: string,
    params?: Record<string, unknown>,
    config?: Omit<AxiosRequestConfig, 'params'>
  ) {
    try {
      const response = await this.instance.delete<AxiosResponse<T>>(url, {
        ...config,
        params,
      })

      const res = response.data?.data

      return res
    } catch (error) {
      throw this.handleError(error)
    }
  }

  private handleError(error: unknown): ApiError {
    if (axios.isAxiosError(error)) {
      return {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      }
    }

    return {
      message:
        error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}

function createApiService(baseURL: string): AxiosClient {
  return new AxiosClient(baseURL)
}

export const api = createApiService('http://localhost:3000')

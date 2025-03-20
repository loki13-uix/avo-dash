import type { AxiosError } from 'axios'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calcPadLeft(level: number) {
  if (level === 0) return '16px'
  return `${level * 24}px`
}

export function wrapError(error: AxiosError) {
  return {
    message: error.message,
    status: error.response?.status,
    data: error.response?.data,
  }
}

export type Transaction = {
  id: number
  userId: number
  orderId: number
  amount: number
  invoiceNumber: string
  status: 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED'
  authority: string
  sessionId: null
  createdAt: string
  updatedAt: string
}

export const TRANSACTION_STATUS_MAP = {
  SUCCESS: { label: 'موفق', color: 'success', colorClassName: 'text-success' },
  FAILED: { label: 'ناموفق', color: 'error', colorClassName: 'text-error' },
  PENDING: { label: 'در انتظار', color: 'secondary', colorClassName: 'text-secondary' },
  REFUNDED: { label: 'برگشت داده', color: 'warning', colorClassName: 'text-warning' },
  UNKNOWN: { label: 'نامشخص', color: 'info', colorClassName: 'text-info' }
} as const

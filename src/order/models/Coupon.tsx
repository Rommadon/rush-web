export type CouponModel = {
  id: number
  name: string
  code: string
  startDate: string | Date
  endDate: string | Date
  type: string
  value: number
  minimumOrderAmount: number
  quantity: number
  usedPerUser?: number
  valueType: string
  status: string
  description: string
  usedQuantity: number
  merchant?: any
}
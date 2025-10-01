export type Address = {
  id: number
  userId: number
  fullName: string
  province: string
  city: string
  streetAndAlley: string
  plate: string
  unit: string
  postalCode: string
  createdAt: string
  updatedAt: string
}

export type AddressSnapshot = {
  id: number
  fullName: string
  province: string
  city: string
  postalAddress: string
  buildingNumber: number
  unit: number | null
  postalCode: string
  createdAt: string
}

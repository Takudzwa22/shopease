export interface Product {
  _id: string
  name: string
  description: string
  price: number
  image?: string
  category?: string
  stock?: number
  createdAt?: string
  updatedAt?: string
}

export interface CartItem extends Product {
  quantity: number
}

export interface OrderItem {
  product: string
  name: string
  price: number
  quantity: number
}

export interface CustomerAddress {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface Customer {
  name: string
  email: string
  address: CustomerAddress
}

export interface PaymentDetails {
  id: string
  status: string
  time: string
}

export interface Order {
  _id: string
  customer: Customer
  items: OrderItem[]
  totalAmount: number
  status: string
  paymentDetails?: PaymentDetails
  createdAt: string
  updatedAt: string
}


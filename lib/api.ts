// This is a mock API service for the e-commerce application
// In a real application, these functions would make actual HTTP requests to a backend server

import type { Product, Order } from "./types"

// Mock data
const products: Product[] = [
  {
    _id: "1",
    name: "Wireless Bluetooth Headphones",
    description: "Premium noise-cancelling headphones with 20-hour battery life and comfortable over-ear design.",
    price: 149.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Electronics",
    stock: 15,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "2",
    name: "Smartphone Stand & Wireless Charger",
    description: "Adjustable smartphone stand with built-in 15W fast wireless charging capability.",
    price: 39.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Accessories",
    stock: 25,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "3",
    name: "Smart Fitness Watch",
    description: "Track your health metrics, workouts, and receive notifications with this waterproof smart watch.",
    price: 89.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Wearables",
    stock: 10,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "4",
    name: "Portable Bluetooth Speaker",
    description: "Compact, waterproof speaker with powerful sound and 12-hour battery life.",
    price: 59.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Electronics",
    stock: 20,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "5",
    name: "Laptop Backpack",
    description: "Durable, water-resistant backpack with padded laptop compartment and multiple organization pockets.",
    price: 49.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Accessories",
    stock: 30,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "6",
    name: "Wireless Keyboard and Mouse Combo",
    description: "Ergonomic keyboard and precision mouse with long battery life and reliable wireless connection.",
    price: 69.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Computer Accessories",
    stock: 15,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

const orders: Order[] = []

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Product API functions
export async function getProducts(): Promise<Product[]> {
  await delay(500) // Simulate network delay
  return [...products]
}

export async function getProductById(id: string): Promise<Product> {
  await delay(300)
  const product = products.find((p) => p._id === id)
  if (!product) {
    throw new Error("Product not found")
  }
  return { ...product }
}

export async function createProduct(productData: Omit<Product, "_id" | "createdAt" | "updatedAt">): Promise<Product> {
  await delay(800)
  const newProduct: Product = {
    _id: Date.now().toString(),
    ...productData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  products.push(newProduct)
  return { ...newProduct }
}

export async function updateProduct(id: string, productData: Partial<Product>): Promise<Product> {
  await delay(500)
  const index = products.findIndex((p) => p._id === id)
  if (index === -1) {
    throw new Error("Product not found")
  }

  const updatedProduct = {
    ...products[index],
    ...productData,
    updatedAt: new Date().toISOString(),
  }

  products[index] = updatedProduct
  return { ...updatedProduct }
}

export async function deleteProduct(id: string): Promise<void> {
  await delay(500)
  const index = products.findIndex((p) => p._id === id)
  if (index === -1) {
    throw new Error("Product not found")
  }
  products.splice(index, 1)
}

// Order API functions
export async function getOrders(): Promise<Order[]> {
  await delay(500)
  return [...orders]
}

export async function getOrderById(id: string): Promise<Order> {
  await delay(300)
  const order = orders.find((o) => o._id === id)
  if (!order) {
    throw new Error("Order not found")
  }
  return { ...order }
}

export async function createOrder(orderData: Omit<Order, "_id" | "createdAt" | "updatedAt">): Promise<Order> {
  await delay(800)
  const newOrder: Order = {
    _id: Date.now().toString(),
    ...orderData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  orders.push(newOrder)
  return { ...newOrder }
}

export async function updateOrder(id: string, orderData: Partial<Order>): Promise<Order> {
  await delay(500)
  const index = orders.findIndex((o) => o._id === id)
  if (index === -1) {
    throw new Error("Order not found")
  }

  const updatedOrder = {
    ...orders[index],
    ...orderData,
    updatedAt: new Date().toISOString(),
  }

  orders[index] = updatedOrder
  return { ...updatedOrder }
}


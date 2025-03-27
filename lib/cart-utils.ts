import type { Product, CartItem } from "./types"

// Get cart from localStorage
export function getCart(): CartItem[] {
  if (typeof window === "undefined") return []

  const cartJson = localStorage.getItem("cart")
  if (!cartJson) return []

  try {
    return JSON.parse(cartJson)
  } catch (error) {
    console.error("Error parsing cart from localStorage:", error)
    return []
  }
}

// Add product to cart
export function addToCart(product: Product, quantity = 1): void {
  if (typeof window === "undefined") return

  const cart = getCart()
  const existingItemIndex = cart.findIndex((item) => item._id === product._id)

  if (existingItemIndex >= 0) {
    // Update quantity if item already exists
    cart[existingItemIndex].quantity += quantity
  } else {
    // Add new item
    cart.push({
      ...product,
      quantity,
    })
  }

  localStorage.setItem("cart", JSON.stringify(cart))
}

// Update cart item quantity
export function updateCartItemQuantity(productId: string, quantity: number): void {
  if (typeof window === "undefined") return

  const cart = getCart()
  const itemIndex = cart.findIndex((item) => item._id === productId)

  if (itemIndex >= 0) {
    cart[itemIndex].quantity = quantity
    localStorage.setItem("cart", JSON.stringify(cart))
  }
}

// Remove item from cart
export function removeFromCart(productId: string): void {
  if (typeof window === "undefined") return

  const cart = getCart()
  const updatedCart = cart.filter((item) => item._id !== productId)
  localStorage.setItem("cart", JSON.stringify(updatedCart))
}

// Clear cart
export function clearCart(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem("cart")
}

// Calculate cart total
export function calculateCartTotal(): number {
  const cart = getCart()
  return cart.reduce((total, item) => total + item.price * item.quantity, 0)
}


"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, MinusCircle, PlusCircle } from "lucide-react"
import { getCart, updateCartItemQuantity, removeFromCart, clearCart } from "@/lib/cart-utils"
import type { CartItem } from "@/lib/types"
import { toast } from "@/hooks/use-toast"

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const items = getCart()
    setCartItems(items)
    setIsLoading(false)
  }, [])

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return

    updateCartItemQuantity(id, newQuantity)
    setCartItems(getCart())
  }

  const handleRemoveItem = (id: string) => {
    removeFromCart(id)
    setCartItems(getCart())
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
    })
  }

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checking out.",
        variant: "destructive",
      })
      return
    }

    router.push("/checkout")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            ShopEase
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <Link href="/products" className="hover:underline">
              Products
            </Link>
            <Link href="/products/add" className="hover:underline">
              Add Product
            </Link>
            <Link href="/orders" className="hover:underline">
              Orders
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Looks like you haven't added any products to your cart yet.</p>
            <Button asChild>
              <Link href="/products">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Cart Items ({cartItems.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item._id} className="flex flex-col sm:flex-row border-b pb-4">
                        <div className="sm:w-24 h-24 flex-shrink-0 mb-4 sm:mb-0">
                          <img
                            src={item.image || "/placeholder.svg?height=100&width=100"}
                            alt={item.name}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                        <div className="flex-grow sm:ml-4">
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          <p className="text-primary font-medium">${item.price.toFixed(2)}</p>
                          <div className="flex items-center mt-2">
                            <button
                              onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                              className="text-gray-500 hover:text-primary"
                              disabled={item.quantity <= 1}
                            >
                              <MinusCircle className="h-5 w-5" />
                            </button>
                            <span className="mx-3">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                              className="text-gray-500 hover:text-primary"
                            >
                              <PlusCircle className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleRemoveItem(item._id)}
                              className="ml-auto text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => {
                      clearCart()
                      setCartItems([])
                      toast({
                        title: "Cart cleared",
                        description: "All items have been removed from your cart.",
                      })
                    }}
                  >
                    Clear Cart
                  </Button>
                  <Button asChild>
                    <Link href="/products">Continue Shopping</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${calculateSubtotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="border-t pt-4 flex justify-between font-bold">
                      <span>Total</span>
                      <span>${calculateSubtotal().toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={handleCheckout} disabled={cartItems.length === 0}>
                    Proceed to Checkout
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} ShopEase. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}


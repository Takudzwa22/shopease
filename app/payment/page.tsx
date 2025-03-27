"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import { getOrderById, updateOrder } from "@/lib/api"
import { clearCart } from "@/lib/cart-utils"
import type { Order } from "@/lib/types"

declare global {
  interface Window {
    paypal?: {
      Buttons: (config: any) => {
        render: (target: string | HTMLElement) => void
      }
    }
  }
}

export default function PaymentPage() {
  const [order, setOrder] = useState<Order | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [paymentStatus, setPaymentStatus] = useState<"pending" | "success" | "failed">("pending")
  const paypalButtonsRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")

  useEffect(() => {
    if (!orderId) {
      toast({
        title: "Error",
        description: "Order ID is missing. Please try again.",
        variant: "destructive",
      })
      router.push("/cart")
      return
    }

    async function loadOrder() {
      try {
        const data = await getOrderById(orderId)
        setOrder(data)
        setIsLoading(false)
      } catch (error) {
        console.error("Failed to load order:", error)
        toast({
          title: "Error",
          description: "Failed to load order details. Please try again.",
          variant: "destructive",
        })
        router.push("/cart")
      }
    }

    loadOrder()
  }, [orderId, router])

  useEffect(() => {
    if (!order || !paypalButtonsRef.current) return

    // Load PayPal script
    const script = document.createElement("script")
    script.src = "https://www.paypal.com/sdk/js?client-id=sb&currency=USD"
    script.async = true
    script.onload = () => {
      if (window.paypal) {
        window.paypal
          .Buttons({
            createOrder: (data: any, actions: any) => {
              return actions.order.create({
                purchase_units: [
                  {
                    description: `Order #${order._id}`,
                    amount: {
                      currency_code: "USD",
                      value: order.totalAmount.toFixed(2),
                    },
                  },
                ],
              })
            },
            onApprove: async (data: any, actions: any) => {
              try {
                // Capture the funds from the transaction
                const details = await actions.order.capture()

                // Update order status in database
                await updateOrder(order._id, {
                  status: "completed",
                  paymentDetails: {
                    id: details.id,
                    status: details.status,
                    time: new Date().toISOString(),
                  },
                })

                setPaymentStatus("success")
                clearCart() // Clear the cart after successful payment

                toast({
                  title: "Payment Successful",
                  description: "Your order has been placed successfully!",
                })

                // Redirect to order confirmation page after a short delay
                setTimeout(() => {
                  router.push(`/orders/${order._id}`)
                }, 2000)
              } catch (error) {
                console.error("Payment processing error:", error)
                setPaymentStatus("failed")
                toast({
                  title: "Payment Failed",
                  description: "There was an error processing your payment. Please try again.",
                  variant: "destructive",
                })
              }
            },
            onError: (err: any) => {
              console.error("PayPal error:", err)
              setPaymentStatus("failed")
              toast({
                title: "Payment Error",
                description: "There was an error with PayPal. Please try again.",
                variant: "destructive",
              })
            },
          })
          .render(paypalButtonsRef.current)
      }
    }

    document.body.appendChild(script)

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [order, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
        <p className="mb-6">The order you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link href="/products">Back to Products</Link>
        </Button>
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
        <h1 className="text-3xl font-bold mb-8">Complete Your Payment</h1>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Order ID:</span>
                  <span className="font-mono">{order._id}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Amount:</span>
                  <span className="font-bold">${order.totalAmount.toFixed(2)}</span>
                </div>

                <div className="border-t pt-6 mt-6">
                  {paymentStatus === "pending" && (
                    <>
                      <p className="text-center mb-6">
                        Please complete your payment using PayPal. This is a sandbox environment, so no real payment
                        will be processed.
                      </p>
                      <div ref={paypalButtonsRef} className="mt-4"></div>
                      <p className="text-xs text-gray-500 mt-4 text-center">
                        Note: This is a sandbox PayPal integration for demonstration purposes.
                      </p>
                    </>
                  )}

                  {paymentStatus === "success" && (
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg
                          className="w-8 h-8 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Payment Successful!</h3>
                      <p className="mb-4">Your order has been placed successfully.</p>
                      <Button asChild>
                        <Link href={`/orders/${order._id}`}>View Order Details</Link>
                      </Button>
                    </div>
                  )}

                  {paymentStatus === "failed" && (
                    <div className="text-center">
                      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg
                          className="w-8 h-8 text-red-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Payment Failed</h3>
                      <p className="mb-4">There was an error processing your payment. Please try again.</p>
                      <div className="flex justify-center space-x-4">
                        <Button variant="outline" asChild>
                          <Link href="/cart">Back to Cart</Link>
                        </Button>
                        <Button onClick={() => setPaymentStatus("pending")}>Try Again</Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} ShopEase. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}


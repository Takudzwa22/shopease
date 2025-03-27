"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getProductById } from "@/lib/api"
import type { Product } from "@/lib/types"
import { addToCart } from "@/lib/cart-utils"
import { toast } from "@/hooks/use-toast"

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const router = useRouter()

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await getProductById(params.id)
        setProduct(data)
        setIsLoading(false)
      } catch (error) {
        console.error("Failed to load product:", error)
        setIsLoading(false)
      }
    }

    loadProduct()
  }, [params.id])

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity)
      toast({
        title: "Added to cart",
        description: `${quantity} x ${product.name} added to your cart.`,
      })
    }
  }

  const handleBuyNow = () => {
    if (product) {
      addToCart(product, quantity)
      router.push("/cart")
    }
  }

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
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
        <div className="mb-6">
          <Link href="/products" className="text-primary hover:underline flex items-center">
            &larr; Back to Products
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <img
              src={product.image || "/placeholder.svg?height=500&width=500"}
              alt={product.name}
              className="w-full h-96 object-contain"
            />
          </div>

          <Card>
            <CardContent className="pt-6">
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-2xl font-bold text-primary mb-4">${product.price.toFixed(2)}</p>
              <div className="border-t border-b py-4 my-4">
                <p className="text-gray-700">{product.description}</p>
              </div>

              <div className="flex items-center mb-6">
                <span className="mr-4">Quantity:</span>
                <div className="flex items-center">
                  <Button variant="outline" size="icon" onClick={decrementQuantity} disabled={quantity <= 1}>
                    -
                  </Button>
                  <span className="mx-4">{quantity}</span>
                  <Button variant="outline" size="icon" onClick={incrementQuantity}>
                    +
                  </Button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="flex-1" variant="outline" onClick={handleAddToCart}>
                  Add to Cart
                </Button>
                <Button className="flex-1" onClick={handleBuyNow}>
                  Buy Now
                </Button>
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


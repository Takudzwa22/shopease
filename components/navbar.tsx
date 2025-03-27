"use client"

import Link from "next/link"
import { ShoppingBag } from "lucide-react"
import { useEffect, useState } from "react"
import { getCart } from "@/lib/cart-utils"

export default function Navbar() {
  const [cartItemCount, setCartItemCount] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const updateCartCount = () => {
      const cart = getCart()
      const count = cart.reduce((total, item) => total + item.quantity, 0)
      setCartItemCount(count)
    }

    // Initial count
    updateCartCount()

    // Update count when storage changes
    window.addEventListener("storage", updateCartCount)

    return () => {
      window.removeEventListener("storage", updateCartCount)
    }
  }, [])

  return (
    <header className="bg-primary text-primary-foreground py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          ShopEase
        </Link>

        {/* Mobile menu button */}
        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop navigation */}
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

        {/* Cart icon */}
        <Link href="/cart" className="flex items-center">
          <div className="relative">
            <ShoppingBag className="h-6 w-6" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </div>
        </Link>
      </div>

      {/* Mobile navigation */}
      {isMobileMenuOpen && (
        <nav className="md:hidden pt-4 pb-2 px-4 space-y-2">
          <Link
            href="/"
            className="block py-2 hover:bg-primary-foreground/10 rounded px-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/products"
            className="block py-2 hover:bg-primary-foreground/10 rounded px-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Products
          </Link>
          <Link
            href="/products/add"
            className="block py-2 hover:bg-primary-foreground/10 rounded px-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Add Product
          </Link>
          <Link
            href="/orders"
            className="block py-2 hover:bg-primary-foreground/10 rounded px-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Orders
          </Link>
        </nav>
      )}
    </header>
  )
}


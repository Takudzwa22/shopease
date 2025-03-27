import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingBag, TrendingUp, Shield, Truck } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
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
          <div className="flex items-center space-x-4">
            <Link href="/cart">
              <ShoppingBag className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to ShopEase</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Your one-stop destination for quality products at affordable prices. Discover a world of amazing items
              just a click away.
            </p>
            <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
              <Link href="/products">Shop Now</Link>
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
                <p className="text-gray-600">We source only the highest quality products from trusted manufacturers.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Truck className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
                <p className="text-gray-600">Enjoy quick and reliable shipping on all your orders.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
                <p className="text-gray-600">Shop with confidence with our secure payment options.</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="About ShopEase"
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div className="md:w-1/2 md:pl-12">
                <h2 className="text-3xl font-bold mb-6">About Our Company</h2>
                <p className="text-gray-700 mb-4">
                  Founded in 2020, ShopEase has quickly grown to become a trusted name in online retail. Our mission is
                  to provide customers with a seamless shopping experience and access to high-quality products at
                  competitive prices.
                </p>
                <p className="text-gray-700 mb-4">
                  We believe in building lasting relationships with our customers through exceptional service and a
                  commitment to satisfaction. Our team works tirelessly to curate a selection of products that meet our
                  strict quality standards.
                </p>
                <p className="text-gray-700">
                  Whether you're looking for the latest tech gadgets, stylish apparel, or home essentials, ShopEase has
                  you covered. Join thousands of satisfied customers who make ShopEase their first choice for online
                  shopping.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">ShopEase</h3>
              <p className="text-gray-300">Your trusted online shopping destination for quality products.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-300 hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="text-gray-300 hover:text-white">
                    Products
                  </Link>
                </li>
                <li>
                  <Link href="/orders" className="text-gray-300 hover:text-white">
                    Orders
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-300">
                123 Commerce Street
                <br />
                Shopville, SV 12345
                <br />
                contact@shopease.com
                <br />
                (555) 123-4567
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-300">
            <p>&copy; {new Date().getFullYear()} ShopEase. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}


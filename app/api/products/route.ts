import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

// GET /api/products - Get all products
export async function GET() {
  try {
    const { db } = await connectToDatabase()
    const products = await db.collection("products").find({}).toArray()

    return NextResponse.json(products)
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

// POST /api/products - Create a new product
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.description || body.price === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const { db } = await connectToDatabase()

    const product = {
      name: body.name,
      description: body.description,
      price: Number.parseFloat(body.price),
      image: body.image || null,
      category: body.category || "Uncategorized",
      stock: body.stock || 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("products").insertOne(product)

    return NextResponse.json({ ...product, _id: result.insertedId }, { status: 201 })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}


import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

// GET /api/orders - Get all orders
export async function GET() {
  try {
    const { db } = await connectToDatabase()
    const orders = await db.collection("orders").find({}).sort({ createdAt: -1 }).toArray()

    return NextResponse.json(orders)
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}

// POST /api/orders - Create a new order
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.customer || !body.items || !body.totalAmount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const { db } = await connectToDatabase()

    const order = {
      customer: body.customer,
      items: body.items,
      totalAmount: Number.parseFloat(body.totalAmount),
      status: body.status || "pending",
      paymentDetails: body.paymentDetails || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("orders").insertOne(order)

    return NextResponse.json({ ...order, _id: result.insertedId }, { status: 201 })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}


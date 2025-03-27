import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { connectToDatabase } from "@/lib/mongodb"

// GET /api/orders/[id] - Get an order by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid order ID" }, { status: 400 })
    }

    const { db } = await connectToDatabase()
    const order = await db.collection("orders").findOne({ _id: new ObjectId(id) })

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 })
  }
}

// PUT /api/orders/[id] - Update an order
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const body = await request.json()

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid order ID" }, { status: 400 })
    }

    const { db } = await connectToDatabase()

    const updateData: any = {
      updatedAt: new Date(),
    }

    // Only update fields that are provided
    if (body.status !== undefined) updateData.status = body.status
    if (body.paymentDetails !== undefined) updateData.paymentDetails = body.paymentDetails

    const result = await db.collection("orders").updateOne({ _id: new ObjectId(id) }, { $set: updateData })

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    const updatedOrder = await db.collection("orders").findOne({ _id: new ObjectId(id) })

    return NextResponse.json(updatedOrder)
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 })
  }
}


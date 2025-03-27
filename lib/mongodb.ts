import { MongoClient, type Db } from "mongodb"

let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

export async function connectToDatabase() {
  // If we already have a connection, use it
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  // If no connection, create a new one
  // In a real application, you would use an environment variable for the connection string
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/ecommerce"

  if (!uri) {
    throw new Error("Please define the MONGODB_URI environment variable")
  }

  const client = new MongoClient(uri)
  await client.connect()
  const db = client.db()

  // Cache the connection
  cachedClient = client
  cachedDb = db

  return { client, db }
}


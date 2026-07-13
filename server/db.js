import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "promptpilot";

if (!uri) {
  throw new Error("MONGODB_URI is not set. Copy .env.example to .env and fill it in.");
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;

export async function connect() {
  if (!db) {
    await client.connect();
    db = client.db(dbName);
    await db.command({ ping: 1 });
  }
  return db;
}

export function getDb() {
  if (!db) {
    throw new Error("Database not connected. Call connect() first.");
  }
  return db;
}

export async function close() {
  await client.close();
  db = undefined;
}

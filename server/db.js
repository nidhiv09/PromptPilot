import { MongoClient, ServerApiVersion } from "mongodb";

// Serverless containers are reused between invocations, so the client and the
// in-flight connection promise are cached on globalThis. Without this, every
// request would open a new connection pool and exhaust Atlas's connection limit.
const cache = (globalThis.__mongo ??= { client: null, promise: null });

async function init() {
  // Read env lazily, not at import time: a missing var should fail one request
  // with a clear error, not crash the process on startup.
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB || "promptpilot";

  if (!uri) {
    throw new Error(
      "MONGODB_URI is not set. Locally, copy .env.example to .env. On Vercel, add it under Settings > Environment Variables."
    );
  }

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  await client.connect();

  const db = client.db(dbName);

  // Enforce the "prompt already exists" rule at the database level too, so
  // concurrent saves can't slip a duplicate past the check in the route.
  await db.collection("prompts").createIndex({ prompt: 1 }, { unique: true });

  cache.client = client;

  return db;
}

export function connect() {
  cache.promise ??= init().catch((err) => {
    cache.promise = null; // let the next request retry instead of caching the failure
    throw err;
  });

  return cache.promise;
}

export async function close() {
  await cache.client?.close();
  cache.client = null;
  cache.promise = null;
}

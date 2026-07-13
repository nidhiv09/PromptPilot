import "dotenv/config";

import fakeResponses from "../src/data/fakeResponses.js";
import { close, connect } from "./db.js";

const db = await connect();
const collection = db.collection("responses");

for (const item of fakeResponses) {
  await collection.updateOne(
    { keywords: item.keywords },
    { $set: item },
    { upsert: true }
  );
}

await collection.createIndex({ keywords: 1 });

console.log(`Seeded ${fakeResponses.length} responses.`);

await close();

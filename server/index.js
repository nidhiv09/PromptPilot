import "dotenv/config";

import cors from "cors";
import express from "express";
import { ObjectId } from "mongodb";

import { generate, isConfigured } from "./ai.js";
import { connect, getDb } from "./db.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const serialize = ({ _id, ...rest }) => ({ id: _id.toString(), ...rest });

const FALLBACK = {
  response:
    "Prompt analyzed successfully.\n\nThis is a demo version of PromptPilot.\nNo predefined response matched your prompt.",
  tokens: 240,
  latency: "1.3 sec",
  cost: "$0.003",
};

// Canned responses from the `responses` collection, used when there is no API key.
async function demo(prompt) {
  const words = prompt.toLowerCase().match(/[a-z0-9]+/g) || [];

  const match = await getDb()
    .collection("responses")
    .findOne({ keywords: { $in: words } });

  const { response, tokens, latency, cost } = match || FALLBACK;

  return { response, tokens, latency, cost, source: "demo" };
}

// Run a prompt against the model, falling back to the canned demo responses.
app.post("/api/run", async (req, res, next) => {
  try {
    const prompt = (req.body.prompt || "").trim();

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required." });
    }

    if (!isConfigured) {
      return res.json(await demo(prompt));
    }

    res.json(await generate(prompt, req.body.model));
  } catch (err) {
    if (err.status >= 400 && err.status < 500) {
      return res.status(err.status).json({ error: err.message });
    }
    next(err);
  }
});

app.get("/api/prompts", async (_req, res, next) => {
  try {
    const prompts = await getDb()
      .collection("prompts")
      .find()
      .sort({ createdAt: -1 })
      .toArray();

    res.json(prompts.map(serialize));
  } catch (err) {
    next(err);
  }
});

app.post("/api/prompts", async (req, res, next) => {
  try {
    const { title, prompt, response, model, source, tokens, latency, cost } =
      req.body;

    if (!prompt || !response) {
      return res.status(400).json({ error: "Prompt and response are required." });
    }

    const collection = getDb().collection("prompts");

    if (await collection.findOne({ prompt })) {
      return res.status(409).json({ error: "Prompt already exists." });
    }

    const doc = {
      title,
      prompt,
      response,
      model,
      source,
      tokens,
      latency,
      cost,
      createdAt: new Date(),
    };

    const { insertedId } = await collection.insertOne(doc);

    res.status(201).json(serialize({ ...doc, _id: insertedId }));
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ error: "Prompt already exists." });
    }
    next(err);
  }
});

app.delete("/api/prompts/:id", async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid id." });
    }

    const { deletedCount } = await getDb()
      .collection("prompts")
      .deleteOne({ _id: new ObjectId(req.params.id) });

    if (!deletedCount) {
      return res.status(404).json({ error: "Prompt not found." });
    }

    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong." });
});

const db = await connect();

// Enforce the "prompt already exists" rule at the database level too, so
// concurrent saves can't slip a duplicate past the check above.
await db.collection("prompts").createIndex({ prompt: 1 }, { unique: true });

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});

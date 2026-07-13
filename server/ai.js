import OpenAI from "openai";

import { findModel } from "../src/lib/models.js";

// Groq speaks the OpenAI API, so the official SDK works as-is — it just needs
// a different baseURL and key. Point OPENAI_BASE_URL at api.openai.com (and use
// an OpenAI key) to switch providers without touching this file.
const baseURL = process.env.OPENAI_BASE_URL || "https://api.groq.com/openai/v1";
const apiKey = process.env.OPENAI_API_KEY;

export const isConfigured = Boolean(apiKey);

const client = isConfigured ? new OpenAI({ apiKey, baseURL }) : null;

const estimateCost = (model, usage) => {
  const inputCost = ((usage?.prompt_tokens || 0) / 1e6) * model.input;
  const outputCost = ((usage?.completion_tokens || 0) / 1e6) * model.output;
  return `$${(inputCost + outputCost).toFixed(4)}`;
};

export async function generate(prompt, modelLabel) {
  const model = findModel(modelLabel);

  if (!model) {
    const error = new Error(`Unknown model: ${modelLabel}`);
    error.status = 400;
    throw error;
  }

  const startedAt = performance.now();

  const completion = await client.chat.completions.create({
    model: model.id,
    messages: [{ role: "user", content: prompt }],
  });

  const seconds = (performance.now() - startedAt) / 1000;
  const usage = completion.usage;

  return {
    response: completion.choices[0]?.message?.content?.trim() || "",
    tokens: usage?.total_tokens ?? 0,
    latency: `${seconds.toFixed(1)} sec`,
    cost: estimateCost(model, usage),
    source: "live",
  };
}

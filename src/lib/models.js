// Groq production models, served through the OpenAI-compatible API.
// `input`/`output` are USD per million tokens, used to estimate cost.
// Shared by the model dropdown and the server, so the two can't drift apart.
export const MODELS = [
  {
    label: "Llama 3.3 70B",
    id: "llama-3.3-70b-versatile",
    input: 0.59,
    output: 0.79,
  },
  {
    label: "Llama 3.1 8B",
    id: "llama-3.1-8b-instant",
    input: 0.05,
    output: 0.08,
  },
  {
    label: "GPT-OSS 120B",
    id: "openai/gpt-oss-120b",
    input: 0.15,
    output: 0.6,
  },
];

export const DEFAULT_MODEL = MODELS[0].label;

export const findModel = (label) =>
  MODELS.find((model) => model.label === label);

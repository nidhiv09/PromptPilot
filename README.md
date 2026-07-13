# PromptPilot

PromptPilot is a modern AI Prompt Engineering workspace that helps users create, test, compare, and optimize AI prompts before using them in production.

## Features

- Create and edit prompts
- Run prompts against real AI models (Llama 3.3 70B, Llama 3.1 8B, GPT-OSS 120B)
- Compare different AI models
- View real token usage, latency, and cost
- Save prompts to MongoDB
- Load and delete saved prompts
- Clean and responsive UI

## Built With

- React
- Vite
- Tailwind CSS
- shadcn/ui
- Lucide React
- Express
- MongoDB
- OpenAI SDK (pointed at Groq)

## Architecture

Neither the MongoDB driver nor the AI API key can live in the browser — the driver needs
raw TCP sockets, and a key shipped to the client is a key anyone can read out of devtools.
So the app is split in two:

- `src/` — the React app (Vite). Talks to the API over `/api` via `src/lib/api.js`.
- `server/` — an Express API that owns the MongoDB connection (`server/db.js`) and the
  model calls (`server/ai.js`).

In dev, Vite proxies `/api` to the API server on port 5000.

## Models

Responses come from **Groq**, which exposes an OpenAI-compatible API — so the official
`openai` SDK is used as-is, just pointed at a different `baseURL`. Groq's free tier covers
the models in `src/lib/models.js`, the single source of truth shared by the model dropdown
and the server:

| Dropdown label | Groq model ID |
| --- | --- |
| Llama 3.3 70B | `llama-3.3-70b-versatile` |
| Llama 3.1 8B | `llama-3.1-8b-instant` |
| GPT-OSS 120B | `openai/gpt-oss-120b` |

To use real OpenAI instead, set `OPENAI_BASE_URL=https://api.openai.com/v1`, supply an
OpenAI key, and swap the model IDs in `src/lib/models.js`. No other code changes.

**Demo mode:** with no `OPENAI_API_KEY` set, `/api/run` falls back to canned responses
stored in MongoDB, and the UI badges the result `Demo` instead of `Live`.

## Collections

- `responses` — the canned demo responses, keyed by `keywords`. Seeded from `src/data/fakeResponses.js`.
- `prompts` — prompts the user saved.

## Getting Started

Clone the repository:

```bash
git clone https://github.com/nidhiv09/PromptPilot.git
```

Install dependencies:

```bash
npm install
```

Configure the environment. Copy `.env.example` to `.env` (it is gitignored — real secrets
go there, never in `.env.example`) and set:

- `MONGODB_URI` — your Atlas connection string, or `mongodb://localhost:27017`.
- `OPENAI_API_KEY` — a free Groq key from https://console.groq.com/keys. Leave it empty to
  run in demo mode.

Seed the demo responses:

```bash
npm run seed
```

Run the development server (starts the app and the API together):

```bash
npm run dev
```

`npm run dev:web` and `npm run dev:server` run the two halves separately.

Build for production:

```bash
npm run build
```

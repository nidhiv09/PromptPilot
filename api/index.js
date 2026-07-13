// Vercel serverless entry point. Vercel supplies env vars directly, so there is
// no dotenv here, and no app.listen() — Vercel invokes the exported handler.
import app from "../server/app.js";

export default app;

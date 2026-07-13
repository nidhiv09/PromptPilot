// Local dev entry point. On Vercel the app is served from api/index.js instead,
// which is why app.listen() lives here and not in app.js.
import "dotenv/config";

import app from "./app.js";

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});

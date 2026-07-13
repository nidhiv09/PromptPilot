const BASE = "/api";

async function request(path, options) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const { error } = await res.json().catch(() => ({}));
    throw new Error(error || "Request failed.");
  }

  return res.status === 204 ? null : res.json();
}

export const runPrompt = (prompt, model) =>
  request("/run", { method: "POST", body: JSON.stringify({ prompt, model }) });

export const fetchPrompts = () => request("/prompts");

export const createPrompt = (prompt) =>
  request("/prompts", { method: "POST", body: JSON.stringify(prompt) });

export const deletePrompt = (id) =>
  request(`/prompts/${id}`, { method: "DELETE" });

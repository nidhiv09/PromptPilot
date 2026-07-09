import { useEffect, useState } from "react";
import { toast } from "sonner";

import PromptEditor from "@/components/studio/PromptEditor";
import ResponseCard from "@/components/studio/ResponseCard";
import SavedPrompts from "@/components/studio/SavedPrompts";

import fakeResponses from "@/data/fakeResponses";

export default function PromptStudio() {
  const [prompt, setPrompt] = useState("");

  const [model, setModel] = useState("Claude Sonnet 4");

  const [loading, setLoading] = useState(false);

  const [response, setResponse] = useState("");

  const [metrics, setMetrics] = useState({
    tokens: "--",
    latency: "--",
    cost: "--",
  });

  const [savedPrompts, setSavedPrompts] = useState(() => {
    const saved = localStorage.getItem("promptpilot-prompts");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "promptpilot-prompts",
      JSON.stringify(savedPrompts)
    );
  }, [savedPrompts]);

  const runPrompt = () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const lower = prompt.toLowerCase();

      const result = fakeResponses.find((item) =>
        item.keywords.some((k) => lower.includes(k))
      );

      if (result) {
        setResponse(result.response);

        setMetrics({
          tokens: result.tokens,
          latency: result.latency,
          cost: result.cost,
        });
      } else {
        setResponse(
          "Prompt analyzed successfully.\n\nThis is a demo version of PromptPilot.\nNo predefined response matched your prompt."
        );

        setMetrics({
          tokens: 240,
          latency: "1.3 sec",
          cost: "$0.003",
        });
      }

      setLoading(false);
    }, 1500);
  };

  const savePrompt = () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt.");
      return;
    }

    if (!response) {
      toast.error("Run the prompt before saving.");
      return;
    }

    const alreadyExists = savedPrompts.some(
      (item) => item.prompt === prompt
    );

    if (alreadyExists) {
      toast.warning("Prompt already exists.");
      return;
    }

    const newPrompt = {
      id: Date.now(),

      title:
        prompt.length > 35
          ? prompt.substring(0, 35) + "..."
          : prompt,

      prompt,

      response,

      model,

      ...metrics,
    };

    setSavedPrompts((prev) => [newPrompt, ...prev]);

    toast.success("Prompt saved successfully!");
  };

  const loadPrompt = (item) => {
    setPrompt(item.prompt);

    setResponse(item.response);

    setMetrics({
      tokens: item.tokens,
      latency: item.latency,
      cost: item.cost,
    });

    setModel(item.model);

    toast.success("Prompt loaded.");
  };

  const deletePrompt = (id) => {
    setSavedPrompts((prev) =>
      prev.filter((item) => item.id !== id)
    );

    toast.success("Prompt deleted.");
  };

  const clearWorkspace = () => {
    setPrompt("");

    setResponse("");

    setMetrics({
      tokens: "--",
      latency: "--",
      cost: "--",
    });

    toast.success("Workspace cleared.");
  };

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10">

      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">

        <div className="lg:col-span-2">

          <PromptEditor
            prompt={prompt}
            setPrompt={setPrompt}
            model={model}
            setModel={setModel}
            loading={loading}
            onRun={runPrompt}
            onSave={savePrompt}
            onClear={clearWorkspace}
          />

          <ResponseCard
            response={response}
            metrics={metrics}
            loading={loading}
            model={model}
          />

        </div>

        <SavedPrompts
          prompts={savedPrompts}
          onSelect={loadPrompt}
          onDelete={deletePrompt}
        />

      </div>

    </div>
  );
}
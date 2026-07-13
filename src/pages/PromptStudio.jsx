import { useEffect, useState } from "react";
import { toast } from "sonner";

import PromptEditor from "@/components/studio/PromptEditor";
import ResponseCard from "@/components/studio/ResponseCard";
import SavedPrompts from "@/components/studio/SavedPrompts";

import * as api from "@/lib/api";
import { DEFAULT_MODEL } from "@/lib/models";

const EMPTY_METRICS = {
  tokens: "--",
  latency: "--",
  cost: "--",
};

export default function PromptStudio() {
  const [prompt, setPrompt] = useState("");

  const [model, setModel] = useState(DEFAULT_MODEL);

  const [loading, setLoading] = useState(false);

  const [response, setResponse] = useState("");

  const [source, setSource] = useState("");

  const [metrics, setMetrics] = useState(EMPTY_METRICS);

  const [savedPrompts, setSavedPrompts] = useState([]);

  useEffect(() => {
    api
      .fetchPrompts()
      .then(setSavedPrompts)
      .catch(() => toast.error("Could not load saved prompts."));
  }, []);

  const runPrompt = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt.");
      return;
    }

    setLoading(true);

    try {
      const result = await api.runPrompt(prompt, model);

      setResponse(result.response);

      setSource(result.source);

      setMetrics({
        tokens: result.tokens,
        latency: result.latency,
        cost: result.cost,
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const savePrompt = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt.");
      return;
    }

    if (!response) {
      toast.error("Run the prompt before saving.");
      return;
    }

    try {
      const saved = await api.createPrompt({
        title:
          prompt.length > 35
            ? prompt.substring(0, 35) + "..."
            : prompt,

        prompt,

        response,

        model,

        source,

        ...metrics,
      });

      setSavedPrompts((prev) => [saved, ...prev]);

      toast.success("Prompt saved successfully!");
    } catch (error) {
      toast.warning(error.message);
    }
  };

  const loadPrompt = (item) => {
    setPrompt(item.prompt);

    setResponse(item.response);

    setSource(item.source || "");

    setMetrics({
      tokens: item.tokens,
      latency: item.latency,
      cost: item.cost,
    });

    setModel(item.model);

    toast.success("Prompt loaded.");
  };

  const deletePrompt = async (id) => {
    try {
      await api.deletePrompt(id);

      setSavedPrompts((prev) =>
        prev.filter((item) => item.id !== id)
      );

      toast.success("Prompt deleted.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const clearWorkspace = () => {
    setPrompt("");

    setResponse("");

    setSource("");

    setMetrics(EMPTY_METRICS);

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
            source={source}
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

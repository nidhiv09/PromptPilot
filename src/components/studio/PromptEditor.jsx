import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Sparkles,
  Play,
  Save,
  Loader2,
  Eraser,
} from "lucide-react";

import { MODELS } from "@/lib/models";

export default function PromptEditor({
  prompt,
  setPrompt,
  model,
  setModel,
  loading,
  onRun,
  onSave,
  onClear,
}) {
  return (
    <Card className="rounded-3xl border border-slate-800 bg-slate-900/70 shadow-2xl backdrop-blur">
      <CardContent className="p-8">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">

          <div>
            <Badge className="bg-violet-600 hover:bg-violet-600">
              PromptPilot Workspace
            </Badge>

            <h1 className="mt-4 text-4xl font-bold text-white">
              Prompt Editor
            </h1>

            <p className="mt-2 text-slate-400">
              Build, test and optimize AI prompts before using them in production.
            </p>
          </div>

        </div>

        {/* Prompt */}

        <div className="space-y-4">

          <div className="flex items-center gap-2">

            <Sparkles className="h-5 w-5 text-violet-400" />

            <h2 className="font-semibold text-white">
              Prompt
            </h2>

          </div>

          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[260px] resize-none rounded-2xl border-slate-700 bg-slate-950 text-base leading-7 text-white focus:border-violet-500"
            placeholder="Example: Write a professional apology email for a customer whose order was delayed by two days..."
          />

        </div>

        {/* Controls */}

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">

          <Select
            value={model}
            onValueChange={setModel}
          >

            <SelectTrigger className="w-56 border-slate-700 bg-slate-950 text-white">

              <SelectValue />

            </SelectTrigger>

            <SelectContent>

              {MODELS.map((item) => (
                <SelectItem key={item.id} value={item.label}>
                  {item.label}
                </SelectItem>
              ))}

            </SelectContent>

          </Select>

          <div className="flex flex-wrap gap-3">

            <Button
              variant="outline"
              onClick={onSave}
              disabled={loading}
              className="border-slate-700 bg-transparent text-white hover:bg-slate-800"
            >
              <Save className="mr-2 h-4 w-4" />
              Save Prompt
            </Button>

            <Button
              variant="outline"
              onClick={onClear}
              className="border-slate-700 bg-transparent text-white hover:bg-slate-800"
            >
              <Eraser className="mr-2 h-4 w-4" />
              Clear
            </Button>

            <Button
              onClick={onRun}
              disabled={loading}
              className="bg-violet-600 hover:bg-violet-700"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Run Prompt
                </>
              )}
            </Button>

          </div>

        </div>

      </CardContent>
    </Card>
  );
}
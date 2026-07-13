import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  Sparkles,
  Clock3,
  Coins,
  Loader2,
  Bot,
} from "lucide-react";

import { MODELS } from "@/lib/models";

export default function ResponseCard({
  response,
  metrics,
  loading,
  model,
  source,
}) {
  return (
    <Card className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/70 shadow-2xl backdrop-blur">

      <CardContent className="p-8">

        {/* Header */}

        <div className="mb-6 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <Bot className="h-6 w-6 text-violet-400" />

            <div>

              <h2 className="text-xl font-bold text-white">
                AI Response
              </h2>

              <p className="text-sm text-slate-400">
                Generated using
                <span className="ml-1 font-medium text-violet-400">
                  {model}
                </span>
              </p>

            </div>

          </div>

          {source === "demo" ? (
            <Badge
              variant="outline"
              className="border-violet-500/30 text-violet-300"
            >
              Demo
            </Badge>
          ) : source === "live" ? (
            <Badge
              variant="outline"
              className="border-emerald-500/30 text-emerald-300"
            >
              Live
            </Badge>
          ) : null}

        </div>

        {/* Response */}

        <Card className="rounded-2xl border border-slate-800 bg-slate-950">

          <CardContent className="p-6">

            {loading ? (

              <div className="flex h-52 flex-col items-center justify-center">

                <Loader2 className="mb-4 h-10 w-10 animate-spin text-violet-400" />

                <p className="text-lg font-medium text-white">
                  Thinking...
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  PromptPilot is generating your response.
                </p>

              </div>

            ) : response ? (

              <div className="space-y-4">

                <p className="whitespace-pre-line leading-8 text-slate-300">
                  {response}
                </p>

              </div>

            ) : (

              <div className="flex h-52 flex-col items-center justify-center text-center">

                <Bot className="mb-4 h-10 w-10 text-slate-600" />

                <h3 className="text-lg font-semibold text-white">
                  No AI Response Yet
                </h3>

                <p className="mt-2 max-w-sm text-sm text-slate-500">
                  Type your prompt, choose a model and click
                  <span className="font-semibold text-violet-400">
                    {" "}Run Prompt
                  </span>
                  {" "}to generate an AI response.
                </p>

              </div>

            )}

          </CardContent>

        </Card>

        {/* Metrics */}

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">

          <Card className="rounded-2xl border border-slate-800 bg-slate-950 transition-all duration-300 hover:-translate-y-1 hover:border-yellow-500/40">

            <CardContent className="p-5 text-center">

              <Sparkles className="mx-auto mb-3 h-6 w-6 text-yellow-400" />

              <p className="text-3xl font-bold text-white">
                {metrics.tokens}
              </p>

              <p className="mt-2 text-xs uppercase tracking-wider text-slate-500">
                Tokens Used
              </p>

            </CardContent>

          </Card>

          <Card className="rounded-2xl border border-slate-800 bg-slate-950 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40">

            <CardContent className="p-5 text-center">

              <Clock3 className="mx-auto mb-3 h-6 w-6 text-blue-400" />

              <p className="text-3xl font-bold text-white">
                {metrics.latency}
              </p>

              <p className="mt-2 text-xs uppercase tracking-wider text-slate-500">
                Response Time
              </p>

            </CardContent>

          </Card>

          <Card className="rounded-2xl border border-slate-800 bg-slate-950 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40">

            <CardContent className="p-5 text-center">

              <Coins className="mx-auto mb-3 h-6 w-6 text-emerald-400" />

              <p className="text-3xl font-bold text-white">
                {metrics.cost}
              </p>

              <p className="mt-2 text-xs uppercase tracking-wider text-slate-500">
                Estimated Cost
              </p>

            </CardContent>

          </Card>

        </div>

        {/* Supported Models */}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">

          <span className="text-sm text-slate-500">
            Supports
          </span>

          {MODELS.map((item) => (
            <Badge
              key={item.id}
              variant="outline"
              className="border-violet-500/30 text-violet-300"
            >
              {item.label}
            </Badge>
          ))}

        </div>

      </CardContent>

    </Card>
  );
}
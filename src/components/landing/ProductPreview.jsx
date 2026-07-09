import {
  Card,
  CardContent
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";

import { useState } from "react";

import fakeResponses from "@/data/fakeResponses";

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
  Clock3,
  Coins,
  FileText,
} from "lucide-react";

export default function ProductPreview() {
const [prompt, setPrompt] = useState("");

const [loading, setLoading] = useState(false);

const [response, setResponse] = useState("");

const [tokens, setTokens] = useState("--");

const [latency, setLatency] = useState("--");

const [cost, setCost] = useState("--");

const handleRunPrompt = () => {
  setLoading(true);

  setTimeout(() => {
    const lowerPrompt = prompt.toLowerCase();

    const result = fakeResponses.find((item) =>
      item.keywords.some((keyword) => lowerPrompt.includes(keyword))
    );

    if (result) {
      setResponse(result.response);
      setTokens(result.tokens);
      setLatency(result.latency);
      setCost(result.cost);
    } else {
      setResponse(
        "This is a demo version of PromptPilot."
      );

      setTokens(240);
      setLatency("1.3 sec");
      setCost("$0.003");
    }

    setLoading(false);
  }, 1500);
};
  return (
    <section
      id="product-preview"
      className="relative overflow-hidden bg-slate-950 px-6 py-28"
    >
      <div className="absolute left-1/2 top-24 -z-10 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[150px]" />
      <div className="mx-auto max-w-6xl">

        {/* Heading */}

        <div className="mb-14 text-center">

          <Badge className="border border-purple-500/30 bg-purple-500/10 text-purple-300">
            Interactive Demo
          </Badge>

          <h2 className="mt-6 text-5xl font-bold tracking-tight text-white">
            Experience PromptPilot
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-400">
            A modern workspace for building, testing and improving AI prompts.
          </p>

        </div>

        {/* Window */}

        <Card className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 shadow-2xl shadow-violet-500/10 backdrop-blur transition-all duration-500 hover:-translate-y-2 hover:shadow-violet-500/20">

          {/* Window Header */}

          <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">

            <div className="flex items-center gap-2">

              <div className="h-3 w-3 rounded-full bg-red-500"></div>

              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>

              <div className="h-3 w-3 rounded-full bg-green-500"></div>

            </div>

            <div className="text-center">
              <p className="font-semibold text-white">
                PromptPilot Workspace
              </p>

              <p className="text-xs text-slate-500">
                Interactive Preview
              </p>
            </div>

            <Badge variant="secondary">
              Demo
            </Badge>

          </div>

          <CardContent className="grid gap-8 p-8 lg:grid-cols-2">

            {/* LEFT */}

            <div>

              <div className="mb-4 flex items-center gap-2">

                <Sparkles className="h-5 w-5 text-purple-400" />

                <h3 className="font-semibold text-white">
                  Prompt
                </h3>

              </div>

              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Write your prompt here..."
                spellCheck={false}
                className="min-h-[240px] resize-none rounded-2xl border-slate-700 bg-slate-950 text-base leading-7 text-slate-300 focus:border-violet-500"
              />

              <div className="mt-6 flex items-center justify-between">

                <Select>

                  <SelectTrigger className="w-52 border-slate-700 bg-slate-950 text-white">

                    <SelectValue placeholder="Claude Sonnet 4" />

                  </SelectTrigger>

                  <SelectContent>

                    <SelectItem value="claude">
                      Claude Sonnet 4
                    </SelectItem>

                    <SelectItem value="gpt">
                      GPT-4.1
                    </SelectItem>

                    <SelectItem value="gemini">
                      Gemini 2.5
                    </SelectItem>

                  </SelectContent>

                </Select>

                <Button 
                  onClick={handleRunPrompt}
                  disabled={loading}
                  className="rounded-xl bg-violet-600 px-8 font-medium shadow-lg shadow-violet-600/30 transition-all hover:scale-105 hover:bg-violet-700">

                  {loading ? "Generating..." : "Run Prompt"}

                </Button>

              </div>

            </div>

            {/* RIGHT */}

            <div>

              <div className="mb-4 flex items-center gap-2">

                <FileText className="h-5 w-5 text-purple-400" />

                <h3 className="font-semibold text-white">
                  AI Response
                </h3>

              </div>

              <Card className="rounded-2xl border-slate-800 bg-slate-950 shadow-lg">

                <CardContent className="p-6">

                  <p className="whitespace-pre-line leading-8 text-slate-300">
                    {response ||
                        "Run a prompt to see the AI response.\n\nPromptPilot will analyze your prompt and display the generated result here."}
                  </p>

                </CardContent>

              </Card>

              <div className="mt-6 grid grid-cols-3 gap-4">

                <Card className="rounded-2xl border-slate-800 bg-slate-950 transition-all duration-300 hover:-translate-y-1 hover:border-yellow-500/40">

                  <CardContent className="p-4 text-center">

                    <Sparkles className="mx-auto mb-2 h-5 w-5 text-yellow-400" />

                    <p className="text-2xl font-bold text-white">
                      {tokens}
                    </p>

                    <p className="text-xs text-slate-400">
                      Tokens Used
                    </p>

                  </CardContent>

                </Card>

                <Card className="rounded-2xl border-slate-800 bg-slate-950 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40">

                  <CardContent className="p-4 text-center">

                    <Clock3 className="mx-auto mb-2 h-5 w-5 text-blue-400" />

                    <p className="text-2xl font-bold text-white">
                      {latency}
                    </p>

                    <p className="text-xs text-slate-400">
                      Response Time
                    </p>

                  </CardContent>

                </Card>

                <Card className="rounded-2xl border-slate-800 bg-slate-950 transition-all duration-300 hover:-translate-y-1 hover:border-green-500/40">

                  <CardContent className="p-4 text-center">

                    <Coins className="mx-auto mb-2 h-5 w-5 text-emerald-400" />

                    <p className="text-2xl font-bold text-white">
                      {cost}
                    </p>

                    <p className="text-xs text-slate-400">
                      Estimated Cost
                    </p>

                  </CardContent>

                </Card>

              </div>

            </div>

          </CardContent>

        </Card>

      </div>

    </section>
  );
}
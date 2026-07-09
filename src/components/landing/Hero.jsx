import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Zap, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6 pt-24 pb-16 text-white">

      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b20_1px,transparent_1px),linear-gradient(to_bottom,#1e293b20_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Glow Effects */}
      <div className="absolute inset-0">

        <div className="absolute left-1/2 top-24 h-96 w-96 -translate-x-1/2 rounded-full bg-violet-600/20 blur-[120px]" />

        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-cyan-600/10 blur-[120px]" />

        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-fuchsia-600/10 blur-[120px]" />

      </div>

      <div className="relative z-10 mx-auto -mt-12 max-w-6xl text-center">

        <Badge className="border border-purple-500/30 bg-purple-500/10 px-3 py-1.5 text-purple-300">
          <Sparkles className="mr-2 h-4 w-4" />
          AI Prompt Engineering Workspace
        </Badge>

        <h1 className="mt-8 text-5xl font-extrabold leading-tight tracking-tight md:text-6xl lg:text-7xl">
          Build Better
          <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
            AI Prompts
          </span>
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
          PromptPilot helps developers create, test and optimize AI prompts
          with a clean and modern workspace before integrating them into
          production applications.
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">

          <Button
            size="lg"
            className="h-12 rounded-xl bg-yellow-600 px-8 text-base hover:bg-yellow-700"
            onClick={() => navigate("/studio")}
          >
            Launch Workspace
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="h-12 rounded-xl border-slate-700 bg-slate-900/40 px-8 text-base text-white hover:bg-slate-800"
            onClick={() => {
            document
              .getElementById("product-preview")
              ?.scrollIntoView({
              behavior: "smooth",
            });
            }}
          >
           View Demo
          </Button>

        </div>

        {/* Features */}

<div className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-3">

  {/* Run */}

  <div className="group relative overflow-hidden rounded-3xl border border-violet-500/30 bg-slate-900/60 p-8 backdrop-blur transition-all duration-500 hover:-translate-y-2 hover:border-violet-400 hover:shadow-[0_0_35px_rgba(139,92,246,0.35)]">

    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100"></div>

    <div className="relative z-10">

      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-500/30 bg-violet-500/10">

        <Zap className="h-8 w-8 text-violet-400" />

      </div>

      <h3 className="text-3xl font-bold">
        Run
      </h3>

      <p className="mt-4 leading-8 text-slate-400">
        Test prompts instantly with a beautiful interface and get responses in seconds.
      </p>

    </div>

  </div>

  {/* Compare */}

  <div className="group relative overflow-hidden rounded-3xl border border-cyan-500/30 bg-slate-900/60 p-8 backdrop-blur transition-all duration-500 hover:-translate-y-2 hover:border-cyan-400 hover:shadow-[0_0_35px_rgba(34,211,238,0.35)]">

    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100"></div>

    <div className="relative z-10">

      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-500/30 bg-cyan-500/10">

        <Sparkles className="h-8 w-8 text-cyan-400" />

      </div>

      <h3 className="text-3xl font-bold">
        Compare
      </h3>

      <p className="mt-4 leading-8 text-slate-400">
        Switch between Claude, GPT and Gemini with a single click and compare outputs.
      </p>

    </div>

  </div>

  {/* Optimize */}

  <div className="group relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-slate-900/60 p-8 backdrop-blur transition-all duration-500 hover:-translate-y-2 hover:border-emerald-400 hover:shadow-[0_0_35px_rgba(16,185,129,0.35)]">

    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100"></div>

    <div className="relative z-10">

      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10">

        <ShieldCheck className="h-8 w-8 text-emerald-400" />

      </div>

      <h3 className="text-3xl font-bold">
        Optimize
      </h3>

      <p className="mt-4 leading-8 text-slate-400">
        Refine prompts, reduce token usage and improve quality before production.
      </p>

    </div>

  </div>

</div>

        {/* Scroll Indicator */}

        <div className="mt-16 animate-bounce text-slate-700">
          ↓ Scroll to explore
        </div>

      </div>

    </section>
  );
}
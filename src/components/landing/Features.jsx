import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, BrainCircuit, BarChart3, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Prompt Studio",
    description:
      "Design, test and refine AI prompts with an intuitive workspace.",
  },
  {
    icon: BrainCircuit,
    title: "Multi-Model Testing",
    description:
      "Compare responses across Llama and GPT-OSS models in one place.",
  },
  {
    icon: BarChart3,
    title: "Prompt Insights",
    description:
      "Understand token usage, latency and prompt quality instantly.",
  },
];

export default function FeatureCards() {
  return (
    <section className="bg-slate-950 px-6 py-24 text-white">
      <div className="mx-auto max-w-7xl">

        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold">
            Everything you need to engineer AI prompts
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            PromptPilot combines prompt engineering, testing and evaluation
            into one modern workspace.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="group border-slate-800 bg-slate-900/60 transition-all duration-300 hover:-translate-y-2 hover:border-violet-500/40 hover:shadow-2xl hover:shadow-violet-500/10"
            >
              <CardContent className="p-8">

                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600/15">
                  <feature.icon className="h-7 w-7 text-violet-400" />
                </div>

                <h3 className="text-xl font-semibold text-white">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-400">
                  {feature.description}
                </p>

                <button className="mt-8 flex items-center gap-2 text-purple-400 transition-all group-hover:gap-3">
                  Learn More
                  <ArrowRight size={18} />
                </button>

              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
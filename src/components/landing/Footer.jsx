import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="border-t border-slate-800 bg-slate-950 px-6 py-20 text-white">

      <div className="mx-auto max-w-5xl text-center">

        <h2 className="text-4xl font-bold">
          Ready to build better AI prompts?
        </h2>

        <p className="mt-4 text-slate-400">
          Start engineering prompts with PromptPilot today.
        </p>

        <Button
          size="lg"
          className="mt-8 bg-yellow-600 hover:bg-yellow-800"
          onClick={() => navigate("/studio")}
        >
          Launch Workspace
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>

        <div className="mt-16 border-t border-slate-800 pt-8 text-sm text-slate-500">
          © 2026 PromptPilot • Built with React & Vite
        </div>

      </div>

    </footer>
  );
}